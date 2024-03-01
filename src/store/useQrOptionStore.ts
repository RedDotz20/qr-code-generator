import { create } from 'zustand';

export interface QrOptionsType {
	width: number;
	height: number;
	eyeRadius: number;
	logoPadding: number;
	qrStyle: 'squares' | 'dots';
	ecLevel: 'L' | 'M' | 'Q' | 'H' | undefined;
	logoPaddingStyle: 'circle' | 'square' | undefined;
}

export type NumericQrOptions = keyof Pick<
	QrOptionsType,
	'width' | 'height' | 'eyeRadius' | 'logoPadding'
>;

export type StringQrOptions = keyof Pick<
	QrOptionsType,
	'qrStyle' | 'ecLevel' | 'logoPaddingStyle'
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
		eyeRadius: 2,
		logoPadding: 0.8,
		qrStyle: 'squares',
		ecLevel: 'M',
		logoPaddingStyle: 'circle',
	},
	setQrOption: (key, value) => {
		set((state) => {
			return { qrOptions: { ...state.qrOptions, [key]: value } };
		});
	},
}));
