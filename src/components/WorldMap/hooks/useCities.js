import { useEffect, useState } from "react";
import { csv } from "d3";

const row = (d) => {
  ["lat", "lng", "population"].forEach((key) => (d[key] = +d[key]));
  return d
};

export const useCities = (csvUrl) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const cities = await csv(csvUrl, row);
      setData(cities);
    })();
  }, [setData, csvUrl]);
  return data;
};
