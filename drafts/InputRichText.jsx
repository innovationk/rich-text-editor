import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Underline from "../lib/textStyles/Underline";
import Bold from "../lib/textStyles/Bold";
import Italic from "../lib/textStyles/Italic";
import Color from "../lib/textStyles/Color";
import Alignments from "../lib/textStyles/Alignments";
// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';

const CSS = `
.inputRichMenu {
    border: 1px solid #ccc;
    background-color: whitesmoke;
}
.inputRichRow {
    box-sizing: border-box;
    display: table;
    width: 100%;
}
.inputRichDiv {
    display: table-cell;
    vertical-align: middle;
}
.inputRichInput {
    border: none;
    background-color: transparent;
}
.inputRichTextButton {
    background-color: transparent;
    color: black;
    border: none;
    text-algin: enter;
}
.inputRichTextButton svg {
    height: 25px;
    width: 25px;
}
.inputRichBorders {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: none;
    border-top: none;
    border-radius: 0px;
}
`;

const InputRichText = forwardRef(function InputRichText(
  {
    label = "",
    name = "",
    initValue = "",
    required = false,
    labelClasses = "ikBlock",
  },
  ref
) {
  // const { t } = useTranslation();
  const editorRef = useRef(null);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
  }));

  const setValue = (newValue) => {
    editorRef.current.innerHTML = newValue;
  };

  const getValue = () => {
    return editorRef.current.innerHTML;
  };

  // Function to toggle a style on the selected text
  const toggleStyle = (style, value, isAlignment = false) => {
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
  };

  const toggleUppercase = () => toggleStyle("textTransform", "uppercase");
  const toggleLowercase = () => toggleStyle("textTransform", "lowercase");

  const toggleList = (listType) => {
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
  };

  return (
    <>
      <style>{CSS}</style>

      <label className={labelClasses} htmlFor={name.length > 0 ? name : label}>
        {label}
        {required && (
          <span style={{ marginLeft: "2px" }}>
            <b>
              <sup style={{ color: "red" }}>*</sup>
            </b>
          </span>
        )}
      </label>

      <div className="inputRichMenu">
        <div className="inputRichRow">
          <div className="inputRichDiv" style={{ textAlign: "left" }}>
            <Bold />
            <Italic />
            <Underline />
            <Color />
          </div>

          <div className="inputRichDiv" style={{ textAlign: "center" }}>
            <Alignments />
          </div>

          <div className="inputRichDiv" style={{ textAlign: "right" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleList("ol");
              }}
              className={`inputRichTextButton`}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.99999 1H15V3H6.99999V1Z" fill="#000000" />
                <path d="M6.99999 5H15V7H6.99999V5Z" fill="#000000" />
                <path d="M15 9H6.99999V11H15V9Z" fill="#000000" />
                <path d="M6.99999 13H15V15H6.99999V13Z" fill="#000000" />
                <path
                  d="M3.28854 10.75H0.999993V9H3.28854C4.30279 9 5.12499 9.82221 5.12499 10.8364C5.12499 11.3407 4.91763 11.8228 4.55155 12.1696L3.41116 13.25H4.99999V15H0.999993V13.1236L3.348 10.8992C3.36523 10.8829 3.37499 10.8602 3.37499 10.8364C3.37499 10.7887 3.33629 10.75 3.28854 10.75Z"
                  fill="#000000"
                />
                <path
                  d="M2.358 1.125L0.723297 1.6699L1.2767 3.3301L2.125 3.04733V7H3.875V1.125H2.358Z"
                  fill="#000000"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleList("ul");
              }}
              className={`inputRichTextButton`}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 1H1V3H3V1Z" fill="#000000" />
                <path d="M3 5H1V7H3V5Z" fill="#000000" />
                <path d="M1 9H3V11H1V9Z" fill="#000000" />
                <path d="M3 13H1V15H3V13Z" fill="#000000" />
                <path d="M15 1H5V3H15V1Z" fill="#000000" />
                <path d="M15 5H5V7H15V5Z" fill="#000000" />
                <path d="M5 9H15V11H5V9Z" fill="#000000" />
                <path d="M15 13H5V15H15V13Z" fill="#000000" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleUppercase();
              }}
              className={`inputRichTextButton`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 9L9 4M9 9L6.5 7M9 9L11.5 7"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5861 19.1946C10.5203 18.9868 10.3274 18.8455 10.1094 18.8455H7.55474C7.33675 18.8455 7.14388 18.9868 7.07807 19.1946L6.65978 20.5154C6.59397 20.7233 6.4011 20.8645 6.18311 20.8645H4.72359C4.37391 20.8645 4.13223 20.5148 4.2559 20.1877L7.60741 11.3232C7.68095 11.1287 7.86717 11 8.0751 11H9.58987C9.7974 11 9.98336 11.1282 10.0572 11.3222L13.4308 20.1867C13.5553 20.5139 13.3136 20.8645 12.9635 20.8645H11.4811C11.2631 20.8645 11.0702 20.7233 11.0044 20.5154L10.5861 19.1946ZM7.79577 16.9252C7.75489 17.0541 7.85115 17.1856 7.98642 17.1856H9.66955C9.80482 17.1856 9.90108 17.0541 9.8602 16.9252L9.01863 14.2707C8.95964 14.0846 8.69633 14.0846 8.63734 14.2707L7.79577 16.9252Z"
                  fill="#000000"
                />
                <path
                  d="M18.1268 20.8645C18.0402 20.8645 17.9763 20.8529 17.9413 20.7736C17.8621 20.5943 17.6066 20.4922 17.4472 20.6064C17.0811 20.8688 16.6326 21 16.1016 21C15.3584 21 14.7409 20.7967 14.2491 20.3902C13.7628 19.9837 13.5196 19.4575 13.5196 18.8117C13.5196 18.0438 13.8147 17.4499 14.4048 17.0298C15.0005 16.6098 15.8557 16.3952 16.9705 16.3862H17.1754C17.4516 16.3862 17.6754 16.1623 17.6754 15.8862V15.7967C17.6754 15.467 17.6071 15.2344 17.4705 15.0989C17.3339 14.9634 17.1344 14.8957 16.8721 14.8957C16.4947 14.8957 16.2402 15.0146 16.1087 15.2523C15.9751 15.494 15.7794 15.7358 15.5032 15.7358H14.1835C13.9074 15.7358 13.6755 15.5083 13.7433 15.2406C13.8596 14.7814 14.1457 14.3887 14.6016 14.0623C15.2191 13.6197 15.9978 13.3984 16.9377 13.3984C17.9104 13.3984 18.6618 13.6084 19.1918 14.0285C19.7274 14.444 19.9951 15.0402 19.9951 15.8171V19.2656C20.0061 19.8979 19.9951 20.3651 19.9951 20.7493C19.9951 20.8129 19.9436 20.8645 19.88 20.8645H18.1268ZM16.618 19.4959C16.8748 19.4959 17.0934 19.453 17.2738 19.3672C17.389 19.3124 17.4853 19.251 17.5626 19.1833C17.6435 19.1124 17.6754 19.0042 17.6754 18.8966V18.0379C17.6754 17.7618 17.4516 17.5379 17.1754 17.5379H17.118C16.7246 17.5379 16.4131 17.6418 16.1836 17.8496C15.9595 18.0574 15.8475 18.3351 15.8475 18.6829C15.8475 19.2249 16.1043 19.4959 16.618 19.4959Z"
                  fill="#000000"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleLowercase();
              }}
              className={`inputRichTextButton`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 9L17 4M17 9L14.5 7M17 9L19.5 7"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5861 19.1946C10.5203 18.9868 10.3274 18.8455 10.1094 18.8455H7.55474C7.33675 18.8455 7.14388 18.9868 7.07807 19.1946L6.65978 20.5154C6.59397 20.7233 6.4011 20.8645 6.18311 20.8645H4.72359C4.37391 20.8645 4.13223 20.5148 4.2559 20.1877L7.60741 11.3232C7.68095 11.1287 7.86717 11 8.0751 11H9.58987C9.7974 11 9.98336 11.1282 10.0572 11.3222L13.4308 20.1867C13.5553 20.5139 13.3136 20.8645 12.9635 20.8645H11.4811C11.2631 20.8645 11.0702 20.7233 11.0044 20.5154L10.5861 19.1946ZM7.79577 16.9252C7.75489 17.0541 7.85115 17.1856 7.98642 17.1856H9.66955C9.80482 17.1856 9.90108 17.0541 9.8602 16.9252L9.01863 14.2707C8.95964 14.0846 8.69633 14.0846 8.63734 14.2707L7.79577 16.9252Z"
                  fill="#000000"
                />
                <path
                  d="M18.1268 20.8645C18.0402 20.8645 17.9763 20.8529 17.9413 20.7736C17.8621 20.5943 17.6066 20.4922 17.4472 20.6064C17.0811 20.8688 16.6326 21 16.1016 21C15.3584 21 14.7409 20.7967 14.2491 20.3902C13.7628 19.9837 13.5196 19.4575 13.5196 18.8117C13.5196 18.0438 13.8147 17.4499 14.4048 17.0298C15.0005 16.6098 15.8557 16.3952 16.9705 16.3862H17.1754C17.4516 16.3862 17.6754 16.1623 17.6754 15.8862V15.7967C17.6754 15.467 17.6071 15.2344 17.4705 15.0989C17.3339 14.9634 17.1344 14.8957 16.8721 14.8957C16.4947 14.8957 16.2402 15.0146 16.1087 15.2523C15.9751 15.494 15.7794 15.7358 15.5032 15.7358H14.1835C13.9074 15.7358 13.6755 15.5083 13.7433 15.2406C13.8596 14.7814 14.1457 14.3887 14.6016 14.0623C15.2191 13.6197 15.9978 13.3984 16.9377 13.3984C17.9104 13.3984 18.6618 13.6084 19.1918 14.0285C19.7274 14.444 19.9951 15.0402 19.9951 15.8171V19.2656C20.0061 19.8979 19.9951 20.3651 19.9951 20.7493C19.9951 20.8129 19.9436 20.8645 19.88 20.8645H18.1268ZM16.618 19.4959C16.8748 19.4959 17.0934 19.453 17.2738 19.3672C17.389 19.3124 17.4853 19.251 17.5626 19.1833C17.6435 19.1124 17.6754 19.0042 17.6754 18.8966V18.0379C17.6754 17.7618 17.4516 17.5379 17.1754 17.5379H17.118C16.7246 17.5379 16.4131 17.6418 16.1836 17.8496C15.9595 18.0574 15.8475 18.3351 15.8475 18.6829C15.8475 19.2249 16.1043 19.4959 16.618 19.4959Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
          overflowY: "auto",
        }}
      />
    </>
  );
});
// InputRichText.propTypes = {
//     label: PropTypes.string,
//     name: PropTypes.string,
//     initValue: PropTypes.string,
//     required: PropTypes.bool,
//     labelClasses: PropTypes.string,
// };
export default InputRichText;
