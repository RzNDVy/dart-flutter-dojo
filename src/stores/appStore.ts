import { create } from 'zustand';

export type PageType = 'learning' | 'flashcard' | 'quiz';

interface AppState {
  currentPage: PageType;
  onlineUsers: number;
  setCurrentPage: (page: PageType) => void;
  setOnlineUsers: (count: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'learning',
  onlineUsers: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  setOnlineUsers: (count) => set({ onlineUsers: count }),
}));
