import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Underline from "../lib/textDecorators/Underline";
import Bold from "../lib/textDecorators/Bold";
import Italic from "../lib/textDecorators/Italic";
import Color from "../lib/textDecorators/Color";
import Alignments from "../lib/textDecorators/Alignments";
import UpperCase from "../lib/textDecorators/UpperCase";
import LowerCase from "../lib/textDecorators/LowerCase";
import OrderedList from "../lib/textDecorators/OrderedList";
import UnorderedList from "../lib/textDecorators/UnorderedList";

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
            <OrderedList />
            <UnorderedList />

            <UpperCase />
            <LowerCase />
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
export default InputRichText;
