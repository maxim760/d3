import { extent, scaleSqrt } from "d3";
import { useMemo } from "react";
import { Marks } from "./Marks";

const minRadius = 0.2;
const maxRadius = 15;

export const BubbleMap = ({ worldAtlas, data, filteredData, yValue }) => {
  const migrantsScale = useMemo(() => {
    return scaleSqrt()
      .domain(extent(data, yValue))
      .range([minRadius, maxRadius]);
  }, [data, yValue]);

  return (
    <Marks
      worldAtlas={worldAtlas}
      migrantCoords={filteredData}
      migrantsScale={migrantsScale}
      migrantsValue={yValue}
    />
  );
};
