export default function isNodePropertyDefined(node, property) {
  return node[property] === undefined;
}
