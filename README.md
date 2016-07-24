# sowiso-author-completions

This chrome extension provides completions for authors working in sowiso.

![](http://i.imgur.com/JjKtXs3.png)

### Features
- Completions popup appears when:
   - pressed ctrl-space
   - the active element is a textarea with a vars_row class.
- Completion popup positions itself right under the active caret.
- Only relevant completions are shown.
- Completions can be selected with arrows.
- Completions can be discarded with escape.
- Completions can be inserted with enter.
- Completion suggestions include:
    - [SOWISO PHP FUNCTIONS](https://cloud.sowiso.nl/docs/exercise_manual#SOWISO_PHP_functions)
- Completion suggestions include:
    - [PHP FUNCTIONS](https://cloud.sowiso.nl/docs/exercise_manual#PHP_functions)
- Expose a completion description in the UI
- Make sure to strip the parameters when inserted in the dom
- Puts the caret position between the parenthesis (<caret>) after inserting completion

### To do
- Give the UI some love
