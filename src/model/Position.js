/* @flow */
export class Position {
  top: number;
  left: number;

  constructor(top: number, left: number) {
    this.top = top;
    this.left = left;
  }

  get topPx(): string {
    return `${this.top}px`;
  }

  get leftPx(): string {
    return `${this.left}px`;
  }

  get px():{top: string, left: string} {
    return {top: this.topPx, left: this.leftPx};
  }

  add(other: Position): Position {
    return new Position(this.top + other.top, this.left + other.left);
  }
}
