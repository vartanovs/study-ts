import MinHeap from './MinHeap';
import HeapNode from './HeapNode';

describe('src/ds/MinHeap', () => {
  it('MinHeap should initialize with no values', () => {
    const testMinHeap = new MinHeap();
    expect(testMinHeap).toHaveProperty('heap');
    expect(testMinHeap.heap).toHaveLength(0);
  });

  it('One insertion should add a single Node to the Heap', () => {
    const testMinHeap = new MinHeap();
    testMinHeap.insert(10);
    expect(testMinHeap.heap).toHaveLength(1);
    expect(testMinHeap.heap[0]).toBeInstanceOf(HeapNode);
    expect(testMinHeap.heap[0].value).toEqual(10);
  });

  it('Inserting a smaller number than current min should displace min', () => {
    const testMinHeap = new MinHeap();
    testMinHeap.insert(6);
    testMinHeap.insert(8);
    testMinHeap.insert(10);
    expect(testMinHeap.heap).toHaveLength(3);
    expect(testMinHeap.heap[0].value).toEqual(6);
    expect(testMinHeap.heap[1].value).toEqual(8);
    expect(testMinHeap.heap[2].value).toEqual(10);
    testMinHeap.insert(4);
    expect(testMinHeap.heap).toHaveLength(4);
    expect(testMinHeap.heap[0].value).toEqual(4);
    expect(testMinHeap.heap[1].value).toEqual(6);
    expect(testMinHeap.heap[2].value).toEqual(10);
    expect(testMinHeap.heap[3].value).toEqual(8);
  });

  it('Extracting the min should result in next highest number becoming the min', () => {
    const testMinHeap = new MinHeap();
    testMinHeap.insert(2);
    testMinHeap.insert(4);
    testMinHeap.insert(6);
    testMinHeap.insert(8);
    testMinHeap.insert(10);
    expect(testMinHeap.heap).toHaveLength(5);
    expect(testMinHeap.heap[0].value).toEqual(2);
    expect(testMinHeap.extract()).toEqual(2);
    expect(testMinHeap.heap).toHaveLength(4);
    expect(testMinHeap.heap[0].value).toEqual(4);
  });
});
