import { useEffect, useState } from 'react';
import z from 'zod';

export default function useFetch<T extends z.ZodTypeAny>(url: string, schema: T) {
  const [data, setData] = useState<z.infer<typeof schema>>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw Error('HTTP error!');
        }
        const d = await res.json();

        const { data: dt, error, success } = schema.safeParse(d);

        if (!success) {
          throw new Error(z.prettifyError(error));
        }

        setData(dt);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, schema]);

  return { data, error, loading };
}
