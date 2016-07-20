/* @flow */
export const SHOW_COMPLETIONS = 'SHOW_COMPLETIONS';

export type Action = ShowCompletionsAction;
export type ShowCompletionsAction = {
  type: 'SHOW_COMPLETIONS',
  doShow: boolean
};
