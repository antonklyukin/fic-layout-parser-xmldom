'use strict';

import * as issue from './issue.js';
import * as utils from './utils.js';

let document = utils.getMockDocument('ia-2019-11');

//Объект выпуска журнала
let issueData = {};

issueData.journalName = issue.getJournalName(document);
issueData.publicationData = issue.getPublicationData(document);

console.log(issueData.journalName);
console.log(issueData.publicationData.month);
