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
import { useQrOptionsStore } from './store/useQrOptionStore';
import { useColorPicker } from './store/useQrColorPicker';

import ImageFileUpload from './components/ImageFileUpload';
import QrOptions from './components/QrOptions';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

export default function App() {
	const [qrvalue, setqrvalue] = useState('');
	const { debouncedValue } = useDebounce(qrvalue);

	const color = useColorPicker();
	const option = useQrOptionsStore();
	const qrImage = useImageUpload();

	const handleQrChange = (event: inputEvent) => {
		setqrvalue(event.target.value);
	};

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
				<div className="flex flex-col items-center p-4 gap-2">
					<Heading
						as="h6"
						size="sm"
					>
						Preview
					</Heading>
					<QRCode
						value={debouncedValue}
						qrStyle="dots"
						bgColor={color.bgColor}
						fgColor={color.fgColor}
						logoImage={qrImage.currentImage ? qrImage.currentImage : undefined}
						logoWidth={option.qrOptions.width}
						logoHeight={option.qrOptions.height}
						ecLevel="M"
						removeQrCodeBehindLogo={true}
						logoPadding={option.qrOptions.logoPadding}
						logoPaddingStyle="circle"
						eyeRadius={option.qrOptions.eyeRadius}
						eyeColor={color.eyeColor}
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
				</div>
				<div className="p-4 gap-2">
					<Heading
						className="flex mb-4"
						as="h6"
						size="sm"
					>
						Customize
					</Heading>

					<QrOptions />
				</div>
			</Flex>
		</Box>
	);
}
