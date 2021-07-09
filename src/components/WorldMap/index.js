import React, { useCallback } from "react";
import { extent, max, scaleLinear, scaleSqrt } from "d3";

import { useWorldAtlas } from "./hooks/useWorldAtlas";
import { useCities } from "./hooks/useCities";
import { useMissingMigrants } from "./hooks/useMissingMigrants";
import { Marks } from "./Marks";

const atlasUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const cityUrl =
  "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv";
const migrantsUrl =
  "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

const minRadius = 0.2;
const maxRadius = 15;


export const WorldMap = () => {
  const worldAtlas = useWorldAtlas(atlasUrl);
  const cities = useCities(cityUrl);
  const migrantCoords = useMissingMigrants(migrantsUrl)
  const cityValue = useCallback((d) => d.population, []);
  const migrantsValue = useCallback((d) => d["Total Dead and Missing"], []);
  if (!worldAtlas || !cities || !migrantCoords) {
    return <div>Loading...</div>;
  }

  const cityScale = scaleSqrt()
    .domain(extent(cities, cityValue))
    .range([minRadius, maxRadius]);
  
  const migrantsScale = scaleSqrt()
    .domain(extent(migrantCoords, migrantsValue))
    .range([minRadius, maxRadius]);

  return (
    <svg viewBox="0 0 1060 500">
      <Marks
        worldAtlas={worldAtlas}
        cities={cities}
        cityScale={cityScale}
        cityValue={cityValue}
        migrantCoords={migrantCoords}
        migrantsScale={migrantsScale}
        migrantsValue={migrantsValue}
      />
    </svg>
  );
};
