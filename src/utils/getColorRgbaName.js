import getColorSingleRgbaValue from "./getColorSingleRgbaValue";

export default function getColorRgbaName(value) {
  return (
    getColorSingleRgbaValue(value, "r") +
    getColorSingleRgbaValue(value, "g") +
    getColorSingleRgbaValue(value, "b") +
    getColorSingleRgbaValue(value, "a")
  );
}
