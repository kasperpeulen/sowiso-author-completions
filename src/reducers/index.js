/* @flow */
import { combineReducers } from 'redux';
import showCompletions from './reducer_show_completions';
import completionPosition from './reducer_completion_position';
import completions from './reducer_completions';
import selectedCompletionIndex from './reducer_selected_completion_index';

const rootReducer = combineReducers({
  showCompletions,
  completionPosition,
  completions,
  selectedCompletionIndex
});

export default rootReducer;
