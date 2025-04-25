import { JSDOM } from "jsdom";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import {
  cleanEmptyTags,
  createTextNode,
  createGivenElement,
  findSimilarParentNode,
  getParentNodes,
} from "../src/tempo/helpers";

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
      if (child.nodeType !== 3) {
        wrapper.removeChild(child);
      }
    }
  }
});

describe("Helpers functionnalities", () => {
  describe("findSimilarParentNode", () => {
    test("should find container has parent node", () => {
      const wrapper = getWrapper();
      const child = createGivenElement("b");
      const range = createRange();

      child.id = "first-child";
      child.textContent = "this is a test";
      wrapper.appendChild(child);

      //selectionning text
      range.setStart(child, 0);
      range.setEnd(child, 0);

      const similarParentNode = findSimilarParentNode(
        range,
        "b",
        "test-wrapper"
      );

      expect(similarParentNode.id).toEqual(child.id);
    });

    test("should return null", () => {
      const wrapper = getWrapper();
      const range = createRange();

      range.setStart(wrapper, 0);
      range.setEnd(wrapper, 0);

      const similarParentNode = findSimilarParentNode(
        range,
        "b",
        "test-wrapper"
      );

      expect(similarParentNode).toBeNull();
    });
  });

  describe("getParentNodes", () => {
    test("should return test-wrapper as only parent node", () => {
      const wrapper = getWrapper();
      const range = createRange();

      range.setStart(wrapper, 0);
      range.setEnd(wrapper, 0);

      const parentNodes = getParentNodes("test-wrapper", range);

      expect(parentNodes.length).toBe(1);
      expect(parentNodes[0].id).toEqual("test-wrapper");
    });

    test("should return 2 parent node", () => {
      const wrapper = getWrapper();
      const child = createGivenElement("b");
      const range = createRange();

      child.textContent = "content of b element";
      wrapper.appendChild(child);

      range.setStart(child, 0);
      range.setEnd(child, 1);

      const parentNodes = getParentNodes("test-wrapper", range);

      expect(parentNodes.length).toBe(2);
    });
  });

  describe("cleanEmptyTags", () => {
    test("should let container with only its text node", () => {
      const wrapper = getWrapper();
      const child = createGivenElement("b");
      wrapper.appendChild(child);

      cleanEmptyTags(wrapper.childNodes);

      expect(wrapper.childNodes.length).toBe(1);
      expect(wrapper.childNodes[0].nodeType).toBe(3); //TextNode
    });

    test("should not remove tag if its length > 0", () => {
      const wrapper = getWrapper();
      const child = createGivenElement("b");
      child.textContent = " ";
      wrapper.appendChild(child);

      cleanEmptyTags(wrapper.childNodes);

      expect(wrapper.childNodes.length).toBe(2);
      expect(wrapper.childNodes[0].nodeType).toBe(3); //TextNode
      expect(wrapper.childNodes[1].nodeType).toBe(1); //ElementNode
    });
  });

  describe("Node creation helpers", () => {
    test("should create a text node with the given content", () => {
      const node = createTextNode("text content");

      expect(node.nodeType).toBe(3);
      expect(node.textContent).toEqual("text content");
    });

    test("should create a B node with the given content", () => {
      const boldElement = createGivenElement("b", "bold content");

      expect(boldElement.nodeType).toBe(1);
      expect(boldElement.nodeName).toBe("B");
      expect(boldElement.textContent).toEqual("bold content");
    });
  });
});

function getWrapper() {
  const { document } = dom.window;
  return document.getElementById("test-wrapper");
}

function createRange() {
  const { document } = dom.window;
  return document.createRange();
}
