import { useCallback, useEffect, useState } from 'react';

type ResponseWithColor<T extends {}> = T & {
  color: string
};

export const useFetch = <T,>(url: string, options?: RequestInit) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | undefined>();

  const setPrimaryColor = (color: string) => {
    document.documentElement.style.setProperty('--primary', color);
  };

  const getData = useCallback(async () => {
    const fetchedData: Response = await fetch(url, options);
    const parsedData: ResponseWithColor<T> = await fetchedData.json();
    const { color, ...parsedDataWithoutColor } = parsedData;
    setPrimaryColor(color);
    setData((parsedDataWithoutColor as unknown as T));
    setLoading(false);
  }, [url, options]);

  useEffect(() => {
    getData();
  }, [url, getData]);

  return [loading, data] as const;
};

export const useFetchWithPagination = <T,>(url: string, page?: number) => useFetch<T>(page ? `${url}?page=${page}` : url);
