import { create } from 'zustand';

export interface QrOptionsType {
	width: number;
	height: number;
	ecLevel: 'L' | 'M' | 'Q' | 'H' | undefined;
	eyeRadius: number;
	logoPadding: number;
	logoPaddingStyle: 'circle' | 'square' | undefined;
}

export type NumericQrOptions = keyof Pick<
	QrOptionsType,
	'width' | 'height' | 'eyeRadius' | 'logoPadding'
>;

export type StringQrOptions = keyof Pick<
	QrOptionsType,
	'ecLevel' | 'logoPaddingStyle'
>;

export interface QrOptionsStore {
	qrOptions: QrOptionsType;
	setQrOption: (
		key: keyof QrOptionsType,
		value: QrOptionsType[keyof QrOptionsType]
	) => void;
}

export const useQrOptionsStore = create<QrOptionsStore>((set) => ({
	qrOptions: {
		width: 30,
		height: 30,
		ecLevel: 'M',
		eyeRadius: 0,
		logoPadding: 0.8,
		logoPaddingStyle: 'circle',
	},
	setQrOption: (key, value) => {
		set((state) => {
			return { qrOptions: { ...state.qrOptions, [key]: value } };
		});
	},
}));
