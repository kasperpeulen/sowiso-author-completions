import { combineReducers } from 'redux';
import showCompletions from './reducer_show_completions';
import completionPosition from './reducer_completion_position';
import allCompletions from './reducer_all_completions';

const rootReducer = combineReducers({
  showCompletions,
  completionPosition,
  allCompletions
});

export default rootReducer;
