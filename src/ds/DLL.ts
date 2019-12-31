/**
 * @module DLL.ts
 * @description TypeScript Doubly Linked List Class
 */

import DLLNode from './DLLNode';

class DLL<T = string | number> {
  constructor(
    public head: DLLNode<T> | null = null,
    public tail: DLLNode<T> | null = null,
  ) {}

  add(val: T) {
    if (!this.head || !this.tail) {
      // If no nodes, set new Node to head and tail
      this.head = new DLLNode(val);
      this.tail = this.head;
    } else {
      // If at least one node, append to tail
      this.tail.next = new DLLNode(val);
      this.tail.next.prev = this.tail;
      this.tail = this.tail.next;
    }
  }

  has(val: T) {
    // Declare a tracker to traverse the list and find the value
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === val) return true;
      currNode = currNode.next;
    }

    return false;
  }

  // Delete first node with target value, return value if deleted, null if not found
  delete(val: T) {
    if (!this.head) return null;

    // Edge Case - If head node contains the value, reassign head
    if (this.head.value === val) {
      if (this.head.next) {
        this.head = this.head.next;
        this.head.prev = null;
      } else {
        this.head = null;
        this.tail = null;
      }

      return val;
    }

    // Declare a tracker to traverse the list and find the value
    let currNode = this.head;
    while (currNode.next) {
      if (currNode.next.value === val) {
        // Edge Case - If tail node contains the value, reassign tail
        if (currNode.next.next === null) {
          this.tail = currNode;
          currNode.next = null;
        } else {
          currNode.next.next.prev = currNode;
          currNode.next = currNode.next.next;
        }

        return val;
      }

      currNode = currNode.next;
    }

    return null;
  }
}

export default DLL;
