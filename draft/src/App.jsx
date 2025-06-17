import { useRef, useState } from 'react';

function App() {
    const editorRef = useRef();
    const [hierarchy, setHierarchy] = useState();

    const addHtmlElement = ({ htmlElement, style = {} }) => {
        // TODO: use ref instead of doc
        const selection = document.getSelection();

        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        // TODO: trim range

        const selectedText = range.toString();

        if (selectedText.length <= 0) return;

        const referenceID = editorRef.current.id;
        console.log("ref", referenceID, range);

        // TODO: case inside same htmlelement

        const wrapper = document.createElement(htmlElement);
        wrapper.textContent = selectedText;
        for (const [styleKey, styleValue] of Object.entries(style)) {
            wrapper.setAttribute("style", `${styleKey}: ${styleValue}`);
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
                    id={`richtext_${Date.now()}`}
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
