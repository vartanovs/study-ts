import Queue from './Queue';

describe('src/ds/queue', () => {
  const firstValue = 'a';
  const secondValue = 'b';
  const thirdValue = 'c';

  const missingValue = 'z';

  it('Queue should initialize with start, end and length 0', () => {
    const testQueue = new Queue();
    expect(testQueue.start).toEqual(0);
    expect(testQueue.end).toEqual(0);
    expect(testQueue).toHaveLength(0);
  });

  describe('Queue.enqueue()', () => {
    it('.enqueue() increments length and end', () => {
      const testQueue = new Queue();
      testQueue.enqueue(firstValue);
      expect(testQueue).toHaveLength(1);
      expect(testQueue.start).toEqual(0);
      expect(testQueue.end).toEqual(1);
      testQueue.enqueue(secondValue);
      expect(testQueue).toHaveLength(2);
      expect(testQueue.start).toEqual(0);
      expect(testQueue.end).toEqual(2);
      testQueue.enqueue(thirdValue);
      expect(testQueue).toHaveLength(3);
      expect(testQueue.start).toEqual(0);
      expect(testQueue.end).toEqual(3);
    });

    it('.enqueue(val) returns length', () => {
      const testQueue = new Queue();
      expect(testQueue.enqueue(firstValue)).toEqual(1);
      expect(testQueue.enqueue(secondValue)).toEqual(2);
      expect(testQueue.enqueue(thirdValue)).toEqual(3);
    });
  });

  describe('Queue.dequeue()', () => {
    it('.dequeue() returns undefined, not changing length if array has no length', () => {
      const testQueue = new Queue();
      expect(testQueue).toHaveLength(0);
      expect(testQueue.start).toEqual(0);
      expect(testQueue.end).toEqual(0);
      expect(testQueue.dequeue()).toBeUndefined();
      expect(testQueue).toHaveLength(0);
      expect(testQueue.start).toEqual(0);
      expect(testQueue.end).toEqual(0);
    });

    it('.dequeue() returns the first value queued', () => {
      const testQueue = new Queue();
      testQueue.enqueue(firstValue);
      testQueue.enqueue(secondValue);
      testQueue.enqueue(thirdValue);
      expect(testQueue.dequeue()).toEqual(firstValue);
      expect(testQueue.dequeue()).toEqual(secondValue);
      expect(testQueue.dequeue()).toEqual(thirdValue);
    });

    it('.dequeue() decrements length and increments start', () => {
      const testQueue = new Queue();
      testQueue.enqueue(firstValue);
      testQueue.enqueue(secondValue);
      testQueue.enqueue(thirdValue);
      expect(testQueue).toHaveLength(3);
      expect(testQueue.start).toEqual(0);
      expect(testQueue.end).toEqual(3);
      testQueue.dequeue();
      expect(testQueue).toHaveLength(2);
      expect(testQueue.start).toEqual(1);
      expect(testQueue.end).toEqual(3);
      testQueue.dequeue();
      expect(testQueue).toHaveLength(1);
      expect(testQueue.start).toEqual(2);
      expect(testQueue.end).toEqual(3);
      testQueue.dequeue();
      expect(testQueue).toHaveLength(0);
      expect(testQueue.start).toEqual(3);
      expect(testQueue.end).toEqual(3);
      testQueue.dequeue();
      expect(testQueue).toHaveLength(0);
      expect(testQueue.start).toEqual(3);
      expect(testQueue.end).toEqual(3);
    });
  });

  describe('Queue.includes()', () => {
    it('.includes() returns true if a value is in the list', () => {
      const testQueue = new Queue();
      testQueue.enqueue(firstValue);
      testQueue.enqueue(secondValue);
      testQueue.enqueue(thirdValue);
      expect(testQueue.includes(firstValue)).toBeTruthy();
      expect(testQueue.includes(secondValue)).toBeTruthy();
      expect(testQueue.includes(thirdValue)).toBeTruthy();
    });

    it('.includes() returns false if a value is not in the list', () => {
      const testQueue = new Queue();
      expect(testQueue.includes(firstValue)).toBeFalsy();
      testQueue.enqueue(firstValue);
      testQueue.enqueue(secondValue);
      testQueue.enqueue(thirdValue);
      expect(testQueue.includes(missingValue)).toBeFalsy();
    });
  });

  describe('Queue.isEmpty()', () => {
    it('.isEmpty() returns true if nothing has been pushed into the Queue', () => {
      const testQueue = new Queue();
      expect(testQueue.isEmpty()).toBeTruthy();
    });

    it('.isEmpty() returns false if the Queue holds a value', () => {
      const testQueue = new Queue();
      testQueue.enqueue(firstValue);
      expect(testQueue.isEmpty()).toBeFalsy();
      testQueue.enqueue(secondValue);
      expect(testQueue.isEmpty()).toBeFalsy();
    });

    it('.isEmpty() returns true if all Queue contents have been dequeued', () => {
      const testQueue = new Queue();
      testQueue.enqueue(firstValue);
      testQueue.enqueue(secondValue);
      testQueue.dequeue();
      expect(testQueue.isEmpty()).toBeFalsy();
      testQueue.dequeue();
      expect(testQueue.isEmpty()).toBeTruthy();
    });
  });

  describe('Queue.peek()', () => {
    it('.peek() returns undefined if Queue has no length', () => {
      const testQueue = new Queue();
      expect(testQueue.length).toEqual(0);
      expect(testQueue.peek()).toBeUndefined();
      expect(testQueue.length).toEqual(0);
    });

    it('.peek() returns the first enqueued value without affecting length', () => {
      const testQueue = new Queue();
      testQueue.enqueue(firstValue);
      testQueue.enqueue(secondValue);
      testQueue.enqueue(thirdValue);
      expect(testQueue.length).toEqual(3);
      expect(testQueue.peek()).toEqual(firstValue);
      expect(testQueue.length).toEqual(3);
      expect(testQueue.peek()).toEqual(firstValue);
      expect(testQueue.length).toEqual(3);
    });
  });
});
