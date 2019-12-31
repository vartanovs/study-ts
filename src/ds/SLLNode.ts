/**
 * @module SLLNode.ts
 * @description Singly Linked List Node Class
 */

class SLLNode<T = string | number> {
  constructor(
    public value: T,
    public next: SLLNode<T> | null = null
  ) {}
}

export default SLLNode;
