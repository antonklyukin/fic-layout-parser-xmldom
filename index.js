'use strict';

const issue = require('./lib/issue.js');
const { getMockDocument } = require('./lib/utils.js');

const document = getMockDocument('fc-2018-06');

console.log(issue.getPublicationData(document));
