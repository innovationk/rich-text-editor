import { useEffect, useRef, useState } from "react";
import {
  cleanEmptyTags,
  createGivenElement,
  createTextNode,
  findSimilarParentNode,
} from "./helpers";

const HtmlElement = {
  Bold: "b",
  Italic: "i",
};

function RichText() {
  const editorRef = useRef();
  const [selection, setSelection] = useState();

  useEffect(() => {
    document.addEventListener("mouseup", () => {
      const selected = document.getSelection();
      setSelection(selected.toString());
    });
  }, []);

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
      editorRef.current.id
    );

    if (similarParentNode) {
      // Split the similar parent node into three parts
      const parentInnerHTML = similarParentNode.innerHTML;

      const startIdx = parentInnerHTML.indexOf(selectedText);
      const endIdx = startIdx + selectedText.length;

      const endNodeContent = parentInnerHTML.substring(endIdx);

      const endNode =
        endNodeContent === " "
          ? createTextNode(endNodeContent)
          : createGivenElement(htmlElement, endNodeContent);

      similarParentNode.parentNode.insertBefore(endNode, similarParentNode);

      //Avoid wrapping text inside a tag
      const middleNode = document.createTextNode(selectedText);
      similarParentNode.parentNode.insertBefore(middleNode, endNode);

      const startNodeContent = parentInnerHTML.substring(0, startIdx);
      const startNode =
        startNodeContent === " "
          ? createTextNode(startNodeContent)
          : createGivenElement(htmlElement, startNodeContent);
      similarParentNode.parentNode.insertBefore(startNode, middleNode);

      cleanEmptyTags([startNode, endNode]);

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

    //merge text nodes
    editorRef.current.normalize();
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
        hendrerit, eros <b>non tristique congue</b>, nibh felis eleifend nisi,
        sit amet laoreet ipsum orci vel lorem.
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <h3>Selection preview:</h3>
        <p
          style={{
            whiteSpace: "pre",
            border: "1px solid black",
          }}
        >
          {selection?.toString()}
        </p>
        <ul>
          <li>length: {selection?.toString().length}</li>
          <li>
            first char:
            <span style={{ whiteSpace: "pre", border: "1px dashed blue" }}>
              {selection?.toString().slice(0, 1)}
            </span>
          </li>
          <li>
            last char:{" "}
            <span style={{ whiteSpace: "pre", border: "1px dashed blue" }}>
              {selection?.toString().slice(-1)}
            </span>
          </li>
          <li>
            number of spaces:{" "}
            {
              selection
                ?.toString()
                .split("")
                .filter((char) => char === " ").length
            }
          </li>
          <li>anchor node: {selection?.anchorNode?.nodeName}</li>
          <li>focus node: {selection?.focusNode?.nodeName}</li>
        </ul>
      </div>
    </>
  );
}
export default RichText;
