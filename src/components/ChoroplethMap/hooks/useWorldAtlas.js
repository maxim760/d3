import { useEffect, useState } from "react";
import { json } from "d3";
import { feature, mesh } from "topojson-client";

export const useWorldAtlas = (jsonUrl) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const topology = await json(jsonUrl);
      const { countries, land } = topology.objects;
      setData({
        countries: feature(topology, countries),
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b),
      });
    })();
  }, [setData, jsonUrl]);
  return data;
};
