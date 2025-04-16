/**
 *
 * @param {React.RefObject} ref
 * @param {Range} range
 * @returns {Element[]}
 */
export function getParentNodes(ref, range) {
  const parentNodes = [];

  let currentNode = getClosestNodeFromSelection(range);
  let hasReachedEditorNode = false;

  while (!hasReachedEditorNode) {
    parentNodes.push(currentNode);
    hasReachedEditorNode = currentNode.id === ref.current.id;
    currentNode = currentNode.parentNode;
  }
  return parentNodes;
}

/**
 *
 * @param {Range} range
 * @param {"b" | "i"} htmlElement
 * @param {React.RefObject} ref
 * @returns {Element}
 */
export function findSimilarParentNode(range, htmlElement, ref) {
  const parentNodes = getParentNodes(ref, range);
  let similarParentNode = null;

  for (const parentNode of parentNodes) {
    if (
      parentNode.nodeType === Node.ELEMENT_NODE &&
      parentNode.tagName === htmlElement.toUpperCase()
    ) {
      similarParentNode = parentNode;
      break;
    }
  }
  return similarParentNode;
}

/**
 *
 * @param {Range} range
 * @returns {Element}
 */
function getClosestNodeFromSelection(range) {
  let closestContainer = range.commonAncestorContainer;

  const childrenNodes = closestContainer.childNodes
    ?.values()
    .filter((node) => node.nodeType === Node.ELEMENT_NODE);

  for (const child of childrenNodes) {
    if (range.intersectsNode(child)) {
      closestContainer = child;
    }
  }

  return closestContainer;
}
