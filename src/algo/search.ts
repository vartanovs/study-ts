/**
 * @module search.ts
 * @description Array Searching Algorithms
 */

interface SearchList {
  [searchName: string]: <T>(arr: T[], target: T) => boolean;
}

const search: SearchList = {};

search.linear = (arr, target) => {
  // Edge Case: Empty Array
  if (arr.length < 1) return false;

  for (const val of arr) {
    if (val === target) return true;
  }

  return false;
};

export default search;
