import { useState } from 'react';

export interface ColorPickerState {
	bgColor?: string | undefined;
	fgColor?: string | undefined;
	eyeColor?: string | undefined;
}

export interface ColorPickerActions {
	setColor: (colorState: ColorPickerState) => void;
}

export const useColorPicker = () => {
	const [colorState, setColorPicker] = useState<ColorPickerState>({
		bgColor: '#CECECE',
		fgColor: '#080808',
		eyeColor: '#000000',
	});

	const setColor = (newState: Partial<ColorPickerState>) => {
		setColorPicker((prevState) => ({ ...prevState, ...newState }));
	};

	const ChangeBgColor = (newColor: string) => {
		setColor({ bgColor: newColor });
	};

	const ChangeFgColor = (newColor: string) => {
		setColor({ fgColor: newColor });
	};

	const ChangeEyeColor = (newColor: string) => {
		setColor({ eyeColor: newColor });
	};

	return { colorState, ChangeBgColor, ChangeFgColor, ChangeEyeColor };
};
