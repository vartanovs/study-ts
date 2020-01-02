/**
 * @module Queue.ts
 * @description Queue Class
 */

class Queue<T = string | number> {
  [index: number]: T;
  constructor(
    public start: number = 0,
    public end: number = 0,
    public length: number = 0,
  ) {}

  public enqueue(val: T) {
    this[this.end] = val;
    this.end += 1;
    this.length += 1;
    return this.length;
  }

  public dequeue() {
    if (!this.length) return;
    const temp = this[this.start];
    delete this[this.start];
    this.start += 1;
    this.length -= 1;
    return temp;
  }

  public includes(val: T) {
    if (!this.length) return;
    for (let i = this.start; i < this.end; i += 1) {
      if (this[i] === val) return true;
    }

    return false;
  }

  public isEmpty() {
    return this.length === 0;
  }

  public peek() {
    return this.length ? this[this.start] : undefined;
  }
}

export default Queue;
