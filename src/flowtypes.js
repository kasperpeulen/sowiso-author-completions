/* @flow */
import type {Completion} from './model/Completion';

export type Completions = {
  all: [Completion],
  relevant: [Completion],
  completionContext: string
}