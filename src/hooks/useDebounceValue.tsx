import { useEffect, useState } from 'react';

export const useDebounce = (qrvalue: string) => {
	const [debouncedValue, setDebouncedValue] = useState('');

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			setDebouncedValue(qrvalue);
		}, 400);

		return () => clearTimeout(debounceTimeout);
	}, [qrvalue]);

	return { debouncedValue };
};
