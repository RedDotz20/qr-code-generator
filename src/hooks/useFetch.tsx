import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface UseFetchProps<T> {
	url: string;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	initialData?: T | null;
}

interface UseFetchState<T> {
	data: T | null;
	error: AxiosError<T> | null;
	isLoading: boolean;
}

export const useFetch = <T,>({
	url,
	method = 'GET',
	initialData = null,
}: UseFetchProps<T>): UseFetchState<T> => {
	const [data, setData] = useState<T | null>(initialData);
	const [error, setError] = useState<AxiosError<T> | null>(
		null as AxiosError<T> | null
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const response: AxiosResponse<T> = await axios({ method, url });
				setData(response.data);
			} catch (error) {
				setError(error as AxiosError<T>);
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [url, method]);

	return { data, error, isLoading };
};
