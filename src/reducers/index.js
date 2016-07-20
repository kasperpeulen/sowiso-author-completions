import { combineReducers } from 'redux';
import showCompletions from './reducer_show_completions';

const rootReducer = combineReducers({
  showCompletions
});

export default rootReducer;
