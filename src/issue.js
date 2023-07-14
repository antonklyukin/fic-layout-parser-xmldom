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
};

/**
 * Функция возвращает объект с найденными номером тома, номером выпуска и годом выпуска
 * @function
 * @param {Document} document
 * @returns
 */
const getPublicationData = (document) => {
  let pubData = {};
  const regexp = /^ТОМ\s+(\d+),\s+ВЫПУСК\s+(\d+)(\D+)(\d+)/;
  let tableCells = document.getElementsByTagName('table:table-cell');
  for (let i = 0; i < tableCells.length; i++) {
    let cellText = utils.getTextContentFromNode(tableCells[i]);
    let found = cellText.match(regexp);
    if (found) {
      pubData.tome = found[1];
      pubData.issue = found[2];
      pubData.month = found[3];
      pubData.year = found[4];
    }
  }

  return pubData;
};

module.exports = { getJournalName, getPublicationData };
