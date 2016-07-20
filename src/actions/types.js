/* @flow */


// use import * as ActionTypes from '../actions/types';
// so you write ActionTypes.showCompletionsAction
export const showCompletionsAction = 'ShowCompletionsAction';
export const completionContextUpdatedAction = 'CompletionContextUpdatedAction';
export const changeSelectedIndexAction = 'ChangeSelectedIndexAction';

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
