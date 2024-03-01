import { useEffect, useState } from 'react';

export const useDebounce = (qrvalue: string | number) => {
	const [debouncedValue, setDebouncedValue] = useState<string | number>('');

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			setDebouncedValue(qrvalue);
		}, 400);

		return () => clearTimeout(debounceTimeout);
	}, [qrvalue]);

	return [debouncedValue];
};
