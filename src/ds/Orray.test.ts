import Orray from './Orray';

describe('src/ds/Orray', () => {
  const firstValue = 'a';
  const secondValue = 'b';
  const thirdValue = 'c';
  const fourthValue = 'd';
  const fifthValue = 'e';
  const sixthValue = 'f';

  it('Orray should initialize with length 0', () => {
    const testArray = new Orray();
    expect(testArray).toHaveLength(0);
  });

  describe('Orray.push()', () => {
    it('.push() increments length', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      expect(testArray).toHaveLength(1);
      testArray.push(secondValue);
      expect(testArray).toHaveLength(2);
      testArray.push(thirdValue);
      expect(testArray).toHaveLength(3);
    });

    it('.push() returns length', () => {
      const testArray = new Orray();
      expect(testArray.push(firstValue)).toEqual(1);
      expect(testArray.push(secondValue)).toEqual(2);
      expect(testArray.push(thirdValue)).toEqual(3);
    });

    it('.push() adds val to the end of the array at each index', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      expect(testArray[0]).toEqual(firstValue);
      testArray.push(secondValue);
      expect(testArray[1]).toEqual(secondValue);
      testArray.push(thirdValue);
      expect(testArray[2]).toEqual(thirdValue);
    });
  });

  describe('Orray.pop()', () => {
    it('.pop() returns undefined, not changing length if array has no length', () => {
      const testArray = new Orray();
      expect(testArray).toHaveLength(0);
      expect(testArray.pop()).toBeUndefined();
      expect(testArray).toHaveLength(0);
    });

    it('.pop() returns the most recently pushed value', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      expect(testArray.pop()).toEqual(thirdValue);
      expect(testArray.pop()).toEqual(secondValue);
      expect(testArray.pop()).toEqual(firstValue);
    });

    it('.pop() decrements length if array has length', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      expect(testArray).toHaveLength(3);
      testArray.pop();
      expect(testArray).toHaveLength(2);
      testArray.pop();
      expect(testArray).toHaveLength(1);
      testArray.pop();
      expect(testArray).toHaveLength(0);
    });

    it('.pop() allows array items to be overwritten', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      expect(testArray[2]).toEqual(thirdValue);
      testArray.pop();
      testArray.pop();
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      expect(testArray[0]).toEqual(firstValue);
      expect(testArray[1]).toEqual(fourthValue);
      expect(testArray[2]).toEqual(fifthValue);
    });
  });

  describe('Orray.unshift()', () => {
    it('.unshift() increments length', () => {
      const testArray = new Orray();
      testArray.unshift(thirdValue);
      expect(testArray).toHaveLength(1);
      testArray.unshift(secondValue);
      expect(testArray).toHaveLength(2);
      testArray.unshift(firstValue);
      expect(testArray).toHaveLength(3);
    });

    it('.unshift() returns length', () => {
      const testArray = new Orray();
      expect(testArray.unshift(thirdValue)).toEqual(1);
      expect(testArray.unshift(secondValue)).toEqual(2);
      expect(testArray.unshift(firstValue)).toEqual(3);
    });

    it('.unshift() adds val to the start of the array at each index', () => {
      const testArray = new Orray();
      testArray.unshift(thirdValue);
      expect(testArray[0]).toEqual(thirdValue);
      testArray.unshift(secondValue);
      expect(testArray[0]).toEqual(secondValue);
      expect(testArray[1]).toEqual(thirdValue);
      testArray.unshift(firstValue);
      expect(testArray[0]).toEqual(firstValue);
      expect(testArray[1]).toEqual(secondValue);
      expect(testArray[2]).toEqual(thirdValue);
    });
  });

  describe('Orray.shift()', () => {
    it('.shift() returns undefined, not changing length if array has no length', () => {
      const testArray = new Orray();
      expect(testArray).toHaveLength(0);
      expect(testArray.shift()).toBeUndefined();
      expect(testArray).toHaveLength(0);
    });

    it('.shift() returns the first array value', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      expect(testArray.shift()).toEqual(firstValue);
      expect(testArray.shift()).toEqual(secondValue);
      expect(testArray.shift()).toEqual(thirdValue);
    });

    it('.shift() decrements length if array has length', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      expect(testArray).toHaveLength(3);
      testArray.shift();
      expect(testArray).toHaveLength(2);
      testArray.shift();
      expect(testArray).toHaveLength(1);
      testArray.shift();
      expect(testArray).toHaveLength(0);
    });

    it('.shift() allows array items at the end to be overwritten', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      expect(testArray[0]).toEqual(firstValue);
      testArray.shift();
      testArray.shift();
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      expect(testArray[0]).toEqual(thirdValue);
      expect(testArray[1]).toEqual(fourthValue);
      expect(testArray[2]).toEqual(fifthValue);
    });
  });

  describe('Orray.indexOf(val)', () => {
    it('.indexOf(val) returns the first index at which val can be found', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(secondValue);
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      expect(testArray.indexOf(firstValue)).toEqual(0);
      expect(testArray.indexOf(secondValue)).toEqual(1);
      expect(testArray.indexOf(thirdValue)).toEqual(2);
      expect(testArray.indexOf(fourthValue)).toEqual(7);
    });

    it('AND .indexOf(val) returns -1 if val is not in the array', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      expect(testArray.indexOf(fourthValue)).toEqual(-1);
    });
  });

  describe('Orray.lastIndexOf()', () => {
    it('.lastIndexOf(val) returns the last index at which val can be found', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      expect(testArray.lastIndexOf(firstValue)).toEqual(0);
      expect(testArray.lastIndexOf(secondValue)).toEqual(3);
      expect(testArray.lastIndexOf(thirdValue)).toEqual(4);
      expect(testArray.lastIndexOf(fourthValue)).toEqual(5);
    });

    it('.lastIndexOf(val) returns -1 if val is not in the array', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      expect(testArray.lastIndexOf(fourthValue)).toEqual(-1);
    });
  });

  describe('Orray.slice()', () => {
    it('.slice() returns an empty Orray if Orray is not populated', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.pop();
      testArray.pop();
      testArray.pop();
      const copyArray = testArray.slice(3);
      expect(copyArray).toBeInstanceOf(Orray);
      expect(copyArray.length).toEqual(0);
    });

    it('.slice() returns a copy of the Orray', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const copyArray = testArray.slice();
      expect(copyArray).toBeInstanceOf(Orray);
      expect(copyArray.length).toEqual(6);
      expect(copyArray[0]).toEqual(firstValue);
      expect(copyArray[1]).toEqual(secondValue);
      expect(copyArray[2]).toEqual(thirdValue);
      expect(copyArray[3]).toEqual(fourthValue);
      expect(copyArray[4]).toEqual(fifthValue);
      expect(copyArray[5]).toEqual(sixthValue);
    });

    it('.slice(num) returns a copy of the Orray starting at index num', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const copyArray = testArray.slice(2);
      expect(copyArray).toBeInstanceOf(Orray);
      expect(copyArray.length).toEqual(4);
      expect(copyArray[0]).toEqual(thirdValue);
      expect(copyArray[1]).toEqual(fourthValue);
      expect(copyArray[2]).toEqual(fifthValue);
      expect(copyArray[3]).toEqual(sixthValue);
    });

    it('.slice(num) does not mutate the original array', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const copyArray = testArray.slice(3);
      expect(copyArray).toBeInstanceOf(Orray);
      expect(copyArray.length).toEqual(3);
      expect(testArray).toBeInstanceOf(Orray);
      expect(testArray.length).toEqual(6);
      expect(testArray[0]).toEqual(firstValue);
      expect(testArray[1]).toEqual(secondValue);
      expect(testArray[2]).toEqual(thirdValue);
      expect(testArray[3]).toEqual(fourthValue);
      expect(testArray[4]).toEqual(fifthValue);
      expect(testArray[5]).toEqual(sixthValue);
    });

    it('.slice(-num) returns a copy of the Orray with only the last num elements', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const copyArray = testArray.slice(-2);
      expect(copyArray).toBeInstanceOf(Orray);
      expect(copyArray.length).toEqual(2);
      expect(copyArray[0]).toEqual(fifthValue);
      expect(copyArray[1]).toEqual(sixthValue);
    });

    it('.slice(num) if num > array.length will be an empty array', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      const copyArray = testArray.slice(4);
      expect(copyArray).toBeInstanceOf(Orray);
      expect(copyArray.length).toEqual(0);
      expect(copyArray).not.toHaveProperty('0');
    });

    it('.slice(num1, num2) returns a copy of the Orray until num2', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const copyArray = testArray.slice(0, 4);
      expect(copyArray).toBeInstanceOf(Orray);
      expect(copyArray.length).toEqual(4);
      expect(copyArray[0]).toEqual(firstValue);
      expect(copyArray[1]).toEqual(secondValue);
      expect(copyArray[2]).toEqual(thirdValue);
      expect(copyArray[3]).toEqual(fourthValue);
      expect(copyArray).not.toHaveProperty('4');
    });

    it('.slice(num1, num2) returns a copy of the Orray until end if num2 > length', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      const copyArray = testArray.slice(0, 8);
      expect(copyArray).toBeInstanceOf(Orray);
      expect(copyArray.length).toEqual(3);
      expect(copyArray[0]).toEqual(firstValue);
      expect(copyArray[1]).toEqual(secondValue);
      expect(copyArray[2]).toEqual(thirdValue);
      expect(copyArray).not.toHaveProperty('3');
    });

    it('.slice(num1, -num2) returns a copy of the Orray net last num2 elements', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const copyArray = testArray.slice(0, -2);
      expect(copyArray).toBeInstanceOf(Orray);
      expect(copyArray.length).toEqual(4);
      expect(copyArray[0]).toEqual(firstValue);
      expect(copyArray[1]).toEqual(secondValue);
      expect(copyArray[2]).toEqual(thirdValue);
      expect(copyArray[3]).toEqual(fourthValue);
      expect(copyArray).not.toHaveProperty('4');
    });
  });

  describe('Orray.splice()', () => {
    it('.splice() returns an empty Orray if Orray is not populated', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.pop();
      testArray.pop();
      testArray.pop();
      const splicedSegment = testArray.splice(3);
      expect(splicedSegment).toBeInstanceOf(Orray);
      expect(splicedSegment.length).toEqual(0);
    });

    it('.splice() create a new empty array if no inputs specified', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      const splicedSegment = testArray.splice();
      expect(testArray.length).toEqual(4);
      expect(testArray[0]).toEqual(firstValue);
      expect(testArray[1]).toEqual(secondValue);
      expect(testArray[2]).toEqual(thirdValue);
      expect(testArray[3]).toEqual(fourthValue);
      expect(splicedSegment).toBeInstanceOf(Orray);
      expect(splicedSegment.length).toEqual(0);
      expect(splicedSegment).not.toHaveProperty('0');
    });

    it('.splice(start) removes and returns all items after the start input', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const splicedSegment = testArray.splice(2);
      expect(testArray.length).toEqual(2);
      expect(testArray[0]).toEqual(firstValue);
      expect(testArray[1]).toEqual(secondValue);
      expect(testArray).not.toHaveProperty('3');
      expect(splicedSegment).toBeInstanceOf(Orray);
      expect(splicedSegment.length).toEqual(4);
      expect(splicedSegment[0]).toEqual(thirdValue);
      expect(splicedSegment[1]).toEqual(fourthValue);
      expect(splicedSegment[2]).toEqual(fifthValue);
      expect(splicedSegment[3]).toEqual(sixthValue);
    });

    it('.splice(-start) removes/returns items after start input, counting backwards', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const splicedSegment = testArray.splice(-2);
      expect(testArray.length).toEqual(4);
      expect(testArray[0]).toEqual(firstValue);
      expect(testArray[1]).toEqual(secondValue);
      expect(testArray[2]).toEqual(thirdValue);
      expect(testArray[3]).toEqual(fourthValue);
      expect(testArray).not.toHaveProperty('4');
      expect(splicedSegment).toBeInstanceOf(Orray);
      expect(splicedSegment.length).toEqual(2);
      expect(splicedSegment[0]).toEqual(fifthValue);
      expect(splicedSegment[1]).toEqual(sixthValue);
    });

    it('.splice(start, end) removes/returns delete count items if delete is specified', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const splicedSegment = testArray.splice(2, 2);
      expect(testArray.length).toEqual(4);
      expect(testArray[0]).toEqual(firstValue);
      expect(testArray[1]).toEqual(secondValue);
      expect(testArray[2]).toEqual(fifthValue);
      expect(testArray[3]).toEqual(sixthValue);
      expect(splicedSegment).toBeInstanceOf(Orray);
      expect(splicedSegment.length).toEqual(2);
      expect(splicedSegment[0]).toEqual(thirdValue);
      expect(splicedSegment[1]).toEqual(fourthValue);
    });

    it('.splice(start, end, args) inserts args where items were deleted', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const splicedSegment = testArray.splice(2, 2, 'g', 'h');
      expect(testArray.length).toEqual(6);
      expect(testArray[0]).toEqual(firstValue);
      expect(testArray[1]).toEqual(secondValue);
      expect(testArray[2]).toEqual('g');
      expect(testArray[3]).toEqual('h');
      expect(testArray[4]).toEqual(fifthValue);
      expect(testArray[5]).toEqual(sixthValue);
      expect(splicedSegment).toBeInstanceOf(Orray);
      expect(splicedSegment.length).toEqual(2);
      expect(splicedSegment[0]).toEqual(thirdValue);
      expect(splicedSegment[1]).toEqual(fourthValue);
    });

    it('.splice(start, end, args) inserts many args where items were deleted', () => {
      const testArray = new Orray();
      testArray.push(firstValue);
      testArray.push(secondValue);
      testArray.push(thirdValue);
      testArray.push(fourthValue);
      testArray.push(fifthValue);
      testArray.push(sixthValue);
      const splicedSegment = testArray.splice(2, 2, 'g', 'h', 'i', 'j');
      expect(testArray.length).toEqual(8);
      expect(testArray[0]).toEqual(firstValue);
      expect(testArray[1]).toEqual(secondValue);
      expect(testArray[2]).toEqual('g');
      expect(testArray[3]).toEqual('h');
      expect(testArray[4]).toEqual('i');
      expect(testArray[5]).toEqual('j');
      expect(testArray[6]).toEqual(fifthValue);
      expect(testArray[7]).toEqual(sixthValue);
      expect(splicedSegment).toBeInstanceOf(Orray);
      expect(splicedSegment.length).toEqual(2);
      expect(splicedSegment[0]).toEqual(thirdValue);
      expect(splicedSegment[1]).toEqual(fourthValue);
    });
  });
});
