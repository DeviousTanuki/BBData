import path from 'node:path';
import http from 'node:http';
import puppeteer from 'puppeteer';
import handler from 'serve-handler';

const BASE_URL = process.env.BASE_URL ?? '/';
const siteDir = path.resolve('_site');
const url = `http://localhost:3000${BASE_URL}cheat_sheets/index.html`;
const output = path.resolve('_site/cheat_sheets/cheat_sheets.pdf');

const server = http.createServer((request, response) => {
  const { method, url } = request;
  response.on('finish', () => {
    console.log(`${method} ${url} -> ${response.statusCode}`);
  });
  return handler(request, response, {
    public: siteDir,
    cleanUrls: false,
    rewrites: BASE_URL === '/'
      ? []
      : [{ source: `${BASE_URL}**`, destination: '/$1' }],
  });
});

const server2 = http.createServer((request, response) => {
  const { method } = request;
  let { url } = request;

  response.on('finish', () => {
    console.log(`${method} ${url} -> ${response.statusCode}`);
  });

  // if (BASE_URL !== '/') {
  //   if (!url.startsWith(BASE_URL)) {
  //     response.statusCode = 404;
  //     response.end();
  //     return;
  //   }
  //   request.url = url.slice(BASE_URL.length - 1);
  // }

  return handler(request, response, {
    public: siteDir,
    cleanUrls: false,
  });
});

server2.listen(3000, async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: output,
    format: 'A6',
    printBackground: true,
  });

  await browser.close();
  server.close();
});