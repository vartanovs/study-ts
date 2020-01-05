import BST from '../ds/BST';
import BinaryTree from '../ds/BinaryTree';

import {
  minimalTree,
  isValidBST,
} from './04';

describe('src/ctci/04 - Trees and Graphs', () => {
  it('Challenge 4.2 - Minimal Tree', () => {
    expect(minimalTree([])).toBeNull();
    const sampleTree = minimalTree([5]);
    expect(sampleTree).toBeInstanceOf(BST);
    if (sampleTree) {
      expect(sampleTree.value).toEqual(5);
      expect(sampleTree.left).toBeNull();
      expect(sampleTree.right).toBeNull();
    }
    const sampleTree2 = minimalTree([1, 2, 3, 4, 5, 6, 7]);
    expect(sampleTree2).toBeInstanceOf(BST);
    if (sampleTree2) {
      expect(sampleTree2.value).toEqual(4);
      expect(sampleTree2.left).toBeInstanceOf(BST);
      expect((sampleTree2.left as BST).value).toEqual(2);
      expect(sampleTree2.right).toBeInstanceOf(BST);
      expect((sampleTree2.right as BST).value).toEqual(6);
    }
  });

  it('Challenge 4.5 - Validate BST', () => {
    const sampleTree = new BinaryTree(10);
    expect(isValidBST(sampleTree)).toBeTruthy();
    sampleTree.add(5);
    sampleTree.add(15);
    expect(isValidBST(sampleTree)).toBeTruthy();
    sampleTree.add(3);
    sampleTree.add(7);
    expect(isValidBST(sampleTree)).toBeTruthy();
    sampleTree.add(8);
    sampleTree.add(20);
    expect(isValidBST(sampleTree)).toBeFalsy();
  });
});
