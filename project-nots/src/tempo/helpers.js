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
 * @param {React.RefObject} ref
 * @param {Range} range
 * @returns {Element[]}
 */
export function getParentNodes(ref, range) {
  const parentNodes = [];

  let currentNode = range.commonAncestorContainer;
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
 * @param {Node} target
 *
 * @returns  - Throw an UnmergeableError if something wrong happens.
 */
export function mergeWithSurroundings(target) {
  const { previous, next } = areSurroundingsMergeable(target);

  target.textContent = `${previous.isMergeable ? previous.value : ""}${
    target.textContent
  }${next.isMergeable ? next.value : ""}`;

  if (previous.isMergeable) {
    target.parentNode.removeChild(previous.node);
  }

  if (next.isMergeable) {
    target.parentNode.removeChild(next.node);
  }

  if (previous.isMergeable || next.isMergeable) {
    mergeWithSurroundings(target);
  }
}

/**
 *
 * @param {Node} currentNode
 *
 * @returns {{previous: {node: Node, value: string, isMergeable: boolean}, next: {node: Node, value: string, isMergeable: boolean}}}
 */
function areSurroundingsMergeable(currentNode) {
  const previousSibling = currentNode.previousSibling;
  const nextSibling = currentNode.nextSibling;

  return {
    previous: {
      node: previousSibling,
      value: !previousSibling
        ? null
        : previousSibling.nodeType === Node.TEXT_NODE
        ? previousSibling.nodeValue
        : previousSibling.textContent,
      isMergeable: isMergeable(previousSibling, currentNode),
    },
    next: {
      node: nextSibling,
      value: !nextSibling
        ? null
        : nextSibling.nodeType === Node.TEXT_NODE
        ? nextSibling.nodeValue
        : nextSibling.textContent,
      isMergeable: isMergeable(nextSibling, currentNode),
    },
  };
}

/**
 *
 * @param {Node} sibling
 * @param {Node} target
 *
 * @returns {boolean}
 */
function isMergeable(sibling, target) {
  if (!sibling) return false;

  const isWhiteSpaceNode =
    sibling.nodeType === Node.TEXT_NODE && sibling.textContent === " ";
  return (
    (isWhiteSpaceNode && target.nodeType === Node.ELEMENT_NODE) ||
    sibling.nodeName === target.nodeName
  );
}

/**
 *
 * @param {Selection} selection
 * @param {Node} wrapper
 */
export function moveCursorToTheEnd(selection, wrapper) {
  selection.removeAllRanges();
  console.log(wrapper);
  // const newRange = document.createRange();
  // newRange.setStartAfter(wrapper);
  // selection.addRange(newRange);
}
