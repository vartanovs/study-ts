import BST from './BST';

describe('src/ds/BST', () => {
  it('BST should initialize with value passed in, no left and no right', () => {
    const testBST = new BST(5);
    expect(testBST.value).toEqual(5);
    expect(testBST.left).toBeNull();
    expect(testBST.right).toBeNull();
  });

  it('AND BST should add nodes with lower values on left and higher values on right', () => {
    const testBST = new BST(5);
    testBST.add(3);
    testBST.add(7);
    expect(testBST.value).toEqual(5);
    expect(testBST.left).toBeInstanceOf(BST);
    expect(testBST.left!.value).toEqual(3);
    expect(testBST.right).toBeInstanceOf(BST);
    expect(testBST.right!.value).toEqual(7);
  });

  it('AND Multiple additions should deepen the tree', () => {
    const testBST = new BST(5);
    testBST.add(3);
    testBST.add(7);
    testBST.add(2);
    testBST.add(4);
    testBST.add(6);
    testBST.add(8);
    expect(testBST.value).toEqual(5);
    expect(testBST.left!.value).toEqual(3);
    expect(testBST.right!.value).toEqual(7);
    expect(testBST.left!.left!.value).toEqual(2);
    expect(testBST.left!.right!.value).toEqual(4);
    expect(testBST.right!.left!.value).toEqual(6);
    expect(testBST.right!.right!.value).toEqual(8);
  });

  it('BUT duplicate additions should result in an error', () => {
    const testBST = new BST(5);
    testBST.add(3);
    expect(() => testBST.add(3)).toThrowError();
  });

  it('BST should confirm that nodes with specified values are in the tree', () => {
    const testBST = new BST(5);
    testBST.add(3);
    testBST.add(7);
    testBST.add(2);
    testBST.add(4);
    testBST.add(6);
    testBST.add(8);
    expect(testBST.has(1)).toBeFalsy();
    expect(testBST.has(2)).toBeTruthy();
    expect(testBST.has(3)).toBeTruthy();
    expect(testBST.has(4)).toBeTruthy();
    expect(testBST.has(5)).toBeTruthy();
    expect(testBST.has(6)).toBeTruthy();
    expect(testBST.has(7)).toBeTruthy();
    expect(testBST.has(8)).toBeTruthy();
    expect(testBST.has(9)).toBeFalsy();
  });
});
