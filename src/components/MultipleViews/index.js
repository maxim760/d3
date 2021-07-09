import React, { useState } from "react";

import { useWorldAtlas } from "./hooks/useWorldAtlas";
import { useMissingMigrants } from "./hooks/useMissingMigrants";
import { BubbleMap } from "./BubbleMap";
import { DateHistogram } from "./DateHistogram";
import { inOrder } from "../../utils/common/inOrder";

const atlasUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

const migrantsUrl =
  "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

const height = 450;
const width = 975;

const dateHistogramSize = 0.18;

export const xValue = (item) => item["Reported Date"];
export const yValue = (item) => item["Total Dead and Missing"];

export const MultipleViews = () => {
  const worldAtlas = useWorldAtlas(atlasUrl);
  const migrantCoords = useMissingMigrants(migrantsUrl);

  const [brushExtent, setBrushExtent] = useState(null);

  if (!worldAtlas || !migrantCoords) {
    return <div>Loading...</div>;
  }

  const filteredCoords = brushExtent ? migrantCoords.filter((item) => {
    const date = xValue(item)
    return inOrder([brushExtent[0], date, brushExtent[1]])
  }) : migrantCoords

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <BubbleMap
        worldAtlas={worldAtlas}
        filteredData={filteredCoords}
        data={migrantCoords}
        yValue={yValue}
      />
      <g transform={`translate(0, ${height * (1 - dateHistogramSize)})`}>
        <DateHistogram
          data={migrantCoords}
          width={width}
          height={dateHistogramSize * height}
          offsetTop={15}
          bgOpacity={0.45}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};
