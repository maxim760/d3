import { csv } from 'd3';
import  { useEffect, useState } from 'react'

export const useData = (csvUrl) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const row = (d) => {
        d.timestamp = new Date(d.timestamp)
        d.temperature = Number(d.temperature)
        return d;
      };
      const res = await csv(csvUrl, row);
      setData(res);
    })();
  }, [setData, csvUrl]);
  return data
}
