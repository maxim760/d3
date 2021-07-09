import { useEffect, useState } from "react";
import { csv } from "d3";

const row = (d) => {
  d.coords = d["Location Coordinates"].split(",").map(Number).reverse();
  d["Total Dead and Missing"] = +d["Total Dead and Missing"]
  d["Reported Date"] = new Date(d["Reported Date"])
  return d
};

export const useMissingMigrants = (csvUrl) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await csv(csvUrl, row);
      setData(data);
    })();
  }, [setData, csvUrl]);
  return data;
};
