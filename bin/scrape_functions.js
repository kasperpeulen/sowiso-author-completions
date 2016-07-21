/* @flow */
import fs from 'fs';
import path from 'path';
import {jsdom} from 'jsdom';
import fsp from 'fs-promise';

// get the file from https://cloud.sowiso.nl/docs/exercise_manual
// this file is not checked in
const inputFile = 'bin/exercise_manual.html';
const outputDir = 'src/resources';
const outputFile = 'sowiso_php_functions.json';

(async() => {
  if (!await workingDirectoryIsRootOfPackage(process.cwd())) {
    console.log("Run this script from the root folder, where package.json lives");
    return;
  }

  let html;
  try {
    html = await fsp.readFile(inputFile, 'utf8');
  } catch (err) {
    console.log(err);
    return;
  }

  const json = turnRawHtmlIntoJson(html);

  if (!await fsp.exists(outputDir)) {
    await fsp.mkdir(outputDir);
  }

  try {
    const outputPath = path.join(outputDir, outputFile);
    await fsp.writeFile(outputPath, JSON.stringify(json));
    console.log(`Created ${outputPath}`);
  } catch (e) {
    console.log(e);
  }
})();

// pure function
function turnRawHtmlIntoJson(html: String): [{completion: string, description: string}] {
  const window = jsdom(html).defaultView;

  const headings = window.document.querySelectorAll('h3');
  const heading = [].filter.call(headings, h => {
    return (h.textContent === 'SOWISO PHP functions');
  })[0];

  const table = heading.nextElementSibling.nextElementSibling;
  const tbody = table.firstElementChild.nextElementSibling;
  const trChilds = tbody.children;

  return [].map.call(trChilds, (tr) => {
    const completion = tr.firstElementChild.textContent;
    const description = tr.firstElementChild.nextElementSibling.textContent;
    return {
      completion,
      description
    };
  });
}

async function workingDirectoryIsRootOfPackage(workingDirectory: string): Promise<boolean> {
  try {
    const packagePath = path.join(workingDirectory, 'package.json');
    await fsp.access(packagePath, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}
