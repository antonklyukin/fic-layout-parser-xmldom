'use strict';

const issue = require('./lib/issue.js');
const { getMockDocument } = require('./lib/utils.js');

const document = getMockDocument('re-2016-01');

console.log(issue.getPublicationData(document));
