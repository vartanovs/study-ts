/**
 * @module Stack.ts
 * @description Stack Class
 */

class Stack<T> {

  [index: number]: T;

  constructor( public height = 0) {}

  isEmpty(): boolean {
    return !this.height;
  }

  peek() {
    return this.height ? this[this.height - 1] : undefined;
  }

  push(val: T): number {
    this[this.height] = val;
    this.height += 1;
    return this.height;
  }

  pop() {
    if (!this.height) return undefined;
    this.height -= 1;
    const temp = this[this.height];
    delete this[this.height];
    return temp;
  }
}

export default Stack;
