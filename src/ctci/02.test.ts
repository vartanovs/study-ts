import SLL from '../ds/SLL';
import SLLNode from '../ds/SLLNode';

import {
  removeDuplicateNodes,
  findKthToLast,
  deleteMiddleNode,
  reorderList,
  sumLists,
  isPalindrome,
  findIntersection,
  findLoopStart,
} from './02';

describe('src/ctci/02 - Linked Lists', () => {
  it('Challenge 2.1 - Remove Duplicate Nodes', () => {
    const testSLL = new SLL();
    removeDuplicateNodes(testSLL);
    expect(testSLL.head).toBeNull();
    expect(testSLL.tail).toBeNull();
    testSLL.add('a');
    removeDuplicateNodes(testSLL);
    expect(testSLL.head!.value).toEqual('a');
    expect(testSLL.head).toEqual(testSLL.tail);
    testSLL.add('a');
    expect(testSLL.head!.value).toEqual('a');
    expect(testSLL.tail!.value).toEqual('a');
    expect(testSLL.head).not.toEqual(testSLL.tail);
    removeDuplicateNodes(testSLL);
    expect(testSLL.head!.value).toEqual('a');
    expect(testSLL.head).toEqual(testSLL.tail);
    testSLL.add('b');
    expect(testSLL.head!.value).toEqual('a');
    expect(testSLL.tail!.value).toEqual('b');
    removeDuplicateNodes(testSLL);
    expect(testSLL.head!.value).toEqual('a');
    expect(testSLL.tail!.value).toEqual('b');
    testSLL.add('a');
    testSLL.add('b');
    testSLL.add('c');
    testSLL.add('b');
    testSLL.add('a');
    removeDuplicateNodes(testSLL);
    expect(testSLL.head!.value).toEqual('a');
    expect(testSLL.head!.next!.value).toEqual('b');
    expect(testSLL.tail!.value).toEqual('c');
    expect(testSLL.head!.next!.next).toEqual(testSLL.tail);
  });

  it('Challenge 2.2 - Find KthToLast Node Value', () => {
    const testSLL = new SLL();
    expect(findKthToLast(testSLL, 0)).toBeNull();
    testSLL.add('a');
    expect(findKthToLast(testSLL, 0)).toEqual('a');
    expect(findKthToLast(testSLL, 1)).toBeNull();
    testSLL.add('b');
    expect(findKthToLast(testSLL, 0)).toEqual('b');
    expect(findKthToLast(testSLL, 1)).toEqual('a');
    expect(findKthToLast(testSLL, 2)).toBeNull();
    testSLL.add('c');
    testSLL.add('d');
    testSLL.add('e');
    expect(findKthToLast(testSLL, 0)).toEqual('e');
    expect(findKthToLast(testSLL, 1)).toEqual('d');
    expect(findKthToLast(testSLL, 2)).toEqual('c');
    expect(findKthToLast(testSLL, 3)).toEqual('b');
    expect(findKthToLast(testSLL, 4)).toEqual('a');
    expect(findKthToLast(testSLL, 5)).toBeNull();
  });

  it('Challenge 2.3 - Delete Middle Node', () => {
    const testSLL = new SLL();
    testSLL.add('a');
    testSLL.add('b');
    testSLL.add('c');
    testSLL.add('d');
    const bNode = testSLL.head!.next;
    deleteMiddleNode(bNode as SLLNode);
    expect(testSLL.head!.value).toEqual('a');
    expect(testSLL.head!.next!.value).toEqual('c');
    expect(testSLL.head!.next!.next!.value).toEqual('d');
    expect(testSLL.head!.next!.next).toEqual(testSLL.tail);
  });

  it('Challenge 2.4 - Reorder List', () => {
    const testSLL = new SLL<number>();
    reorderList(testSLL, 5);
    expect(testSLL.head).toBeNull();
    testSLL.add(5);
    reorderList(testSLL, 6);
    expect(testSLL.head!.value).toEqual(5);
    expect(testSLL.head!.next).toBeNull();
    expect(testSLL.head).toEqual(testSLL.tail);
    reorderList(testSLL, 4);
    expect(testSLL.head!.value).toEqual(5);
    expect(testSLL.head!.next).toBeNull();
    expect(testSLL.head).toEqual(testSLL.tail);
    testSLL.add(6);
    testSLL.add(7);
    testSLL.add(8);
    reorderList(testSLL, 4);
    expect(testSLL.head!.value).toEqual(5);
    expect(testSLL.tail!.value).toEqual(8);
    reorderList(testSLL, 9);
    expect(testSLL.head!.value).toEqual(5);
    expect(testSLL.tail!.value).toEqual(8);
    reorderList(testSLL, 7);
    expect(testSLL.head!.value).toEqual(5);
    expect(testSLL.tail!.value).toEqual(8);
    testSLL.add(4);
    reorderList(testSLL, 5);
    expect(testSLL.head!.value).toEqual(4);
    expect(testSLL.tail!.value).toEqual(8);
  });

  it('Challenge 2.5 - Sum Lists', () => {
    const testSLL1 = new SLL<number>();
    const testSLL2 = new SLL<number>();
    testSLL1.add(5);
    sumLists(testSLL1, testSLL2); // 0 + 5 = 5
    expect(testSLL1.head!.value).toEqual(5);
    expect(testSLL1.tail!.value).toEqual(5);
    const testSLL3 = new SLL<number>();
    const testSLL4 = new SLL<number>();
    testSLL3.add(5);
    testSLL3.add(4);
    testSLL3.add(8);
    testSLL4.add(6);
    testSLL4.add(8);
    sumLists(testSLL3, testSLL4); // 845 + 86 = 931
    expect(testSLL3.head!.value).toEqual(1);
    expect(testSLL3.head!.next!.value).toEqual(3);
    expect(testSLL3.head!.next!.next!.value).toEqual(9);
  });

  it('Challenge 2.6 - Check If Palindrome', () => {
    const testSLL1 = new SLL();
    expect(isPalindrome(testSLL1)).toBeFalsy();
    testSLL1.add('a');
    expect(isPalindrome(testSLL1)).toBeTruthy();
    testSLL1.add('a');
    expect(isPalindrome(testSLL1)).toBeTruthy();
    testSLL1.add('c');
    testSLL1.add('c');
    testSLL1.add('a');
    testSLL1.add('a');
    expect(isPalindrome(testSLL1)).toBeTruthy();
    const testSLL2 = new SLL();
    testSLL2.add('a');
    testSLL2.add('b');
    testSLL2.add('c');
    testSLL2.add('b');
    testSLL2.add('a');
    expect(isPalindrome(testSLL2)).toBeTruthy();
    testSLL2.add('a');
    expect(isPalindrome(testSLL2)).toBeFalsy();
  });

  it('Challenge 2.7 - Find List Intersection', () => {
    const testSLL1 = new SLL();
    testSLL1.add('a');
    testSLL1.add('b');
    testSLL1.add('c');
    testSLL1.add('d');
    const testSLL2 = new SLL();
    expect(findIntersection(testSLL1, testSLL2)).toBeFalsy();
    testSLL2.add('e');
    testSLL2.add('f');
    testSLL2.add('g');
    expect(findIntersection(testSLL1, testSLL2)).toBeFalsy();
    // Merge both lists
    testSLL1.tail!.next = testSLL2.tail;
    const findIntersectionNode = testSLL2.tail;
    testSLL1.tail = testSLL2.tail;
    expect(findIntersection(testSLL1, testSLL2)).toEqual(findIntersectionNode);
    testSLL2.add('h');
    testSLL2.add('i');
    testSLL1.tail = testSLL2.tail;
    expect(findIntersection(testSLL1, testSLL2)).toEqual(findIntersectionNode);
  });

  it('Challenge 2.8 - Detect Start Of Loop', () => {
    const testSLL = new SLL();
    testSLL.add('a');
    testSLL.add('b');
    testSLL.add('c');
    testSLL.add('d'); // Loop Start
    const loopStartNode = testSLL.tail;
    testSLL.add('e');
    testSLL.add('f');
    testSLL.add('g');
    testSLL.add('h');
    testSLL.add('i');
    testSLL.add('j');
    testSLL.tail!.next = loopStartNode;
    testSLL.tail = null;
    expect(findLoopStart(testSLL)).toEqual(loopStartNode);
  });
});
