import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, RotateCcw, Copy, Github, Monitor } from 'lucide-react';
import confetti from 'canvas-confetti';
import { questions } from './data/questions';
import { results } from './data/results';

export default function App() {
  const [step, setStep] = useState<'start' | 'test' | 'result'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [resultCode, setResultCode] = useState('');

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [questions[currentIdx].id]: score };
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    const getCode = (pos: string, neg: string, score: number) => {
      return score >= 3 ? pos : neg;
    };

    const getIndicatorAvg = (pos: string, neg: string) => {
      const posQs = questions.filter(q => q.indicator === pos);
      const negQs = questions.filter(q => q.indicator === neg);
      if (posQs.length + negQs.length === 0) return 3;

      const posSum = posQs.reduce((acc, q) => acc + (finalAnswers[q.id] || 3), 0);
      const negSum = negQs.reduce((acc, q) => acc + (6 - (finalAnswers[q.id] || 3)), 0);

      return (posSum + negSum) / (posQs.length + negQs.length);
    };

    const res = [
      getCode('S', 'C', getIndicatorAvg('S', 'C')),
      getCode('D', 'G', getIndicatorAvg('D', 'G')),
      getCode('E', 'P', getIndicatorAvg('E', 'P')),
      getCode('F', 'T', getIndicatorAvg('F', 'T'))
    ].join('');

    setResultCode(res);
    setStep('result');
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00FFFF', '#1E90FF', '#ffffff'] });
  };

  const reset = () => {
    setStep('start');
    setCurrentIdx(0);
    setAnswers({});
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('클립보드에 복사되었습니다! ✨');
  };

  const currentResult = results[resultCode] || results['DEFAULT'];

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="vrc-panel text-center w-full"
          >
            <div className="mb-6 inline-block p-3 rounded-full bg-vrc-neon/10 text-vrc-neon">
              <Monitor size={48} />
            </div>
            <h1 className="text-4xl font-black mb-2 tracking-tighter text-vrc-neon">VRCTI</h1>
            <p className="text-gray-400 mb-8 font-medium">VRChat Type Indicator<br /><span className="text-xs text-gray-500">당신의 가상 세계 성격 유형은?</span></p>
            <button onClick={() => setStep('test')} className="vrc-button w-full text-lg">테스트 시작하기</button>
            <div className="mt-8 flex justify-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
              <span>#VRChat</span>
              <span>#VRCTI</span>
              <span>#MBTI</span>
            </div>
          </motion.div>
        )}

        {step === 'test' && (
          <motion.div
            key="test"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="vrc-panel w-full"
          >
            <div className="mb-8">
              <div className="flex justify-between text-[10px] text-vrc-neon mb-2 font-mono tracking-tighter">
                <span>QUESTION {currentIdx + 1}/{questions.length}</span>
                <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-vrc-neon shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-12 min-h-[4rem] leading-relaxed text-center break-keep">
              {questions[currentIdx].text}
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(5)}
                className="flex-1 p-8 rounded-3xl border-2 border-vrc-neon/20 bg-vrc-neon/5 hover:bg-vrc-neon/20 hover:border-vrc-neon transition-all group flex flex-col items-center justify-center gap-2"
              >
                <div className="text-6xl font-black text-vrc-neon group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">O</div>
                <div className="text-xs font-bold text-vrc-neon/60">그렇다</div>
              </button>
              <button
                onClick={() => handleAnswer(1)}
                className="flex-1 p-8 rounded-3xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all group flex flex-col items-center justify-center gap-2"
              >
                <div className="text-6xl font-black text-gray-600 group-hover:text-white group-hover:scale-110 transition-transform">X</div>
                <div className="text-xs font-bold text-gray-600 group-hover:text-white/60">아니다</div>
              </button>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="vrc-panel w-full text-center"
          >
            <div className="text-vrc-neon font-mono text-sm mb-2">당신의 결과는...</div>
            <div className="relative mb-8 mt-4 group">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="w-56 h-56 mx-auto rounded-3xl overflow-hidden border-2 border-vrc-neon/30 p-1 bg-gradient-to-br from-vrc-neon/10 to-transparent relative"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15)_0%,transparent_70%)] group-hover:opacity-100 opacity-50 transition-opacity" />
                <img
                  src={currentResult.avatar}
                  alt={currentResult.nickname}
                  className="w-full h-full object-cover rounded-[1.4rem] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-vrc-neon text-black text-[10px] font-black px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.5)] flex items-center gap-1.5 whitespace-nowrap"
              >
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                TYPE INDICATOR AVATAR
              </motion.div>
            </div>

            <div className="inline-block px-4 py-1.5 rounded-full bg-vrc-neon/10 text-vrc-neon text-sm font-bold mb-4 border border-vrc-neon/20 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
              {currentResult.nickname}
            </div>

            <h2 className="text-6xl font-black mb-8 text-white tracking-[0.25em] font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {resultCode}
            </h2>

            <p className="text-gray-300 mb-8 leading-relaxed text-left bg-black/30 p-4 rounded-lg border border-white/5">
              {currentResult.description}
            </p>

            <div className="text-left mb-8">
              <h3 className="text-vrc-neon text-xs font-bold uppercase tracking-wider mb-2">추천 아바타 스타일</h3>
              <p className="text-sm text-gray-400">{currentResult.avatarStyle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => copyToClipboard(`[VRCTI 결과]\n유형: ${resultCode}\n별명: ${currentResult.nickname}\n#VRCTI #VRChat`)}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 p-3 rounded-lg text-sm border border-white/10 transition-colors"
              >
                <Copy size={16} /> 디스코드 복사
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 p-3 rounded-lg text-sm border border-white/10 transition-colors"
              >
                <Share2 size={16} /> 이미지 저장
              </button>
            </div>

            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 w-full text-gray-500 hover:text-vrc-neon transition-colors text-sm"
            >
              <RotateCcw size={14} /> 다시 테스트하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-8 text-[10px] text-gray-600 font-mono flex items-center gap-4">
        <span className="flex items-center gap-1"><Monitor size={10} /> VRCTI v1.0.0</span>
        <span className="flex items-center gap-1"><Github size={10} /> GITHUB</span>
      </footer>
    </div>
  );
}
