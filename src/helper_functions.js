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
