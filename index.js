'use strict';

const issue = require('./lib/issue.js');
const utils = require('./lib/utils.js');
const { DOMParser } = require('@xmldom/xmldom');

let document = utils.getMockDocument('fc-2023-01');

const issueData = issue.getIssueInfo(document);

console.log(issueData);
