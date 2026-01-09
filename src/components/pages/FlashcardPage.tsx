import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Shuffle, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { flashcards } from '@/data/curriculum';

const FlashcardPage = () => {
  const [cards, setCards] = useState(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [unknownCards, setUnknownCards] = useState<Set<string>>(new Set());

  const currentCard = cards[currentIndex];

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards(new Set());
    setUnknownCards(new Set());
  };

  const markAsKnown = () => {
    setKnownCards(new Set([...knownCards, currentCard.id]));
    goNext();
  };

  const markAsUnknown = () => {
    setUnknownCards(new Set([...unknownCards, currentCard.id]));
    goNext();
  };

  const goNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 200);
  };

  const goPrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }, 200);
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards(new Set());
    setUnknownCards(new Set());
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          🗂️ Flashcard
        </h1>
        <p className="text-slate-500">
          Latih ingatanmu dengan kartu cepat
        </p>
      </motion.div>

      {/* Progress & Controls */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="theory-card mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-600">
            Kartu {currentIndex + 1} dari {cards.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={shuffleCards}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title="Shuffle"
            >
              <Shuffle className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={resetCards}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
          <motion.div
            className="h-full bg-mint"
            animate={{ width: `${(knownCards.size / cards.length) * 100}%` }}
          />
          <motion.div
            className="h-full bg-rose"
            animate={{ width: `${(unknownCards.size / cards.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-mint" />
            {knownCards.size} Tahu
          </span>
          <span className="flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose" />
            {unknownCards.size} Lupa
          </span>
        </div>
      </motion.div>

      {/* Flashcard */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="perspective-1000 mb-6"
      >
        <motion.div
          className="relative w-full h-72 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 flex flex-col items-center justify-center text-white shadow-xl backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-xs uppercase tracking-wider opacity-70 mb-4">
              {currentCard.category}
            </span>
            <h3 className="text-xl font-semibold text-center leading-relaxed">
              {currentCard.front}
            </h3>
            <span className="absolute bottom-4 text-xs opacity-50">
              Klik untuk membalik
            </span>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-mint to-mint/80 p-8 flex flex-col items-center justify-center text-slate-800 shadow-xl"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="text-xs uppercase tracking-wider opacity-70 mb-4">
              Jawaban
            </span>
            <p className="text-lg text-center leading-relaxed">
              {currentCard.back}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation & Feedback Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between gap-4"
      >
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex gap-3 flex-1 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAsUnknown}
            disabled={!isFlipped}
            className="flex-1 max-w-32 py-3 px-6 rounded-xl bg-rose/10 text-rose font-medium hover:bg-rose/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Lupa 😅
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAsKnown}
            disabled={!isFlipped}
            className="flex-1 max-w-32 py-3 px-6 rounded-xl bg-mint/10 text-mint font-medium hover:bg-mint/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Tahu! 🎉
          </motion.button>
        </div>

        <button
          onClick={goNext}
          disabled={currentIndex === cards.length - 1}
          className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </motion.div>
    </div>
  );
};

export default FlashcardPage;
