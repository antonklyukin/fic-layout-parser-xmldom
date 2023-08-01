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

const journalNamesEn = {
  'Финансы и кредит': 'Finance and Credit',
  'Экономический анализ: теория и практика':
    'Economic Analysis: Theory and Practice',
  'Региональная экономика: теория и практика':
    'Regional Economics: Theory and Practice',
  'Национальные интересы: приоритеты и безопасность':
    'National Interests: Priorities and Security',
  'Финансовая аналитика: проблемы и решения':
    'Financial Analytics: Science and Experience',
  'Международный бухгалтерский учет': 'International Accounting',
  'Дайджест-Финансы': 'Digest Finance',
};

const journalVolumeNumbersIn2016 = {
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
  декабрь: ['12', 'december'],
};

/**
 * Функция возвращает название журнала по найденному в макете выпуска коду ISSN
 * @function
 * @param {Document} document
 * @returns {String|Error}
 */
const getJournalName = (document) => {
  let tableCells = document.getElementsByTagName('table:table-cell');
  let journalName = '';

  for (let i = 0; i < tableCells.length; i++) {
    let cellText = utils.getTextContentFromNode(tableCells[i]);
    for (const [issnInCell, journalNameInCell] of Object.entries(journalISSN)) {
      if (cellText.includes('ISSN ' + issnInCell)) {
        journalName = journalNameInCell;
        break;
      }
    }
  }
  if (!journalName) {
    throw new Error('Название журнала не найдено!');
  }
  return journalName;
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
  for (let i = 0; i < tableCells.length; i++) {
    let cellText = utils.getTextContentFromNode(tableCells[i]);
    cellText = utils.clearString(cellText);
    const found = cellText.match(regexp);
    if (found) {
      pubDates.pubDate = found[1];
      pubDates.releaseDate = found[2];
      pubDates.releaseYear = found[3];
      break;
    }
  }
  if (!pubDates.pubDate) {
    throw new Error('Данные о датах публикации не найдены!');
  }

  return pubDates;
};

/**
 * Функция возвращает номер тома выпуска в 2016 г.
 * @function
 * @param {Document} document
 * @returns {String|null}
 */
const getjournalVolumeNumberIn2016 = (document) => {
  const journalName = getJournalName(document);
  const journalVolumeNumberIn2016 = journalVolumeNumbersIn2016[journalName];
  if (journalVolumeNumberIn2016) {
    return journalVolumeNumberIn2016;
  } else {
    return null;
  }
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

  const pubData = {};

  if (releaseYear === '2016') {
    //Если выпуск 2016 года
    const regexp = /(\d+)\s\((\d+)\)\s?(\D+)\s(\d\d\d\d)/;
    const tableCells = document.getElementsByTagName('table:table-cell');
    for (let i = 0; i < tableCells.length; i++) {
      let cellText = utils.getTextContentFromNode(tableCells[i]);
      cellText = utils.clearString(cellText);
      const found = cellText.match(regexp);
      if (found) {
        pubData.volume = getjournalVolumeNumberIn2016(document);
        pubData.issue = found[1];
        pubData.month = String(found[3]).toLowerCase().trim(); //Убираем пробел после regex
        pubData.pubDate = pubDates.pubDate;
        pubData.releaseDate = pubDates.releaseDate;
        pubData.year = found[4];
        break;
      }
    }
  }

  if (releaseYear !== '2016') {
    const regexp = /ТОМ\s(\d+)\D+\s?ВЫПУСК\s(\d+)(\D+)(\d+)/;
    const tableCells = document.getElementsByTagName('table:table-cell');
    for (let i = 0; i < tableCells.length; i++) {
      let cellText = utils.getTextContentFromNode(tableCells[i]);
      cellText = utils.clearString(cellText);
      const found = cellText.match(regexp);

      if (found) {
        const volume = found[1];
        let issue = found[2].trim();
        let month = utils.clearString(found[3].toLowerCase());
        month = month.replace(/\s/g, ''); //Убираем возможный пробел после дефиса между месяцами
        const year = found[4];

        if (
          // Назначаем номер выпуска по месяцу для сдвоенных и счетвернных выпусков
          (journalName === 'Финансы и кредит' ||
            journalName === 'Международный бухгалтерский учет') &&
          releaseYear === '2018'
        ) {
          issue = months[month][0];
        }

        pubData.volume = volume;
        pubData.issue = issue;
        pubData.month = month;
        pubData.pubDate = pubDates.pubDate;
        pubData.releaseDate = pubDates.releaseDate;
        pubData.year = year;
        break;
      }
    }
  }
  return pubData;
};

/**
 * Функция ищет сквозной(валовый) номер выпуска
 * @function
 * @param {Document} document
 * @returns {String|null}
 */
const getThroughIssueNumberOfIssue = (document) => {
  let throughIssueNumber = '';
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
        throughIssueNumber = found[1];
        break;
      }
    }
  } else {
    const regexp = /Валовый\s+\(сквозной\)\s+номер\s+(\d+)[\s\r]+Формат/;
    const tableCells = document.getElementsByTagName('table:table-cell');
    for (let i = 0; i < tableCells.length; i++) {
      let cellText = utils.getTextContentFromNode(tableCells[i]);
      cellText = utils.clearString(cellText);
      let found = cellText.match(regexp);
      if (found) {
        throughIssueNumber = found[1];
        break;
      }
    }
    if (!throughIssueNumber) {
      throw new Error('Сквозной номер выпуска не найден!');
    }
  }
  return throughIssueNumber;
};

/**
 * Функция возваращает английское название месяц(а|ев) выпуска
 * @function
 * @param {Object} pubData Объект pubData, полученный на выходе из функции getPublicationData()
 * @returns {String|null}
 */
const getIssueMonthEn = (pubData) => {
  const monthRu = pubData.month;
  if (monthRu.includes('-')) {
    const monthsRuArr = monthRu.split('-');
    return `${months[monthsRuArr[0]][1]}-${months[monthsRuArr[1]][1]}`;
  } else {
    return months[monthRu][1];
  }
};

const getIssueInfo = (document) => {
  const IssueInfo = {};
  try {
    IssueInfo.journalNameRu = getJournalName(document);
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
    process.exit(1);
  }
  IssueInfo.journalNameEn = journalNamesEn[IssueInfo.journalNameRu];

  const pubData = getPublicationData(document);

  IssueInfo.volume = pubData.volume;
  IssueInfo.issue = pubData.issue;
  IssueInfo.throughIssueNumber = getThroughIssueNumberOfIssue(document);
  IssueInfo.monthRu = pubData.month;
  IssueInfo.monthEn = getIssueMonthEn(pubData);
  IssueInfo.year = pubData.year;
  IssueInfo.pubDate = pubData.pubDate;
  IssueInfo.releaseDate = pubData.releaseDate;

  return IssueInfo;
};

module.exports = {
  getJournalName,
  getPubDates,
  getPublicationData,
  getThroughIssueNumberOfIssue,
  getIssueMonthEn,
  getIssueInfo,
};
