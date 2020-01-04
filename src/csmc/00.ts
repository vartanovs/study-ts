/**
 * Given two strings, determine if the second string is an anagram of the first.
 * An anagram is a word, phrase or name formed by rearranging the letters of another.
 * Example: Cinema and Iceman
 * Time Complexity: O(N), Space Complexity: O(1) (max 26 unique letters)
 */

export const validAnagram = (str1: string, str2: string) => {
  // Edge Case - Short-circuit if strings are different lengths
  if (str1.length !== str2.length) return false;

  // Edge Case - Short-circuit if strings are empty
  if (str1.length === 0) return true;

  const [lowerCaseStr1, lowerCaseStr2] = [str1.toLowerCase(), str2.toLowerCase()];

  // Create a storage object to keep track of letters
  interface LetterStore { [letter: string]: number }
  const letterStore: LetterStore = {};
  for (const char of lowerCaseStr1) {
    if (letterStore[char]) {
      letterStore[char] += 1;
    } else {
      letterStore[char] = 1;
    }
  }

  for (const char of lowerCaseStr2) {
    if (!letterStore[char]) return false;
    if (letterStore[char] === 1) {
      delete letterStore[char];
    } else {
      letterStore[char] -= 1;
    }
  }

  return true;
};

/**
 * Given a sorted array, count and return the unique values in the array.
 * Time Complexity: O(N), Space Complexity: O(1)
 */
export const countUniqueValues = (arr: number[]) => {
  // Edge Case - Short-circuit if array is empty
  if (!arr.length) return 0;

  // Declare multiple pointers and a counter
  let uniqueValCounter = 1;
  let i = 0;
  let j = 1;

  // Loop through array, with j pointing at each value, increment counter
  while (j < arr.length) {
    if (arr[i] !== arr[j]) {
      uniqueValCounter += 1;
      i = j;
    }

    j += 1;
  }

  return uniqueValCounter;
};

/**
 * Given two positive integers, find out if they have the same frequency of digits
 * Time Complexity: O(N), Space Complexity: O(N)
 */
export const sameFrequency = (num1: number, num2: number) => {
  // Convert both numbers to strings - O(N);
  const num1Str = String(num1);
  const num2Str = String(num2);

  // Edge Case - Short circuit if digits have different lengths
  if (num1Str.length !== num2Str.length) return false;

  // Create an object to hold digits
  interface DigitStore { [digit: string]: number }
  const digitStore: DigitStore = {};

  // Loop through num1, storing each digit into digitStore
  for (const digit of num1Str) {
    if (digitStore[digit]) {
      digitStore[digit] += 1;
    } else {
      digitStore[digit] = 1;
    }
  }

  // Loop through num2, returning false if digit cannot be removed from the hash table
  for (const digit of num2Str) {
    if (!digitStore[digit]) return false;
    digitStore[digit] -= 1;
  }

  return true;
};

/**
 * Given a variable number of arguments, check if there are any duplicates passed in
 * Time Complexity: O(N), Space Complexity: O(N)
 */
export const areThereDuplicates = <T>(...args: T[]): boolean => {
  // Create a new set using the arguments passed in. ES6 sets auto de-duplicate.
  const argsSet = new Set(args);
  return argsSet.size < args.length;
};

/**
 * Given a sorted array of integers and a target average, determine if there is a pair of values
 * in the array where the average of that pair equals the target average
 * Time Complexity: O(N), Space Complexity: O(1)
 */
export const averagePair = (arr: number[], target: number) => {
  // Edge Case - Array of 0 or 1 values
  if (!arr.length || arr.length < 2) return false;
  // Set pointers to start and end of array
  let startIndex = 0;
  let endIndex = arr.length - 1;
  // Loop through array, searching for the target average
  while (startIndex <= endIndex) {
    const currAverage = (arr[startIndex] + arr[endIndex]) / 2;
    if (currAverage === target) return true;
    if (currAverage > target) {
      // If current average is too high, move endIndex to the next unique value
      do { endIndex -= 1; } while (arr[endIndex] === arr[endIndex + 1]);
    } else {
      // If current average is too low, move startIndex to the next unique value
      do { startIndex += 1; } while (arr[startIndex] === arr[startIndex - 1]);
    }
  }

  return false;
};

/**
 * Given two strings, check if the characters in string1 form a subsequence of characters in string2
 * In other words, the characters in string1 should be found in the same order in string 2
 * Time Complexity: O(N + M), Space Complexity: O(1)
 */
