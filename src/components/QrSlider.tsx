import {
	Flex,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Tooltip,
} from '@chakra-ui/react';
import { NumericQrOptions, useQrOptionsStore } from '../store/useQrOptionStore';
import { useState } from 'react';

export interface QrSliderProps {
	option: NumericQrOptions;
	min: number;
	max: number;
	step?: number;
	children: React.ReactNode;
}

export default function QrSlider({
	option,
	min,
	max,
	step = 1,
	children,
}: QrSliderProps) {
	const [showTooltip, setShowTooltip] = useState(false);
	const { qrOptions, setQrOption } = useQrOptionsStore();
	const sliderValue = qrOptions[option];

	const labelStyles = { mt: '2', ml: '-2.5', fontSize: 'sm' };

	return (
		<Flex
			flexDirection="column"
			alignItems="start"
			p={4}
		>
			{children}
			<Slider
				aria-label={`${option} slider`}
				step={step}
				min={min}
				max={max}
				defaultValue={sliderValue}
				onChange={(val) => setQrOption(option, val)}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				<SliderMark
					value={min}
					{...labelStyles}
				>
					{min}
				</SliderMark>
				<SliderMark
					value={max}
					{...labelStyles}
				>
					{max}
				</SliderMark>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<Tooltip
					hasArrow
					bg="blue.500"
					color="white"
					placement="top"
					isOpen={showTooltip}
					label={`${sliderValue}`}
				>
					<SliderThumb />
				</Tooltip>
			</Slider>
		</Flex>
	);
}
