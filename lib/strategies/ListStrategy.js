export function ListStrategy(listType) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const parentElement = range.commonAncestorContainer.parentElement;

  // Check if we're already in a list
  const isInList =
    parentElement.tagName === "LI" &&
    parentElement.parentElement.tagName === listType.toUpperCase();

  if (isInList) {
    // Remove list formatting
    const list = parentElement.parentElement;
    while (list.firstChild)
      list.parentElement.insertBefore(list.firstChild, list);
    list.parentElement.removeChild(list);
  } else {
    // Create list
    const list = document.createElement(listType);
    const listItem = document.createElement("li");
    listItem.textContent = range.toString();
    list.appendChild(listItem);

    range.deleteContents();
    range.insertNode(list);

    // Move the cursor to the end of the new list
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(list);
    selection.addRange(newRange);
  }
}
