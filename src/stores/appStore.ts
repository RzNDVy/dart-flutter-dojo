import { create } from 'zustand';

export type PageType = 'learning' | 'flashcard' | 'quiz' | 'duo';

interface AppState {
  currentPage: PageType;
  onlineUsers: number;
  roomId: string | null;
  playerName: string | null;
  playerNumber: 1 | 2 | null;
  isInRoom: boolean;
  setCurrentPage: (page: PageType) => void;
  setOnlineUsers: (count: number) => void;
  setRoomId: (id: string | null) => void;
  setPlayerName: (name: string | null) => void;
  setPlayerNumber: (num: 1 | 2 | null) => void;
  setIsInRoom: (inRoom: boolean) => void;
  resetRoom: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'learning',
  onlineUsers: 1,
  roomId: null,
  playerName: null,
  playerNumber: null,
  isInRoom: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  setOnlineUsers: (count) => set({ onlineUsers: count }),
  setRoomId: (id) => set({ roomId: id }),
  setPlayerName: (name) => set({ playerName: name }),
  setPlayerNumber: (num) => set({ playerNumber: num }),
  setIsInRoom: (inRoom) => set({ isInRoom: inRoom }),
  resetRoom: () => set({ roomId: null, playerName: null, playerNumber: null, isInRoom: false }),
}));
