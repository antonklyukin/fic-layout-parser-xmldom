'use strict';

// const issue = require('./lib/issue.js');
const utils = require('./lib/utils.js');
const contents = require('./lib/contents.js');

let document = utils.getMockDocument('df-2018-02');

const tableEl = contents.getContentsHeaderElementRu(document);

console.log(tableEl);
