import {SHOW_COMPLETIONS} from "../actions/types";

export default (state = false, action): Boolean => {
  if (action.type == SHOW_COMPLETIONS) {
    return action.payload;
  }
  return state;
}
