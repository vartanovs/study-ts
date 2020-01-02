/**
 * @module BST.ts
 * @description Binary Search Tree Class
 */

class BST {
  constructor(
    public value: number,
    public left: BST | null = null,
    public right: BST | null = null,
  ) {}

  add(val: number): void | Error {
    if (val < this.value) {
      // If arg is smaller than existing node value, add to the left
      if (this.left) return this.left.add(val);
      this.left = new BST(val);
    } else if (val > this.value) {
      // If arg is larger than existing node value, add to the right
      if (this.right) return this.right.add(val);
      this.right = new BST(val);
    } else {
      throw new Error(`Error: A node with value ${val} already exists!`);
    }
  }

  has(val: number): boolean {
    if (val < this.value) {
      // If val is smaller than current Node value, recursively search left
      return this.left ? this.left.has(val) : false;
    }

    if (val > this.value) {
      // If val is larger than current Node value, recursively search right
      return this.right ? this.right.has(val) : false;
    }

    // Otherwise, val must equal current Node value, so return true
    return true;
  }
}

export default BST;
