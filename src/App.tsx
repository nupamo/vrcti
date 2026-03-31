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
    const getIndicatorScore = (indicators: string[]) => {
      const filtered = questions.filter(q => indicators.includes(q.indicator));
      const sum = filtered.reduce((acc, q) => acc + (finalAnswers[q.id] || 3), 0);
      const avg = sum / filtered.length;
      
      if (avg > 3.5) return indicators[0];
      if (avg < 2.5) return indicators[1] || 'x';
      return 'x';
    };

    // S vs C, D vs G, E vs P, F vs T (simplified logic based on indicators)
    // Map scores to indicators: 4-5 is high (A), 1-2 is low (B), 3 is x
    const s1 = getIndicatorScore(['S']);
    const s2 = getIndicatorScore(['D']);
    const s3 = getIndicatorScore(['E']);
    const s4 = getIndicatorScore(['T']); // Note: T is 'Technical' in indicators, but we want F vs T

    // Proper logic for the requested indicators
    const getCode = (pos: string, neg: string, score: number) => {
        if (score > 3.4) return pos;
        if (score < 2.6) return neg;
        return 'x';
    };

    const calcIndicator = (key: string) => {
        const qList = questions.filter(q => q.indicator === key);
        return qList.reduce((acc, q) => acc + (finalAnswers[q.id] || 3), 0) / qList.length;
    };

    const res = [
        getCode('S', 'C', calcIndicator('S')),
        getCode('D', 'G', calcIndicator('D')),
        getCode('E', 'P', calcIndicator('E')),
        getCode('F', 'T', 6 - calcIndicator('T')) // T high means F low
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
            <p className="text-gray-400 mb-8">VRChat Type Indicator<br/>당신의 가상 세계 성격 유형은?</p>
            <button onClick={() => setStep('test')} className="vrc-button w-full text-lg">테스트 시작하기</button>
            <div className="mt-8 flex justify-center gap-4 text-xs text-gray-500">
                <span>#VRChat</span>
                <span>#VRCTI</span>
                <span>#성격테스트</span>
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
              <div className="flex justify-between text-xs text-vrc-neon mb-2 font-mono">
                <span>QUESTION {currentIdx + 1}/{questions.length}</span>
                <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-vrc-neon"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-10 min-h-[4rem] leading-relaxed">
              {questions[currentIdx].text}
            </h2>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((score) => (
                <button
                  key={score}
                  onClick={() => handleAnswer(score)}
                  className="w-full p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-vrc-neon/10 hover:border-vrc-neon/30 transition-all text-left flex items-center justify-between group"
                >
                  <span className="font-medium">
                    {score === 5 && "매우 그렇다"}
                    {score === 4 && "그렇다"}
                    {score === 3 && "보통이다"}
                    {score === 2 && "아니다"}
                    {score === 1 && "전혀 아니다"}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-vrc-neon shadow-[0_0_8px_transparent] group-hover:shadow-vrc-neon" />
                </button>
              ))}
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
            <h2 className="text-5xl font-black mb-1 text-white tracking-widest font-mono">
              {resultCode}
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-vrc-neon/20 text-vrc-neon text-sm font-bold mb-6">
              {currentResult.nickname}
            </div>
            
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
