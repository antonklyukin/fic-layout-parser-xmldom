'use strict';

import * as fs from 'fs';

/**
 * Stub function to create LayoutInfo object. Returns object with layout data files.
 * @function
 * @param {String} prefix
 */
const getLayoutInfoObjMock = (prefix) => {
  const contentFullPath = `./test_layouts/content_${prefix}.xml`;
  const stylesFullPath = `./test_layouts/styles_${prefix}.xml`;

  const contentDataText = fs.readFileSync(contentFullPath, {
    encoding: 'utf-8',
  });
  const stylesDataText = fs.readFileSync(stylesFullPath, {
    encoding: 'utf-8',
  });
  return { contentDataText, stylesDataText };
};

export { getLayoutInfoObjMock };
