import { Children } from "react";

/**
 *
 * @type {RichTextBlockProps}
 */
export function RichTextBlock({  position, children }) {
  return (
    <div className="richTextDiv" style={{ textAlign: position }}>
      {Children.map(children, (child) => child)}
    </div>
  );
}

/**
 * @callback RichTextBlockProps
 * 
 * @param {object} props
 * @param {("left" | "center" | "right")} props.position
 * @param {React.JSX.Element[]} [children]
 * @returns {React.JSX.Element}
 * 
 */