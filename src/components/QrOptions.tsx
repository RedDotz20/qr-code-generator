import QrSlider from './QrSlider';
import { sliderQrOptions } from '../constant/qrOptions';
import QrChromePicker from './QrChromePicker';

export default function QrOptions() {
	return (
		<>
			<QrChromePicker />
			{sliderQrOptions.map((slide) => {
				return (
					<QrSlider
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
