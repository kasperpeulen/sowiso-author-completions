/* @flow */
import KeyCode from 'keycode.js/index';
import store from './store';
import {showCompletions} from './actions';
import {elementIsCompletionElement} from "./helper_functions";
import {findCompletionContext} from "./helper_functions";
import {updateCompletionContext, changeSelectedIndex} from "./actions/index";

export default () => {
  window.addEventListener('keyup', (e) => {
    const activeElement = document.activeElement;

    // casting element for flow
    if (activeElement instanceof HTMLTextAreaElement && elementIsCompletionElement(activeElement)) {

      // update the completion context
      const caretPosition = activeElement.selectionEnd;
      const completionContext = findCompletionContext(activeElement.value, caretPosition);
      store.dispatch(updateCompletionContext(completionContext));

      // show the completions on ctrl-space in the right textarea
      if (ctrlSpacePressed(e)) {
        store.dispatch(showCompletions(true));
      }

      const state = store.getState();
      const completionsLength = state.completions.relevant.length;

      if (e.which === KeyCode.DOWN) {
        const index = (state.selectedCompletionIndex + 1) % completionsLength;
        store.dispatch(changeSelectedIndex(index));
      } else if (e.which === KeyCode.UP) {
        const index = (state.selectedCompletionIndex - 1) % completionsLength;
        store.dispatch(changeSelectedIndex(index));
      }
    }
  });
}

const ctrlSpacePressed = (e: KeyboardEvent): boolean => e.which === KeyCode.SPACE && e.ctrlKey;

