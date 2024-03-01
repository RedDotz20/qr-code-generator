import { create } from 'zustand';

interface ColorPickerState {
	bgColor: string;
	fgColor: string;
	eyeColor: string;
}

interface ColorPickerStore extends ColorPickerState {
	setColor: (newState: Partial<ColorPickerState>) => void;
	changeBgColor: (newColor: string) => void;
	changeFgColor: (newColor: string) => void;
	changeEyeColor: (newColor: string) => void;
}

export const useColorPicker = create<ColorPickerStore>((set) => ({
	bgColor: '#CECECE',
	fgColor: '#080808',
	eyeColor: '#000000',
	setColor: (newState) => set((state) => ({ ...state, ...newState })),
	changeBgColor: (newColor) =>
		set((state) => ({ ...state, bgColor: newColor })),
	changeFgColor: (newColor) =>
		set((state) => ({ ...state, fgColor: newColor })),
	changeEyeColor: (newColor) =>
		set((state) => ({ ...state, eyeColor: newColor })),
}));
