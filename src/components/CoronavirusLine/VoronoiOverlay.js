import { Delaunay } from "d3";
import { memo, useContext } from "react";
import { Context } from ".";
export const VoronoiOverlay = memo(({ allData, lineGenerator, onHover }) => {
  const { innerHeight, innerWidth } = useContext(Context);
  const points = allData.map((d) => [
    lineGenerator.x()(d),
    lineGenerator.y()(d),
  ]);
  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, innerWidth, innerHeight]);
  const onHoverPath = (data) => () => onHover(data);
  return (
    <g className="voronoi">
      {points.map((point, i) => (
        <path
          key={i}
          onMouseEnter={onHoverPath(allData[i])}
          d={voronoi.renderCell(i)}
        />
      ))}
    </g>
  );
});
