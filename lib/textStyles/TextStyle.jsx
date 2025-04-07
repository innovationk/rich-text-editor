import { Children } from "react";

export default function TextStyle({ cb, children }) {
  function handleClick(e) {
    e.preventDefault();
    cb();
  }
  return (
    <button onClick={handleClick} className="inputRichTextButton">
      {Children.map(children, (child) => child)}
    </button>
  );
}
