import { combineReducers } from 'redux';
import showCompletions from './reducer_show_completions';
import completionPosition from './reducer_completion_position';

const rootReducer = combineReducers({
  showCompletions,
  completionPosition
});

export default rootReducer;
