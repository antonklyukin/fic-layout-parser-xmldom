import * as fs from 'fs';

import { DOMParser } from '@xmldom/xmldom';

/**
 * Clear text string from tabs, multiple spaces, trailing spaces.
 * @name clearString
 * @function
 * @param {string} str String to clear
 * @returns {string} Cleared string
 */
const clearString = (str) => {
  const strInOneLine = str.replace(/[\t\n\r]+/gm, '');
  const strOneSpaced = strInOneLine.replace(/\s+/g, ' ');
  const strTrimmed = strOneSpaced.trim();
  return strTrimmed;
};

/**
 * Stub function to create LayoutInfo object. Returns object with layout data files.
 */
const getLayoutInfoObjMock = () => {
  const contentDataText = fs.readFileSync('./contents_test2.xml', {
    encoding: 'utf-8',
  });
  const stylesDataText = fs.readFileSync('./f_styles.xml', {
    encoding: 'utf-8',
  });
  return { contentDataText, stylesDataText };
};

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

const layoutTextData = getLayoutInfoObjMock(); // Gets Layout Info from odt (Stub)
const layoutDomData = getDomData(layoutTextData);

const doc = layoutDomData.contentDomData;

/**
 * Функция для поиска определенного тега с определенным текстовым содержанием.
 * @name getContentsHeaderElement
 * @function
 * @param {Document} doc XML Document to find
 * @param {String} text Tag Name
 * @param {String} text Text in tag
 * @returns {Element} Found element
 */
const getContentsHeaderElement = (doc, tagName, text) => {
  const textElements = doc.getElementsByTagName(tagName);
  for (let i = 0; i < textElements.length; i += 1) {
    const elementText = clearString(textElements[i].textContent);
    if (elementText === text) {
      return textElements[i];
    }
    return 0;
  }
};

const getContentsTableElement = (doc) => {
  const headerEl = getContentsHeaderElement(doc, 'text', 'СОДЕРЖАНИЕ');

  let el = headerEl;

  while ((el = el.nextSibling)) {
    if (el.nodeName === 'table') {
      return el;
    }
  }
};

const tableEl = getContentsTableElement(doc);
console.log(tableEl.childNodes);

/**
 * Функция для поиска элементов table:table-row в таблице 'СОДЕРЖАНИЕ'.
 * @name getContentsTableRows
 * @function
 * @param {Element} el Header element
 * @returns {HTMLCollectionOf<Element>} Found elements collection
 */
const getContentsTableRows = (el) => {
  const tableElement = el.childNodes[0].nextSibling;
  // const tableRowElements = tableElement.getElementsByTagName('table:table-row');
  return el;
};

// const tag = searchContentsTag(document);

// console.log(getContentsTableRows(searchContentsHeaderElement(doc)));
