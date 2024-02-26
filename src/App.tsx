import { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

import { useImageUpload } from './hooks/useImageUpload';
import { useDebounce } from './hooks/useDebounceValue';
import { useColorPicker } from './hooks/useColorPicker';

import QrChromePicker from './components/QrChromePicker';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

export default function App() {
	const [qrvalue, setqrvalue] = useState('');
	const { debouncedValue } = useDebounce(qrvalue);
	const { colorState, ChangeBgColor, ChangeFgColor, ChangeEyeColor } =
		useColorPicker();
	const qrImage = useImageUpload();

	const handleChange = (event: inputEvent) => {
		setqrvalue(event.target.value);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-2">
			<h1 className="font-semibold">QR Code</h1>

			<input
				type="text"
				className="mb-4 border-2 border-black"
				onChange={handleChange}
			/>

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
				eyeRadius={4}
				eyeColor="#000000"
			/>

			<div className="flex gap-2 border-2 border-black px-2 py-1">
				<QrChromePicker
					variant="bgColor"
					color={colorState.bgColor}
					onChange={(color: { hex: string }) => ChangeBgColor(color.hex)}
				/>

				<QrChromePicker
					variant="fgColor"
					color={colorState.fgColor}
					onChange={(color: { hex: string }) => ChangeFgColor(color.hex)}
				/>

				<QrChromePicker
					variant="eyeColor"
					color={colorState.eyeColor}
					onChange={(color: { hex: string }) => ChangeEyeColor(color.hex)}
				/>
			</div>
			<input
				type="file"
				onChange={qrImage.handleImageChange}
			/>

			<select
				name=""
				id=""
			>
				<option value="volvo">Volvo</option>
				<option value="saab">Saab</option>
				<option value="mercedes">Mercedes</option>
				<option value="audi">Audi</option>
			</select>

			<div className="flex gap-2 m-2">
				<button onClick={qrImage.removeImage}>Remove Image</button>
				<button>test</button>
			</div>
		</div>
	);
}
