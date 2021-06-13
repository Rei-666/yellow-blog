import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T,>(url: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | undefined>();

  const getData = useCallback(async () => {
    const fetchedData: Response = await fetch(url);
    const parsedData: T = await fetchedData.json();
    setData(parsedData);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);

  return [loading, data] as const;
};

export const useFetchWithPagination = <T,>(url: string, page?: number) => useFetch<T>(page ? `${url}?page=${page}` : url);
