/* @flow */
import KeyCode from 'keycode.js/index';
import {store} from './store';
import {showCompletions} from './actions';
import {elementIsCompletionElement} from "./helper_functions";
import {findCompletionContext, mod} from "./helper_functions";
import {updateCompletionContext, changeSelectedIndex} from "./actions/index";

export default () => {
  window.addEventListener('input', () => {
    const state = store.getState();
    const activeElement = document.activeElement;

    // casting element for flow
    if (activeElement instanceof HTMLTextAreaElement && elementIsCompletionElement(activeElement)) {
      // update the completion context
      const caretPosition = activeElement.selectionEnd;
      const completionContext = findCompletionContext(activeElement.value, caretPosition);
      store.dispatch(updateCompletionContext(completionContext));
    }
  });

  window.addEventListener('keydown', (e) => {
    const state = store.getState();
    const activeElement = document.activeElement;

    // casting element for flow
    if (activeElement instanceof HTMLTextAreaElement && elementIsCompletionElement(activeElement)) {

      // show the completions on ctrl-space in the right textarea
      if (ctrlSpacePressed(e)) {
        store.dispatch(changeSelectedIndex(0));
        store.dispatch(showCompletions(true));
      }

      const relevantCompletions = state.completions.relevant;
      const completionsLength = relevantCompletions.length;

      switch (e.which) {
        case KeyCode.DOWN:
          e.preventDefault();
          let index = mod(state.selectedCompletionIndex + 1, completionsLength);
          store.dispatch(changeSelectedIndex(index));
          break;
        case KeyCode.UP:
          e.preventDefault();
          let index2 = mod(state.selectedCompletionIndex - 1, completionsLength);
          store.dispatch(changeSelectedIndex(index2));
          break;
        case KeyCode.ESCAPE:
          store.dispatch(showCompletions(false));
          break;
        case KeyCode.ENTER:
          e.preventDefault();
          const activeCompletionText = relevantCompletions[state.selectedCompletionIndex].completion;

          // dom side effect, insert text at caretposition in textarea
          const caretPosition = activeElement.selectionEnd;
          activeElement.value = getNewTextareaValue(activeCompletionText, activeElement.value, caretPosition);

          // dom side effect
          const newCaretPos = getNewCaretPosition(activeElement, activeCompletionText);
          activeElement.setSelectionRange(newCaretPos, newCaretPos);

          store.dispatch(showCompletions(false));
          break;
      }
    }
  });
}

const ctrlSpacePressed = (e: KeyboardEvent): boolean => e.which === KeyCode.SPACE && e.ctrlKey;

// pure function
const getNewTextareaValue = (text: string, textareaValue: string, caretPosition: number): string => {
  // only from the caretposition text should be inserted
  // for example if sw_a<caret> needs completion, then strip out 'sw_a' completion
  const completionContext = store.getState().completions.completionContext;
  text = text.substring(completionContext.length);

  const textAsList = textareaValue.split("");
  textAsList.splice(caretPosition, 0, text);

  return textAsList.join("");
};

// pure function
function getNewCaretPosition(textarea: HTMLTextAreaElement, textJustInserted: string): number {
  const oldCaretPosition = textarea.selectionEnd;
  return oldCaretPosition + textJustInserted.length;
}