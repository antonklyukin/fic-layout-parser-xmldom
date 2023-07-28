const utils = require('../lib/utils.js');
const issue = require('../lib/issue.js');

describe('getJournalName() Testing', () => {
  it('getJournalName(ea-2023-05) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ea-2023-05');
    expect(issue.getJournalName(document)).toBe(
      'Экономический анализ: теория и практика'
    );
  });
  it('getJournalName(fc-2018-06) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2018-06');
    expect(issue.getJournalName(document)).toBe('Финансы и кредит');
  });
  it('getJournalName(fc-2023-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2023-01');
    expect(issue.getJournalName(document)).toBe('Финансы и кредит');
  });
  it('getJournalName(ia-2019-11) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ia-2019-11');
    expect(issue.getJournalName(document)).toBe(
      'Международный бухгалтерский учет'
    );
  });
  it('getJournalName(re-2016-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('re-2016-01');
    expect(issue.getJournalName(document)).toBe(
      'Региональная экономика: теория и практика'
    );
  });
  it('getJournalName(null) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('null');
    expect(issue.getJournalName(document)).toBeNull();
  });
});

describe('getPubDates() Testing', () => {
  it('getPubDates(ea-2023-05) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ea-2023-05');
    expect(issue.getPubDates(document).pubDate).toBe('24.05.2023');
    expect(issue.getPubDates(document).releaseDate).toBe('30.05.2023');
    expect(issue.getPubDates(document).releaseYear).toBe('2023');
  });
  it('getPubDates(fc-2018-06) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2018-06');
    expect(issue.getPubDates(document).pubDate).toBe('21.06.2018');
    expect(issue.getPubDates(document).releaseDate).toBe('27.06.2018');
    expect(issue.getPubDates(document).releaseYear).toBe('2018');
  });
  it('getPubDates(fc-2023-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2023-01');
    expect(issue.getPubDates(document).pubDate).toBe('24.01.2023');
    expect(issue.getPubDates(document).releaseDate).toBe('30.01.2023');
    expect(issue.getPubDates(document).releaseYear).toBe('2023');
  });
  it('getPubDates(ia-2019-11) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ia-2019-11');
    expect(issue.getPubDates(document).pubDate).toBe('12.11.2019');
    expect(issue.getPubDates(document).releaseDate).toBe('15.11.2019');
    expect(issue.getPubDates(document).releaseYear).toBe('2019');
  });
  it('getPubDates(re-2016-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('re-2016-01');
    expect(issue.getPubDates(document).pubDate).toBe('22.12.2015');
    expect(issue.getPubDates(document).releaseDate).toBe('26.01.2016');
    expect(issue.getPubDates(document).releaseYear).toBe('2016');
  });
  /*TODO Поправить ошшибку Expected at least one assertion to be called but received none`*/
  it('getPubDates(null) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('null');
    expect(issue.getPubDates(document)).toBeNull();
  });
});

describe('getPublicationData() Testing', () => {
  it('getPublicationData(df-2018-02) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('df-2018-02');
    expect(issue.getPublicationData(document).tome).toBe('23');
    expect(issue.getPublicationData(document).issue).toBe('2');
    expect(issue.getPublicationData(document).month).toBe('апрель-июнь');
    expect(issue.getPublicationData(document).year).toBe('2018');
  });
  it('getPublicationData(ea-2023-05) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ea-2023-05');
    expect(issue.getPublicationData(document).tome).toBe('22');
    expect(issue.getPublicationData(document).issue).toBe('5');
    expect(issue.getPublicationData(document).month).toBe('май');
    expect(issue.getPublicationData(document).year).toBe('2023');
  });
  it('getPublicationData(fa-2018-04) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fa-2018-04');
    expect(issue.getPublicationData(document).tome).toBe('11');
    expect(issue.getPublicationData(document).issue).toBe('4');
    expect(issue.getPublicationData(document).month).toBe('октябрь-декабрь');
    expect(issue.getPublicationData(document).year).toBe('2018');
  });
  it('getPublicationData(fc-2018-06) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2018-06');
    expect(issue.getPublicationData(document).tome).toBe('24');
    expect(issue.getPublicationData(document).issue).toBe('6');
    expect(issue.getPublicationData(document).month).toBe('июнь');
    expect(issue.getPublicationData(document).year).toBe('2018');
  });
  it('getPublicationData(fc-2023-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2023-01');
    expect(issue.getPublicationData(document).tome).toBe('29');
    expect(issue.getPublicationData(document).issue).toBe('1');
    expect(issue.getPublicationData(document).month).toBe('январь');
    expect(issue.getPublicationData(document).year).toBe('2023');
  });
  it('getPublicationData(ia-2019-11) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ia-2019-11');
    expect(issue.getPublicationData(document).tome).toBe('22');
    expect(issue.getPublicationData(document).issue).toBe('11');
    expect(issue.getPublicationData(document).month).toBe('ноябрь');
    expect(issue.getPublicationData(document).year).toBe('2019');
  });
  it('getPublicationData(re-2016-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('re-2016-01');
    expect(issue.getPublicationData(document).tome).toBe('14');
    expect(issue.getPublicationData(document).issue).toBe('1');
    expect(issue.getPublicationData(document).month).toBe('январь');
    expect(issue.getPublicationData(document).year).toBe('2016');
  });
  it('getPublicationData(null) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('null');
    expect(issue.getPublicationData(document)).toBeNull();
  });
});

describe('getThroughIssueNumberOfIssue() Testing', () => {
  it('getThroughIssueNumber(ea-2023-05) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ea-2023-05');
    expect(issue.getThroughIssueNumberOfIssue(document)).toBe('536');
  });
  it('getThroughIssueNumberOfIssue(fc-2018-06) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2018-06');
    expect(issue.getThroughIssueNumberOfIssue(document)).toBe('774');
  });
  it('getThroughIssueNumberOfIssue(fc-2023-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2023-01');
    expect(issue.getThroughIssueNumberOfIssue(document)).toBe('829');
  });
  it('getThroughIssueNumberOfIssue(ia-2019-11) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ia-2019-11');
    expect(issue.getThroughIssueNumberOfIssue(document)).toBe('461');
  });
  it('getThroughIssueNumberOfIssue(re-2016-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('re-2016-01');
    expect(issue.getThroughIssueNumberOfIssue(document)).toBe('424');
  });
  it('getThroughIssueNumberOfIssue(null) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('null');
    expect(issue.getThroughIssueNumberOfIssue(document)).toBeNull();
  });
});
