export function StyleStrategy(style, value, isAlignment = false) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const selectedText = range.toString();

  if (selectedText.length === 0) return;

  const parentElement = range.commonAncestorContainer.parentElement;
  const isStyleApplied = parentElement.style[style] === value;

  if (isStyleApplied) {
    // If style is already applied, remove it
    parentElement.style[style] = "";
  } else {
    // Use a <div> for alignment to make it block-level
    const wrapper = document.createElement(isAlignment ? "div" : "span");
    wrapper.style[style] = value;
    wrapper.textContent = selectedText;

    range.deleteContents();
    range.insertNode(wrapper);

    // Move the cursor to the end of the new wrapper
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(wrapper);
    selection.addRange(newRange);
  }
}
