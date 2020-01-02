import BinaryTree from './BinaryTree';

describe('src/ds/BinaryTree', () => {
  const firstValue = 'a';
  const secondValue = 'b';
  const thirdValue = 'c';
  const fourthValue = 'd';
  const fifthValue = 'e';

  const missingValue = 'z';

  it('Binary Tree should initialize with value passed in, no left and no right', () => {
    const testBinaryTree = new BinaryTree(firstValue);
    expect(testBinaryTree.value).toEqual(firstValue);
    expect(testBinaryTree.left).toBeNull();
    expect(testBinaryTree.right).toBeNull();
  });

  it('BinaryTree should add nodes from left to right', () => {
    const testBinaryTree = new BinaryTree(firstValue);
    testBinaryTree.add(secondValue);
    testBinaryTree.add(thirdValue);
    testBinaryTree.add(fourthValue);
    testBinaryTree.add(fifthValue);
    expect(testBinaryTree.value).toEqual(firstValue);
    expect(testBinaryTree.left).toBeInstanceOf(BinaryTree);
    expect(testBinaryTree.left!.value).toEqual(secondValue);
    expect(testBinaryTree.right).toBeInstanceOf(BinaryTree);
    expect(testBinaryTree.right!.value).toEqual(thirdValue);
    expect(testBinaryTree.left!.left).toBeInstanceOf(BinaryTree);
    expect(testBinaryTree.left!.left!.value).toEqual(fourthValue);
    expect(testBinaryTree.left!.right).toBeInstanceOf(BinaryTree);
    expect(testBinaryTree.left!.right!.value).toEqual(fifthValue);
    expect(testBinaryTree.right!.left).toBeNull();
    expect(testBinaryTree.right!.right).toBeNull();
  });

  it('AND BinaryTree should confirm that nodes with specified values are in the tree', () => {
    const testBinaryTree = new BinaryTree(firstValue);
    testBinaryTree.add(secondValue);
    testBinaryTree.add(thirdValue);
    testBinaryTree.add(fourthValue);
    testBinaryTree.add(fifthValue);
    expect(testBinaryTree.has(firstValue)).toBeTruthy();
    expect(testBinaryTree.has(secondValue)).toBeTruthy();
    expect(testBinaryTree.has(thirdValue)).toBeTruthy();
    expect(testBinaryTree.has(fourthValue)).toBeTruthy();
    expect(testBinaryTree.has(fifthValue)).toBeTruthy();
    expect(testBinaryTree.has(missingValue)).toBeFalsy();
  });
});
