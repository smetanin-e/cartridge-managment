import { create } from 'zustand';

interface ModelsState {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}
export const useModelsStore = create<ModelsState>()((set) => ({
  openModal: false,
  setOpenModal: (openModal) => set({ openModal }),
}));
