/* @flow */
import {Completion} from "./model/Completion";
import {initialCompletionsFetched} from "./actions/index";
import {store} from './store';
import chrome from './chrome';

const devMode = window.location.host.includes('localhost');

export async function fetchInitialState() {
  let url1 = 'sowiso_php_functions.json';
  url1 = devMode ? `dist/${url1}` : chrome.extension.getURL(url1);

  let url2 = 'standard_php_functions.json';
  url2 = devMode ? `dist/${url2}` : chrome.extension.getURL(url2);

  const jsons = await Promise.all([
    getJsonFromUrl(url1),
    getJsonFromUrl(url2)
  ]);
  const completionsData = [...JSON.parse(jsons[0]), ...JSON.parse(jsons[1])];
  const allCompletions = completionsData.map((c) => new Completion(c.completion, c.description));

  const initial = {
    all: allCompletions,
    relevant: allCompletions
  };

  store.dispatch(initialCompletionsFetched(initial));
}

async function getJsonFromUrl(url: string): Promise<string> {
  const response = await fetch(url);
  return await response.text();
}