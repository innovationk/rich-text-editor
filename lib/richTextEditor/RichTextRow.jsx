import { Children } from "react";

/**
 *
 * @param {RichTextRowProps} RichTextRowProps - {@link RichTextRowProps}
 * @returns React.JSX.Element
 */
export function RichTextRow({ children }) {
  return (
    <div className="richTextRow">
      {Children.map(children, (child) => child)}
    </div>
  );
}

/**
 * @typedef {Object} RichTextRowProps
 * @param {Array} children - Array of React.ReactNode
 */
