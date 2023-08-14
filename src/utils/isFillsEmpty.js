export default function isFillsEmpty(node) {
  return node?.fills?.[0]?.color === undefined;
}
