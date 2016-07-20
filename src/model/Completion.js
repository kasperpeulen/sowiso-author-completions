/* @flow */
export class Completion {
  completion: string;
  description: string;

  constructor(completion: string, description: string) {
    this.completion = completion;
    this.description = description;
  }
}