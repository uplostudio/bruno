import { layoutProperties } from "./_cssValues";
import getClassName from "./getClassName";
import getColorRgbaValue from "./getColorRgbaValue";
import {
  getCssPropertyFromFigmaProperty,
  getUnitFromFigmaProperty,
} from "./getPropertyUtils";
import isColor from "./isColor";
import isExistingClassWithSameName from "./isExistingClassWithSameName";
import isFillsEmpty from "./isFillsEmpty";

export default function addCssClass(
  value,
  property,
  node,
  styleClasses,
  isVariable
) {
  let cssProperty = getCssPropertyFromFigmaProperty(property);
  let unit = getUnitFromFigmaProperty(property);

  const className = getClassName(value, property, node, styleClasses);

  const layoutValue = layoutProperties.find((p) => p.name === value);
  layoutValue && (value = layoutValue.value);

  if (!isFillsEmpty(node) && isColor(property)) {
    console.log(node);
    value = getColorRgbaValue(value);
    unit = "";
  }

  if (isExistingClassWithSameName(styleClasses, className)) {
    return;
  }

  if (isVariable) {
    value = `var(--${value})`;
    unit = "";
  }

  styleClasses.push({
    name: className,
    property: cssProperty,
    value: value,
    unit: unit,
  });
}
