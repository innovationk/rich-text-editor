/**
 *
 * @param {Range} range
 * @param {"b" | "i"} htmlElement
 * @param {string} referenceID
 * @returns {Element}
 */
export function findSimilarParentNode(range, htmlElement, referenceID) {
  const parentNodes = getParentNodes(referenceID, range);
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
 * @param {string} referenceID
 * @param {Range} range
 * @returns {Element[]}
 */
export function getParentNodes(referenceID, range) {
  const parentNodes = [];

  let currentNode = getClosestNodeFromSelection(range);
  let hasReachedEditorNode = false;

  while (!hasReachedEditorNode) {
    parentNodes.push(currentNode);
    hasReachedEditorNode = currentNode.id === referenceID;
    currentNode = currentNode.parentNode;
  }
  return parentNodes;
}

/**
 *
 * @param {Range} range
 * @returns {Element}
 */
function getClosestNodeFromSelection(range) {
  let closestContainer = range.commonAncestorContainer;

  console.log(closestContainer.childNodes.values())

  const childrenNodes = closestContainer.childNodes
    ?.values()
    // .filter((node) => node.nodeType === Node.ELEMENT_NODE);

  for (const child of childrenNodes) {
    if(child.nodeType !== Node.ELEMENT_NODE) {
      continue
    }
    
    if (range.intersectsNode(child)) {
      closestContainer = child;
    }
  }

  return closestContainer;
}

/**
 *
 * @param {Node[]} tags
 */
export function clearEmptyTags(tags) {
  for (const tag of tags) {
    // if a tag is empty
    if (tag.childNodes.length === 0) {
      tag.parentNode.removeChild(tag);
    }
  }
}
