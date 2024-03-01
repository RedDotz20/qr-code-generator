import { useState, ChangeEvent } from 'react';
import { useDebounce } from './useDebounceValue';

type inputEvent = ChangeEvent<HTMLInputElement>;

export const useQrValue = () => {
	const [qrValue, setQrValue] = useState('');
	const [value] = useDebounce(qrValue);

	const handleQrChange = (event: inputEvent) => {
		setQrValue(event.target.value);
	};

	return { value, handleQrChange };
};
