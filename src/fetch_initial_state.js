/* @flow */
import {Completion} from "./model/Completion";
import {initialCompletionsFetched} from "./actions/index";
import {store} from './store';

export async function fetchInitialState() {
  var json = await getJsonFromUrl('dist/sowiso_php_functions.json');
  var completionsData = JSON.parse(json);
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