/* @flow */
import * as ActionTypes from '../actions/types';
import type {Action} from '../actions/types';

export default (state: number = 0, action: Action): number => {
  if (action.type === ActionTypes.changeSelectedIndex) {
    return action.selectedIndex;
  }
  return state;
}
