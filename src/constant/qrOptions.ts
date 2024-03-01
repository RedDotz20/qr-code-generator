import { QrSliderProps } from '../components/QrSlider';

export const sliderQrOptions: QrSliderProps[] = [
	{ children: 'QR Eye Radius', option: 'eyeRadius', min: 0, max: 25 },
	{ children: 'Logo Width', option: 'width', min: 20, max: 100 },
	{ children: 'Logo height', option: 'height', min: 20, max: 100 },
	{
		children: 'Logo Padding',
		option: 'logoPadding',
		min: 0,
		max: 1,
		step: 0.1,
	},
];
