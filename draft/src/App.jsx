import { useRef, useState } from 'react';

const COLOURS = [
    // Grayscale
    "#000000", // Black
    "#434343", // Dark Gray
    "#666666", // Gray
    "#999999", // Light Gray
    "#CCCCCC", // Silver
    "#FFFFFF", // White

    // Primary Colors
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue

    // Secondary Colors
    "#FFFF00", // Yellow
    "#00FFFF", // Cyan
    "#FF00FF", // Magenta

    // Extended Palette
    "#FFA500", // Orange
    "#800080", // Purple
    "#A52A2A", // Brown
    "#808000", // Olive
    "#008000", // Dark Green
    "#008080", // Teal
    "#000080", // Navy
    "#800000", // Maroon

    // Soft Colors
    "#FFC0CB", // Pink
    "#FFA07A", // Light Salmon
    "#98FB98", // Pale Green
    "#ADD8E6", // Light Blue
    "#DDA0DD", // Plum
    "#F0E68C", // Khaki
];

function App() {
    const editorRef = useRef();
    const editorId = useRef(`richtext_${crypto.randomUUID()}`);
    const [hierarchy, setHierarchy] = useState();

    const getEditorSelection = () => {
        if (!editorRef.current) return null;
        return editorRef.current.ownerDocument.getSelection();
    };

    const trimRange = (range) => {
        if (!range || range.collapsed) return null;

        let { startContainer, startOffset, endContainer, endOffset } = range;

        // Trim start
        if (startContainer.nodeType === Node.TEXT_NODE) {
            const text = startContainer.textContent;
            let iStart = startOffset;

            while (iStart < text.length && text[iStart] === " ") {
                ++iStart;
            }

            if (iStart !== startOffset) {
                range.setStart(startContainer, iStart);
            }
        }

        // Trim end
        if (endContainer.nodeType === Node.TEXT_NODE) {
            const text = endContainer.textContent;
            let iEnd = endOffset - 1;

            while (iEnd >= 0 && text[iEnd] === " ") {
                --iEnd;
            }

            if (iEnd !== endOffset - 1) {
                range.setEnd(endContainer, iEnd + 1);
            }
        }

        return range.collapsed ? null : range;
    }

    const getClosestParentNode = (range) => {
        let closestParentContainer = range.commonAncestorContainer;

        if (closestParentContainer.nodeType !== Node.ELEMENT_NODE) {
            closestParentContainer = closestParentContainer.parentNode;
        }

        for (const child of closestParentContainer.children) {
            if (range.intersectsNode(child)) {
                closestParentContainer = child;
            }
        }

        return closestParentContainer;
    }

    const addNode = (range, htmlElement, styleKey, styleValue) => {
        const wrapper = editorRef.current.ownerDocument.createElement(htmlElement);
        wrapper.textContent = range.toString();
        wrapper.style[styleKey] = styleValue;

        range.deleteContents();
        range.insertNode(wrapper);
    }

    const removeNode = (node) => {
        // Move all child nodes to the parent
        const parentForBackup = node.parentNode;
        while (node.firstChild) {
            parentForBackup.insertBefore(
                node.firstChild,
                node
            );
        }

        // Remove the now-empty container
        node.remove();
    }

    const addHtmlElement = ({ htmlElement, style = {} }) => {
        const selection = getEditorSelection();
        if (!selection || !selection.rangeCount) return;

        let range = selection.getRangeAt(0);

        // Ensure selection is inside the editor
        if (!editorRef.current.contains(range.commonAncestorContainer)) {
            return;
        }

        // No empty selections
        if (range.collapsed) return;

        range = trimRange(range);
        if (!range) return;


        let styleKey = "";
        let styleValue = "";
        for (const [_styleKey, _styleValue] of Object.entries(style)) {
            styleKey = _styleKey;
            styleValue = _styleValue;
        }
        if (htmlElement === "span" && (styleKey === "" || styleValue === "")) return;


        // console.log(range, range.toString());
        let closestParentContainer = getClosestParentNode(range);

        // console.log(closestContainer, closestContainer.id, editorId.current);
        if (closestParentContainer.id === editorId.current) {
            // Root case : add span directly
            console.log("Root case", closestParentContainer);

            if (htmlElement !== "clear") {
                addNode(range, htmlElement, styleKey, styleValue);
            }

        } else {
            // Selection inside a node case
            console.log("Node case", closestParentContainer);

            // TODO : closestParentContainer.nodeName to check if span, div or others

            if (range.toString() === closestParentContainer.innerHTML) {
                // Same node case : should add or remove style and then clean span ?

                if (htmlElement === "clear") {
                    removeNode(closestParentContainer);

                } else {
                    const shouldRemove = (closestParentContainer.getAttribute("style")).includes(styleKey)
                        && (closestParentContainer.getAttribute("style")).includes(styleValue);

                    if (shouldRemove) {
                        for (const styleKey of Object.keys(style)) {
                            closestParentContainer.style[styleKey] = "";
                        }

                        if (closestParentContainer.getAttribute("style") === "") {
                            removeNode(closestParentContainer);
                        }

                    } else {
                        closestParentContainer.style[styleKey] = styleValue;
                    }
                }

            } else {
                // Sub node case

                if (htmlElement === "clear") {
                    removeNode(closestParentContainer);

                } else {
                    addNode(range, htmlElement, styleKey, styleValue);
                }
            }
        }

        // Move the cursor to the end of the new wrapper
        selection.removeAllRanges();

        //merge text nodes
        editorRef.current.normalize();

        setHierarchy(editorRef.current.innerHTML);
    };


    return (
        <div id="app">
            <h1>
                Rich Text
            </h1>

            <h2>Editor</h2>
            <div>
                <div>
                    <button
                        onClick={() => {
                            addHtmlElement({
                                htmlElement: "span",
                                style: { ["font-weight"]: "bold" }
                            });
                        }}
                    >
                        b
                    </button>
                    <button
                        onClick={() => {
                            addHtmlElement({
                                htmlElement: "span",
                                style: { ["font-style"]: "italic" }
                            });
                        }}
                    >
                        i
                    </button>
                    <button
                        onClick={() => {
                            addHtmlElement({
                                htmlElement: "span",
                                style: { ["text-decoration"]: "underline" }
                            });
                        }}
                    >
                        <u>u</u>
                    </button>
                    <button
                        onClick={() => {
                            addHtmlElement({
                                htmlElement: "span",
                                style: { ["text-decoration"]: "line-through" }
                            });
                        }}
                    >
                        <del>S</del>
                    </button>
                </div>
                <div>
                    {COLOURS.map((colour, index) => {
                        return (
                            <button key={`colour_${index}`}
                                style={{ width: "20px", backgroundColor: colour }}
                                onClick={() => {
                                    addHtmlElement({
                                        htmlElement: "span",
                                        style: { ["color"]: colour }
                                    });
                                }}
                            >
                                &nbsp;
                            </button>
                        );
                    })}
                </div>
                <div>
                    <button
                        onClick={() => {
                            addHtmlElement({
                                htmlElement: "div",
                                style: { ["text-align"]: "left" }
                            });
                        }}
                    >
                        left
                    </button>
                    <button
                        onClick={() => {
                            addHtmlElement({
                                htmlElement: "div",
                                style: { ["text-align"]: "right" }
                            });
                        }}
                    >
                        right
                    </button>
                    <button
                        onClick={() => {
                            addHtmlElement({
                                htmlElement: "div",
                                style: { ["text-align"]: "center" }
                            });
                        }}
                    >
                        center
                    </button>
                    <button
                        onClick={() => {
                            addHtmlElement({
                                htmlElement: "div",
                                style: { ["text-align"]: "justify" }
                            });
                        }}
                    >
                        justify
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            addHtmlElement({
                                htmlElement: "clear",
                                style: {}
                            });
                        }}
                    >
                        clear
                    </button>
                </div>
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning={true}
                    id={editorId.current}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        minHeight: "200px",
                        overflowY: "auto",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus
                    ligula vel massa vestibulum, non tincidunt magna feugiat. Suspendisse
                    consectetur nec dui non laoreet. Etiam auctor libero ipsum, nec
                    fringilla urna elementum ut. Nullam hendrerit vulputate bibendum.
                    Vestibulum convallis tellus sed sapien aliquam, vitae vestibulum velit
                    pulvinar. Sed nunc enim, congue non laoreet ut, facilisis eu turpis.
                    Donec eget velit sollicitudin, ultrices purus sed, volutpat erat. Sed
                    hendrerit, eros non tristique congue, nibh felis eleifend nisi,
                    sit amet laoreet ipsum orci vel lorem.
                </div>
            </div>

            <div>
                <h2>Result</h2>
                <div dangerouslySetInnerHTML={{ __html: hierarchy }} />
            </div>

            <div>
                <h2>Hierarchy</h2>
                <pre style={{ whiteSpace: "pre-wrap" }}>{hierarchy}</pre>
            </div>
        </div>
    );
}
export default App;
