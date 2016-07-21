/* @flow */
import {jsdom} from 'jsdom';
import fsp from 'fs-promise';
import path from 'path';
import fs from 'fs';

// get the file from https://cloud.sowiso.nl/docs/exercise_manual
// this file is not checked in
const inputFile = 'bin/exercise_manual.html';
const outputDir = 'src/resources';
const outputFile = 'sowiso_php_functions.json';

async function getSowisoPhpFunctions() {
  if (!workingDirectoryIsRootOfPackage()) {
    console.log("Run this script from the root folder, where package.json lives");
    return;
  }

  let html;
  try {
    html = await fsp.readFile(inputFile, 'utf8');
  } catch (err) {
    console.log(err);
  }

  const window = jsdom(html).defaultView;

  const headings = window.document.querySelectorAll('h3');
  const heading = [].filter.call(headings, h => {
    return (h.textContent === 'SOWISO PHP functions');
  })[0];

  const table = heading.nextElementSibling.nextElementSibling;
  const tbody = table.firstElementChild.nextElementSibling;
  const trChilds = tbody.children;

  const results = [].map.call(trChilds, (tr) => {
    const completion = tr.firstElementChild.textContent;
    const description = tr.firstElementChild.nextElementSibling.textContent;
    return {
      completion,
      description
    };
  });

  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
  }

  try {
    await fsp.writeFile(path.join(outputDir, outputFile), JSON.stringify(results));
  } catch(e) {
    console.log(e);
  }

}

function workingDirectoryIsRootOfPackage(): boolean {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    fs.accessSync(packagePath, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

getSowisoPhpFunctions();
