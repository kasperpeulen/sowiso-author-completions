/* @flow */
import { combineReducers } from 'redux';
import showCompletions from './reducer_show_completions';
import completionPosition from './reducer_completion_position';
import completions from './reducer_completions';

const rootReducer = combineReducers({
  showCompletions,
  completionPosition,
  completions
});

export default rootReducer;
