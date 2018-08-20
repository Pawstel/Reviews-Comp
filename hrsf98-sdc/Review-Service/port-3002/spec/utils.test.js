
import utils from '../client/src/utils.js';

const formatDate = utils.formatDate;
const input = "2018-01-14T19:04:23.000Z";

describe('utils tests: formatDate', () => {
  test('formatDate should return a string', () => {
    expect(typeof formatDate(input)).toBe('string');
  });

  test('formatDate should return correct year and month', () => {
    expect(formatDate(input)).toMatch(/January 2018/);
  })
});
