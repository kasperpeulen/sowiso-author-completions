/* @flow */
import * as ActionTypes from '../actions/types';
import type {Action} from '../actions/types';

export default (state: boolean = false, action: Action): boolean => {
  if (action.type === ActionTypes.SHOW_COMPLETIONS) {
    return action.doShow;
  }
  return state;
}
