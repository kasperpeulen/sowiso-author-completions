import {Position} from '../model/Position';
import {SHOW_COMPLETIONS} from "../actions/types";
import {absolutePositionElement, caretPosition} from '../helper_functions';

export default (state = new Position(100, 100), action): Position => {
  if (action.type == SHOW_COMPLETIONS && action.payload) {
    const activeElement = document.activeElement;
    var fontSize = window.getComputedStyle(activeElement).fontSize;
    fontSize = parseInt(fontSize, 10);

    return absolutePositionElement(activeElement)
        .add(caretPosition(activeElement))
        .add(new Position(fontSize + 5, 0));
  }
  return state;
}
