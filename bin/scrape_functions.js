/* @flow */
import fs from 'fs';
import path from 'path';
import {jsdom} from 'jsdom';
import fsp from 'fs-promise';

// get the file from https://cloud.sowiso.nl/docs/exercise_manual
// this file is not checked in
const inputFile = 'bin/exercise_manual.html';
const outputDir = 'dist';
const outputFile = 'sowiso_php_functions.json';
const outputFile2 = 'standard_php_functions.json';

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

  // window on nodejs, coool
  const window = jsdom(html).defaultView;

  const jsonSowiso = extractSowisoFunctions(window);
  const jsonPhp = extractPhpFunctions(window);

  // concurrency!
  await Promise.all([
      writeJsonToFile(JSON.stringify(jsonSowiso), outputFile),
      writeJsonToFile(JSON.stringify(jsonPhp), outputFile2)
  ]);
})();

// pure function
function extractSowisoFunctions(window: Object): [{completion: string, description: string}] {
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

// pure function
function extractPhpFunctions(window: Object): [{completion: string, description: string}] {
  const headings = window.document.querySelectorAll('h3');
  const heading = [].filter.call(headings, h => {
    return (h.textContent === 'PHP functions');
  })[0];

  const theTextIWant = heading.nextElementSibling.nextElementSibling.textContent;

  return theTextIWant
      .split(",")
      .map((f) => f.trim() + "()")
      .map((f) => {
        return {
          completion: f,
          // TODO find some description
          description: ""
        };
      });
}

async function writeJsonToFile(json: string, outputFile: string): Promise<*> {
  if (!await fsp.exists(outputDir)) {
    await fsp.mkdir(outputDir);
  }

  try {
    const outputPath = path.join(outputDir, outputFile);
    await fsp.writeFile(outputPath, json);
    console.log(`Created ${outputPath}`);
  } catch (e) {
    console.log(e);
  }
}


async function workingDirectoryIsRootOfPackage(workingDirectory: string): Promise<*> {
  try {
    const packagePath = path.join(workingDirectory, 'package.json');
    await fsp.access(packagePath, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}
