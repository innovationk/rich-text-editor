import { useRef } from "react";
import { clearEmptyTags, findSimilarParentNode } from "./helpers";

const HtmlElement = {
  Bold: "b",
  Italic: "i",
};

function RichText() {
  const editorRef = useRef();

  function addHtmlElement({ htmlElement }) {
    const selection = window.getSelection();
    //fail fast strategy
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    // rf: https://developer.mozilla.org/en-US/docs/Web/API/Range
    // To get indexes: range.startOffset and range.endOffset

    const selectedText = range.toString();

    if (selectedText.length <= 0) return;

    const similarParentNode = findSimilarParentNode(
      range,
      htmlElement,
      editorRef
    );

    //[WIP]Remove useless tag
    if (similarParentNode && selectedText === similarParentNode.innerHTML) {
      const textNode = document.createTextNode(selectedText);
      similarParentNode.parentNode.replaceChild(textNode, similarParentNode);
    } else if (similarParentNode) {
      console.log("SIMILAR PARENT BRANCH");
      // Split the similar parent node into three parts
      const parentInnerHTML = similarParentNode.innerHTML;
      const endNode = document.createElement(htmlElement);
      const startIdx = parentInnerHTML.indexOf(selectedText);
      const endIdx = startIdx + selectedText.length;

      endNode.innerHTML = parentInnerHTML.substring(endIdx);
      similarParentNode.parentNode.insertBefore(endNode, similarParentNode);

      //Avoid wrapping text inside a tag
      const middleNode = document.createTextNode(selectedText);
      similarParentNode.parentNode.insertBefore(middleNode, endNode);

      const startNode = document.createElement(htmlElement);
      startNode.innerHTML = parentInnerHTML.substring(0, startIdx);
      similarParentNode.parentNode.insertBefore(startNode, middleNode);

      clearEmptyTags([startNode, endNode]);

      // Remove the original
      similarParentNode.parentNode.removeChild(similarParentNode);
    } else {
      const wrapper = document.createElement(htmlElement);
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

  return (
    <>
      <div>
        <button
          style={{ padding: "8px", margin: "0 5px" }}
          onClick={() => {
            addHtmlElement({ htmlElement: HtmlElement.Bold });
          }}
        >
          B
        </button>
        <button
          style={{ padding: "8px", margin: "0 5px" }}
          onClick={() => {
            addHtmlElement({ htmlElement: HtmlElement.Italic });
          }}
        >
          I
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => {
          console.log("Text inside div:", e.currentTarget.textContent);
        }}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
          overflowY: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
        id="contentEditableDiv"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus
        ligula vel massa vestibulum, non tincidunt magna feugiat. Suspendisse
        consectetur nec dui non laoreet. Etiam auctor libero ipsum, nec
        fringilla urna elementum ut. Nullam hendrerit vulputate bibendum.
        Vestibulum convallis tellus sed sapien aliquam, vitae vestibulum velit
        pulvinar. Sed nunc enim, congue non laoreet ut, facilisis eu turpis.
        Donec eget velit sollicitudin, ultrices purus sed, volutpat erat. Sed
        hendrerit, eros non tristique congue, nibh felis eleifend nisi, sit amet
        laoreet ipsum orci vel lorem.
      </div>
    </>
  );
}
export default RichText;
