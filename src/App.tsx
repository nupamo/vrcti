import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Copy, ChevronLeft, User, Info, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { questions } from './data/questions';
import { results } from './data/results';
import { Indicator, indicatorDescriptions, Language } from './data/indicators';
import { uiTranslations } from './data/ui';
import { calculateResultCode, parseResultCode, shuffle } from './lib/score';

const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'ko', label: '한국어' },
  { id: 'en', label: 'English' },
  { id: 'ja', label: '日本語' },
  { id: 'zh', label: '中文' },
];

const LANG_STORAGE_KEY = 'vrcti:lang';

const toLanguage = (value: string | null | undefined): Language | null =>
  LANGUAGES.find((l) => l.id === value)?.id ?? null;

// 직접 고른 언어가 저장돼 있으면 그것을, 없으면 브라우저 언어를 따른다.
function detectLanguage(): Language {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(LANG_STORAGE_KEY);
  } catch {
    // 저장소 접근이 막힌 환경(사생활 보호 모드 등)에서는 브라우저 언어만 사용
  }
  return toLanguage(saved) ?? toLanguage(navigator.language.split('-')[0]) ?? 'ko';
}

// 결과 화면에 진입하면 공유용 ?result= 파라미터는 주소창에서 지운다.
function clearResultParam(mode: 'replace' | 'push' = 'replace') {
  const url = new URL(window.location.href);
  url.searchParams.delete('result');
  if (mode === 'push') window.history.pushState({}, '', url);
  else window.history.replaceState({}, '', url);
}

