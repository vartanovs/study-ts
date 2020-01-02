import MaxHeap from './MaxHeap';
import HeapNode from './HeapNode';

describe('src/ds/MaxHeap', () => {
  it('MaxHeap should initialize with no values', () => {
    const testMaxHeap = new MaxHeap();
    expect(testMaxHeap).toHaveProperty('heap');
    expect(testMaxHeap.heap).toHaveLength(0);
  });

  it('One insertion should add a single Node to the Heap', () => {
    const testMaxHeap = new MaxHeap();
    testMaxHeap.insert(10);
    expect(testMaxHeap.heap).toHaveLength(1);
    expect(testMaxHeap.heap[0]).toBeInstanceOf(HeapNode);
    expect(testMaxHeap.heap[0].value).toEqual(10);
  });

  it('Inserting a larger number than current max should displace max', () => {
    const testMaxHeap = new MaxHeap();
    testMaxHeap.insert(10);
    testMaxHeap.insert(8);
    testMaxHeap.insert(6);
    expect(testMaxHeap.heap).toHaveLength(3);
    expect(testMaxHeap.heap[0].value).toEqual(10);
    expect(testMaxHeap.heap[1].value).toEqual(8);
    expect(testMaxHeap.heap[2].value).toEqual(6);
    testMaxHeap.insert(12);
    expect(testMaxHeap.heap).toHaveLength(4);
    expect(testMaxHeap.heap[0].value).toEqual(12);
    expect(testMaxHeap.heap[1].value).toEqual(10);
    expect(testMaxHeap.heap[2].value).toEqual(6);
    expect(testMaxHeap.heap[3].value).toEqual(8);
  });

  it('Extracting the max should result in next highest number becoming the max', () => {
    const testMaxHeap = new MaxHeap();
    testMaxHeap.insert(10);
    testMaxHeap.insert(8);
    testMaxHeap.insert(6);
    testMaxHeap.insert(4);
    testMaxHeap.insert(2);
    expect(testMaxHeap.heap).toHaveLength(5);
    expect(testMaxHeap.heap[0].value).toEqual(10);
    expect(testMaxHeap.extract()).toEqual(10);
    expect(testMaxHeap.heap).toHaveLength(4);
    expect(testMaxHeap.heap[0].value).toEqual(8);
  });
});
