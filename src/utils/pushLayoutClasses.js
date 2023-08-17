export default function pushLayoutClasses(
  node,
  nodeLayoutClasses,
  pushStyle,
  parent
) {
  if (node["layoutMode"] !== undefined) {
    if (node["layoutMode"] === "HORIZONTAL") {
      nodeLayoutClasses.push("hor");
    }

    if (node?.["layoutGrow"] !== undefined) {
      function setWidth() {
        pushStyle("width");
      }

      function setHeight() {
        pushStyle("height");
      }

      const parentLayoutMode = parent?.layoutMode;
      if (parentLayoutMode === "HORIZONTAL") {
        console.log("1");

        if (node["layoutGrow"] === 0) {
          console.log("2");
          if (
            (node["counterAxisSizingMode"] === "FIXED" &&
              node["layoutMode"] === "VERTICAL") ||
            (node["primaryAxisSizingMode"] === "FIXED" &&
              node["layoutMode"] === "HORIZONTAL")
          ) {
            setWidth();
          }
          if (node?.["layoutMode"] === undefined) {
            if (node.type === "p") {
              if (node?.style?.textAutoResize !== "WIDTH_AND_HEIGHT") {
                setWidth();
              }
            } else {
              setWidth();
            }
          }
        } else {
          console.log("3");
          nodeLayoutClasses.push("f-1");
        }

        if (node["layoutAlign"] === "INHERIT") {
          if (
            (node["primaryAxisSizingMode"] === "FIXED" &&
              node["layoutMode"] === "VERTICAL") ||
            (node["counterAxisSizingMode"] === "FIXED" &&
              node["layoutMode"] === "HORIZONTAL")
          ) {
            setHeight();
          }
          if (node?.["layoutMode"] === undefined) {
            if (node.type === "p") {
              if (node.style.textAutoResize === undefined) {
                setHeight();
              }
            } else {
              setHeight();
            }
          }
        } else {
          // node.styles.styles["height"] = "100%";
        }
      }
      if (parentLayoutMode === "VERTICAL") {
        if (node["layoutGrow"] === 0) {
          if (
            (node["primaryAxisSizingMode"] === "FIXED" &&
              node["layoutMode"] === "VERTICAL") ||
            (node["counterAxisSizingMode"] === "FIXED" &&
              node["layoutMode"] === "HORIZONTAL")
          ) {
            setHeight();
          }
          if (node?.["layoutMode"] === undefined) {
            if (node.type === "p") {
              if (node.style.textAutoResize === undefined) {
                setHeight();
              }
            } else {
              setHeight();
            }
          }
        } else {
          node.styles.styles["height"] = "100%";
        }
        if (node["layoutAlign"] === "INHERIT") {
          if (
            (node["counterAxisSizingMode"] === "FIXED" &&
              node["layoutMode"] === "VERTICAL") ||
            (node["primaryAxisSizingMode"] === "FIXED" &&
              node["layoutMode"] === "HORIZONTAL")
          ) {
            setWidth();
          }
          if (node?.["layoutMode"] === undefined) {
            if (node.type === "p") {
              if (node?.style?.textAutoResize !== "WIDTH_AND_HEIGHT") {
                setWidth();
              }
            } else {
              setWidth();
            }
          }
        } else {
          nodeLayoutClasses.push("as-s");
          // node.styles.styles["width"] = "100%";
        }
      }
    }

    if (node?.["layoutWrap"] === "WRAP") {
      nodeLayoutClasses.push("f-w");
    }

    pushStyle("counterAxisAlignItems");
    pushStyle("primaryAxisAlignItems");

    if (node?.["primaryAxisAlignItems"] !== "SPACE_BETWEEN") {
      pushStyle("itemSpacing");
    }
  }
}
