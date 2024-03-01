import { useState, ChangeEvent } from 'react';
import { Select, VStack } from '@chakra-ui/react';
import {
	useQrOptionsStore,
	QrOptionsType,
	StringQrOptions,
} from '../store/useQrOptionStore';

export interface QrSelectProps {
	option: StringQrOptions;
}

interface qrSelectionTypes {
	qrStyle: QrOptionsType['qrStyle'][];
	ecLevel: QrOptionsType['ecLevel'][];
	logoPaddingStyle: QrOptionsType['logoPaddingStyle'][];
}

export default function QrSelect({ option }: QrSelectProps) {
	const { qrOptions, setQrOption } = useQrOptionsStore();

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value as QrOptionsType[keyof QrOptionsType];
		setQrOption(option, selectedValue);
	};

	const qrSelection: qrSelectionTypes = {
		qrStyle: ['squares', 'dots'],
		ecLevel: ['M', 'L', 'Q', 'H'],
		logoPaddingStyle: ['circle', 'square'],
	};

	const selectedOption = qrSelection[option];

	return (
		<VStack spacing={4}>
			<Select
				value={qrOptions[option]}
				onChange={handleSelectChange}
			>
				{selectedOption.map((option, index) => {
					return (
						<option
							key={index}
							value={option}
						>
							{option}
						</option>
					);
				})}
			</Select>
		</VStack>
	);
}
