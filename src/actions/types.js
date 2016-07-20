/* @flow */

export const SHOW_COMPLETIONS = 'SHOW_COMPLETIONS';
export const COMPLETION_CONTEXT_UPDATED = 'COMPLETION_CONTEXT_UPDATED';

export type Action = ShowCompletionsAction
    | CompletionContextUpdatedAction;

export type ShowCompletionsAction = {
  type: 'SHOW_COMPLETIONS',
  doShow: boolean
};

export type CompletionContextUpdatedAction = {
  type: 'COMPLETION_CONTEXT_UPDATED',
  completionContext: string
}
