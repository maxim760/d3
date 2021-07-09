import React from "react";
import { geoPath, geoNaturalEarth1, geoGraticule } from "d3";

import { round } from "../../utils/common/round";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const MISSING_COLOR = "grey"

export const Marks = ({
  worldAtlas: { countries, interiors },
  colorScale,
  colorValue,rowByNumericCode
}) => {
  return (
    <g>
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticules" d={path(graticule())} />
      {countries.features.map((feature) => {
        const { name: country } = feature.properties;
        const d = rowByNumericCode.get(feature.id)
        return (
          <path
            key={country}
            d={path(feature)}
            fill={d ? colorScale(colorValue(d)) : MISSING_COLOR}
          >
            <title>
              {country}, aids:{" "}
              {d
                ? `${round(colorValue(d), 3)} in ${d.Year}`
                : "not information"}
            </title>
          </path>
        );
      })}
      <path d={path(interiors)} className="interiors" />
    </g>
  );
};
