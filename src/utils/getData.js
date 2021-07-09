import { csv } from 'd3';


export const getData = async (csvUrl) => {
  const data = await csv(csvUrl);
  return data;
};