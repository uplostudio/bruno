import getClassName from "./getClassName";
import {
  getCssPropertyFromFigmaProperty,
  getShortNameFromCssProperty,
  getShortNameFromFigmaProperty,
} from "./getPropertyUtils";
import isFillsEmpty from "./isFillsEmpty";

export default function addCssClass(property, node, styleClasses) {
  let value = node[property];

  let cssProperty = getCssPropertyFromFigmaProperty(property);
  let unit = "px";

  function getColor(letter) {
    return Math.round(node.fills[0]?.color[letter] * 255);
  }

  const className = getClassName(value, property, node, styleClasses);

  if (
    !isFillsEmpty(node) &&
    (property === "color" || property === "backgroundColor")
  ) {
    // console.log(property);
    value = `rgba(${getColor("r")}, ${getColor("g")}, ${getColor(
      "b"
    )}, ${parseFloat(node.fills[0]?.color.a).toFixed(2)})`;
    unit = "";
  }

  if (styleClasses?.find((styleClass) => styleClass.name === className)) {
    return;
  }

  styleClasses.push({
    name: className,
    property: cssProperty,
    value: value + unit,
  });
}
