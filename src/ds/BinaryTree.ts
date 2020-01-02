/**
 * @module BinaryTree.ts
 * @description Binary Tree Class
 */

class BinaryTree<T = string | number> {
  constructor(
    public value: T,
    public left: BinaryTree<T> | null = null,
    public right: BinaryTree<T> | null = null,
  ) {}

  public add(val: T) {
    if (this.left === null) {
      this.left = new BinaryTree(val);
      return val;
    }

    if (this.right === null) {
      this.right = new BinaryTree(val);
      return val;
    }

    // Traverse binary tree, breadth first, until an opening is found
    const queue: BinaryTree<T>[] = [this.left, this.right];
    let index = 0;
    while (index < queue.length) {
      const currNode = queue[index];
      if (currNode.left instanceof BinaryTree) {
        queue.push(currNode.left);
      } else {
        currNode.left = new BinaryTree(val);
        return val;
      }

      if (currNode.right instanceof BinaryTree) {
        queue.push(currNode.right);
      } else {
        currNode.right = new BinaryTree(val);
        return val;
      }

      index += 1;
    }

    return val;
  }

  public has(val: T): boolean {
    if (this.value === val) return true;
    if (this.left && this.left.has(val)) return true;
    return this.right ? this.right.has(val) : false;
  }
}

export default BinaryTree;
