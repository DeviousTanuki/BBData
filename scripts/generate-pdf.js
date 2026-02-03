import path from 'node:path';
import http from 'node:http';
import puppeteer from 'puppeteer';
import handler from 'serve-handler';

const BASE_URL = process.env.BASE_URL ?? '/';
const siteDir = path.resolve('_site');

const PDFS = [
  {
    url: `http://localhost:3000${BASE_URL}paper_miniatures/index.html`,
    path: path.resolve('_site/paper_miniatures/paper_miniatures.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm', },
  },
  {
    url: `http://localhost:3000${BASE_URL}paper_miniatures/index.html?no_color`,
    path: path.resolve('_site/paper_miniatures/paper_miniatures_(no_color).pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm', },
  },
  {
    url: `http://localhost:3000${BASE_URL}cheat_sheets/index.html`,
    path: path.resolve('_site/cheat_sheets/cheat_sheets.pdf'),
    format: 'A6',
    printBackground: true,
    margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm', },
  },
]

const server = http.createServer((request, response) => {
  let { method, url } = request;

  response.on('finish', () => {
    console.log(`${method} ${url} -> ${response.statusCode}`);
  });

  if (BASE_URL !== '/') {
    if (!url.startsWith(BASE_URL)) {
      response.statusCode = 404;
      response.end();
      return;
    }
    request.url = url.slice(BASE_URL.length - 1);
  }

  return handler(request, response, {
    public: siteDir,
    cleanUrls: false,
  });
});

server.listen(3000, async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (let pdf of PDFS) {
    const page = await browser.newPage();
    page.setJavaScriptEnabled(true);
    await page.goto(pdf.url, { waitUntil: 'networkidle0' });
    await page.pdf(pdf);
  }
  await browser.close();
  server.close();
});