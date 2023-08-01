const utils = require('../lib/utils.js');
const issue = require('../lib/issue.js');
// const { doc } = require('prettier');

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
    expect(() => {
      issue.getJournalName(document);
    }).toThrow('Название журнала не найдено!');
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
    expect(() => {
      issue.getPubDates(document);
    }).toThrow('Данные о датах публикации не найдены!');
  });
});

describe('getPublicationData() Testing', () => {
  it('getPublicationData(df-2018-02) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('df-2018-02');
    const pubData = issue.getPublicationData(document);
    expect(pubData).toMatchObject({
      volume: '23',
      issue: '2',
      month: 'апрель-июнь',
      pubDate: '20.06.2018',
      releaseDate: '27.06.2018',
      year: '2018',
    });
  });
  it('getPublicationData(ea-2023-05) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ea-2023-05');
    const pubData = issue.getPublicationData(document);
    expect(pubData).toMatchObject({
      volume: '22',
      issue: '5',
      month: 'май',
      pubDate: '24.05.2023',
      releaseDate: '30.05.2023',
      year: '2023',
    });
  });
  it('getPublicationData(fa-2018-04) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fa-2018-04');
    const pubData = issue.getPublicationData(document);
    expect(pubData).toMatchObject({
      volume: '11',
      issue: '4',
      month: 'октябрь-декабрь',
      pubDate: '23.11.2018',
      releaseDate: '29.11.2018',
      year: '2018',
    });
  });
  it('getPublicationData(fc-2018-06) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2018-06');
    const pubData = issue.getPublicationData(document);
    expect(pubData).toMatchObject({
      volume: '24',
      issue: '6',
      month: 'июнь',
      pubDate: '21.06.2018',
      releaseDate: '27.06.2018',
      year: '2018',
    });
  });
  it('getPublicationData(fc-2023-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2023-01');
    const pubData = issue.getPublicationData(document);
    expect(pubData).toMatchObject({
      volume: '29',
      issue: '1',
      month: 'январь',
      pubDate: '24.01.2023',
      releaseDate: '30.01.2023',
      year: '2023',
    });
  });
  it('getPublicationData(ia-2019-11) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ia-2019-11');
    const pubData = issue.getPublicationData(document);
    expect(pubData).toMatchObject({
      volume: '22',
      issue: '11',
      month: 'ноябрь',
      pubDate: '12.11.2019',
      releaseDate: '15.11.2019',
      year: '2019',
    });
  });
  it('getPublicationData(re-2016-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('re-2016-01');
    const pubData = issue.getPublicationData(document);
    expect(pubData).toMatchObject({
      volume: '14',
      issue: '1',
      month: 'январь',
      pubDate: '22.12.2015',
      releaseDate: '26.01.2016',
      year: '2016',
    });
  });
  it('getPublicationData(null) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('null');
    expect(() => {
      issue.getPubDates(document);
    }).toThrow('Данные о датах публикации не найдены!');
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
    expect(() => {
      issue.getPubDates(document);
    }).toThrow('Данные о датах публикации не найдены!');
  });
});

describe('getIssueMonthEn() Testing', () => {
  it('getIssueMonthEn(df-2018-02) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('df-2018-02');
    const pubData = issue.getPublicationData(document);
    expect(issue.getIssueMonthEn(pubData)).toBe('april-june');
  });
  it('getIssueMonthEn(fa-2018-04) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fa-2018-04');
    const pubData = issue.getPublicationData(document);
    expect(issue.getIssueMonthEn(pubData)).toBe('october-december');
  });
  it('getIssueMonthEn(fc-2023-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2023-01');
    const pubData = issue.getPublicationData(document);
    expect(issue.getIssueMonthEn(pubData)).toBe('january');
  });
  it('getIssueMonthEn(null) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('null');
    expect(() => {
      issue.getPubDates(document);
    }).toThrow('Данные о датах публикации не найдены!');
  });
});

describe('getIssueInfo() Testing', () => {
  it('getIssueInfo(re-2016-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('re-2016-01');
    const issueInfo = issue.getIssueInfo(document);
    expect(issueInfo).toMatchObject({
      journalNameRu: 'Региональная экономика: теория и практика',
      journalNameEn: 'Regional Economics: Theory and Practice',
      volume: '14',
      issue: '1',
      throughIssueNumber: '424',
      monthRu: 'январь',
      monthEn: 'january',
      year: '2016',
      pubDate: '22.12.2015',
      releaseDate: '26.01.2016',
    });
  });
  it('getIssueInfo(fa-2018-04) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fa-2018-04');
    const issueInfo = issue.getIssueInfo(document);
    expect(issueInfo).toMatchObject({
      journalNameRu: 'Финансовая аналитика: проблемы и решения',
      journalNameEn: 'Financial Analytics: Science and Experience',
      volume: '11',
      issue: '4',
      throughIssueNumber: '346',
      monthRu: 'октябрь-декабрь',
      monthEn: 'october-december',
      year: '2018',
      pubDate: '23.11.2018',
      releaseDate: '29.11.2018',
    });
  });
  it('getIssueInfo(fc-2023-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2023-01');
    const issueInfo = issue.getIssueInfo(document);
    expect(issueInfo).toMatchObject({
      journalNameRu: 'Финансы и кредит',
      journalNameEn: 'Finance and Credit',
      volume: '29',
      issue: '1',
      throughIssueNumber: '829',
      monthRu: 'январь',
      monthEn: 'january',
      year: '2023',
      pubDate: '24.01.2023',
      releaseDate: '30.01.2023',
    });
  });
});
