import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface UseFetchProps<T> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  initialData?: T | null;
}

interface UseFetchState<T> {
  data: T | null;
  error: AxiosError | null | unknown;
  isLoading: boolean;
}

const useFetch = <T,>({
  url,
  method = 'GET',
  initialData = null,
}: UseFetchProps<T>): UseFetchState<T> => {
  const [data, setData] = useState<T | null>(initialData as T | null);
  const [error, setError] = useState<AxiosError | null | unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios({
          method,
          url,
        });

        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method]);

  return { data, error, isLoading };
};

export default useFetch;
