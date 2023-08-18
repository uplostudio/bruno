import { variables } from "./_variables";
import addCssClass from "./addCssClass";
import getClassName from "./getClassName";
import isColor from "./isColor";
import isFillsEmpty from "./isFillsEmpty";
import isNodePropertyDefined from "./isNodePropertyDefined";

export default function pushStyleNode(
  node,
  property,
  nodeStylingClasses,
  styleClasses
) {
  let value = "";

  if (
    property === "fontSize" ||
    property === "letterSpacing" ||
    property === "textAlignHorizontal" ||
    property === "fontFamily" ||
    property === "fontWeight" ||
    property === "lineHeightPercentFontSize"
  ) {
    node = node.style;
  }

  if (property === "height" || property === "width") {
    node = node.absoluteBoundingBox;
  }

  if (node?.styles !== undefined && node.name === "text") {
    // console.log(node);
  }

  if (property === "border") {
    let topWeight = node.strokeTopWeight;
    let rightWeight = node.strokeRightWeight;
    let bottomWeight = node.strokeBottomWeight;
    let leftWeight = node.strokeLeftWeight;
  }

  if (isColor(property) && isFillsEmpty(node)) {
    return;
  }

  if (!isColor(property) && isNodePropertyDefined(node, property)) {
    return;
  }

  if (!isColor(property)) {
    value = node[property];
  }
  if (isColor(property)) {
    value = node.fills[0]?.color;
  }

  if (property === "fontFamily") {
    value = node.fontFamily.replace(/ /g, "-").toLowerCase();
  }

  let isVariable = false;
  if (node?.boundVariables?.[property] !== undefined) {
    let variableId = node.boundVariables[property].id.replace(
      "VariableID:",
      ""
    );
    let variable = variables?.find((variable) => variable.id === variableId);
    if (variable !== undefined) {
      value = variable.name;
      isVariable = true;
    }
  }

  nodeStylingClasses.push(getClassName(value, property, node, styleClasses));

  addCssClass(value, property, node, styleClasses, isVariable);
}
