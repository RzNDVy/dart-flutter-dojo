import { motion } from 'framer-motion';
import { BookOpen, Layers, HelpCircle, Users, Sparkles } from 'lucide-react';
import { useAppStore, PageType } from '@/stores/appStore';

const navItems: { id: PageType; icon: React.ReactNode; label: string; emoji: string }[] = [
  { id: 'learning', icon: <BookOpen className="w-5 h-5" />, label: 'Pembelajaran', emoji: '📚' },
  { id: 'flashcard', icon: <Layers className="w-5 h-5" />, label: 'Flashcard', emoji: '🗂️' },
  { id: 'quiz', icon: <HelpCircle className="w-5 h-5" />, label: 'Quiz', emoji: '📝' },
  { id: 'duo', icon: <Users className="w-5 h-5" />, label: 'Duo Mode', emoji: '✨' },
];

const AppSidebar = () => {
  const { currentPage, setCurrentPage, onlineUsers } = useAppStore();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col shadow-sm"
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-100">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-800">Flutter Mastery</h1>
            <p className="text-xs text-slate-500">Zero to Hero</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-primary/10 text-primary shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <span className="text-lg">{item.emoji}</span>
            <span className="font-medium">{item.label}</span>
            {currentPage === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="ml-auto w-2 h-2 rounded-full bg-primary"
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Online Status */}
      <div className="p-4 border-t border-slate-100">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl"
        >
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-mint animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-mint animate-ping opacity-75" />
          </div>
          <span className="text-sm text-slate-600">
            {onlineUsers} Online
          </span>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
