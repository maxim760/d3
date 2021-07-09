import { csv } from 'd3';
import  { useEffect, useState } from 'react'
import {capitalizeString} from "../../../utils/string"
export const useData = (csvUrl) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const row = (d) => {
        const obj = Object.keys(d).reduce((acc, key) => {
          const value = ["string","number"].includes(typeof d[key]) && !isNaN(d[key]) ? +d[key] : d[key]
          delete d[key]
          return {
            ...acc,
            [capitalizeString(key)]: value
          }
        }, {})
        const res={...d, ...obj} 
        return res;
      };
      const res = await csv(csvUrl, row);
      res.columns = Object.keys(res[0] || [])
      setData(res);
    })();
  }, [setData, csvUrl]);
  return data
}
