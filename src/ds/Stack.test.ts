import Stack from './Stack';

describe('src/ds/Stack', () => {
  const firstValue = 'a';
  const secondValue = 'b';
  const thirdValue = 'c';
  const fourthValue = 'd';
  const fifthValue = 'e';

  it('Stack should initialize with height 0', () => {
    const testStack = new Stack<string>();
    expect(testStack.height).toEqual(0);
  });

  describe('Stack.push(val)', () => {
    it('AND Stack.push(val) increments height', () => {
      const testStack = new Stack<string>();
      testStack.push(firstValue);
      expect(testStack.height).toEqual(1);
      testStack.push(secondValue);
      expect(testStack.height).toEqual(2);
      testStack.push(thirdValue);
      expect(testStack.height).toEqual(3);
    });

    it('AND .push(val) returns height', () => {
      const testStack = new Stack<string>();
      expect(testStack.push(firstValue)).toEqual(1);
      expect(testStack.push(secondValue)).toEqual(2);
      expect(testStack.push(thirdValue)).toEqual(3);
    });

    it('AND .push(val) adds val to the top of the stack at that index', () => {
      const testStack = new Stack<string>();
      testStack.push(firstValue);
      expect(testStack[0]).toEqual(firstValue);
      testStack.push(secondValue);
      expect(testStack[1]).toEqual(secondValue);
      testStack.push(thirdValue);
      expect(testStack[2]).toEqual(thirdValue);
    });
  });

  describe('Stack.isEmpty()', () => {
    it('Stack.isEmpty() returns true if nothing has been pushed into the Stack', () => {
      const testStack = new Stack<string>();
      expect(testStack.isEmpty()).toBeTruthy();
    });

    it('Stack.isEmpty() returns false if the stack holds a value', () => {
      const testStack = new Stack<string>();
      testStack.push(firstValue);
      expect(testStack.isEmpty()).toBeFalsy();
      testStack.push(secondValue);
      expect(testStack.isEmpty()).toBeFalsy();
    });

    it('Stack.isEmpty() returns true if all stack contents have been popped', () => {
      const testStack = new Stack<string>();
      testStack.push(firstValue);
      testStack.push(secondValue);
      testStack.pop();
      expect(testStack.isEmpty()).toBeFalsy();
      testStack.pop();
      expect(testStack.isEmpty()).toBeTruthy();
    });
  });

  describe('Stack.peek()', () => {
    it('Stack.peek() returns undefined if Stack has no height', () => {
      const testStack = new Stack<string>();
      expect(testStack.height).toEqual(0);
      expect(testStack.peek()).toBeUndefined();
      expect(testStack.height).toEqual(0);
    });

    it('AND .peek() returns the most recently pushed value without affecting height', () => {
      const testStack = new Stack<string>();
      testStack.push(firstValue);
      testStack.push(secondValue);
      testStack.push(thirdValue);
      expect(testStack.height).toEqual(3);
      expect(testStack.peek()).toEqual(thirdValue);
      expect(testStack.height).toEqual(3);
      expect(testStack.peek()).toEqual(thirdValue);
      expect(testStack.height).toEqual(3);
    });
  });

  describe('Stack.pop()', () => {
    it('Stack.pop() returns undefined, not changing height if Stack has no height', () => {
      const testStack = new Stack<string>();
      expect(testStack.height).toEqual(0);
      expect(testStack.pop()).toBeUndefined();
      expect(testStack.height).toEqual(0);
    });

    it('AND .pop() returns the most recently pushed value', () => {
      const testStack = new Stack<string>();
      testStack.push(firstValue);
      testStack.push(secondValue);
      testStack.push(thirdValue);
      expect(testStack.pop()).toEqual(thirdValue);
      expect(testStack.pop()).toEqual(secondValue);
      expect(testStack.pop()).toEqual(firstValue);
    });

    it('AND .pop() decrements height if Stack has length', () => {
      const testStack = new Stack<string>();
      testStack.push(firstValue);
      testStack.push(secondValue);
      testStack.push(thirdValue);
      expect(testStack.height).toEqual(3);
      expect(testStack).toHaveProperty('0');
      expect(testStack).toHaveProperty('1');
      expect(testStack).toHaveProperty('2');
      testStack.pop();
      expect(testStack.height).toEqual(2);
      expect(testStack).not.toHaveProperty('2');
      testStack.pop();
      expect(testStack.height).toEqual(1);
      expect(testStack).not.toHaveProperty('1');
      testStack.pop();
      expect(testStack.height).toEqual(0);
      expect(testStack).not.toHaveProperty('0');
    });

    it('AND .pop() allows array items to be overwritten', () => {
      const testStack = new Stack<string>();
      testStack.push(firstValue);
      testStack.push(secondValue);
      testStack.push(thirdValue);
      expect(testStack[2]).toEqual(thirdValue);
      testStack.pop();
      testStack.pop();
      testStack.push(fourthValue);
      testStack.push(fifthValue);
      expect(testStack[0]).toEqual(firstValue);
      expect(testStack[1]).toEqual(fourthValue);
      expect(testStack[2]).toEqual(fifthValue);
    });
  });
});
