const utils = require('../src/utils.js');
const issue = require('../src/issue.js');

describe('getJournalName() Testing', () => {
  it('getJournalName(ia-2019-11) Testing', () => {
    expect.hasAssertions();
    let eaDocument = utils.getMockDocument('ia-2019-11');
    expect(issue.getJournalName(eaDocument)).toBe(
      'Международный бухгалтерский учет'
    );
  });
  it('getJournalName(ea-2023-05) Testing', () => {
    expect.hasAssertions();
    let eaDocument = utils.getMockDocument('ea-2023-05');
    expect(issue.getJournalName(eaDocument)).toBe(
      'Экономический анализ: теория и практика'
    );
  });
  it('getJournalName(fc-2023-01) Testing', () => {
    expect.hasAssertions();
    let eaDocument = utils.getMockDocument('fc-2023-01');
    expect(issue.getJournalName(eaDocument)).toBe('Финансы и кредит');
  });
});
