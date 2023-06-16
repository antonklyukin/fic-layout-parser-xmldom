'use strict';

/**
 * Clear text string from tabs, multiple spaces, trailing spaces.
 * @name clearString
 * @function
 * @param {string} str String to clear
 * @returns {string} Cleared string
 */
const clearString = (str) => {
  const strInOneLine = str.replace(/[\t\n\r]+/g, '');
  const strOneSpaced = strInOneLine.replace(/\s+/g, ' ');
  const strTrimmed = strOneSpaced.trim();
  return strTrimmed;
};

export { clearString };
