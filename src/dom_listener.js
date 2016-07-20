/* @flow */
import KeyCode from 'keycode.js/index';
import store from './store';
import {showCompletions} from './actions';
import {elementIsCompletionElement} from "./helper_functions";
import {findCompletionContext} from "./helper_functions";
import {updateCompletionContext} from "./actions/index";

export default () => {
  window.addEventListener('keyup', (e) => {
    const activeElement = document.activeElement;

    // casting element for flow
    if (activeElement instanceof HTMLTextAreaElement) {

      // show the completions on ctrl-space in the right textarea
      if (ctrlSpacePressed(e) && elementIsCompletionElement(activeElement)) {
        store.dispatch(showCompletions(true));
      }

      // update the completion context
      if (elementIsCompletionElement(activeElement)) {
        const caretPosition = activeElement.selectionEnd;
        const completionContext = findCompletionContext(activeElement.value, caretPosition);
        store.dispatch(updateCompletionContext(completionContext));
      }
    }
  });
}

const ctrlSpacePressed = (e: KeyboardEvent): boolean => e.which === KeyCode.SPACE && e.ctrlKey;

