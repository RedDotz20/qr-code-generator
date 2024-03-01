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
import { useImageUploadStore } from './store/useImageUpload';
import { useQrOptionsStore } from './store/useQrOptionStore';
import { useColorPicker } from './store/useQrColorPicker';
import { useQrValue } from './hooks/useQrValue';

import ImageFileUpload from './components/ImageFileUpload';
import QrOptions from './components/QrOptions';

export default function App() {
	const qrValue = useQrValue();
	const option = useQrOptionsStore();
	const image = useImageUploadStore();
	const color = useColorPicker();

	return (
		<Box
			as="main"
			minH="100vh"
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			p="2"
		>
			<Heading fontWeight="semibold">QR Code Generator</Heading>
			<Flex
				flexWrap="wrap"
				justifyContent="center"
			>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					p="4"
					gap="2"
				>
					<Heading
						as="h6"
						size="sm"
					>
						Preview
					</Heading>
					<QRCode
						value={qrValue.value as string}
						qrStyle={option.qrOptions.qrStyle}
						bgColor={color.bgColor}
						fgColor={color.fgColor}
						logoImage={image.currentImage ? image.currentImage : undefined}
						logoWidth={option.qrOptions.width}
						logoHeight={option.qrOptions.height}
						ecLevel={option.qrOptions.ecLevel}
						removeQrCodeBehindLogo={true}
						logoPadding={option.qrOptions.logoPadding}
						logoPaddingStyle={option.qrOptions.logoPaddingStyle}
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
							onChange={qrValue.handleQrChange}
						/>
					</InputGroup>
					<ImageFileUpload
						name="imageFile"
						acceptedFileTypes="image/*"
						isRequired={true}
						imageName={image.imageName}
						onImageChange={image.handleImageChange}
						currentImage={image.currentImage}
						removeImage={image.removeImage}
					>
						Choose Image
					</ImageFileUpload>
				</Box>
				<Box
					p="4"
					gap="2"
				>
					<Heading
						className="flex mb-4"
						as="h6"
						size="sm"
					>
						Customize
					</Heading>
					<QrOptions />
				</Box>
			</Flex>
		</Box>
	);
}
