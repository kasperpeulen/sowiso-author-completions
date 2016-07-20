/* @flow */
import {Position} from '../model/Position';
import {absolutePositionElement, caretPosition} from '../helper_functions';
import {elementIsCompletionElement} from "../helper_functions";
import type {Action} from '../actions/types';
import * as ActionTypes from '../actions/types';

export default (state: Position = new Position(100, 100), action: Action): Position => {
  if (action.type === ActionTypes.showCompletionsAction && action.doShow) {
    const activeElement = document.activeElement;

    // double check the type to make flow happy ...
    // possible flow bug?
    if (activeElement instanceof HTMLTextAreaElement && elementIsCompletionElement(activeElement)) {
      var fontSize = window.getComputedStyle(activeElement).fontSize;
      fontSize = parseInt(fontSize, 10);

      return absolutePositionElement(activeElement)
          .add(caretPosition(activeElement))
          .add(new Position(fontSize + 5, 0));
    }
  }
  return state;
}
