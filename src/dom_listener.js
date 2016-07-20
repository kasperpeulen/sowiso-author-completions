/* @flow */
import KeyCode from 'keycode.js/index';
import store from './store';
import {showCompletions} from './actions';
import {elementIsCompletionElement} from "./helper_functions";

export default () => {
  window.addEventListener('keyup', (e) => {
    const activeElement = document.activeElement;
    if (ctrlSpacePressed(e) && elementIsCompletionElement(activeElement)) {
      store.dispatch(showCompletions(true));
    }
  });
}

const ctrlSpacePressed = (e: KeyboardEvent): boolean => e.which == KeyCode.SPACE && e.ctrlKey;

