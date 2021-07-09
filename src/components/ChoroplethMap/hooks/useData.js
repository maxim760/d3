import { useEffect, useState } from "react";
import { csv } from "d3";


export const useData = (csvUrl, row) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await csv(csvUrl, row);
      setData(data);
    })();
  }, [setData, csvUrl, row]);
  return data;
};
