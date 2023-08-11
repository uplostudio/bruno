import { layoutClasses } from "./_layoutClasses";
import addCssClass from "./addCssClass";
import generateStylingCss from "./generateStylingCss";
import {
  getCssPropertyFromFigmaProperty,
  getShortNameFromFigmaProperty,
} from "./getPropertyUtils";
import isNodeWithChildren from "./isNodeWithChildren";

export default function nodesToHtml(nodes) {
  let html = "";
  let styleClasses = [];

  function getNode(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let tag = "div";
      let chars = "";

      let nodeLayoutClasses = "";
      let nodeStylingClasses = "";

      function addNodeStylingClass(property, node) {
        if (node[property] === undefined) {
          return;
        }
        let value = node[property];
        if (property === "backgroundColor") {
          value = "yellow";
        }
        nodeStylingClasses += `${getShortNameFromFigmaProperty(
          property
        )}-${value} `;
      }

      switch (node.type) {
        case "FRAME":
          if (node["layoutMode"] === "HORIZONTAL") {
            nodeLayoutClasses += "hor ";
          }

          function pushStyle(node, property) {
            addNodeStylingClass(property, node);
            addCssClass(property, node, styleClasses);
          }

          pushStyle(node, "itemSpacing");
          pushStyle(node, "paddingTop");
          pushStyle(node, "paddingBottom");
          pushStyle(node, "paddingLeft");
          pushStyle(node, "paddingRight");
          pushStyle(node, "minWidth");
          pushStyle(node, "backgroundColor");

          break;
        case "TEXT":
          tag = "p";
          chars = node.characters;

          pushStyle(node.style, "fontSize");
          pushStyle(node.style, "letterSpacing");
          break;
      }

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
