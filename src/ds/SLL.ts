/**
 * @module SLL.ts
 * @description Singly Linked List Class
 */

import SLLNode from './SLLNode';

class SLL<T = string | number> {
  constructor(
    public head: SLLNode<T> | null = null,
    public tail: SLLNode<T> | null = null
  ) {}

  public add(val: T) {
    if (!this.head || !this.tail) {
      // If no nodes, set new Node to head and tail
      this.head = new SLLNode(val);
      this.tail = this.head;
    } else {
      // If at least one node, append to tail
      this.tail.next = new SLLNode(val);
      this.tail = this.tail.next;
    }
  }

  public has(val: T) {
    // Declare a tracker to traverse the list and find the value
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === val) return true;
      currNode = currNode.next;
    }

    return false;
  }

  // Delete first node with target value. Return value if deleted, null if not found
  public delete(val: T) {
    if (!this.head) return null;

    // Edge Case - If head node contains the value, reassign head
    if (this.head.value === val) {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
      }

      return val;
    }

    // Declare a tracker to traverse the list and find the value
    let currNode = this.head;
    while (currNode.next) {
      if (currNode.next.value === val) {
        // Edge Case - If tail node contains the value, reassign tail
        if (currNode.next === this.tail) {
          this.tail = currNode;
        }

        currNode.next = currNode.next.next;
        return val;
      }

      currNode = currNode.next;
    }

    return null;
  }
}

export default SLL;
