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
import pushStyleNode from "./pushStyleNode";

export default function nodesToHtml(nodes) {
  let html = "";
  let styleClasses = [];
  let isFisrt = true;

  function getNode(nodes, parent) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let tag = "div";
      let chars = "";

      let nodeLayoutClasses = [];
      let nodeStylingClasses = [];

      function pushStyle(property, isStyling = false) {
        pushStyleNode(
          isStyling ? node.style : node,
          property,
          nodeStylingClasses,
          styleClasses
        );
      }

      switch (node.type) {
        case "FRAME":
          pushLayoutClasses(node, nodeLayoutClasses, pushStyle, parent);
          pushStyle("paddingTop");
          pushStyle("paddingBottom");
          pushStyle("paddingLeft");
          pushStyle("paddingRight");
          pushStyle("backgroundColor");
          pushStyle("cornerRadius");
          break;
        case "TEXT":
          tag = "p";
          pushStyle("fontSize", true);
          pushStyle("letterSpacing", true);
          pushStyle("color");
          break;
      }
      pushStyle("minWidth");
      pushStyle("maxWidth");
      pushStyle("minHeight");
      pushStyle("maxHeight");

      const nodeLayoutClassesString = nodeLayoutClasses.join(" ");
      const nodeStylingClassesString = nodeStylingClasses.join(" ");

      html += `<${tag} n="${node.name}" class="${isFisrt ? "as-s " : ""}${
        nodeLayoutClassesString + " " + nodeStylingClassesString
      }">`;
      isFisrt && (isFisrt = false);
      node.characters && (html += node.characters);

      if (isNodeWithChildren(node)) {
        getNode(node.children, node);
      }

      html += `</${tag}>`;
    }
  }
  getNode([nodes], { layoutMode: "VERTICAL" });

  html +=
    "<style>" + layoutClasses + generateStylingCss(styleClasses) + "</style>";

  return html;
}
