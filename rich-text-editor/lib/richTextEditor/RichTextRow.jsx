import { Children } from "react";

/**
 *
 * @type {RichTextRowProps}
 * 
 */
export function RichTextRow({ children }) {
  return (
    <div className="richTextRow">
      {Children.map(children, (child) => child)}
    </div>
  );
}

/**
 * @callback RichTextRowProps
 * @param {object} props
 * @param {React.JSX.Element[]} [props.children] - Array of JSX.Element
 * @returns {React.JSX.Element}
 * 
 */
