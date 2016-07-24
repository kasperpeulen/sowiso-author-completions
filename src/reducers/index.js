/* @flow */
import { combineReducers } from 'redux';
import showCompletions from './reducer_show_completions';
import completionPosition from './reducer_completion_position';
import completions from './reducer_completions';
import selectedCompletionIndex from './reducer_selected_completion_index';
import type {Action} from '../actions/types';
import {Position} from '../model/Position';
import type {Reducer} from 'redux';
import type {Completions} from "../flowtypes";

export type State = {
  showCompletions: boolean,
  completionPosition: Position,
  completions: Completions,
  selectedCompletionIndex: number
}

const rootReducer: Reducer<State, Action> = combineReducers({
  showCompletions,
  completionPosition,
  completions,
  selectedCompletionIndex
});

export default rootReducer;
