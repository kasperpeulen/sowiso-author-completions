/* @flow */
import * as ActionTypes from './types';
import type {ShowCompletionsAction, CompletionContextUpdatedAction, ChangeSelectedIndexAction} from "./types";

export const showCompletions = (doShow: boolean): ShowCompletionsAction => {
  return {
    type: ActionTypes.showCompletionsAction,
    doShow
  }
};

export const updateCompletionContext = (newContext: string): CompletionContextUpdatedAction => {
  return {
    type: ActionTypes.completionContextUpdatedAction,
    completionContext: newContext
  }
};

export const changeSelectedIndex = (selectedIndex: number): ChangeSelectedIndexAction => {
  return {
    type: ActionTypes.changeSelectedIndexAction,
    selectedIndex
  }
};