export default function App() {
  // 공유 링크(?result=CODE)로 들어온 경우 곧바로 결과 화면을 보여준다.
  const [sharedResult] = useState(() =>
    parseResultCode(new URLSearchParams(window.location.search).get('result'))
  );
  const [lang, setLang] = useState<Language>(detectLanguage);
  const [step, setStep] = useState<'start' | 'test' | 'result'>(sharedResult ? 'result' : 'start');
  const [quizQuestions, setQuizQuestions] = useState(() => shuffle(questions));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [resultCode, setResultCode] = useState<string>(sharedResult ?? '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<confetti.CreateTypes | null>(null);

  const t = uiTranslations[lang];

  const changeLang = (next: Language) => {
    setLang(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // 저장 실패는 무시 (이번 세션에만 적용)
    }
  };

  // 페이지 타이틀 및 HTML lang 속성 동적 설정
  useEffect(() => {
    document.documentElement.lang = lang;
    if (step === 'start') {
      document.title = 'VRCTI - VRChat Type Indicator';
    } else if (step === 'test') {
      document.title = `VRCTI - Q${currentIdx + 1} | VRChat Type Indicator`;
    } else if (step === 'result' && resultCode) {
      const nickname = results[resultCode]?.nickname[lang] || '';
      document.title = `VRCTI [${resultCode}] ${nickname} | VRChat Type Indicator`;
    }
  }, [step, currentIdx, resultCode, lang]);

  useEffect(() => {
    if (confettiCanvasRef.current && !confettiRef.current) {
      confettiRef.current = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
        disableForReducedMotion: true,
      });
    }
  }, []);

  useEffect(() => {
    if (sharedResult) clearResultParam();
  }, [sharedResult]);

  // 모달: Esc로 닫기
  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen]);

  // 토스트 자동 닫기
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const currentQuestion = quizQuestions[currentIdx];
  const selectedValue = step === 'test' ? answers[currentQuestion.id] : undefined;
  const progress = ((currentIdx + 1) / quizQuestions.length) * 100;

  const handleAnswer = (yes: boolean) => {
    const newAnswers = { ...answers, [currentQuestion.id]: yes };
    setAnswers(newAnswers);
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      showResult(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
    else setStep('start');
  };

  const showResult = (finalAnswers: Record<number, boolean>) => {
    const res = calculateResultCode(questions, finalAnswers);

    setResultCode(res);
    setStep('result');
    clearResultParam();

    confettiRef.current?.({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00D2FF', '#1144DD', '#ffffff'],
      zIndex: -1
    });

    // Google Analytics 이벤트 전송
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'complete_test', {
        'result_code': res,
        'language': navigator.language,
      });
    }
  };

  const reset = () => {
    setStep('start');
    setCurrentIdx(0);
    setAnswers({});
    setQuizQuestions(shuffle(questions));
    clearResultParam('push');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(t.result_copied);
    } catch {
      setToast(t.result_copy_failed);
    }
  };

  const currentResult = results[resultCode] || results['DEFAULT'];
  const shareText = t.share_text.replaceAll('{code}', resultCode).replace('{nickname}', currentResult.nickname[lang]);
  // 언어별 줄바꿈 규칙
  const wordBreakClass = lang === 'ko' ? 'break-keep' : (lang === 'ja' ? 'break-all' : 'break-words');

  return (
    <div className="min-h-screen">
      <canvas ref={confettiCanvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
      <div className={`relative z-10 mx-auto min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8 transition-all duration-500 ${step === 'result' ? 'max-w-4xl' : 'max-w-md'}`}>

        {/* 언어 선택기 (모든 화면 상시 노출) */}
        <div className="absolute top-8 flex gap-2 bg-white/5 p-1 rounded-full border border-white/5">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              lang={l.id}
              aria-pressed={lang === l.id}
              onClick={() => changeLang(l.id)}
              className={`px-3 py-1 rounded-full text-[10px] transition-all ${lang === l.id ? 'bg-vrc-neon text-black' : 'text-gray-400 hover:text-white'}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="vrc-panel text-center w-full">
              <div className="mb-6 inline-block p-3 rounded-full bg-vrc-neon/10 text-vrc-neon">
                <User size={48} />
              </div>
              <h1 className="text-4xl font-black mb-2 tracking-tighter text-vrc-neon">VRCTI</h1>
              <p className="text-gray-400 mb-8 font-medium">VRChat Type Indicator<br /><span className="text-xs text-gray-500">{t.start_description}</span></p>
              <button onClick={() => setStep('test')} className="vrc-button w-full text-lg">{t.start_button}</button>
              <div className="mt-8 flex justify-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
                <span>#VRChat</span><span>#VRCTI</span><span>#MBTI</span>
              </div>
            </motion.div>
          )}

          {step === 'test' && (
            <motion.div key="test" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="vrc-panel w-full">
              <div className="flex items-center justify-between mb-8 -mt-2">
                <button onClick={handleBack} className="p-2 -ml-2 text-gray-500 hover:text-vrc-neon transition-colors group flex items-center gap-1">
                  <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.test_back}</span>
                </button>
                <div className="flex justify-between text-[10px] text-vrc-neon font-mono tracking-tighter gap-4">
                  <span>{t.test_question} {currentIdx + 1}/{quizQuestions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>
              <div className="mb-8">
                <div className="h-1 bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                  <motion.div className="h-full bg-vrc-neon shadow-[0_0_10px_rgba(0,210,255,0.5)]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                </div>
              </div>
              <h2 className={`text-xl font-bold mb-12 min-h-[7rem] flex items-center justify-center leading-relaxed text-center ${wordBreakClass}`}>
                {currentQuestion.text[lang]}
              </h2>
              <div className="flex gap-4">
                <button onClick={() => handleAnswer(true)} aria-pressed={selectedValue === true} className={`flex-1 p-8 rounded-3xl border-2 transition-all group flex flex-col items-center justify-center gap-2 ${selectedValue === true ? 'border-vrc-neon bg-vrc-neon/20' : 'border-white/10 bg-white/5 hover:border-vrc-neon'}`}>
                  <div className="text-6xl font-black group-hover:scale-110 transition-all text-gray-700 group-hover:text-vrc-neon">O</div>
                  <div className="text-xs font-bold text-gray-600 group-hover:text-vrc-neon">{t.test_yes}</div>
                </button>
                <button onClick={() => handleAnswer(false)} aria-pressed={selectedValue === false} className={`flex-1 p-8 rounded-3xl border-2 transition-all group flex flex-col items-center justify-center gap-2 ${selectedValue === false ? 'border-red-500 bg-red-500/20' : 'border-white/10 bg-white/5 hover:border-red-500'}`}>
                  <div className="text-6xl font-black group-hover:scale-110 transition-all text-gray-700 group-hover:text-red-500">X</div>
                  <div className="text-xs font-bold text-gray-600 group-hover:text-red-500">{t.test_no}</div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="vrc-panel w-full md:text-left">
              <div className="md:grid md:grid-cols-[1fr_1.2fr] md:gap-12 md:items-start">
                <div className="flex flex-col items-center text-center">
                  <div className="text-vrc-neon font-mono text-sm mb-4">{t.result_title}</div>
                  <div className="relative mb-6 group">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-56 h-56 mx-auto rounded-3xl overflow-hidden border-2 border-vrc-neon/30 p-1 bg-gradient-to-br from-vrc-neon/10 to-transparent relative">
                      {currentResult.boothUrl ? (
                        <a href={`https://booth.pm/${lang}/items/${currentResult.boothUrl}`} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                          <img src={currentResult.avatar} alt={currentResult.nickname[lang]} className="w-full h-full object-cover rounded-[1.4rem]" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.4rem]">
                            <span className="text-[10px] font-black text-vrc-neon tracking-widest border border-vrc-neon px-2 py-1 rounded-sm bg-black/50">{t.result_booth}</span>
                          </div>
                        </a>
                      ) : (
                        <img src={currentResult.avatar} alt={currentResult.nickname[lang]} className="w-full h-full object-cover rounded-[1.4rem]" />
                      )}
                    </motion.div>
                  </div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-vrc-neon/10 text-vrc-neon text-sm font-bold mb-4 border border-vrc-neon/20">
                    {currentResult.nickname[lang]}
                  </div>
                  <h2 className="text-6xl font-black mb-8 text-white tracking-[0.25em] font-mono">{resultCode}</h2>
                  <p className={`text-gray-300 leading-relaxed text-left bg-black/30 p-4 rounded-lg border border-white/5 text-sm ${wordBreakClass}`}>
                    {currentResult.description[lang]}
                  </p>
                </div>
                <div className="mt-12 md:mt-0 space-y-8 flex flex-col">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-vrc-neon text-xs font-bold uppercase tracking-wider">{t.result_analysis}</h3>
                      <button onClick={() => setIsModalOpen(true)} className="text-[10px] text-gray-500 hover:text-vrc-neon flex items-center gap-1 transition-colors uppercase font-bold">
                        <Info size={12} /> {t.result_all_indicators}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {resultCode.split('').map((char, idx) => {
                        const info = indicatorDescriptions[lang][char as Indicator];
                        if (!info) return null;
                        return (
                          <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 flex gap-3 items-center">
                            <div className="w-8 h-8 rounded-lg bg-vrc-neon/10 flex items-center justify-center text-vrc-neon font-mono font-bold shrink-0 border border-vrc-neon/20">{char}</div>
                            <div>
                              <div className="text-[10px] font-bold text-vrc-neon uppercase tracking-tighter leading-none mb-1">{info.name}</div>
                              <div className="text-xs text-gray-400 leading-tight">{info.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-vrc-neon text-xs font-bold uppercase tracking-wider mb-2">{t.result_avatar_style}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{currentResult.avatarStyle[lang]}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <button onClick={() => copyToClipboard(shareText)} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 p-3 rounded-lg text-sm border border-white/10 transition-colors">
                        <Copy size={16} /> {t.result_copy_text}
                      </button>
                      <button onClick={() => {
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
                      }} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 p-3 rounded-lg text-sm border border-white/10 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        {t.result_share_twitter}
                      </button>
                    </div>
                    <button onClick={reset} className="flex items-center justify-center gap-2 w-full text-gray-500 hover:text-vrc-neon transition-colors text-sm">
                      <RotateCcw size={14} /> {t.result_restart}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="indicator-guide-title"
                className="vrc-panel w-full max-w-lg relative z-10 max-h-[90vh] flex flex-col"
              >
                <div className="flex justify-between items-center mb-6 shrink-0">
                  <h3 id="indicator-guide-title" className="text-vrc-neon font-black text-xl tracking-tighter">{t.modal_title}</h3>
                  <button onClick={() => setIsModalOpen(false)} aria-label={t.modal_close} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
                </div>

                <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                  <div className="space-y-6">
                    {[
                      { pair: ['E', 'I'], title: t.pair_1 },
                      { pair: ['S', 'C'], title: t.pair_2 },
                      { pair: ['G', 'D'], title: t.pair_3 },
                      { pair: ['A', 'U'], title: t.pair_4 }
                    ].map((group, groupIdx) => (
                      <div key={groupIdx} className="space-y-2">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                          <div className="h-px flex-1 bg-white/5" />{group.title}<div className="h-px flex-1 bg-white/5" />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {group.pair.map((char) => {
                            const info = indicatorDescriptions[lang][char as Indicator];
                            return (
                              <div key={char} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-vrc-neon/10 flex items-center justify-center text-vrc-neon font-mono font-black text-xl shrink-0 border border-vrc-neon/20">{char}</div>
                                <div>
                                  <div className="text-xs font-black text-vrc-neon uppercase tracking-wider mb-1">{info.name}</div>
                                  <div className={`text-sm text-gray-300 leading-snug ${wordBreakClass}`}>{info.description}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => setIsModalOpen(false)} className="vrc-button w-full mt-8 shrink-0">{t.modal_close}</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            // 가운데 정렬은 바깥 래퍼가 맡는다 (motion이 transform을 덮어쓰기 때문)
            <div className="fixed bottom-8 inset-x-0 z-[110] flex justify-center px-4 pointer-events-none">
              <motion.div
                key={toast}
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="px-5 py-3 rounded-full bg-black/80 border border-vrc-neon/40 text-sm text-white text-center shadow-2xl backdrop-blur-xl"
              >
                {toast}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <footer className="mt-8 text-[10px] text-gray-600 font-mono flex items-center gap-4">
          <span className="flex items-center gap-1"><User size={10} /> VRCTI v1.0.2</span>
          <a href="https://x.com/nupamo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-vrc-neon transition-colors">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            NUPAMO
          </a>
        </footer>
      </div>
    </div>
  );
}
