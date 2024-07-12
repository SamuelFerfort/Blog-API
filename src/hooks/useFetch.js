import { useEffect, useState } from "react";

const useFetch = (URL) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(URL);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setData(data);
      } catch (err) {
        console.error(`Error fetching items:`, err);
        setError(err);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [URL]);

  return { data, isLoading, error };
};

export default useFetch;
