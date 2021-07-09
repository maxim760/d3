import React from "react";
import { geoPath, geoNaturalEarth1, geoGraticule } from "d3";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  worldAtlas: { countries, interiors, land },
  cities,
  cityScale,
  cityValue,
  migrantCoords,
  migrantsScale,
  migrantsValue
}) => {
  return (
    <g>
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path d={path(graticule())} className="graticules" />
      {countries.features.map((feature) => {
        const { name: country } = feature.properties;
        return (
          <path className="country" key={country} d={path(feature)}>
            <title>{country}</title>
          </path>
        );
      })}
      <path d={path(interiors)} className="interiors" />
      {cities.map((d, i) => {
        const [x, y] = projection([d.lng, d.lat])
        return <circle
          key={i}
          cx={x}
          cy={y}
          r={cityScale(cityValue(d))}
          className="cityPoint"
        >
          <title>{d.country}: {d.city }</title>
        </circle>
      })} 
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
          <title>Migrants Missed: { migrants.toLocaleString()}</title>
        </circle>
      })} 
    </g>
  );
};
