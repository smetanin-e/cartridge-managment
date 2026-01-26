import { create } from 'zustand';

interface SelectedCartridgesState {
  selectedCartridges: number[];
  setSelectedCartridges: (items: number[]) => void;
}
export const useSelectetCartridgeStore = create<SelectedCartridgesState>()((set) => ({
  selectedCartridges: [],
  setSelectedCartridges: (selectedCartridges) => set({ selectedCartridges }),
}));
