/**
 * @module HeapNode.ts
 * @description  Binary Heap Node Class
 */

class HeapNode {
  constructor(
    public value: number,
    public next: HeapNode | null = null,
  ) {}
}

export default HeapNode;
