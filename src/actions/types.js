/* @flow */


// use import * as ActionTypes from '../actions/types';
// so you write ActionTypes.showCompletionsAction
export const showCompletionsAction = 'ShowCompletionsAction';
export const completionContextUpdatedAction = 'CompletionContextUpdatedAction';

export type Action = ShowCompletionsAction
    | CompletionContextUpdatedAction;

export type ShowCompletionsAction = {
  type: 'ShowCompletionsAction',
  doShow: boolean
};

export type CompletionContextUpdatedAction = {
  type: 'CompletionContextUpdatedAction',
  completionContext: string
}
