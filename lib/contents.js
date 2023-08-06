// const DOMParser = require('@xmldom/xmldom');
const utils = require('./utils.js');
const issue = require('./issue.js');

/**
 * Функция для поиска элемента заголовка Содержание на русском, если нет русского
 * содержания, выводит на английском (ДФ в 2017-2018 гг.).
 * @name getContentsHeaderElementRu
 * @function
 * @param {Document} document XML Document to find
 * @param {String} journalName Name of journal issue
 * @param {String} issueYear Year of issue
 * @returns {Element} Found header element
 */
const getContentsHeaderElementRu = (document, journalName, issueYear) => {
  let headerEl = {};

  if (
    issueYear === '2018' &&
    (journalName === 'Финансы и кредит' ||
      journalName === 'Международный бухгалтерский учет')
  ) {
    headerEl = utils.getElementByTextContent(
      document,
      'text:h',
      'СОДЕРЖАНИЕ НОМЕРА'
    );
  } else if (
    (issueYear === '2017' || issueYear === '2018') &&
    journalName === 'Дайджест-Финансы'
  ) {
    headerEl = utils.getElementByTextContent(document, 'text:h', 'CONTENTS');
  } else {
    headerEl = utils.getElementByTextContent(document, 'text:h', 'СОДЕРЖАНИЕ');
  }

  return headerEl;
};

/**
 * Функция для поиска элемента заголовка Содержание на русском, если нет русского
 * содержания, выводит на английском (ДФ в 2017-2018 гг.).
 * @name getContentsHeaderElementEn
 * @function
 * @param {Document} document XML Document to find
 * @returns {Element} Found header element
 */
const getContentsHeaderElementEn = (document, journalName) => {
  // const journalName = issue.getJournalName(document);
  const issueYear = issue.getPublicationData(document)['year'];

  let headerEl = {};

  if (
    issueYear === '2018' &&
    (journalName === 'Финансы и кредит' ||
      journalName === 'Международный бухгалтерский учет')
  ) {
    headerEl = utils.getElementByTextContent(
      document,
      'text:h',
      'СОДЕРЖАНИЕ НОМЕРА'
    );
  } else if (
    (issueYear === '2017' || issueYear === '2018') &&
    journalName === 'Дайджест-Финансы'
  ) {
    headerEl = utils.getElementByTextContent(document, 'text:h', 'CONTENTS');
  } else {
    headerEl = utils.getElementByTextContent(document, 'text:h', 'СОДЕРЖАНИЕ');
  }

  return headerEl;
};

/**
 * Функция для нахождения списка элементов строк таблицы Содержание.
 * @function
 * @param {Document} document XML Document to find
 * @returns {HTMLCollectionOf<Element>}
 */
const getContentsTableRows = (document) => {
  const tableElement = getContentsHeaderElement(document);
  const tableRowElementsCollection =
    tableElement.getElementsByTagName('table:table-row');
  return tableRowElementsCollection;
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
    const textFromNode = utils.getTextContentFromNode(
      cellElementsCollection[i]
    );
    rowContensArray.push(utils.clearString(textFromNode));
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
 * @param {Document} document XML Document to find
 * @returns {Array<Object>}
 */
const getArticlesArray = (document) => {
  const tableRows = getContentsTableRows(document);
  const articlesArray = [];
  let currentRubric = '';

  for (let i = 0; i < tableRows.length; i++) {
    let currentArr = getRowCellsContentArray(tableRows[i]);

    if (currentArr.length == 1) {
      //Если пустая строка из одной ячейки в Содержании, пропустить
      if (utils.clearString(currentArr[0]) === '') {
        continue;
      } else {
        currentRubric = currentArr[0];
      }
    }
    if (currentArr.length == 2) {
      const clearedArr0 = utils.clearString(currentArr[0]);
      const clearedArr1 = utils.clearString(currentArr[1]);
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

module.exports = { getContentsHeaderElementRu };
