/* @flow */
import KeyCode from 'keycode.js/index';
import {store} from './store';
import {showCompletions} from './actions';
import {elementIsCompletionElement} from "./helper_functions";
import {findCompletionContext} from "./helper_functions";
import {updateCompletionContext, changeSelectedIndex} from "./actions/index";


export default () => {
  window.addEventListener('keydown', (e) => {
    const activeElement = document.activeElement;

    // casting element for flow
    if (activeElement instanceof HTMLTextAreaElement && elementIsCompletionElement(activeElement)) {

      // update the completion context
      const caretPosition = activeElement.selectionEnd;
      const completionContext = findCompletionContext(activeElement.value, caretPosition);
      store.dispatch(updateCompletionContext(completionContext));

      // show the completions on ctrl-space in the right textarea
      if (ctrlSpacePressed(e)) {
        store.dispatch(changeSelectedIndex(0));
        store.dispatch(showCompletions(true));
      }

      const state = store.getState();
      const relevantCompletions = state.completions.relevant;
      const completionsLength = relevantCompletions.length;
      console.log(relevantCompletions, state);

      if (e.which === KeyCode.DOWN) {
        e.preventDefault();
        const index = (state.selectedCompletionIndex + 1) % completionsLength;
        store.dispatch(changeSelectedIndex(index));
      } else if (e.which === KeyCode.UP) {
        e.preventDefault();
        const index = (state.selectedCompletionIndex - 1) % completionsLength;
        store.dispatch(changeSelectedIndex(index));
      } else if (e.which === KeyCode.ESCAPE) {
        store.dispatch(showCompletions(false));
      } else if (e.which === KeyCode.ENTER) {
        e.preventDefault();
        const activeCompletionText = relevantCompletions[state.selectedCompletionIndex].completion;
        insertTextInTextarea(activeCompletionText, activeElement);
        store.dispatch(showCompletions(false));
      }
    }
  });
}

const ctrlSpacePressed = (e: KeyboardEvent): boolean => e.which === KeyCode.SPACE && e.ctrlKey;

// insert text at caretposition in textarea
const insertTextInTextarea = (text: string, textarea: HTMLTextAreaElement) => {
  const textAsList = textarea.value.split("");
  const caretPosition = textarea.selectionEnd;
  textAsList.splice(caretPosition, 0, text);
  textarea.value = textAsList.join("");

  const newCaretPosition = caretPosition + text.length;
  textarea.setSelectionRange(newCaretPosition, newCaretPosition);
};