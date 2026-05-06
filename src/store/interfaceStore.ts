import { create } from 'zustand';

interface InterfaceState {
  isImmersive: boolean;
  setImmersive: (immersive: boolean) => void;
}

export const useInterfaceStore = create<InterfaceState>((set) => ({
  isImmersive: false,
  setImmersive: (immersive) => set({ isImmersive: immersive }),
}));
