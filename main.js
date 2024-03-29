const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

async function main() {
  console.log(process.argv);
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit();
  } else if (process.argv.length > 3) {
    console.log("too many command line args");
    process.exit();
  }
  const baseURL = process.argv[2];
  console.log(`starting crawl ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main();
