export default function pushLayoutClasses(node, nodeLayoutClasses) {
  if (node["layoutMode"] === "HORIZONTAL") {
    nodeLayoutClasses += "hor ";
  }
}
