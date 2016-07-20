/* @flow */
import {SHOW_COMPLETIONS} from "./types";
import type {ShowCompletionsAction} from "./types";

export const showCompletions = (doShow: boolean): ShowCompletionsAction => {
  return {
    type: SHOW_COMPLETIONS,
    doShow: doShow
  }
};
