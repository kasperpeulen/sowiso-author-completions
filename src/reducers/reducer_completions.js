/* @flow */
import {Completion} from "../model/Completion";
import * as ActionTypes from '../actions/types';
import type {Action} from '../actions/types';

const completionData = [
  {
    completion: "sw_answer(a)",
    description: "gives access to the last given answers in text and in " +
    "evaluation, where `a` is the reference to the number of the answer field."
  },
  {
    completion: "sw_alist([1,2,3],b)",
    description: "returns an item from the array in the first argument at " +
    "position `b` from the second argument. Note that the first position is at " +
    "index `0.` e.g. `sw_alist(array(1,2,3),2)` returns `3`"
  },
  {
    completion: 'sw_concat(["a","b","c"])',
    description: 'returns the concatenation of the strings in the argument, ' +
    'e.g. `sw_concat(["a","b","c"])` returns `abc`'
  }
];

export type Completions = {
  all: [Completion],
  relevant: [Completion]
}

const allCompletions = completionData.map((c) => new Completion(c.completion, c.description));

const initial: Completions = {
  all: allCompletions,
  relevant: allCompletions
};

export default (state: Completions = initial, action: Action): Completions => {
  if (action.type === ActionTypes.completionContextUpdatedAction) {
    const completionContext = action.completionContext;
    const relevant = allCompletions.filter(c => c.completion.startsWith(completionContext));
    return {
      all: allCompletions,
      relevant
    }
  }
  return state
}
