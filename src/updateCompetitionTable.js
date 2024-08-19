const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'https://www.finland.rugby/sarjataulukko-321980v4/leagues/2508/seasons/213';

const cleanHtml = (html) => {
  return html.replace(/class="jss\d+"/g, '');
};

async function updateCompetitionTable() {
  let browser;
  try {
    console.log(`Fetching data from ${url}`);
    browser = await puppeteer.launch();
    const page = await browser.newPage();
   
    // Navigate to the page and wait for the content to load
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
   
    // Wait for any of these selectors to appear
    await page.waitForSelector('.jss473, table, .MuiTable-root', { timeout: 30000 });

    // Extract the table HTML
    const tableHtml = await page.evaluate(() => {
      const table = document.querySelector('.jss473') || document.querySelector('table') || document.querySelector('.MuiTable-root');
      return table ? table.outerHTML : null;
    });

    if (tableHtml) {
      const cleanedHtml = cleanHtml(tableHtml);
      fs.writeFileSync('public/competitionTable.html', cleanedHtml);
      console.log('Competition table updated successfully');
    } else {
      console.log('Could not find the competition table. Page HTML:');
      const pageContent = await page.content();
      console.log(pageContent);
    }
  } catch (error) {
    console.error('Error updating competition table:', error.message);
    if (error.name === 'TimeoutError') {
      console.log('The page took too long to load. Here\'s what was loaded:');
      const pageContent = await page.content();
      console.log(pageContent);
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

updateCompetitionTable();