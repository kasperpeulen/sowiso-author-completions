/* @flow */
import * as ActionTypes from '../actions/types';
import type {Action} from '../actions/types';
import type {Completions} from "../flowtypes";

export default (state: Completions = {all: [], relevant: [], completionContext: ""}, action: Action): Completions => {
  if (action.type === ActionTypes.completionContextUpdated) {
    const completionContext = action.completionContext;
    return calculateNewCompletions(state, completionContext);
  } else if (action.type === ActionTypes.initialCompletionsFetched) {
    return action.completions;
  }
  return state
}

const calculateNewCompletions = (completions: Completions, completionContext: string): Completions => {
  const relevant = completions.all.filter(c => c.completion.startsWith(completionContext));
  return {
    all: completions.all,
    relevant,
    completionContext
  }
};