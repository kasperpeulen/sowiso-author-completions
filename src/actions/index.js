import {SHOW_COMPLETIONS} from "./types";

export const showCompletions = (show: Boolean) => {
  return {
    type: SHOW_COMPLETIONS,
    payload: show
  }
};