const puppeteer = require('puppeteer');

const pageURL = 'http://localhost:3002';

let page;
let browser;
const width = 1280;
const height = 720;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(() => {
  browser.close();
});

describe('end to end tests', () => {
  // beforeEach(async () => {
  // //   await page.goto(pageURL, {waitUntil: 'networkidle2'});
  // // });

  // test('pagination should have correct number of items', async () => {
  //   const pagination = '.-paginationStyles-pagination-main-1ECuWn-';
  //   const children = await page.$eval(pagination, e => e.childNodes.length);
  //   expect(children).toEqual(6);
  // });

  test('trial test', () => {

  });
});
