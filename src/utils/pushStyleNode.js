import addCssClass from "./addCssClass";
import getClassName from "./getClassName";
import isColor from "./isColor";
import isFillsEmpty from "./isFillsEmpty";
import isNodePropertyDefined from "./isNodePropertyDefined";

export default function pushStyleNode(
  node,
  property = "",
  nodeStylingClasses,
  styleClasses
) {
  if (isColor(property) && isFillsEmpty(node)) {
    return;
  }

  if (!isColor(property) && isNodePropertyDefined(node, property)) {
    return;
  }

  let value = "";
  if (!isColor(property)) {
    value = node[property];
  }
  if (isColor(property)) {
    value = node.fills[0]?.color;
  }

  nodeStylingClasses.push(getClassName(value, property, node, styleClasses));

  addCssClass(value, property, node, styleClasses);
}
