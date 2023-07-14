'use strict';

const { getJournalName, getPublicationData } = require('./issue.js');
const { getMockDocument } = require('./utils.js');

let document = getMockDocument('ia-2019-11');

//Объект выпуска журнала
let issueData = {};

issueData.journalName = getJournalName(document);
issueData.publicationData = getPublicationData(document);

console.log(issueData.journalName);
console.log(issueData.publicationData.month);
