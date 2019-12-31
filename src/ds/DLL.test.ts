import DLL from './DLL';
import DLLNode from './DLLNode';

describe('src/ds/DLL', () => {
  const firstValue = 'a';
  const secondValue = 'b';
  const thirdValue = 'c';
  const fourthValue = 'd';
  const fifthValue = 'e';

  const missingValue = 'z';

  it('DLL should initialize with no head or tail', () => {
    const testDLL: DLL = new DLL();
    expect(testDLL.head).toBeNull();
    expect(testDLL.tail).toBeNull();
  });

  it('Adding to an empty DLL should result in the head and tail pointing to the same new Node', () => {
    const testDLL: DLL = new DLL();
    testDLL.add(firstValue);
    expect(testDLL.head).toBeInstanceOf(DLLNode);
    expect(testDLL.head).toEqual(testDLL.tail);
    expect(testDLL.head!.value).toEqual(firstValue);
    expect(testDLL.head!.next).toBeNull();
    expect(testDLL.head!.prev).toBeNull();
    expect(testDLL.tail).toBeInstanceOf(DLLNode);
    expect(testDLL.tail!.value).toEqual(firstValue);
    expect(testDLL.tail!.next).toBeNull();
    expect(testDLL.tail!.prev).toBeNull();
  });

  it('Adding multiple nodes to a DLL should chain those nodes', () => {
    const testDLL: DLL = new DLL();
    testDLL.add(firstValue);
    testDLL.add(secondValue);
    testDLL.add(thirdValue);
    expect(testDLL.head).toBeInstanceOf(DLLNode);
    expect(testDLL.head!.value).toEqual(firstValue);
    expect(testDLL.head!.prev).toBeNull();
    expect(testDLL.head!.next).toBeInstanceOf(DLLNode);
    expect(testDLL.head!.next!.value).toEqual(secondValue);
    expect(testDLL.head!.next!.prev).toBeInstanceOf(DLLNode);
    expect(testDLL.head!.next!.prev).toEqual(testDLL.head);
    expect(testDLL.head!.next!.next).toBeInstanceOf(DLLNode);
    expect(testDLL.head!.next!.next).toEqual(testDLL.tail);
    expect(testDLL.head!.next!.next!.value).toEqual(thirdValue);
    expect(testDLL.head!.next!.next!.next).toBeNull();
    expect(testDLL.tail).toBeInstanceOf(DLLNode);
    expect(testDLL.tail!.value).toEqual(thirdValue);
    expect(testDLL.tail!.prev).toBeInstanceOf(DLLNode);
    expect(testDLL.tail!.prev).toEqual(testDLL.head!.next);
    expect(testDLL.tail!.next).toBeNull();
  });

  it('has(val) method returns true if a value is in the list', () => {
    const testDLL: DLL = new DLL();
    testDLL.add(firstValue);
    testDLL.add(secondValue);
    testDLL.add(thirdValue);
    testDLL.add(fourthValue);
    testDLL.add(fifthValue);
    expect(testDLL.has(firstValue)).toBeTruthy();
    expect(testDLL.has(secondValue)).toBeTruthy();
    expect(testDLL.has(thirdValue)).toBeTruthy();
    expect(testDLL.has(fourthValue)).toBeTruthy();
    expect(testDLL.has(fifthValue)).toBeTruthy();
  });

  it('has(val) method returns false if a value is not in the list', () => {
    const testDLL: DLL = new DLL();
    expect(testDLL.has(firstValue)).toBeFalsy();
    testDLL.add(firstValue);
    testDLL.add(secondValue);
    testDLL.add(thirdValue);
    testDLL.add(fourthValue);
    testDLL.add(fifthValue);
    expect(testDLL.has(missingValue)).toBeFalsy();
  });

  it('delete(val) method returns null if no nodes in list', () => {
    const testDLL: DLL = new DLL();
    expect(testDLL.delete(secondValue)).toBeNull();
  });

  it('delete(val) method returns null if a value is not in the list', () => {
    const testDLL: DLL = new DLL();
    testDLL.add(firstValue);
    testDLL.add(secondValue);
    testDLL.add(thirdValue);
    expect(testDLL.delete(missingValue)).toBeNull();
    expect(testDLL.head!.value).toEqual(firstValue);
    expect(testDLL.tail!.value).toEqual(thirdValue);
  });

  it('delete(val) method deletes a node if a value is in the list', () => {
    const testDLL: DLL = new DLL();
    testDLL.add(firstValue);
    testDLL.add(secondValue);
    testDLL.add(thirdValue);
    expect(testDLL.head!.next!.value).toEqual(secondValue);
    expect((testDLL.tail!.prev as DLLNode).value).toEqual(secondValue);
    expect(testDLL.delete(secondValue)).toEqual(secondValue);
    expect(testDLL.head!.value).toEqual(firstValue);
    expect(testDLL.head!.next!.value).toEqual(thirdValue);
    expect(testDLL.tail!.value).toEqual(thirdValue);
    expect((testDLL.tail!.prev as DLLNode).value).toEqual(firstValue);
  });

  it('delete(val) method reassigns head and tail to null if single node list deleted', () => {
    const testDLL: DLL = new DLL();
    testDLL.add(firstValue);
    expect(testDLL.head!.value).toEqual(firstValue);
    expect(testDLL.tail!.value).toEqual(firstValue);
    expect(testDLL.delete(firstValue)).toEqual(firstValue);
    expect(testDLL.head).toBeNull();
    expect(testDLL.tail).toBeNull();
  });

  it('delete(val) method reassigns head if head node deleted', () => {
    const testDLL: DLL = new DLL();
    testDLL.add(firstValue);
    testDLL.add(secondValue);
    testDLL.add(thirdValue);
    expect(testDLL.head!.value).toEqual(firstValue);
    expect(testDLL.delete(firstValue)).toEqual(firstValue);
    expect(testDLL.head!.value).toEqual(secondValue);
    expect(testDLL.head!.prev).toBeNull();
  });

  it('delete(val) method reassigns tail if tail node deleted', () => {
    const testDLL: DLL = new DLL();
    testDLL.add(firstValue);
    testDLL.add(secondValue);
    testDLL.add(thirdValue);
    expect(testDLL.tail!.value).toEqual(thirdValue);
    expect(testDLL.delete(thirdValue)).toEqual(thirdValue);
    expect(testDLL.tail!.value).toEqual(secondValue);
    expect(testDLL.tail!.next).toBeNull();
  });
});
