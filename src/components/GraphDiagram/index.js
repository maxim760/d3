import React, { useEffect, useRef } from "react";
import {
  drag,
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  select,
} from "d3";
import { useDimensions } from "../../hooks/useDimensions";
import { links, MANY_BODY_STRENGTH, nodes } from "./data";

export const GraphDiagram = () => {
  const { width, height } = useDimensions();
  const simulation = forceSimulation(nodes)
    .force("charge", forceManyBody().strength(MANY_BODY_STRENGTH))
    .force(
      "link",
      forceLink(links).distance((d) => d.distance)
    )
    .force("center", forceCenter(width / 2, height / 2));

  const svgRef = useRef(null);
  useEffect(() => {
    const dragInteraction = drag().on("drag", (event, node) => {
      node.fx = event.x;
      node.fy = event.y;
      simulation.alpha(1);
      simulation.restart();
    });
    const svg = select(svgRef.current);
    const lines = svg
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => d.color || "black")

    const circles = svg
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("fill", d => d.color || "gray")
      .attr("r", (d) => d.size).call(dragInteraction)
    const texts = svg
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .text((d) => d.id)

    simulation.on("tick", () => {
      lines
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      texts.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });
  }, []);

  return (
    <svg className="diagram" width={width} height={height} ref={svgRef}></svg>
  );
};
