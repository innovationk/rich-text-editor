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

/**
 * 
 * @param {Node} target 
 * 
 * @returns  - Throw an UnmergeableError if something wrong happens.
 */
export function mergeWithSurroundings(target) {
  const {previous, next} = areSurroundingsMergeable(target)

  target.textContent = `${previous.isMergeable ? previous.value: ""}${target.textContent}${next.isMergeable ? next.value: ""}`

  if(previous.isMergeable){

    target.parentNode.removeChild(previous.node)
  }
  if(next.isMergeable){

    target.parentNode.removeChild(next.node)
  }
  if(previous.isMergeable && next.isMergeable){

    mergeWithSurroundings(target)
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
  const nextSibling  = currentNode.nextSibling;

  console.log({previousSibling, nextSibling})

  return {
     previous: {
      node: previousSibling, 
      value: previousSibling.nodeType === Node.TEXT_NODE ? previousSibling.nodeValue : previousSibling.textContent,
      isMergeable:  isMergeable(previousSibling, currentNode)
    },
    next: {
      node: nextSibling,
      value: nextSibling.nodeType === Node.TEXT_NODE ? nextSibling.nodeValue : nextSibling.textContent,
      isMergeable: isMergeable(nextSibling, currentNode)
    }
  }
}

/**
 * 
 * @param {Node} sibling 
 * @param {Node} target 
 * 
 * @returns {boolean}
 */
function isMergeable(sibling, target) {
  const isWhiteSpaceNode = sibling.nodeType === Node.TEXT_NODE && sibling.textContent === " "
   return  (isWhiteSpaceNode && target.nodeType === Node.ELEMENT_NODE) || sibling.nodeName === target.nodeName
}
