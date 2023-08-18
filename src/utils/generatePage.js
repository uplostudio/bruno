import { layoutClasses } from "./_initClasses";
import generateStylesCss from "./generateStylesCss";
import isNodeWithChildren from "./isNodeWithChildren";
import pushLayoutClasses from "./pushLayoutClasses";
import pushStyleNode from "./pushStyleNode";
import { variables } from "./_variables";
import generateVariablesCss from "./generateVariablesCss";
import { fontStyles } from "./_fontStyles";
import generateFontStylesCss from "./generateFontStylesCss";

export default function nodesToHtml(nodes) {
  let html = `<html><head><style>
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  
  @font-face {
    font-family: "mona-sans";
    src: url("http://localhost:3000/fonts/Mona-Sans-MediumWide.woff") format("woff");
    font-weight: normal;
  }
  
  @font-face {
    font-family: "mona-sans";
    src: url("http://localhost:3000/fonts/Mona-Sans-LightWide.woff") format("woff");
    font-weight: 300;
  }

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}</style></head><body>`;
  let styleClasses = [];
  let isFisrt = true;

  console.log(variables);

  function getNode(nodes, parent) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let tag = "div";
      let chars = "";

      const nodeData = node.name.match(/\[.*?\]/g);
      if (nodeData) {
        nodeData.forEach((data) => {
          console.log(data.replace("[", "").replace("]", "").split(":"));
        });
      }

      let nodeLayoutClasses = [];
      let nodeStylingClasses = [];

      function pushStyle(property) {
        pushStyleNode(node, property, nodeStylingClasses, styleClasses);
      }

      switch (node.type) {
        case "FRAME":
        case "INSTANCE":
        case "COMPONENT":
        case "RECTANGLE":
        case "REGULAR_POLYGON":
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
          const fontStyle = fontStyles?.find(
            (style) => style.fontSize === node.style.fontSize
          );
          if (fontStyle) {
            nodeLayoutClasses.push(fontStyle.name);
          }
          if (!fontStyle) {
            pushStyle("fontSize");
            pushStyle("letterSpacing");
            pushStyle("fontFamily");
            pushStyle("fontWeight");
            pushStyle("lineHeightPercentFontSize");
          }
          pushStyle("textAlignHorizontal");
          pushStyle("color");
          break;
      }
      pushStyle("minWidth");
      pushStyle("maxWidth");
      pushStyle("minHeight");
      pushStyle("maxHeight");

      if (node.type === "RECTANGLE" && node.fills[0]?.type === "IMAGE") {
        tag = "img";
      }

      const nodeLayoutClassesString = nodeLayoutClasses.join(" ");
      const nodeStylingClassesString = nodeStylingClasses.join(" ");

      html += `<${tag} type="${node.type}" n="${node.name}" class="${
        isFisrt ? "w-f " : ""
      }${nodeLayoutClassesString + " " + nodeStylingClassesString}">`;
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
    "<style>" +
    generateFontStylesCss() +
    generateVariablesCss() +
    layoutClasses +
    generateStylesCss(styleClasses) +
    "</style>";

  html += "</body></html>";
  html += `<script>
    document.addEventListener("DOMContentLoaded", function() {
      const h1 = document.querySelector("[n=h1]");
    });
    </script>`;

  return html;
}
