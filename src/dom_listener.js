/* @flow */
import KeyCode from 'keycode.js/index';
import {store} from './store';
import {showCompletionsAction} from './actions';
import {elementIsCompletionElement} from "./helper_functions";
import {findCompletionContext, mod} from "./helper_functions";
import {updateCompletionContext, changeSelectedIndex} from "./actions/index";

export default () => {
  window.addEventListener('blur', (e) => {
    // preventing blurring if completions are shown
    // because this causes all kind of weirdness
    if (store.getState().showCompletions) {
      e.target.focus();
    }
  }, true);

  window.addEventListener('input', () => {
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
        store.dispatch(showCompletionsAction(true));
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
          store.dispatch(showCompletionsAction(false));
          break;
        case KeyCode.ENTER:
          e.preventDefault();
          const activeCompletionText = relevantCompletions[state.selectedCompletionIndex].completion;

          // dom side effect, insert text at caretposition in textarea
          const caretPosition = activeElement.selectionEnd;
          activeElement.value = getNewTextareaValue(activeCompletionText, activeElement.value, caretPosition);

          // dom side effect
          const newCaretPos = getNewCaretPosition(caretPosition, activeCompletionText);
          activeElement.setSelectionRange(newCaretPos, newCaretPos);

          store.dispatch(showCompletionsAction(false));
          break;
      }
    }
  });
}

const ctrlSpacePressed = (e: KeyboardEvent): boolean => e.which === KeyCode.SPACE && e.ctrlKey;

// pure function
const getNewTextareaValue = (fullCompletion: string, textareaValue: string, caretPosition: number): string => {
  var newText = textToBeInserted(fullCompletion);
  const textAsList = textareaValue.split("");
  textAsList.splice(caretPosition, 0, newText);

  return textAsList.join("");
};

function textToBeInserted(fullCompletion: string) {
  // strip out parameters
  const beginParameterIndex = fullCompletion.indexOf("(");
  const endParamterIndex = fullCompletion.indexOf(")");

  let newText = fullCompletion.substring(0, beginParameterIndex + 1) + fullCompletion.substring(endParamterIndex);

  // only from the caretposition text should be inserted
  // for example if sw_a<caret> needs completion, then strip out 'sw_a' completion
  const completionContext = store.getState().completions.completionContext;
  return newText.substring(completionContext.length);
}

// pure function
function getNewCaretPosition(oldCaretPosition: number, fullCompletion: string): number {
  var text = textToBeInserted(fullCompletion);
  // move caret one to the left inside the parens
  console.log(oldCaretPosition, text.length, fullCompletion);
  return oldCaretPosition + text.length - 1;
}
