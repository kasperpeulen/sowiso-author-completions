/* @flow */
import {Position} from './model/Position';
import getCaretCoordinates from 'textarea-caret';

export const absolutePositionElement = (element: HTMLElement): Position => {
  const rect = element.getBoundingClientRect();
  return new Position(rect.top + window.scrollY, rect.left + window.scrollX);
};

export const caretPosition = (element: HTMLTextAreaElement): Position => {
  const coords = getCaretCoordinates(element, element.selectionEnd);
  return new Position(coords.top, coords.left);
};

// checks if the element is an element we can peform code completion on
export const elementIsCompletionElement = (element: HTMLElement): boolean => {
  const className = 'vars_row';
  return element instanceof HTMLTextAreaElement && element.classList.contains(className);
};

// find the relevant context given some input text and a caret position
//
// "sw<caret>" should give "sw"
// "blabla s<caret>" should give "s"
// "blabla()" should give ""
export const findCompletionContext = (text: string, caretPosition: number): string => {
  text = text.substring(0, caretPosition);

  var possibleBeginIndexes = [
    text.lastIndexOf(' ') + 1,
    text.lastIndexOf(')') + 1
  ];

  possibleBeginIndexes = possibleBeginIndexes.filter((i) => i !== -1);

  const endIndex = function () {
    if (possibleBeginIndexes.length === 0) {
      return 0;
    } else {
      return Math.max(...possibleBeginIndexes);
    }
  }();

  return text.substring(endIndex);
};

export const mod = (value, divisor) => {
  var n = value % divisor;
  return n < 0 ? (divisor + n) : n
};