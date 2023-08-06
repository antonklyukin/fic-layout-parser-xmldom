const utils = require('../lib/utils.js');
const contents = require('../lib/contents.js');

describe('getContentsHeaderElementRu() Testing', () => {
  it('getContentsHeaderElementRu(ea-2023-05) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ea-2023-05');
    expect(
      contents.getContentsHeaderElementRu(
        document,
        'Экономический анализ: теория и практика',
        '2023'
      )
    ).toBeInstanceOf(Object);
  });
  it('getContentsHeaderElementRu(fc-2018-06) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2018-06');
    expect(
      contents.getContentsHeaderElementRu(document, 'Финансы и кредит', '2018')
    ).toBeInstanceOf(Object);
  });
  it('getContentsHeaderElementRu(fc-2023-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('fc-2023-01');
    expect(
      contents.getContentsHeaderElementRu(document, 'Финансы и кредит', '2023')
    ).toBeInstanceOf(Object);
  });
  it('getContentsHeaderElementRu(ia-2019-11) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('ia-2019-11');
    expect(
      contents.getContentsHeaderElementRu(
        document,
        'Международный бухгалтерский учет',
        '2019'
      )
    ).toBeInstanceOf(Object);
  });
  it('getContentsHeaderElementRu(re-2016-01) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('re-2016-01');
    expect(
      contents.getContentsHeaderElementRu(
        document,
        'Региональная экономика: теория и практика',
        '2016'
      )
    ).toBeInstanceOf(Object);
  });
  it('getContentsHeaderElementRu(df-2018-02) Testing', () => {
    expect.hasAssertions();
    const document = utils.getMockDocument('df-2018-02');
    expect(
      contents.getContentsHeaderElementRu(document, 'Дайджест-Финансы', '2018')
    ).toBeInstanceOf(Object);
  });
});
