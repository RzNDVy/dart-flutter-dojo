import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAppStore } from '@/stores/appStore';

interface CursorPosition {
  x: number;
  y: number;
  color: string;
  userId: string;
  page: string;
}

// Generate random bright colors for cursors
const generateRandomColor = () => {
  const colors = [
    '#EF4444', // Red
    '#F97316', // Orange
    '#EAB308', // Yellow
    '#22C55E', // Green
    '#14B8A6', // Teal
    '#06B6D4', // Cyan
    '#3B82F6', // Blue
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#F43F5E', // Rose
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Generate unique user ID
const generateUserId = () => {
  return `user_${Math.random().toString(36).substring(2, 9)}`;
};

const GlobalCursorTracker = () => {
  const { currentPage, setOnlineUsers } = useAppStore();
  const [otherCursors, setOtherCursors] = useState<Record<string, CursorPosition>>({});
  const [myColor] = useState(() => generateRandomColor());
  const [myUserId] = useState(() => generateUserId());
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const lastBroadcast = useRef(0);

  // Throttled mouse position broadcast
  const broadcastPosition = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastBroadcast.current < 50) return; // Throttle to 20fps
    lastBroadcast.current = now;

    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'cursor',
        payload: {
          x,
          y,
          color: myColor,
          userId: myUserId,
          page: currentPage,
        },
      });
    }
  }, [myColor, myUserId, currentPage]);

  useEffect(() => {
    // Create channel for cursor tracking
    const channel = supabase.channel('global-cursors', {
      config: {
        presence: {
          key: myUserId,
        },
      },
    });

    channel
      .on('broadcast', { event: 'cursor' }, ({ payload }) => {
        if (payload.userId !== myUserId) {
          setOtherCursors((prev) => ({
            ...prev,
            [payload.userId]: payload as CursorPosition,
          }));
        }
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        setOnlineUsers(count);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setOtherCursors((prev) => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            color: myColor,
            joinedAt: new Date().toISOString(),
          });
        }
      });

    channelRef.current = channel;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      broadcastPosition(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [myUserId, myColor, setOnlineUsers, broadcastPosition]);

  // Broadcast page changes
  useEffect(() => {
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'cursor',
        payload: {
          x: 0,
          y: 0,
          color: myColor,
          userId: myUserId,
          page: currentPage,
        },
      });
    }
  }, [currentPage, myColor, myUserId]);

  return (
    <>
      {/* Other users' cursors */}
      <AnimatePresence>
        {Object.entries(otherCursors).map(([oderId, cursor]) => (
          <motion.div
            key={oderId}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1,
              opacity: 1,
              x: cursor.x,
              y: cursor.y,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 400,
              mass: 0.5,
            }}
            className="fixed pointer-events-none z-[9999]"
            style={{ left: 0, top: 0 }}
          >
            {/* Main cursor dot */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Outer glow */}
              <div
                className="absolute -inset-2 rounded-full blur-md opacity-40"
                style={{ backgroundColor: cursor.color }}
              />
              {/* Inner dot */}
              <div
                className="w-4 h-4 rounded-full shadow-lg border-2 border-white"
                style={{ backgroundColor: cursor.color }}
              />
              {/* Page indicator */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-5 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium text-white whitespace-nowrap shadow-md"
                style={{ backgroundColor: cursor.color }}
              >
                {cursor.page === 'learning' && '📚 Pembelajaran'}
                {cursor.page === 'flashcard' && '🗂️ Flashcard'}
                {cursor.page === 'quiz' && '📝 Quiz'}
              </motion.div>
            </motion.div>

            {/* Trail effect */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: cursor.color,
                  width: 12 - i * 3,
                  height: 12 - i * 3,
                  left: -(i * 4),
                  top: -(i * 4),
                  opacity: 0.3 - i * 0.1,
                }}
                animate={{
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* My cursor color indicator (bottom right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-[9998] flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-lg border border-slate-100"
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: myColor }}
        />
        <span className="text-xs text-slate-600 font-medium">Your cursor</span>
      </motion.div>
    </>
  );
};

export default GlobalCursorTracker;
