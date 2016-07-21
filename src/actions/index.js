/* @flow */
import * as ActionTypes from './types';
import type {Completions} from "../flowtypes";
import type {ShowCompletionsAction, CompletionContextUpdatedAction, ChangeSelectedIndexAction, InitialCompletionsFetchedAction} from "./types";

export const showCompletions = (doShow: boolean): ShowCompletionsAction => {
  return {
    type: ActionTypes.showCompletions,
    doShow
  }
};

export const updateCompletionContext = (newContext: string): CompletionContextUpdatedAction => {
  return {
    type: ActionTypes.completionContextUpdated,
    completionContext: newContext
  }
};

export const changeSelectedIndex = (selectedIndex: number): ChangeSelectedIndexAction => {
  return {
    type: ActionTypes.changeSelectedIndex,
    selectedIndex
  }
};

export const initialCompletionsFetched = (completions: Completions): InitialCompletionsFetchedAction => {
  return {
    type: ActionTypes.initialCompletionsFetched,
    completions
  }
};