import React, { memo } from 'react'
import { geoGraticule, geoPath } from 'd3';
import { getProjection } from './utils';

const projection = getProjection();
const path = geoPath(projection);
const graticule = geoGraticule();

export const EarthMap = memo(({ countries, interiors }) => {
  return (
    <>
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
    </>
  )
})