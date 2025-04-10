const HtmlElement = {
    Bold: "b",
}

function RichText() {
    // const getParentNodes = (range) => {
    //     const parentNodes = new Set();
    //     const walk = (node) => {
    //         if (node && node.parentNode) {
    //             parentNodes.add(node.parentNode);
    //             walk(node.parentNode);
    //         }
    //     };
    //     walk(range.commonAncestorContainer);
    //     return parentNodes;
    // }

    const addHtmlElement = ({ htmlElement }) => {
        const selection = window.getSelection();
        if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            console.log("Range", range)
            // rf: https://developer.mozilla.org/en-US/docs/Web/API/Range
            // To get indexes: range.startOffset and range.endOffset

            const selectedText = range.toString();
            if (selectedText.length > 0) {
                const wrapper = document.createElement(htmlElement);
                wrapper.textContent = selectedText;

                range.deleteContents();
                range.insertNode(wrapper);

                // Move the cursor to the end of the new wrapper
                selection.removeAllRanges();
                const newRange = document.createRange();
                newRange.setStartAfter(wrapper);
                selection.addRange(newRange);
            }
        }
    }

    return (
        <>
            <div>
                <button style={{ padding: "8px" }} onClick={() => { addHtmlElement({ htmlElement: HtmlElement.Bold }); }}>B</button>
            </div>
            <div
                contentEditable
                onInput={(e) => {
                    console.log('Text inside div:', e.currentTarget.textContent);
                }}
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    minHeight: "200px",
                    overflowY: "auto",
                    width: "100%",
                    boxSizing: "border-box",
                }}
            />
        </>
    );
}
export default RichText;