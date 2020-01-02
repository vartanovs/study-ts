/**
 * @module Orray.ts
 * @description Array Class
 */

class Orray<T = string | number> {
  [index: number]: T;
  constructor(
    public length = 0,
  ) {}

  // Add an element to the end of an array, returning array length
  public push(val: T) {
    this[this.length] = val;
    this.length += 1;
    return this.length;
  }

  // Remove and returns the last element in an array
  public pop() {
    if (this.length === 0) return;

    this.length -= 1;
    return this[this.length];
  }

  // Add an element to the start of an array, returning array length
  public unshift(val: T) {
    let tracker = this.length;
    while (tracker > 0) {
      this[tracker] = this[tracker - 1];
      tracker -= 1;
    }

    this[0] = val;
    this.length += 1;
    return this.length;
  }

  // Remove and return the first element in an array
  public shift() {
    if (!this.length) return;

    const shiftedVal = this[0];
    let tracker = 0;
    while (tracker < this.length - 1) {
      this[tracker] = this[tracker + 1];
      tracker += 1;
    }

    this.length -= 1;
    return shiftedVal;
  }

  // Find the first index at which a value can be found
  public indexOf(val: T) {
    let tracker = 0;
    while (tracker < this.length) {
      if (this[tracker] === val) return tracker;
      tracker += 1;
    }

    return -1;
  }

  // Find the last index at which a value can be found
  public lastIndexOf(val: T) {
    let tracker = this.length - 1;
    while (tracker >= 0) {
      if (this[tracker] === val) return tracker;
      tracker -= 1;
    }
    return -1;
  }

  // Return a shallow copy of a portion of an array
  public slice(begin: number = 0, end: number = this.length) {
    // Declare empty array to copy values into
    const newOrray = new Orray<T>();

    // Edge case: array is empty
    if (this.length === 0) return newOrray;

    // Edge case: begin is greater than or equal to length
    if (begin >= this.length) return newOrray;

    // Edge cases: begin or end are negative numbers
    let trueBegin = begin;
    while (trueBegin < 0) {
      trueBegin += this.length;
    }

    let trueEnd = Math.min(end, this.length);
    while (trueEnd < 0) {
      trueEnd += this.length;
    }

    // Populate and return the duplicate array
    for (let i = trueBegin; i < trueEnd; i += 1) {
      newOrray.push(this[i]);
    }

    return newOrray;
  }

  // Modify array, removing and returning existing elements and adding new elements
  public splice(start: number = this.length, delCount: number = this.length, ...args: (T)[]) {
    // Declare empty array to copy values into
    const newOrray = new Orray<T>();

    // Edge case: array is empty
    if (this.length === 0) return newOrray;

    // Assign a positive integer to 'currIndex' tracker based on start value
    let currIndex = Math.min(start, this.length);
    while (currIndex < 0) {
      currIndex += this.length;
    }

    // Assign a positive integer to delCount, no greater than this.length net currIndex
    let trueDelCount = Math.max(delCount, 0);
    if (currIndex + trueDelCount > this.length) {
      trueDelCount = this.length - currIndex;
    }

    // Delete values from base array. push them into the new array, replace with insert args
    let delTracker = 0;
    let insertIndex = 0;
    let replaceIndex = currIndex + trueDelCount;
    const preSliceLength = this.length;
    while (delTracker < trueDelCount && this[currIndex] !== undefined) {
      // Step 1: Push value at currIndex to new array
      newOrray.push(this[currIndex]);
      if (insertIndex < args.length) {
        // Step 2a: If insertion values exist, replace the pushed value in insertion argument
        this[currIndex] = args[insertIndex];
        insertIndex += 1;
      } else if (replaceIndex < preSliceLength) {
        // Step 2b: If deletion ends before the end of the array, move values up and reduce length
        this[currIndex] = this[replaceIndex];
        replaceIndex += 1;
        this.length -= 1;
      } else {
        // Step 2c: Otherwise, delete the key and reduce length
        delete this[currIndex];
        this.length -= 1;
      }

      // Step 3: Increment currIndex and delTracker;
      currIndex += 1;
      delTracker += 1;
    }

    // Step 4: If there are still values to be added, make space for them at the insertion index
    if (insertIndex < args.length) {
      const spaceNeeded = args.length - insertIndex;
      for (let i = 0; i < spaceNeeded; i += 1) {
        this[this.length - i - 1 + spaceNeeded] = this[this.length - i - 1];
      }
    }

    // Step 5: Insert remaining insertion arguments in the space that was created
    while (insertIndex < args.length) {
      this[currIndex] = args[insertIndex];
      currIndex += 1;
      insertIndex += 1;
      this.length += 1;
    }

    return newOrray;
  }
}

export default Orray;
