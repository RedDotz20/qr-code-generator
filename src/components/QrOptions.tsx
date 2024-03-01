import QrSlider from './QrSlider';

export default function QrOptions() {
	return (
		<div>
			<QrSlider
				option="width"
				min={20}
				max={100}
			>
				Width
			</QrSlider>
			<QrSlider
				option="height"
				min={20}
				max={100}
			>
				Height
			</QrSlider>
			<QrSlider
				option="logoPadding"
				min={0}
				max={1}
				step={0.01}
			>
				Logo Padding
			</QrSlider>
		</div>
	);
}
