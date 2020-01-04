/**
 * @module sort.ts
 * @description Array Sorting Algorithms
 */

interface SortList { [sortName: string]: <T = string | number>(arr: T[]) => T[] }
const sort: SortList = {};

sort.bubble = <T>(arr: T[]): T[] => {
  // Edge Case - Short Array
  if (arr.length <= 1) return arr;

  const sortedArr = arr.slice();
  let didSwap: boolean;
  let startIndex: number;
  let stopIndex = sortedArr.length;
  // Loop thru array, bubble largest number to the top
  do {
    didSwap = false;
    startIndex = 1;
    while (startIndex < stopIndex) {
      if (sortedArr[startIndex] < sortedArr[startIndex - 1]) {
        // If two items are out of order, swap them and update didSwap to true
        const temp = sortedArr[startIndex];
        sortedArr[startIndex] = sortedArr[startIndex - 1];
        sortedArr[startIndex - 1] = temp;
        didSwap = true;
      }
      startIndex += 1;
    }

    // Upon traversal, decrement stopIndex and rerun if any swaps were made
    stopIndex -= 1;
  } while (didSwap === true);

  return sortedArr;
};

sort.insertion = <T>(arr: T[]): T[] => {
  // Edge Case - Short Array
  if (arr.length <= 1) return arr;

  const sortedArr = arr.slice();
  let sortedIndex = 1;
  // Loop thru array, sorting one element at a time
  do {
    let currIndex = sortedIndex;
    while (currIndex > 0) {
      // If two items are out of order, swap them
      if (sortedArr[currIndex] < sortedArr[currIndex - 1]) {
        const temp = sortedArr[currIndex];
        sortedArr[currIndex] = sortedArr[currIndex - 1];
        sortedArr[currIndex - 1] = temp;
      }

      currIndex -= 1;
    }

    sortedIndex += 1;
  } while (sortedIndex < sortedArr.length);

  return sortedArr;
};

sort.selection = <T>(arr: T[]): T[] => {
  // Edge Case - Short Array
  if (arr.length <= 1) return arr;

  const sortedArr = arr.slice();
  let currIndex = 0;
  // Loop thru array, selecting and swapping smallest value
  do {
    let minIndex = currIndex;
    for (let i = currIndex; i < sortedArr.length; i += 1) {
      if (sortedArr[i] < sortedArr[minIndex]) {
        minIndex = i;
      }
    }

    // Swap numbers at currIndex and minIndex
    if (currIndex !== minIndex) {
      const temp = sortedArr[currIndex];
      sortedArr[currIndex] = sortedArr[minIndex];
      sortedArr[minIndex] = temp;
    }

    currIndex += 1;
  } while (currIndex < arr.length - 1);

  return sortedArr;
};

sort.merge = <T>(arr: T[]): T[] => {
  // Edge Case - Short Array
  if (arr.length <= 1) return arr;

  // Generate an array of single element sub-arrays and merge one row at a time
  let sortedArr = arr.map((val) => [val]);
  while (sortedArr.length > 1) {
    const newSortedArr: T[][] = [];
    // Evaluate two adjacent sub-arrays at a time
    for (let i = 0; i < sortedArr.length; i += 2) {
      if (i === sortedArr.length - 1) {
        // If there are odd sub-arrays, push the last one into the newSortedArr
        newSortedArr.push(sortedArr[i]);
      } else {
        // Otherwise, merge the two adjacent sub-arrays and push the result into newSortedArr
        let newArr: T[] = [];
        while (sortedArr[i].length && sortedArr[i + 1].length) {
          // Merge sub-arrays from start to finish to produce new sorted sub-arrays
          if (sortedArr[i][0] < sortedArr[i + 1][0]) {
            newArr.push(sortedArr[i].shift()!);
          } else {
            newArr.push(sortedArr[i + 1].shift()!);
          }
        }

        newArr = newArr.concat(sortedArr[i]).concat(sortedArr[i + 1]);
        newSortedArr.push(newArr);
      }
    }

    // Once all sub-arrays have been merged, repeat the loop
    sortedArr = newSortedArr;
  }

  // Once only one sorted sub-array remains, return this subarray
  return sortedArr[0];
};

sort.quick = <T>(arr: T[]): T[] => {
  // Edge Case - Short Array
  if (arr.length <= 1) return arr;

  let sortedArr = arr.slice();
  let start = 0;
  let end = arr.length - 2;
  let pivot = arr.length - 1;
  // Iterate through sorted array, splitting it into two parts: greater and less than pivot
  while (start < end) {
    if (sortedArr[start] > sortedArr[pivot] && sortedArr[end] < sortedArr[pivot]) {
      // Swap the elements at start and end if they are on the wrong side of pivot
      const temp = sortedArr[start];
      sortedArr[start] = sortedArr[end];
      sortedArr[end] = temp;
    }

    if (sortedArr[start] < sortedArr[pivot]) {
      // Increment start index if that element is smaller than the pivot element
      start += 1;
    }

    if (sortedArr[end] > sortedArr[pivot]) {
      // Decrement end index if that element is smaller than the pivot element
      end -= 1;
    }
  }

  // Switch pivot with first number greater than pivot
  if (sortedArr[end] < sortedArr[pivot]) end += 1;
  else start -= 1;
  const temp = sortedArr[end];
  sortedArr[end] = sortedArr[pivot];
  sortedArr[pivot] = temp;
  pivot = end;

  // Make a recursive call to sort before and after the pivot
  sortedArr = [...sort.quick(sortedArr.slice(0, pivot)), sortedArr[pivot], ...sort.quick(sortedArr.slice(pivot + 1))];

  // Return the final sorted array
  return sortedArr;
};

export default sort;
