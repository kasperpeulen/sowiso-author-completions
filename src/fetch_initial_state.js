/* @flow */
import {Completion} from "./model/Completion";
import {initialCompletionsFetched} from "./actions/index";
import {store} from './store';

export async function fetchInitialState() {
  const jsons = await Promise.all([
    getJsonFromUrl('dist/sowiso_php_functions.json'),
    getJsonFromUrl('dist/standard_php_functions.json')
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