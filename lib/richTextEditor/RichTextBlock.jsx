import { Children } from "react";

/**
 *
 * @type {RichTextBlockProps} RichTextBlockProps - {@link RichTextBlockProps}
 * @returns React.JSX.Element
 */
export function RichTextBlock({ children, position }) {
  return (
    <div className="richTextDiv" style={{ textAlign: position }}>
      {Children.map(children, (child) => child)}
    </div>
  );
}

/**
 * @typedef {Object} RichTextBlockProps
 * @property {Array} children - Array of React.ReactNode
 * @property {("left" | "center" | "right")} position - The position of the block in the RichTextRow
 */
