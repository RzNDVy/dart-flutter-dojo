import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Copy, LogOut, MousePointer2 } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { supabase } from '@/integrations/supabase/client';

interface CursorPosition {
  x: number;
  y: number;
  playerNumber: 1 | 2;
  playerName: string;
}

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const DuoModePage = () => {
  const { roomId, setRoomId, playerNumber, setPlayerNumber, isInRoom, setIsInRoom, setOnlineUsers } = useAppStore();
  const [inputRoomId, setInputRoomId] = useState('');
  const [otherCursor, setOtherCursor] = useState<CursorPosition | null>(null);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createRoom = () => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
    setPlayerNumber(1);
    setIsInRoom(true);
    joinChannel(newRoomId, 1);
  };

  const joinRoom = () => {
    if (inputRoomId.trim()) {
      setRoomId(inputRoomId.toUpperCase());
      setPlayerNumber(2);
      setIsInRoom(true);
      joinChannel(inputRoomId.toUpperCase(), 2);
    }
  };

  const leaveRoom = () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }
    setRoomId(null);
    setPlayerNumber(null);
    setIsInRoom(false);
    setOtherCursor(null);
    setTrail([]);
    setOnlineUsers(1);
  };

  const joinChannel = (roomIdToJoin: string, playerNum: 1 | 2) => {
    const channel = supabase.channel(`duo-room-${roomIdToJoin}`, {
      config: {
        presence: { key: `player-${playerNum}` },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const playerCount = Object.keys(state).length;
        setOnlineUsers(playerCount);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('Player joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        console.log('Player left:', key);
        setOtherCursor(null);
        setTrail([]);
      })
      .on('broadcast', { event: 'cursor-move' }, ({ payload }) => {
        if (payload.playerNumber !== playerNum) {
          setOtherCursor(payload);
          
          // Add trail point
          setTrail((prev) => {
            const newTrail = [...prev, { x: payload.x, y: payload.y, id: trailIdRef.current++ }];
            return newTrail.slice(-15); // Keep last 15 points
          });
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            playerNumber: playerNum,
            playerName: `Player ${playerNum}`,
            online_at: new Date().toISOString(),
          });
        }
      });

    channelRef.current = channel;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isInRoom || !channelRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    channelRef.current.send({
      type: 'broadcast',
      event: 'cursor-move',
      payload: {
        x,
        y,
        playerNumber,
        playerName: `Player ${playerNumber}`,
      },
    });
  };

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  // Cleanup old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(-10));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isInRoom) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            ✨ Duo Mode
          </h1>
          <p className="text-slate-500">
            Belajar bareng temanmu secara real-time!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Room */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="theory-card"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Buat Room Baru
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Buat room dan bagikan kode ke temanmu
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createRoom}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium shadow-lg"
            >
              Buat Room
            </motion.button>
          </motion.div>

          {/* Join Room */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="theory-card"
          >
            <div className="w-12 h-12 rounded-xl bg-rose/10 flex items-center justify-center mb-4">
              <MousePointer2 className="w-6 h-6 text-rose" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Gabung Room
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Masukkan kode room dari temanmu
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputRoomId}
                onChange={(e) => setInputRoomId(e.target.value.toUpperCase())}
                placeholder="Kode Room"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none uppercase font-mono"
                maxLength={6}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={joinRoom}
                disabled={!inputRoomId.trim()}
                className="px-6 py-3 rounded-xl bg-rose text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Room Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-xl font-mono font-bold ${
            playerNumber === 1 ? 'bg-primary/10 text-primary' : 'bg-rose/10 text-rose'
          }`}>
            Player {playerNumber}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
            <span className="text-sm text-slate-500">Room:</span>
            <span className="font-mono font-bold text-slate-800">{roomId}</span>
            <button onClick={copyRoomId} className="ml-2 p-1 hover:bg-slate-200 rounded">
              <Copy className="w-4 h-4 text-slate-500" />
            </button>
            {copied && <span className="text-xs text-mint">Copied!</span>}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={leaveRoom}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </motion.button>
      </motion.div>

      {/* Interactive Canvas */}
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onMouseMove={handleMouseMove}
        className="relative w-full h-[500px] rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-200 overflow-hidden cursor-none"
      >
        {/* Instructions */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 pointer-events-none">
          <div className="text-center">
            <MousePointer2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Gerakkan cursor-mu!</p>
            <p className="text-sm">Temanmu akan melihat posisimu secara real-time</p>
          </div>
        </div>

        {/* Trail Effect */}
        <AnimatePresence>
          {trail.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute w-4 h-4 rounded-full pointer-events-none ${
                otherCursor?.playerNumber === 1 ? 'bg-primary/30' : 'bg-rose/30'
              }`}
              style={{
                left: point.x - 8,
                top: point.y - 8,
                filter: 'blur(2px)',
              }}
            />
          ))}
        </AnimatePresence>

        {/* Other Player's Cursor */}
        <AnimatePresence>
          {otherCursor && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: otherCursor.x,
                y: otherCursor.y,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute pointer-events-none"
              style={{ left: -10, top: -10 }}
            >
              <div className="relative">
                <MousePointer2 
                  className={`w-6 h-6 ${
                    otherCursor.playerNumber === 1 ? 'text-primary' : 'text-rose'
                  }`}
                  style={{ transform: 'rotate(-20deg)' }}
                />
                <div className={`absolute left-6 top-4 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                  otherCursor.playerNumber === 1 
                    ? 'bg-primary text-white' 
                    : 'bg-rose text-white'
                }`}>
                  {otherCursor.playerName}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DuoModePage;
