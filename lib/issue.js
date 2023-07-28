'use strict';

const utils = require('./utils.js');

const journalISSN = {
  '2071-4688': 'Финансы и кредит',
  '2073-039X': 'Экономический анализ: теория и практика',
  '2073-1477': 'Региональная экономика: теория и практика',
  '2073-2872': 'Национальные интересы: приоритеты и безопасность',
  '2073-4484': 'Финансовая аналитика: проблемы и решения',
  '2073-5081': 'Международный бухгалтерский учет',
  '2073-8005': 'Дайджест-Финансы',
};

const journalAcronyms = {
  'Финансы и кредит': 'fc',
  'Экономический анализ: теория и практика': 'ea',
  'Региональная экономика: теория и практика': 're',
  'Национальные интересы: приоритеты и безопасность': 'ni',
  'Финансовая аналитика: проблемы и решения': 'fa',
  'Международный бухгалтерский учет': 'ia',
  'Дайджест-Финансы': 'df',
};

const journalTomeNumbersIn2016 = {
  'Финансы и кредит': '22',
  'Экономический анализ: теория и практика': '15',
  'Региональная экономика: теория и практика': '14',
  'Национальные интересы: приоритеты и безопасность': '12',
  'Финансовая аналитика: проблемы и решения': '9',
  'Международный бухгалтерский учет': '19',
  'Дайджест-Финансы': '21',
};

const months = {
  январь: ['1', 'january'],
  февраль: ['2', 'february'],
  март: ['3', 'march'],
  апрель: ['4', 'april'],
  май: ['5', 'may'],
  июнь: ['6', 'june'],
  июль: ['7', 'july'],
  август: ['8', 'august'],
  сентябрь: ['9', 'september'],
  октябрь: ['10', 'october'],
  ноябрь: ['11', 'november'],
  декабрь: ['12', 'decemeber'],
};

/**
 * Функция возвращает название журнала по найденному в макете выпуска ISSN
 * @function
 * @param {Document} document
 * @returns {String}
 */
const getJournalName = (document) => {
  let tableCells = document.getElementsByTagName('table:table-cell');

  for (let i = 0; i < tableCells.length; i++) {
    let cellText = utils.getTextContentFromNode(tableCells[i]);
    for (const [issn, journalName] of Object.entries(journalISSN)) {
      if (cellText.includes('ISSN ' + issn)) {
        return journalName;
      }
    }
  }
  return null;
};

/**
 * Функция возвращает объект с данными о датах публикации выпуска
 * @function
 * @param {Document} document
 * @returns {Object|null}
 */

const getPubDates = (document) => {
  const pubDates = {};
  const regexp = new RegExp(
    [
      'Подписано в печать (\\d\\d.\\d\\d.\\d\\d\\d\\d)\\s?',
      'Выход в свет (\\d\\d.\\d\\d.(\\d\\d\\d\\d))',
    ].join('')
  );
  const tableCells = document.getElementsByTagName('table:table-cell');
  // console.log(tableCells.length);
  for (let i = 0; i < tableCells.length; i++) {
    let cellText = utils.getTextContentFromNode(tableCells[i]);
    cellText = utils.clearString(cellText);
    const found = cellText.match(regexp);
    if (found) {
      pubDates.pubDate = found[1];
      pubDates.releaseDate = found[2];
      pubDates.releaseYear = found[3];
      return pubDates;
    }
  }
  return null;
};

const getjournalTomeNumberIn2016 = (document) => {
  const journalName = getJournalName(document);
  return journalTomeNumbersIn2016[journalName];
};

/**
 * Функция возвращает объект с найденными номером тома, номером выпуска и годом выпуска
 * @function
 * @param {Document} document
 * @returns {Object|null}
 */
const getPublicationData = (document) => {
  const pubDates = getPubDates(document);
  const releaseYear = pubDates ? pubDates.releaseYear : null;
  const journalName = getJournalName(document);

  if (releaseYear === '2016') {
    //Если выпуск 2016 года
    const pubData = {};
    const regexp = /(\d+)\s\((\d+)\)\s?(\D+)\s(\d\d\d\d)/;
    const tableCells = document.getElementsByTagName('table:table-cell');
    for (let i = 0; i < tableCells.length; i++) {
      let cellText = utils.getTextContentFromNode(tableCells[i]);
      cellText = utils.clearString(cellText);
      const found = cellText.match(regexp);
      if (found) {
        pubData.tome = getjournalTomeNumberIn2016(document);
        pubData.issue = found[1];
        pubData.month = String(found[3]).toLowerCase().trim(); //Убираем пробел после regex
        pubData.year = found[4];

        return pubData;
      }
    }
  }

  if (releaseYear !== '2016') {
    const pubData = {};
    const regexp = /ТОМ\s(\d+)\D+\s?ВЫПУСК\s(\d+)(\D+)(\d+)/;
    const tableCells = document.getElementsByTagName('table:table-cell');
    for (let i = 0; i < tableCells.length; i++) {
      let cellText = utils.getTextContentFromNode(tableCells[i]);
      cellText = utils.clearString(cellText);
      const found = cellText.match(regexp);

      if (found) {
        const tome = found[1];
        let issue = found[2].trim();
        let month = utils.clearString(found[3].toLowerCase());
        month = month.replace(/\s+/, '');
        const year = found[4];

        if (
          // Назначаем номер выпуска по месяцу для сдвоенных и счетвернных выпусков
          (journalName === 'Финансы и кредит' ||
            journalName === 'Международный бухгалтерский учет') &&
          releaseYear === '2018'
        ) {
          issue = months[month][0];
        }

        pubData.tome = tome;
        pubData.issue = issue;
        pubData.month = month;
        pubData.year = year;

        return pubData;
      }
    }
  }
  return null;
};

const getThroughIssueNumberOfIssue = (document) => {
  const pubDates = getPubDates(document);
  const releaseYear = pubDates ? pubDates.releaseYear : null;

  if (releaseYear === '2016') {
    const regexp = /\d+\s\((\d+)\)\s?\D+\s\d\d\d\d/;
    const tableCells = document.getElementsByTagName('table:table-cell');
    for (let i = 0; i < tableCells.length; i++) {
      let cellText = utils.getTextContentFromNode(tableCells[i]);
      cellText = utils.clearString(cellText);
      let found = cellText.match(regexp);
      if (found) {
        return found[1];
      }
    }
    return null;
  } else {
    const regexp = /Валовый\s+\(сквозной\)\s+номер\s+(\d+)[\s\r]+Формат/;
    const tableCells = document.getElementsByTagName('table:table-cell');
    for (let i = 0; i < tableCells.length; i++) {
      let cellText = utils.getTextContentFromNode(tableCells[i]);
      cellText = utils.clearString(cellText);
      let found = cellText.match(regexp);
      if (found) {
        return found[1];
      }
    }
    return null;
  }
};

module.exports = {
  getJournalName,
  getPubDates,
  getPublicationData,
  getThroughIssueNumberOfIssue,
};
