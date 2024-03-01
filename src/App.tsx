import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { FaQrcode } from 'react-icons/fa6';
import {
	Box,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { useImageUpload } from './hooks/useImageUpload';
import { useDebounce } from './hooks/useDebounceValue';
import { useColorPicker } from './hooks/useColorPicker';
import { useQrOptionsStore } from './store/useQrOptionStore';

import QrChromePicker, {
	QrChromePickerProps,
} from './components/QrChromePicker';
import ImageFileUpload from './components/ImageFileUpload';
import QrOptions from './components/QrOptions';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

export default function App() {
	const [qrvalue, setqrvalue] = useState('');
	const { debouncedValue } = useDebounce(qrvalue);
	const { colorState, ChangeBgColor, ChangeFgColor, ChangeEyeColor } =
		useColorPicker();
	const qrImage = useImageUpload();

	const { qrOptions } = useQrOptionsStore();

	console.log(qrOptions.width);

	const handleQrChange = (event: inputEvent) => {
		setqrvalue(event.target.value);
	};

	const colorOptions: QrChromePickerProps[] = [
		{
			id: 1,
			variant: 'bgColor',
			color: colorState.bgColor,
			onChange: (color: { hex: string }) => ChangeBgColor(color.hex),
		},
		{
			id: 2,
			variant: 'fgColor',
			color: colorState.fgColor,
			onChange: (color: { hex: string }) => ChangeFgColor(color.hex),
		},
		{
			id: 3,
			variant: 'eyeColor',
			color: colorState.eyeColor,
			onChange: (color: { hex: string }) => ChangeEyeColor(color.hex),
		},
	];

	return (
		<Box
			as="main"
			className="min-h-screen items-center justify-center p-2"
		>
			<Heading className="font-semibold">QR Code Generator</Heading>
			<Flex
				flexWrap="wrap"
				justifyContent="center"
			>
				<div className="flex flex-col items-center justify-center p-4 gap-2">
					<Heading
						as="h6"
						size="sm"
					>
						Preview
					</Heading>
					<QRCode
						value={debouncedValue}
						qrStyle="dots"
						bgColor={colorState.bgColor}
						fgColor={colorState.fgColor}
						logoImage={qrImage.currentImage ? qrImage.currentImage : undefined}
						logoWidth={30}
						logoHeight={30}
						ecLevel="M"
						removeQrCodeBehindLogo={true}
						logoPadding={0.8}
						logoPaddingStyle="circle"
						eyeRadius={1}
						eyeColor="#000000"
					/>

					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<FaQrcode color="gray.300" />
						</InputLeftElement>
						<Input
							placeholder="Enter QR Content..."
							variant="filled"
							type="text"
							onChange={handleQrChange}
						/>
					</InputGroup>
				</div>
				<div className="p-4 gap-2">
					<Heading
						className="flex mb-"
						as="h6"
						size="sm"
					>
						Customize
					</Heading>
					<div className="flex gap-2 px-2 py-1">
						{colorOptions.map((qrColorPicker) => {
							return (
								<QrChromePicker
									key={qrColorPicker.id}
									variant={qrColorPicker.variant}
									color={qrColorPicker.color}
									onChange={qrColorPicker.onChange}
								/>
							);
						})}
					</div>

					<ImageFileUpload
						name="imageFile"
						acceptedFileTypes="image/*"
						isRequired={true}
						imageName={qrImage.imageName}
						onImageChange={qrImage.handleImageChange}
						currentImage={qrImage.currentImage}
						removeImage={qrImage.removeImage}
					>
						Choose Image
					</ImageFileUpload>
					<QrOptions />
				</div>
			</Flex>
		</Box>
	);
}
