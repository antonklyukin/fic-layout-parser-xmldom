'use strict';

const issue = require('./issue.js');
const { getMockDocument } = require('./utils.js');

const document = getMockDocument('re-2016-01');

console.log(issue.getPublicationData(document));
