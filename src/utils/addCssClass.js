import {
  getCssPropertyFromFigmaProperty,
  getShortNameFromCssProperty,
  getShortNameFromFigmaProperty,
} from "./getPropertyUtils";

export default function addCssClass(
  property,
  node,
  listOfClasses,
  nodeStylingClasses
) {
  let value = node[property];
  let cssProperty = getCssPropertyFromFigmaProperty(property);
  let unit = "px";

  if (cssProperty === "background-color") {
    value = "yellow";
    unit = "";
  }

  const className = `${getShortNameFromCssProperty(cssProperty)}-${value}`;

  if (value === undefined) {
    return;
  }

  if (listOfClasses?.find((styleClass) => styleClass.name === className)) {
    return;
  }

  listOfClasses.push({
    name: className,
    property: cssProperty,
    value: value + unit,
  });
}
