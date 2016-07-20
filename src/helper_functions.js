import {Position} from './model/Position';
import getCaretCoordinates from 'textarea-caret';

export const absolutePositionElement = (element: HTMLElement): Position => {
  const rect = element.getBoundingClientRect();
  return new Position(rect.top + window.scrollY, rect.left + window.scrollX);
};

export const caretPosition = (element): Position => {
  const coords = getCaretCoordinates(element, element.selectionEnd);
  return new Position(coords.top, coords.left);
};