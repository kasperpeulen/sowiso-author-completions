import KeyCode from 'keycode.js/index';
import store from './store';
import {showCompletions} from './actions';

export default () => {
  window.addEventListener('keyup', (e) => {
    const activeElement = document.activeElement;
    if (ctrlSpacePressed(e) && elementIsCompletionElement(activeElement)) {
      store.dispatch(showCompletions(true));
    }
  });
}

const ctrlSpacePressed = (e: KeyboardEvent): Boolean
    => e.which == KeyCode.SPACE && e.ctrlKey;

// checks if the element is an element we can peform code completion on
const elementIsCompletionElement = (element: HTMLElement): Boolean => {
  const className = 'vars_row';

  return element.classList.contains(className)
      && element instanceof HTMLTextAreaElement;
};
