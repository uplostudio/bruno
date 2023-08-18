export default function pushLayoutClasses(
  node,
  nodeLayoutClasses,
  pushStyle,
  parent
) {
  function setWidth() {
    pushStyle("width");
  }

  function setHeight() {
    pushStyle("height");
  }

  if (node["layoutMode"] !== undefined) {
    if (node["layoutMode"] === "HORIZONTAL") {
      nodeLayoutClasses.push("fd-h");
    }
  }

  if (node.name === "bg-abs") {
    console.log(node);
  }

  if (node?.["layoutPositioning"] === "ABSOLUTE") {
    nodeLayoutClasses.push("pos-a");

    const horizontalConstraints = node?.constraints?.horizontal;

    function positionRight() {
      node.right = (
        node.absoluteBoundingBox.x +
        node.absoluteBoundingBox.width -
        (parent.absoluteBoundingBox.x + parent.absoluteBoundingBox.width)
      ).toFixed(0);
      pushStyle("right");
    }

    function positionLeft() {
      node.left = (
        node.absoluteBoundingBox.x - parent.absoluteBoundingBox.x
      ).toFixed(0);
      pushStyle("left");
    }

    console.log(horizontalConstraints);
    if (horizontalConstraints === "RIGHT") {
      positionRight();
    }
    if (horizontalConstraints === "LEFT_RIGHT") {
      positionLeft();
      positionRight();
      node.absoluteBoundingBox.width = undefined;
    }
    if (horizontalConstraints === "LEFT") {
      positionLeft();
    }
    if (horizontalConstraints === "CENTER") {
      nodeLayoutClasses.push("pos-a-c");
    }

    node.top = (
      node.absoluteBoundingBox.y - parent.absoluteBoundingBox.y
    ).toFixed(0);
    pushStyle("top");
  }

  if (node?.["layoutGrow"] !== undefined) {
    const parentLayoutMode = parent?.layoutMode;
    if (parentLayoutMode === "HORIZONTAL") {
      if (node["layoutGrow"] === 0) {
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
        // console.log("3");
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
        nodeLayoutClasses.push("w-f");
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
