import { create } from 'zustand';

interface ColorPickerState {
  bgColor: string;
  fgColor: string;
  eyeColor: string;
}

interface ColorPickerStore extends ColorPickerState {
  setColor: (_newState: Partial<ColorPickerState>) => void;
  changeBgColor: (_newColor: string) => void;
  changeFgColor: (_newColor: string) => void;
  changeEyeColor: (_newColor: string) => void;
}

export const useColorPicker = create<ColorPickerStore>((set) => ({
  bgColor: '#FFFFFF',
  fgColor: '#080808',
  eyeColor: '#000000',
  setColor: (newState) => set((state) => ({ ...state, ...newState })),
  changeBgColor: (newColor) => set((state) => ({ ...state, bgColor: newColor })),
  changeFgColor: (newColor) => set((state) => ({ ...state, fgColor: newColor })),
  changeEyeColor: (newColor) => set((state) => ({ ...state, eyeColor: newColor })),
}));
