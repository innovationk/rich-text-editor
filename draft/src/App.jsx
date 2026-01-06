import { useRef, useState } from 'react';

function App() {
    const editorRef = useRef();
    const editorId = useRef(`richtext_${crypto.randomUUID()}`);
    const [hierarchy, setHierarchy] = useState();

    const getEditorSelection = () => {
        if (!editorRef.current) return null;
        return editorRef.current.ownerDocument.getSelection();
    };

    function trimRange(range) {
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

        // TODO: case inside same htmlelement

        const wrapper = editorRef.current.ownerDocument.createElement(htmlElement);
        wrapper.textContent = range.toString();
        for (const [styleKey, styleValue] of Object.entries(style)) {
            wrapper.style[styleKey] = styleValue;
        }

        range.deleteContents();
        range.insertNode(wrapper);

        // Move the cursor to the end of the new wrapper
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.setStartAfter(wrapper);
        selection.addRange(newRange);

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
