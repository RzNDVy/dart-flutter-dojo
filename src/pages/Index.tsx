import { motion, AnimatePresence } from 'framer-motion';
import AppSidebar from '@/components/AppSidebar';
import LearningPage from '@/components/pages/LearningPage';
import FlashcardPage from '@/components/pages/FlashcardPage';
import QuizPage from '@/components/pages/QuizPage';
import DuoModePage from '@/components/pages/DuoModePage';
import { useAppStore } from '@/stores/appStore';

const Index = () => {
  const { currentPage } = useAppStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'learning':
        return <LearningPage />;
      case 'flashcard':
        return <FlashcardPage />;
      case 'quiz':
        return <QuizPage />;
      case 'duo':
        return <DuoModePage />;
      default:
        return <LearningPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
