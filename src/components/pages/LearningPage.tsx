import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, BookOpen } from 'lucide-react';
import { modules, ContentBlock } from '@/data/curriculum';
import CodeBlock from '@/components/CodeBlock';

const LearningPage = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>('dart-foundation');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const toggleComplete = (topicId: string) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
  };

  const renderContent = (content: ContentBlock) => {
    switch (content.type) {
      case 'text':
        return <p className="text-slate-600 leading-relaxed">{content.content}</p>;
      case 'highlight':
        return (
          <div className="highlight-box">
            <span className="font-medium">{content.content}</span>
          </div>
        );
      case 'code':
        return <CodeBlock code={content.content} language={content.language} />;
      case 'list':
        return (
          <ul className="space-y-2 ml-4">
            {content.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-600">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          📚 Pembelajaran
        </h1>
        <p className="text-slate-500">
          Kurikulum lengkap dari dasar hingga mahir
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="theory-card mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-600">Progress Keseluruhan</span>
          <span className="text-sm text-primary font-semibold">
            {completedTopics.size} / {modules.reduce((acc, m) => acc + m.topics.length, 0)} Topik
          </span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-mint rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${(completedTopics.size / modules.reduce((acc, m) => acc + m.topics.length, 0)) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Module Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

        {modules.map((module, moduleIndex) => (
          <motion.div
            key={module.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: moduleIndex * 0.1 }}
            className="relative pl-16 pb-8"
          >
            {/* Timeline dot */}
            <div className="absolute left-4 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-md" />

            {/* Module Card */}
            <div className="theory-card">
              <button
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{module.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-800">{module.title}</h3>
                    <p className="text-sm text-slate-500">{module.description}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedModule === module.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedModule === module.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
                      {module.topics.map((topic) => (
                        <div key={topic.id} className="bg-slate-50 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                            className="w-full flex items-center justify-between p-4"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleComplete(topic.id);
                                }}
                                className="hover:scale-110 transition-transform"
                              >
                                {completedTopics.has(topic.id) ? (
                                  <CheckCircle2 className="w-5 h-5 text-mint" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-300" />
                                )}
                              </button>
                              <span className={`font-medium ${completedTopics.has(topic.id) ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                {topic.title}
                              </span>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedTopic === topic.id ? 90 : 0 }}
                            >
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedTopic === topic.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 space-y-4"
                              >
                                {topic.content.map((block, i) => (
                                  <div key={i}>{renderContent(block)}</div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
