let utils = require('../src/utils.js');
let issue = require('../src/issue.js');

let eaDocument = utils.getMockDocument('ia-2019-11');

test('getJournalName(ia-2019-11) Testing', () => {
  expect(issue.getJournalName(eaDocument)).toBe(
    'Международный бухгалтерский учет'
  );
});
