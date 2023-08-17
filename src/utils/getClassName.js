import { layoutProperties } from "./_layoutProperties";
import getColorRgbaName from "./getColorRgbaName";
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

  const layoutProperty = layoutProperties.find((p) => p.name === shortValue);
  layoutProperty && (shortValue = layoutProperty.className);

  if (!isFillsEmpty(node) && isColor(property)) {
    shortValue = getColorRgbaName(shortValue);

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