export const isSubsequence = (str1: string, str2: string) => {
  // Short circuit if str1 is longer than str2
  if (str1.length > str2.length) return false;
  // Short circuit if str1 and str2 are identical
  if (str1.length === str2.length) return str1 === str2;

  // Set pointers at the start of each string
  let str1Index = 0;
  let str2Index = 0;
  // Loop through the strings, as long as there are more letters outstanding in str2 than str1
  while (str2.length - str2Index >= str1.length - str1Index) {
    // If current letters are identical, increment str1Index and check for completion
    if (str1[str1Index] === str2[str2Index]) {
      str1Index += 1;
      if (str1Index === str1.length) return true;
    }
    // Whether or not letters are identical, increment str2Index
    str2Index += 1;
  }

  return false;
};

/**
 * Given an array of integers and a positive integer
 * Find the maximum sum of a subarray with length equal to the positive integer
 * Time Complexity: O(N), Space Complexity O(1)
 */
export const maxSubarraySum = (arr: number[], targetLen: number) => {
  // Edge Case - Short-circuit if subarray length is greater than array length
  if (arr.length < targetLen) return null;

  // Set pointers at start and end of subarray and populate working max
  let startIndex = 0;
  let endIndex = 0;
  let subArrLen = 1;
  let [localMax] = arr;
  // Populate initial max
  while (subArrLen < targetLen) {
    subArrLen += 1;
    endIndex += 1;
    localMax += arr[endIndex];
  }

  // Populate local max
  let overallMax = localMax;
  // Migrate subarray, recalculating the local max and comparing it to overall max
  while (endIndex < arr.length - 1) {
    startIndex += 1;
    endIndex += 1;
    localMax = localMax - arr[startIndex - 1] + arr[endIndex];
    overallMax = Math.max(overallMax, localMax);
  }

  // Once every subarray has been examined, return largest max found
  return overallMax;
};

/**
 * Return the minimal length of a contiguous subarray
 * of which the sum is greater than or equal to the integer passed to the function
 * If no subarray exists, return 0 instead
 * Time Complexity: O(N), Space Complexity O(1)
 */

export const minSubArrayLen = (arr: number[], target: number) => {
  // Edge Case - Short-circuit if array is empty
  if (arr.length === 0) return 0;

  // Set pointers to start and end of subarray
  let startIndex = 0;
  let endIndex = 0;
  let [localSum] = arr;

  // Find smallest subArray from arr start for which subArrSum < target
  while (localSum < target) {
    endIndex += 1;
    localSum += arr[endIndex];
    // Edge Case - Entire array has been traversed
    if (endIndex === arr.length - 1) return (localSum >= target) ? arr.length : 0;
  }

  // Measure the length of this initial suitable subarray
  let minLen = endIndex + 1;

  // Iterate endIndex through to the end of the array
  while (endIndex < arr.length) {
    // If a number can be removed from the start of the subArray, remove it and recalculate minLen
    while ((localSum - arr[startIndex]) >= target) {
      localSum -= arr[startIndex];
      startIndex += 1;
      minLen = Math.min(minLen, (endIndex + 1 - startIndex));
    }

    // Increment endIndex and update localSum if possible
    endIndex += 1;
    if (endIndex !== arr.length) {
      localSum += arr[endIndex];
    }
  }

  return minLen;
};

/**
 * Given a string, return the length of the longest substring of unique characters
 * Time Complexity: O(N), Space Complexity: O(N)
 */
export const findLongestSubstring = (str: string): number => {
  // Edge Case: Short-circuit if short string
  if (!str.length || str.length === 1) return str.length;

  // Declare indexes to traverse the string, a Set to hold characters, and an absolute max
  let startIndex = 0;
  let endIndex = 0;
  const localSet = new Set(str[0]);
  let absoluteMax = 1;
  // Traverse the array using end index as a tracker for the current letter
  while (endIndex < str.length - 1) {
    // Increment index and check if the letter exists in the Set
    endIndex += 1;
    const currLetter = str[endIndex];
    if (localSet.has(currLetter)) {
      // If the letter is in the Set, start removing letters from the set until the duplicate
      while (str[startIndex] !== currLetter) {
        localSet.delete(str[startIndex]);
        startIndex += 1;
      }
      // Increment once more to skip the duplicate
      startIndex += 1;
    } else {
      // If the letter isn't in the Set, add it and update absoluteMax
      localSet.add(currLetter);
      absoluteMax = Math.max(absoluteMax, localSet.size);
    }
  }

  // Return the highest max found
  return absoluteMax;
};
