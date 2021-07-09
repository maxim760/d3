import { csv } from 'd3';
import  { useEffect, useState } from 'react'

export const useData = (csvUrl) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const row = (d) => {
        d["Reported Date"] = new Date(d["Reported Date"])
        d["Total Dead and Missing"] = +d["Total Dead and Missing"]
        return d;
      };
      const data = await csv(csvUrl, row);
      data.columns = Object.keys(data[0] || [])
      setData(data);
    })();
  }, [setData, csvUrl]);
  return data
}
