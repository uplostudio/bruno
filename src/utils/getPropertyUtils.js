import { properties } from "./_cssProperties";

export function getShortNameFromCssProperty(property) {
  return properties?.find((p) => p.cssProperty === property)?.shortName;
}

export function getShortNameFromFigmaProperty(property) {
  return properties?.find((p) => p.figmaProperty === property)?.shortName;
}

export function getCssPropertyFromFigmaProperty(property) {
  return properties?.find((p) => p.figmaProperty === property)?.cssProperty;
}

export function getUnitFromFigmaProperty(property) {
  return properties?.find((p) => p.figmaProperty === property)?.unit || "px";
}
