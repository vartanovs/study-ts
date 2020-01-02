/**
 * @module Stack.ts
 * @description Stack Class
 */

class Stack<T = string | number> {

  [index: number]: T;

  constructor(public height = 0) {}

  public isEmpty(): boolean {
    return !this.height;
  }

  public peek() {
    return this.height ? this[this.height - 1] : undefined;
  }

  public push(val: T): number {
    this[this.height] = val;
    this.height += 1;
    return this.height;
  }

  public pop() {
    if (!this.height) return undefined;
    this.height -= 1;
    const temp = this[this.height];
    delete this[this.height];
    return temp;
  }
}

export default Stack;
