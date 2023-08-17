export default function getColorSingleRgbaValue(color, letter) {
  if (letter === "a") {
    return (color?.[letter]).toFixed(2);
  }
  return (color?.[letter] * 255).toFixed();
}
