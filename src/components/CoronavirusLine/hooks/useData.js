import { csv, timeParse } from "d3";
import { useEffect, useState } from "react";

const MappedArray = new Proxy(Array, {
  construct(target, [args, [propForMethod, method]]) {
    const map = new Map()
    args.forEach((item) => (map.set(item[propForMethod], item)))
    return new Proxy(new target(...args), {
      get(target, prop, reciever) {
        if (prop === method) {
          return (arg) => map.get(arg)
        }
        return Reflect.get(target, prop, reciever)
      }
    })
  }
})

const parseDate = timeParse("%m/%d/%y");

const transform = (rawData) => {
  const countriesData = rawData.filter((item) => !item["Province/State"]);
  const dates = rawData.columns.slice(4);
  const datesDict = dates.reduce(
    (acc, strDate) => ({ ...acc, [strDate]: parseDate(strDate) }),
    {}
  );
  const countries = countriesData.map((country) => {
    const countryName = country["Country/Region"]

    const data = dates.map(strDate => ({
      date: datesDict[strDate],
      deathTotal: +country[strDate],
      countryName
    }))
    data.countryName = countryName
    return data
  });
  
  return new MappedArray(countries, ["countryName", "findByCountry"])
};

export const useData = (csvUrl) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await csv(csvUrl);
      setData(transform(data));
    })();
  }, [setData, csvUrl]);
  return data;
};
