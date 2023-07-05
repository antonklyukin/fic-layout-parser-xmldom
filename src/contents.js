import { getLayoutInfoObjMock } from './stubs.js';
import { clearString } from './utils.js';

import { DOMParser } from '@xmldom/xmldom';

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

const layoutTextData = getLayoutInfoObjMock('fc-2018-06'); // Gets Layout Info from odt (Stub)
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
const getElementByTextContent = (doc, tagName, text) => {
  const textElements = doc.getElementsByTagName(tagName);
  for (let i = 0; i < textElements.length; i += 1) {
    const elementText = clearString(textElements[i].textContent);
    if (elementText === text) {
      return textElements[i];
    }
    return 0;
  }
};

/**
 * Функция для поиска элемента таблицы с содержанием выпуска журнала.
 * @name getContentsTableElement
 * @function
 * @param {Document} doc XML Document to find
 * @returns {Element} Found table element
 */
const getContentsTableElement = (doc) => {
  let headerEl = {};
  //Флаг, сигнализирующий, что выпуск журнала 2018 года
  let year2018 = false;
  headerEl = getElementByTextContent(doc, 'text:h', 'СОДЕРЖАНИЕ');
  if (headerEl === 0) {
    year2018 = true;
  }
  if (year2018) {
    headerEl = getElementByTextContent(doc, 'text:h', 'СОДЕРЖАНИЕ НОМЕРА');

    while ((headerEl = headerEl.nextSibling)) {
      if (headerEl.nodeName === 'table:table') {
        return headerEl;
      }
    }
  } else {
    while ((headerEl = headerEl.nextSibling)) {
      if (headerEl.nodeName === 'table:table') {
        return headerEl;
      }
    }
  }
};

/**
 * Функция для нахождения списка элементов строк таблицы Содержание.
 * @function
 * @param {Document} doc XML Document to find
 * @returns {HTMLCollectionOf<Element>}
 */
const getContentsTableRows = (doc) => {
  const tableElement = getContentsTableElement(doc);
  const tableRowElementsCollection =
    tableElement.getElementsByTagName('table:table-row');
  return tableRowElementsCollection;
};

/**
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
 * Функция для вывода элементов строки Содержания в массив.
 * @function
 * @param {Element} rowElement
 * @returns {Array<String>}
 */
const getRowCellsContentArray = (rowElement) => {
  const rowContensArray = [];
  const cellElementsCollection =
    rowElement.getElementsByTagName('table:table-cell');
  for (let i = 0; i < cellElementsCollection.length; i++) {
    const textFromNode = getTextContentFromNode(cellElementsCollection[i]);
    rowContensArray.push(clearString(textFromNode));
  }
  return rowContensArray;
};

/**
 * Функция формирует массив из строки содержания, где элемент 0 - ФИО авторов, элемент 1 - название статьи
 * @param {String} str
 * @returns {Array<String>}
 */
const getAuthorsAndArticleName = (text) => {
  const regexp =
    /(^[а-яА-ЯёЁa-zA-Z\s\.\,]+(?=[а-яА-ЯёЁa-zA-Z]\.)[а-яА-ЯёЁa-zA-Z\.]+)\s+(.+)/;
  const matchedValues = text.match(regexp);
  const articlesAndAuthorsArr = [matchedValues[1], matchedValues[2]];

  return articlesAndAuthorsArr;
};

/**
 * Функция возвращает массив объектов с информацией о статьях из содержания выпуска журнала.
 * @function
 * @param {Document} doc XML Document to find
 * @returns {Array<Object>}
 */
const getArticlesArray = (doc) => {
  const tableRows = getContentsTableRows(doc);
  const articlesArray = [];
  let currentRubric = '';

  for (let i = 0; i < tableRows.length; i++) {
    let currentArr = getRowCellsContentArray(tableRows[i]);

    if (currentArr.length == 1) {
      //Если пустая строка из одной ячейки в Содержании, пропустить
      if (clearString(currentArr[0]) === '') {
        continue;
      } else {
        currentRubric = currentArr[0];
      }
    }
    if (currentArr.length == 2) {
      const clearedArr0 = clearString(currentArr[0]);
      const clearedArr1 = clearString(currentArr[1]);
      //Если пустая строка из двух ячеек в Содержании, пропустить
      if (clearedArr0 === '' && clearedArr1 === '') {
        continue;
      }
      //Если строка рубрики в Содержании состоит из двух ячеек (т.е. первая ячейка содержит название рубрики, а вторая ячейка пустая)
      if (clearedArr1 === '') {
        currentRubric = currentArr[0];
      } else {
        let article = {};
        if (clearedArr0.includes('Перечень материалов')) {
          article = {
            rubric: 'ПЕРЕЧЕНЬ МАТЕРИАЛОВ',
            authors: null,
            articleName: clearedArr0,
            startPage: clearedArr1,
          };
        } else {
          const authorsAndArticleNameArr = getAuthorsAndArticleName(
            currentArr[0]
          );
          article = {
            rubric: currentRubric,
            authors: authorsAndArticleNameArr[0],
            articleName: authorsAndArticleNameArr[1],
            startPage: Number(clearedArr1),
          };
        }
        articlesArray.push(article);
      }
    }
  }
  return articlesArray;
};

console.log(getArticlesArray(doc));
