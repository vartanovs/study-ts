import SLL from './SLL';
import SLLNode from './SLLNode';

describe('src/ds/SLL', () => {
  const firstValue = 'a';
  const secondValue = 'b';
  const thirdValue = 'c';
  const fourthValue = 'd';
  const fifthValue = 'e';

  const missingValue = 'z';

  it('SLL should initialize with no head or tail', () => {
    const testSLL: SLL = new SLL();
    expect(testSLL.head).toBeNull();
    expect(testSLL.tail).toBeNull();
  });

  it('Adding to an empty SLL should result in the head and tail pointing to a new Node', () => {
    const testSLL: SLL = new SLL();
    testSLL.add(firstValue);
    expect(testSLL.head).toBeInstanceOf(SLLNode);
    expect(testSLL.head).toEqual(testSLL.tail);
    expect(testSLL.head!.value).toEqual(firstValue);
    expect(testSLL.head!.next).toBeNull();
    expect(testSLL.tail).toBeInstanceOf(SLLNode);
    expect(testSLL.tail!.value).toEqual(firstValue);
    expect(testSLL.tail!.next).toBeNull();
  });

  it('Adding multiple nodes to an SLL should chain those nodes', () => {
    const testSLL: SLL = new SLL();
    testSLL.add(firstValue);
    testSLL.add(secondValue);
    testSLL.add(thirdValue);
    expect(testSLL.head).toBeInstanceOf(SLLNode);
    expect(testSLL.head!.value).toEqual(firstValue);
    expect(testSLL.head!.next).toBeInstanceOf(SLLNode);
    expect(testSLL.head!.next!.value).toEqual(secondValue);
    expect(testSLL.head!.next!.next).toBeInstanceOf(SLLNode);
    expect(testSLL.head!.next!.next).toEqual(testSLL.tail);
    expect(testSLL.head!.next!.next!.value).toEqual(thirdValue);
    expect(testSLL.head!.next!.next!.next).toBeNull();
    expect(testSLL.tail).toBeInstanceOf(SLLNode);
    expect(testSLL.tail!.value).toEqual(thirdValue);
    expect(testSLL.tail!.next).toBeNull();
  });

  it('has(val) method returns true if a value is in the list', () => {
    const testSLL: SLL = new SLL();
    testSLL.add(firstValue);
    testSLL.add(secondValue);
    testSLL.add(thirdValue);
    testSLL.add(fourthValue);
    testSLL.add(fifthValue);
    expect(testSLL.has(firstValue)).toBeTruthy();
    expect(testSLL.has(secondValue)).toBeTruthy();
    expect(testSLL.has(thirdValue)).toBeTruthy();
    expect(testSLL.has(fourthValue)).toBeTruthy();
    expect(testSLL.has(fifthValue)).toBeTruthy();
  });

  it('has(val) method returns false if a value is not in the list', () => {
    const testSLL: SLL = new SLL();
    expect(testSLL.has(firstValue)).toBeFalsy();
    testSLL.add(firstValue);
    testSLL.add(secondValue);
    testSLL.add(thirdValue);
    expect(testSLL.has(missingValue)).toBeFalsy();
  });

  it('delete(val) method returns null if no nodes in list', () => {
    const testSLL: SLL = new SLL();
    expect(testSLL.delete(secondValue)).toBeNull();
  });

  it('delete(val) method returns null if a value is not in the list', () => {
    const testSLL: SLL = new SLL();
    testSLL.add(firstValue);
    testSLL.add(secondValue);
    testSLL.add(thirdValue);
    expect(testSLL.delete(missingValue)).toBeNull();
    expect(testSLL.head!.value).toEqual(firstValue);
    expect(testSLL.tail!.value).toEqual(thirdValue);
  });

  it('delete(val) method deletes a node if a value is in the list', () => {
    const testSLL: SLL = new SLL();
    testSLL.add(firstValue);
    testSLL.add(secondValue);
    testSLL.add(thirdValue);
    expect(testSLL.delete(secondValue)).toEqual(secondValue);
    expect(testSLL.head!.value).toEqual(firstValue);
    expect(testSLL.head!.next!.value).toEqual(thirdValue);
    expect(testSLL.tail!.value).toEqual(thirdValue);
  });

  it('delete(val) method reassigns head and tail if single node list deleted', () => {
    const testSLL: SLL = new SLL();
    testSLL.add(firstValue);
    expect(testSLL.head!.value).toEqual(firstValue);
    expect(testSLL.tail!.value).toEqual(firstValue);
    expect(testSLL.delete(firstValue)).toEqual(firstValue);
    expect(testSLL.head).toBeNull();
    expect(testSLL.tail).toBeNull();
  });

  it('delete(val) method reassigns head if head node deleted', () => {
    const testSLL: SLL = new SLL();
    testSLL.add(firstValue);
    testSLL.add(secondValue);
    testSLL.add(thirdValue);
    expect(testSLL.head!.value).toEqual(firstValue);
    expect(testSLL.delete(firstValue)).toEqual(firstValue);
    expect(testSLL.head!.value).toEqual(secondValue);
  });

  it('delete(val) method reassigns tail if tail node deleted', () => {
    const testSLL: SLL = new SLL();
    testSLL.add(firstValue);
    testSLL.add(secondValue);
    testSLL.add(thirdValue);
    expect(testSLL.tail!.value).toEqual(thirdValue);
    expect(testSLL.delete(thirdValue)).toEqual(thirdValue);
    expect(testSLL.tail!.value).toEqual(secondValue);
    expect(testSLL.tail!.next).toBeNull();
  });
});
