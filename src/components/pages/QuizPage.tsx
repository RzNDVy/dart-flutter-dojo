import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { quizQuestions } from '@/data/curriculum';
import Confetti from '@/components/Confetti';

type QuizState = 'setup' | 'playing' | 'result';

const QuizPage = () => {
  const [state, setState] = useState<QuizState>('setup');
  const [questionCount, setQuestionCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([]);

  const questions = useMemo(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, questionCount);
  }, [questionCount, state]);

  const currentQuestion = questions[currentIndex];

  const startQuiz = () => {
    setState('playing');
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswers([]);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === currentQuestion.correctIndex;
    
    if (isCorrect) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }

    setAnswers([...answers, { questionId: currentQuestion.id, correct: isCorrect }]);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      setState('result');
    }
  };

  const resetQuiz = () => {
    setState('setup');
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswers([]);
  };

  const scorePercentage = (score / questions.length) * 100;

  if (state === 'setup') {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            📝 Quiz Challenge
          </h1>
          <p className="text-slate-500">
            Uji pemahamanmu tentang Dart & Flutter
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="theory-card"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">
            Pilih Jumlah Soal
          </h3>

          <div className="grid grid-cols-5 gap-3 mb-8">
            {[5, 10, 15, 20, 25].map((count) => (
              <motion.button
                key={count}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuestionCount(count)}
                className={`py-4 px-2 rounded-xl font-semibold transition-all ${
                  questionCount === count
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {count}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startQuiz}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Play className="w-5 h-5" />
            Mulai Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (state === 'result') {
    return (
      <div className="max-w-2xl mx-auto">
        {scorePercentage >= 80 && <Confetti />}
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="theory-card text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-6 relative"
          >
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={scorePercentage >= 80 ? '#2DD4BF' : scorePercentage >= 50 ? '#FBBF24' : '#FB7185'}
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 283' }}
                animate={{ strokeDasharray: `${(scorePercentage / 100) * 283} 283` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-slate-800">{Math.round(scorePercentage)}%</span>
            </div>
          </motion.div>

          <Trophy className={`w-12 h-12 mx-auto mb-4 ${scorePercentage >= 80 ? 'text-yellow-500' : 'text-slate-300'}`} />
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {scorePercentage >= 80 ? 'Luar Biasa! 🎉' : scorePercentage >= 50 ? 'Bagus! 👍' : 'Tetap Semangat! 💪'}
          </h2>
          
          <p className="text-slate-500 mb-6">
            Kamu menjawab {score} dari {questions.length} soal dengan benar
          </p>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="py-3 px-6 rounded-xl bg-slate-100 text-slate-600 font-medium flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6"
      >
        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">
            Soal {currentIndex + 1} dari {questions.length}
          </span>
          <span className="text-sm font-semibold text-primary">
            Skor: {score}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="theory-card"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            {currentQuestion.category}
          </span>

          <h3 className="text-xl font-semibold text-slate-800 mb-6">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctIndex;
              const showResult = selectedAnswer !== null;

              let buttonClass = 'bg-slate-50 hover:bg-slate-100 text-slate-700';
              if (showResult && isCorrect) {
                buttonClass = 'bg-mint/20 text-mint border-2 border-mint';
              } else if (showResult && isSelected && !isCorrect) {
                buttonClass = 'bg-rose/20 text-rose border-2 border-rose';
              } else if (showResult) {
                buttonClass = 'bg-slate-50 text-slate-400';
              }

              return (
                <motion.button
                  key={index}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all ${buttonClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && isCorrect && (
                      <CheckCircle className="w-5 h-5 ml-auto" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 ml-auto" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {selectedAnswer !== null && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className={`p-4 rounded-xl mb-4 ${
                  selectedAnswer === currentQuestion.correctIndex
                    ? 'bg-mint/10 border border-mint/30'
                    : 'bg-rose/10 border border-rose/30'
                }`}>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <span className="font-semibold">Penjelasan: </span>
                    {currentQuestion.explanation}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextQuestion}
                  className="w-full py-3 rounded-xl bg-primary text-white font-medium"
                >
                  {currentIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;
