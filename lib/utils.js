'use strict';

const { DOMParser } = require('@xmldom/xmldom');

const { getLayoutInfoObjMock } = require('./stubs.js');

/**
 * Clear text string from tabs, multiple spaces, trailing spaces.
 * @name clearString
 * @function
 * @param {string} str String to clear
 * @returns {string} Cleared string
 */
const clearString = (str) => {
  const strInOneLine = str.replace(/[\t\n\r]+/g, '');
  const strWithASCIIHyphenOnly = strInOneLine.replace(/[‐‑‒–—―−]/g, '-');
  const strOneSpaced = strWithASCIIHyphenOnly.replace(/\s+/g, ' ');
  const strTrimmed = strOneSpaced.trim();
  return strTrimmed;
};

/**
 * Функция возвращает текстовое содержимое из узла
 * @function
 * @param {Element} el
 * @param {String} text
 */
const getTextContentFromNode = (el, text = '') => {
  const nodeList = el.childNodes;
  let nodeText = text;

  for (let i = 0; i < nodeList.length; i++) {
    let currentNode = nodeList[i];

    if (currentNode.nodeType === 3) {
      nodeText += currentNode.textContent;
    }
    if (currentNode.nodeType === 1) {
      if (currentNode.nodeName === 'text:line-break') {
        nodeText += ' ';
      } else {
        nodeText = getTextContentFromNode(currentNode, nodeText);
      }
    }
  }
  return nodeText;
};

/**
 * Возвращает DOM Document из выбранной тестовой верстки
 * @function
 * @param {String} layoutName Название файла верстки из директории test_layouts
 * @returns {Document}
 */
const getMockDocument = (layoutName) => {
  const getDomData = (layoutInfoObj) => {
    const contentDomData = new DOMParser().parseFromString(
      layoutInfoObj.contentDataText,
      'text/xml'
    );
    const stylesDomData = new DOMParser().parseFromString(
      layoutInfoObj.stylesDataText,
      'text/xml'
    );
    return { contentDomData, stylesDomData };
  };

  const layoutTextData = getLayoutInfoObjMock(layoutName); // Gets Layout Info from odt (Stub)
  const layoutDomData = getDomData(layoutTextData);

  return layoutDomData.contentDomData;
};

/**
 * Функция для поиска определенного тега с определенным текстовым содержанием.
 * @name getContentsHeaderElement
 * @function
 * @param {Document} document XML Document to find
 * @param {String} text Tag Name
 * @param {String} text Text in tag
 * @returns {Element} Found element
 */
const getElementByTextContent = (document, tagName, text) => {
  const textElements = document.getElementsByTagName(tagName);
  for (let i = 0; i < textElements.length; i += 1) {
    const elementText = clearString(textElements[i].textContent);
    if (elementText === text) {
      return textElements[i];
    }
    return 0;
  }
};

/**
 * @function
 * @param {Object} obj
 * @returns {Boolean}
 */
const isObjectEmpty = (obj) => {
  return (
    Object.keys(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0 &&
    obj.constructor === Object
  );
};

module.exports = {
  clearString,
  getMockDocument,
  getTextContentFromNode,
  getElementByTextContent,
  isObjectEmpty,
};
