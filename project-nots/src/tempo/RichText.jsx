const HtmlElement = {
    Bold: "b",
}

function RichText() {
    const getParentNodes = (range) => {
        let parentNodes = [];

        let currentNode = range.commonAncestorContainer;
        // TODO: use ref instead of document.getElementById('contentEditableDiv')
        while (currentNode && currentNode !== document.getElementById('contentEditableDiv')) {
            parentNodes.push(currentNode);
            currentNode = currentNode.parentNode;
        }

        return parentNodes;
    }

    const addHtmlElement = ({ htmlElement }) => {
        const selection = window.getSelection();
        if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            // console.log("Range", range)
            // rf: https://developer.mozilla.org/en-US/docs/Web/API/Range
            // To get indexes: range.startOffset and range.endOffset

            const selectedText = range.toString();
            if (selectedText.length > 0) {

                const parentNodes = getParentNodes(range);
                // let hasSimilarParent = false;
                let similarParentNode = null;
                for (const parentNode of parentNodes) {
                    // console.log("parentNode", parentNode);

                    if (
                        htmlElement === HtmlElement.Bold && parentNode.nodeType === Node.ELEMENT_NODE
                        && (parentNode.tagName === 'B')
                    ) {
                        // hasSimilarParent = true;
                        similarParentNode = parentNode;
                        break;
                    }
                }

                // console.log("similarParentNode", hasSimilarParent, similarParentNode);
                if (similarParentNode) {
                    // Split the similar parent node into three parts
                    const parentInnerHTML = similarParentNode.innerHTML;

                    let endNode = document.createElement(htmlElement);
                    endNode.innerHTML = parentInnerHTML.substring(range.endOffset);
                    similarParentNode.parentNode.insertBefore(endNode, similarParentNode);

                    let middleNode = document.createElement("span");
                    middleNode.innerHTML = parentInnerHTML.substring(range.startOffset, range.endOffset);
                    similarParentNode.parentNode.insertBefore(middleNode, endNode);

                    let beforeNode = document.createElement(htmlElement);
                    beforeNode.innerHTML = parentInnerHTML.substring(0, range.startOffset);
                    similarParentNode.parentNode.insertBefore(beforeNode, middleNode);

                    // Remove the original
                    similarParentNode.parentNode.removeChild(similarParentNode);
                } else {
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
                id="contentEditableDiv"
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus ligula vel massa vestibulum, non tincidunt magna feugiat.
                Suspendisse consectetur nec dui non laoreet. Etiam auctor libero ipsum, nec fringilla urna elementum ut.
                Nullam hendrerit vulputate bibendum. Vestibulum convallis tellus sed sapien aliquam, vitae vestibulum velit pulvinar.
                Sed nunc enim, congue non laoreet ut, facilisis eu turpis. Donec eget velit sollicitudin, ultrices purus sed, volutpat erat.
                Sed hendrerit, eros non tristique congue, nibh felis eleifend nisi, sit amet laoreet ipsum orci vel lorem.
            </div>
        </>
    );
}
export default RichText;