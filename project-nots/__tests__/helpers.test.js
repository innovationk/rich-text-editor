import { JSDOM } from "jsdom";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { findSimilarParentNode } from "../src/tempo/helpers";

let dom = null;
beforeAll(() => {
  dom = new JSDOM(`
        <!DOCTYPE HTML>
            <html>
                <body>
                    <div id="test-wrapper">
                        test wrapper content
                    </div>
                </body>
            </html>
        `);
});

afterAll(() => {
  dom = null;
});

afterEach(() => {
  const wrapper = dom.window.document.getElementById("test-wrapper");
  if (wrapper.hasChildNodes()) {
    for (const child of wrapper.childNodes) {
      wrapper.removeChild(child);
    }
  }
});

describe("Helpers functionnalities", () => {
  describe("findSimilarParentNode", () => {
    test("should find one parent node", () => {
      const child = createElement("b");
      const range = createRange(child);

      const similarParentNode = findSimilarParentNode(
        range,
        "b",
        "test-wrapper"
      );

      expect(similarParentNode.id).toEqual(child.id);
    });
  });
});

function getWrapper() {
  const { document } = dom.window;
  return document.getElementById("test-wrapper");
}

/**
 * Create a range inside the given child
 * @param {Node} child
 * @returns {Range}
 */
function createRange(child) {
  const { document } = dom.window;

  const wrapper = getWrapper();
  const range = document.createRange();
  document.createRange();

  child.id = "first-child";
  child.textContent = "this is a test";
  wrapper.appendChild(child);

  //selectionning text
  range.setStart(child, 0);
  range.setEnd(child, 0);

  return range;
}

/**
 *
 * @param {"b" | "i"} elt
 * @returns {Node}
 */
function createElement(elt) {
  const { document } = dom.window;
  return document.createElement(elt);
}
