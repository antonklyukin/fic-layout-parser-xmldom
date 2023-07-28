'use strict';

const issue = require('./lib/issue.js');
const utils = require('./lib/utils.js');
const { DOMParser } = require('@xmldom/xmldom');

// let document = getMockDocument('df-2018-02');

// console.log(issue.getPublicationData(document));

// document = getMockDocument('fc-2018-06');

// console.log(issue.getPublicationData(document));

let cell = `
<table:table-cell table:style-name="Таблица11.B1" office:value-type="string"><text:p text:style-name="ТитулНомерВыпускаРус"><text:span text:style-name="T945">ТОМ </text:span><text:span text:style-name="ТитулНомерТомРус"><text:span text:style-name="T945">2</text:span></text:span><text:span text:style-name="ТитулНомерТомРус"><text:span text:style-name="T946">4</text:span></text:span><text:span text:style-name="T945">, ВЫПУСК </text:span><text:span text:style-name="ТитулНомерВыпускРус"><text:span text:style-name="T946">2</text:span></text:span><text:span text:style-name="ТитулНомерВыпускРус"><text:span text:style-name="T947">1</text:span></text:span></text:p><text:p text:style-name="ТитулГодВыпускаРус"><text:span text:style-name="ТитулНомерМесяцРус"><text:span text:style-name="T946">ИЮНЬ</text:span></text:span><text:span text:style-name="T945"> </text:span><text:span text:style-name="ТитулНомерГодРус"><text:span text:style-name="T945">201</text:span></text:span><text:span text:style-name="ТитулНомерГодРус"><text:span text:style-name="T947">8</text:span></text:span></text:p></table:table-cell>
`;

const doc = new DOMParser().parseFromString(cell, 'text/xml');

let cellText = utils.getTextContentFromNode(doc);

console.log(utils.clearString(cellText));
