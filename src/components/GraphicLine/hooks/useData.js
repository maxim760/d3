import { csv } from 'd3';
import  { useEffect, useState } from 'react'

export const useData = (csvUrl) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const row = (d) => {
        const obj = ["sepal_length", "sepal_width", "petal_length", "petal_width"].reduce((acc,key) => {
          return {
            ...acc,
            [key]: +d[key]
          }
        }, {})
        return {...d, ...obj};
      };
      const res = await csv(csvUrl, row);
      setData(res);
    })();
  }, [setData, csvUrl]);
  return data
}
