import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { ChromePicker, ChromePickerProps } from 'react-color';

export interface QrChromePickerProps extends ChromePickerProps {
	id?: number;
	variant: 'bgColor' | 'fgColor' | 'eyeColor';
}

export default function QrChromePicker({
	variant,
	...rest
}: QrChromePickerProps) {
	const [showPicker, setShowPicker] = useState(false);
	const togglePicker = () => setShowPicker((prev) => !prev);

	const variantName = {
		bgColor: 'BG Color',
		fgColor: 'FG Color',
		eyeColor: 'Eye Color',
	};

	return (
		<div className="relative flex flex-col gap-2 justify-center items-center">
			<Button
				colorScheme="blue"
				size="sm"
				onClick={togglePicker}
			>
				{variantName[variant]}
			</Button>

			{showPicker && (
				<ChromePicker
					className="absolute top-8 z-40"
					{...rest}
				/>
			)}
		</div>
	);
}
