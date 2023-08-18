import getColorSingleRgbaValue from "./getColorSingleRgbaValue";

export default function getColorRgbaValue(color) {
  return `rgba(${getColorSingleRgbaValue(color, "r")}, 
  ${getColorSingleRgbaValue(color, "g")}, 
  ${getColorSingleRgbaValue(color, "b")}, 
  ${color.a})`;
}
