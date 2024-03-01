import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { ChromePicker, ChromePickerProps } from 'react-color';
import { useColorPicker } from '../store/useQrColorPicker';

export interface QrChromePickerProps extends ChromePickerProps {
	id?: number;
	variantName?: 'BG Color' | 'FG Color' | 'Eye Color';
	variant?: 'bgColor' | 'fgColor' | 'eyeColor';
}

type currentPickerType = QrChromePickerProps['variant'] | null;

export default function QrChromePicker({ variant }: QrChromePickerProps) {
	const [showPicker, setShowPicker] = useState(false);
	const [currentPicker, setCurrentPicker] = useState<currentPickerType>(null);
	const colorPicker = useColorPicker();

	const colorOptions: QrChromePickerProps[] = [
		{
			id: 1,
			variant: 'bgColor',
			variantName: 'BG Color',
			color: colorPicker.bgColor,
			onChange: (color: { hex: string }) =>
				colorPicker.changeBgColor(color.hex),
		},
		{
			id: 2,
			variant: 'fgColor',
			variantName: 'FG Color',
			color: colorPicker.fgColor,
			onChange: (color: { hex: string }) =>
				colorPicker.changeFgColor(color.hex),
		},
		{
			id: 3,
			variant: 'eyeColor',
			variantName: 'Eye Color',
			color: colorPicker.eyeColor,
			onChange: (color: { hex: string }) =>
				colorPicker.changeEyeColor(color.hex),
		},
	];

	const togglePicker = (content: currentPickerType) => {
		if (!currentPicker && !showPicker) {
			setCurrentPicker(content);
			setShowPicker(true);
		} else if (currentPicker === content && showPicker) {
			setCurrentPicker(null);
			setShowPicker(false);
		} else {
			setCurrentPicker(content);
		}
	};

	console.log(showPicker, currentPicker);

	return (
		<div className="flex gap-2 justify-center items-center">
			{colorOptions.map((item) => {
				const isActive = currentPicker === item.variant && showPicker;

				return (
					<div
						key={item.id}
						className="relative"
					>
						<Button
							variant={isActive ? 'outline' : 'solid'}
							border={isActive ? '1px' : 'hidden'}
							borderColor={isActive ? 'blue.500' : undefined}
							colorScheme="blue"
							size="sm"
							onClick={() => {
								togglePicker(item.variant);
							}}
						>
							{item.variantName}
						</Button>

						{showPicker && currentPicker === item.variant && (
							<ChromePicker
								className="absolute z-[999] top-10 right-0"
								color={item.color}
								onChange={item.onChange}
							/>
						)}
					</div>
				);
			})}
			{/* <Button
				colorScheme="blue"
				size="sm"
				onClick={() => {
					togglePicker(variant);
					console.log(currentPicker, showPicker);
				}}
			>
				{variantName[variant]}
			</Button>

			{showPicker && currentPicker === variant && (
				<ChromePicker
					className="absolute top-8 z-40"
					{...rest}
				/>
			)} */}
		</div>
	);
}
