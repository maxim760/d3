import { csv } from 'd3';
import  { useEffect, useState } from 'react'

export const useCountryData = (csvUrl, {width, height}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const row = (d) => {
        d.Population = Number(d["2020"]) * 1000;
        return d;
      };
      const res = await csv(csvUrl, row);
      setData(res.slice(0, 10));
    })();
  }, [width, height, csvUrl,setData ]);
  return data
}
