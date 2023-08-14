import { layoutClasses } from "./_layoutClasses";
import addCssClass from "./addCssClass";
import generateStylingCss from "./generateStylingCss";
import getClassName from "./getClassName";
import {
  getCssPropertyFromFigmaProperty,
  getShortNameFromFigmaProperty,
} from "./getPropertyUtils";
import isColor from "./isColor";
import isFillsEmpty from "./isFillsEmpty";
import isNodePropertyDefined from "./isNodePropertyDefined";
import isNodeWithChildren from "./isNodeWithChildren";
import pushLayoutClasses from "./pushLayoutClasses";

export default function nodesToHtml(nodes) {
  let html = "";
  let styleClasses = [];
  let nodeLayoutClasses = "";

  function getNode(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let tag = "div";
      let chars = "";

      nodeLayoutClasses = "";
      let nodeStylingClasses = "";

      function pushStyle(node, property) {
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

        nodeStylingClasses =
          nodeStylingClasses +
          getClassName(value, property, node, styleClasses) +
          " ";
        addCssClass(property, node, styleClasses);
      }

      switch (node.type) {
        case "FRAME":
          //   pushLayoutClasses(node, nodeLayoutClasses);
          if (node["layoutMode"] === "HORIZONTAL") {
            nodeLayoutClasses += "hor ";
          }
          pushStyle(node, "itemSpacing");
          pushStyle(node, "paddingTop");
          pushStyle(node, "paddingBottom");
          pushStyle(node, "paddingLeft");
          pushStyle(node, "paddingRight");
          pushStyle(node, "backgroundColor");
          pushStyle(node, "cornerRadius");
          break;
        case "TEXT":
          tag = "p";
          chars = node.characters;
          pushStyle(node.style, "fontSize");
          pushStyle(node.style, "letterSpacing");
          pushStyle(node, "color");
          break;
      }
      pushStyle(node, "minWidth");
      pushStyle(node, "maxWidth");
      pushStyle(node, "minHeight");
      pushStyle(node, "maxHeight");

      html += `<${tag} class="${nodeLayoutClasses + nodeStylingClasses}" id="${
        node.id
      }">`;
      html += chars;
      if (isNodeWithChildren(node)) {
        getNode(node.children);
      }
      html += `</${tag}>`;
    }
  }
  getNode([nodes]);

  html +=
    "<style>" + layoutClasses + generateStylingCss(styleClasses) + "</style>";

  return html;
}
