import { useEffect, useState } from "react";

const useFetch = (URL) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching items:`, err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [URL]);

  return { data, isLoading, error };
};

export default useFetch;
