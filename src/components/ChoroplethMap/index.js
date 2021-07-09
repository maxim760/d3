import React, { useMemo } from "react";

import { useWorldAtlas } from "./hooks/useWorldAtlas";
import { useData } from "./hooks/useData";
import { Marks } from "./Marks";
import { interpolateYlOrRd, max, scaleSequential } from "d3";

const atlasUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const codesUrl =
  "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.csv";
const dataUrl =
  "https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/66908b56e371e7c9f5a1c0911ac3250f570a4c83/share-of-population-infected-with-hiv-ihme.csv";

const rowData = (d) => {
  d.Year = +d.Year;
  d["aids"] =
    +d["Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)"];
  delete d[
    "Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)"
  ];
  return d;
};

const selectedYear = 2017;

export const ChoroplethMap = () => {
  const worldAtlas = useWorldAtlas(atlasUrl);
  const data = useData(dataUrl, rowData);
  const codes = useData(codesUrl);

  const filteredData = useMemo(() => {
    return selectedYear && data
      ? data.filter(({ Year }) => Year === selectedYear)
      : data;
  }, [data]);

  if (!worldAtlas || !data || !codes) {
    return <div>Loading...</div>;
  }

  const numericCodeByAlphaCode = new Map();
  codes.forEach((code) =>
    numericCodeByAlphaCode.set(code["alpha-3"], code["country-code"])
  );
  const rowByNumericCode = new Map();
  filteredData.forEach((d) => {
    const alphaCode = d.Code;
    const numericCode = numericCodeByAlphaCode.get(alphaCode);
    if (numericCode) {
      rowByNumericCode.set(numericCode, d);
    }
  });
  const colorValue = (d) => d.aids;
  const colorScale = scaleSequential()
    .domain([0, max(filteredData, colorValue)])
    .interpolator(interpolateYlOrRd);
  return (
    <svg viewBox="0 0 1060 500">
      <Marks
        worldAtlas={worldAtlas}
        colorScale={colorScale}
        colorValue={colorValue}
        rowByNumericCode={rowByNumericCode}
      />
    </svg>
  );
};
