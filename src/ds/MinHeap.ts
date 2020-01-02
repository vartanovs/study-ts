/**
 * @module MinHeap.ts
 * @description  Binary Min Heap Class
 */

import HeapNode from './HeapNode';

class MinHeap {
  constructor(
    public heap: HeapNode[] = [],
  ) {}

  public insert(value: number) {
    const newNode = new HeapNode(value);
    this.heap.push(newNode);

    // Determine index for the inserted Node and its Parent Node
    let currNodeIndex = this.heap.length - 1;
    let currNodeParentIndex = currNodeIndex ? Math.floor((currNodeIndex - 1) / 2) : 0;
    while (
      // If parent node value is less than inserted node, swap nodes
      currNodeIndex !== currNodeParentIndex &&
      newNode.value < this.heap[currNodeParentIndex].value
    ) {
      // Swap inserted node and parent node
      const parentNode = this.heap[currNodeParentIndex];
      this.heap[currNodeParentIndex] = newNode;
      this.heap[currNodeIndex] = parentNode;
      // Find new index and parent index from perspective of inserted node
      currNodeIndex = currNodeParentIndex;
      currNodeParentIndex = currNodeIndex ? Math.floor((currNodeIndex - 1) / 2) : 0;
    }

    return this.heap.length - 1;
  }

  public extract() {
    // Edge Case - Empty Heap or Single Node Heap
    if (!this.heap.length) return;
    if (this.heap.length === 1) return this.heap.pop()!.value;

    // Place return value in placeholder
    const returnVal = this.heap[0].value;
    // Pop last value off heap array and displace top value
    this.heap[0] = this.heap.pop()!;
    // Determine index for newly placed Top Node and Child Node to swap with
    let [currNodeIndex, left, right] = [0, 1, 2];
    let currChildIndex: number;
    if (!this.heap[right] && !this.heap[left]) {
      currChildIndex = currNodeIndex;
    } else if (!this.heap[right]) {
      currChildIndex = left;
    } else if (this.heap[left].value < this.heap[right].value) {
      currChildIndex = left;
    } else {
      currChildIndex = right;
    }

    // Swap top node with larger child node until it's no longer larger than its child
    while (
      currChildIndex !== currNodeIndex &&
      this.heap[currNodeIndex].value > this.heap[currChildIndex].value
    ) {
      const temp = this.heap[currNodeIndex];
      this.heap[currNodeIndex] = this.heap[currChildIndex];
      this.heap[currChildIndex] = temp;
      currNodeIndex = currChildIndex;
      [left, right] = [(2 * currNodeIndex) + 1, (2 * currNodeIndex) + 2];
      if (!this.heap[right] && !this.heap[left]) {
        currChildIndex = currNodeIndex;
      } else if (!this.heap[right]) {
        currChildIndex = left;
      } else if (this.heap[left].value < this.heap[right].value) {
        currChildIndex = left;
      } else {
        currChildIndex = right;
      }
    }

    return returnVal;
  }
}

export default MinHeap;
