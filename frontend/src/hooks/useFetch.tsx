import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T,>(url: string, options?: RequestInit) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | undefined>();

  const getData = useCallback(async () => {
    const fetchedData: Response = await fetch(url, options);
    const parsedData: T = await fetchedData.json();
    setData(parsedData);
    setLoading(false);
  }, [url, options]);

  useEffect(() => {
    getData();
  }, [url, getData]);

  return [loading, data] as const;
};

export const useFetchWithPagination = <T,>(url: string, page?: number) => useFetch<T>(page ? `${url}?page=${page}` : url);
