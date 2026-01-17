import { useRef, useState } from 'react';

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
        if (styleKey === "" || styleValue === "") return;


        // console.log(range, range.toString());
        let closestParentContainer = getClosestParentNode(range);

        // console.log(closestContainer, closestContainer.id, editorId.current);
        if (closestParentContainer.id === editorId.current) {
            // Root case : add span directly
            console.log("Root case", closestParentContainer);
            addNode(range, htmlElement, styleKey, styleValue);

        } else {
            // Selection inside a node case
            console.log("Node case", closestParentContainer);

            if (range.toString() === closestParentContainer.innerHTML) {
                // Same node case : should add or remove style and then clean span ?
                const shouldRemove = (closestParentContainer.getAttribute("style")).includes(styleKey);

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

            } else {
                // Sub node case
                addNode(range, htmlElement, styleKey, styleValue);
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
                <h2>Hierarchy</h2>
                <pre style={{ whiteSpace: "pre-wrap" }}>{hierarchy}</pre>
            </div>
        </div>
    );
}
export default App;
