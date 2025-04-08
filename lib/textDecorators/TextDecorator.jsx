import { Children } from "react";

/**
 * 
 * @param {TextDecoratorProps} TextDecoratorProps - {@link TextDecoratorProps}
 * @returns JSX Element
 */
export default function TextDecorator({ cb, children }) {
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

/**
 * @typedef {Object} TextDecoratorProps
 * @property {function} cb - The callback to be called on click event
 * @property {Array} children - Array of ReactNode to display inside the button
 */
