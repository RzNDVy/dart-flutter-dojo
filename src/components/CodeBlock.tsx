import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = 'dart' }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCopy}
          className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-mint" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400" />
          )}
        </motion.button>
      </div>
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs text-slate-500 font-mono uppercase">{language}</span>
      </div>
      <pre className="code-block overflow-x-auto pt-10">
        <code className="text-sm font-mono text-cyan-300 leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
