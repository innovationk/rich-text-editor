import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Underline from "../textDecorators/Underline";
import Bold from "../textDecorators/Bold";
import Italic from "../textDecorators/Italic";
import Color from "../textDecorators/Color";
import Alignments from "../textDecorators/Alignments";
import UpperCase from "../textDecorators/UpperCase";
import LowerCase from "../textDecorators/LowerCase";
import OrderedList from "../textDecorators/OrderedList";
import UnorderedList from "../textDecorators/UnorderedList";
import { RichTextRow } from "./RichTextRow";
import { RichTextBlock } from "./RichTextBlock";

const CSS = `
.richTextMenu {
    border: 1px solid #ccc;
    background-color: whitesmoke;
}
.richTextRow {
    box-sizing: border-box;
    display: table;
    width: 100%;
}
.richTextDiv {
    display: table-cell;
    vertical-align: middle;
}
.inputRichInput {
    border: none;
    background-color: transparent;
}
.richTextButton {
    background-color: transparent;
    color: black;
    border: none;
    text-algin: enter;
}
.richTextButton svg {
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

/**
 * @type {RichTextComponentProps}
 * @returns React.JSX.Element
 */
function RichTextComponent(
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


  function handleChange(e) {
    e.preventDefault();
    console.log(e.key);
  }

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

      <div className="richTextMenu">
        <RichTextRow>
          <RichTextBlock position="left">
            <Bold />
            <Italic />
            <Underline />
            <Color />
          </RichTextBlock>

          <RichTextBlock position="center">
            <Alignments />
          </RichTextBlock>

          <RichTextBlock position="right">
            <OrderedList />
            <UnorderedList />

            <UpperCase />
            <LowerCase />
          </RichTextBlock>
        </RichTextRow>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onKeyUp={handleChange}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
          overflowY: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </>
  );
}

/**
 * @callback RichTextComponentProps
 * @param {Object} props
 * @param {string} [props.label=""]
 * @param {string} [props.name=""]
 * @param {string} [props.labelClasses = "ikBlock"]
 * @param {boolean} [props.required = false]
 * @param {React.Ref} ref
 *
 * @returns {React.JSX.Element}
 */

const RichText = forwardRef(RichTextComponent);
export default RichText;
