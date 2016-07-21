/* @flow */
import {Completions} from "../flowtypes";

// use import * as ActionTypes from '../actions/types';
// so you write ActionTypes.showCompletions
export const showCompletions = 'ShowCompletionsAction';
export const completionContextUpdated = 'CompletionContextUpdatedAction';
export const changeSelectedIndex = 'ChangeSelectedIndexAction';
export const initialCompletionsFetched = 'InitialCompletionsFetchedAction';

export type Action = ShowCompletionsAction
    | CompletionContextUpdatedAction
    | ChangeSelectedIndexAction;

export type ShowCompletionsAction = {
  type: 'ShowCompletionsAction',
  doShow: boolean
};

export type CompletionContextUpdatedAction = {
  type: 'CompletionContextUpdatedAction',
  completionContext: string
}

export type ChangeSelectedIndexAction = {
  type: 'ChangeSelectedIndexAction',
  selectedIndex: number
}

export type InitialCompletionsFetchedAction = {
  type: 'InitialCompletionsFetchedAction',
  completions: Completions
}
