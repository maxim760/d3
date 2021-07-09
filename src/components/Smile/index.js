import { useDimensions } from "../../hooks/useDimensions";
import { Eyes } from "./Eyes";
import { Mouth } from "./Mouth";
import { FaceContainer } from "./FaceContainer";

export const Smile = () => {
  
  const { width, height, min } = useDimensions();

  const STROKE_WIDTH = Math.max(min / 50, 3);
  const r = (min - STROKE_WIDTH) / 2;
  const cx = width / 2;
  const cy = height / 2;
  const eye = {
    offset: { x: r / 2.4, y: r / 3 },
    radius: r / 6,
  };
  if (!min) {
    return null;
  }
  return (
    <FaceContainer translate={{ cx, cy }} width={width} height={height}>
      <circle
        r={r}
        fill="#ffff00"
        stroke="#000000"
        strokeWidth={STROKE_WIDTH}
      />
      <Eyes
        radius={eye.radius}
        x={0}
        y={-eye.offset.y}
        offsetX={eye.offset.x}
      />
      <Mouth radius={r} offsetY={eye.offset.y / 3} />
    </FaceContainer>
  );
};
