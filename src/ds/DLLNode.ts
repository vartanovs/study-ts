/**
 * @module DLLNode.ts
 * @description Doubly Linked List Node Class
 */

class DLLNode<T = string | number> {
  constructor(
    public value: T,
    public next: DLLNode<T> | null = null,
    public prev: DLLNode<T> | null = null,
  ) {}
}

export default DLLNode;
