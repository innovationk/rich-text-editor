import { Children } from "react";

/**
 * 
 * @type {TextDecoratorProps}
 * @returns React.JSX.Element
 */
export default function TextDecorator({ cb, children }) {
  function handleClick(e) {
    e.preventDefault();
    cb();
  }
  return (
    <button onClick={handleClick} className="richTextButton">
      {Children.map(children, (child) => child)}
    </button>
  );
}

/**
 * @typedef TextDecoratorProps
 * @type {object}
 * @property {() => void} cb - The callback to be called on click event
 * @property {React.ReactNode[]} children - Array of ReactNode to display inside the button
 */
