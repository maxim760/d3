import React from "react";
import { EarthMap } from "./EarthMap";
import {getProjection} from "./utils"

const projection = getProjection();

export const Marks = ({
  worldAtlas: { countries, interiors },
  migrantCoords,
  migrantsScale,
  migrantsValue
}) => {
  return (
    <g>
      <EarthMap countries={countries} interiors={interiors} />
      {migrantCoords.map((d, i) => {
        const [x, y] = projection(d.coords)
        const migrants = migrantsValue(d)
        return <circle
          key={i}
          cx={x}
          cy={y}
          r={migrantsScale(migrants)}
          className="migrantPoint"
        >
          <title>Migrants Missed: { migrants}</title>
        </circle>
      })} 
    </g>
  );
};
