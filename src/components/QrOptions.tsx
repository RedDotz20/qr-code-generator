import { useImageUploadStore } from '../store/useImageUpload';
import QrSlider, { QrSliderProps } from './QrSlider';
import QrChromePicker from './QrChromePicker';
import QrSelect from './QrSelect';
import { Flex } from '@chakra-ui/react';

const sliderQrOptions: QrSliderProps[] = [
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

type QrOptionsKeys = (typeof sliderQrOptions)[number]['option'];

export default function QrOptions() {
	const image = useImageUploadStore();

	const isImagePresent = (component: QrOptionsKeys) =>
		component === 'eyeRadius' || image.currentImage ? false : true;

	return (
		<>
			<QrChromePicker />

			<Flex gap={2}>
				<QrSelect
					option="qrStyle"
					name="QR Style"
				/>
				<QrSelect
					option="ecLevel"
					name="EC Level"
				/>
				<QrSelect
					option="logoPaddingStyle"
					name="Padding Style"
				/>
			</Flex>

			{sliderQrOptions.map((slide) => {
				return (
					<QrSlider
						isDisabled={isImagePresent(slide.option)}
						key={slide.option}
						option={slide.option}
						min={slide.min}
						max={slide.max}
						step={slide.step}
					>
						{slide.children}
					</QrSlider>
				);
			})}
		</>
	);
}
