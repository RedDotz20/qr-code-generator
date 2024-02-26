import React, { useState } from 'react';
import { ChromePicker, ChromePickerProps } from 'react-color';

interface QrChromePickerProps extends ChromePickerProps {
	variant: 'bgColor' | 'fgColor' | 'eyeColor';
}

export default function QrChromePicker({
	variant,
	...rest
}: QrChromePickerProps) {
	const [showPicker, setShowPicker] = useState(false);
	const togglePicker = () => setShowPicker((prev) => !prev);

	const variantName = {
		bgColor: 'Background Color',
		fgColor: 'Foreground Color',
		eyeColor: 'Eye Color',
	};

	return (
		<div className="relative flex flex-col gap-2 justify-center items-center">
			<button onClick={togglePicker}>{variantName[variant]}</button>
			{showPicker && (
				<div className="absolute top-8">
					<ChromePicker {...rest} />
				</div>
			)}
		</div>
	);
}
