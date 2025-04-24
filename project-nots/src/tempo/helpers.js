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
  if (!range) throw Error(`You need to pass a range [given: ${range}]`);

  let closestContainer = range.commonAncestorContainer;

  const childrenNodes = closestContainer.childNodes?.values();

  for (const child of childrenNodes) {
    if (child.nodeType !== Node.ELEMENT_NODE) {
      continue;
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
    if (tag.childNodes.length === 0 && tag.nodeType !== 3) {
      tag.parentNode.removeChild(tag);
    }
  }
}
