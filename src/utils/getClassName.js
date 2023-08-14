import {
  getCssPropertyFromFigmaProperty,
  getShortNameFromFigmaProperty,
} from "./getPropertyUtils";
import isColor from "./isColor";
import isFillsEmpty from "./isFillsEmpty";

export default function getClassName(value, property, node, styleClasses) {
  let shortProperty = getShortNameFromFigmaProperty(property);
  let cssProperty = getCssPropertyFromFigmaProperty(property);
  let shortValue = value;

  function getColor(color, letter) {
    return (color?.[letter] * 255).toFixed();
  }

  if (!isFillsEmpty(node) && isColor(property)) {
    let color = node?.fills?.[0]?.color;
    shortValue =
      getColor(color, "r") +
      getColor(color, "g") +
      getColor(color, "b") +
      (color?.a * 100).toFixed();
    let findSameClass = styleClasses?.find(
      (styleClass) =>
        styleClass.value === value && styleClass.property === cssProperty
    );

    if (findSameClass !== undefined) {
      return findSameClass.name;
    }
  }

  return (shortProperty + "-" + shortValue).replace(".", "");
}
