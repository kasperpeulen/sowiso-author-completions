# sowiso-author-completions

This chrome extension provides completions for authors working in sowiso.

### Features
- Completions popup appears when:
   - pressed ctrl-space
   - the active element is a textarea with a vars-row class.
- Completion popup positions itself right under the active caret.
- Only relevant completions are shown.
- Completions can be selected with arrows.
- Completions can be discarded with escape.
- Completions can be inserted with enter.
- Completion suggestions include:
    - [SOWISO PHP FUNCTIONS](https://cloud.sowiso.nl/docs/exercise_manual#SOWISO_PHP_functions)
- Completion suggestions include:
    - [PHP FUNCTIONS](https://cloud.sowiso.nl/docs/exercise_manual#PHP_functions)

### To do
- Expose the description in the UI
- Make sure to strip the parameters when inserted in the dom
- Put the caret position between the parenthesis (<caret>) after inserting completion
- Give the UI some love

### Bugs
- Too much completions are shown, make it scrollable or limit the completions FIXED
- Completion context is not updating if the completions are not visible. FIXED