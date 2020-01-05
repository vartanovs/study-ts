/**
 * 1.1 - Is Unique
 * Determine if a string has all unique characters
 * Time Complexity: O(c) where c is 128, Space Complexity O(c)
 */
export const isUnique = (str: string) => {
  // Edge Case - String longer than alphabet. ASCII is 128 characters. UNICODE is longer.
  if (str.length > 128) return false;

  interface CharBuffer { [char: string]: boolean }
  const buffer: CharBuffer = {};
  for (const char of str) {
    if (char in buffer) return false;
    buffer[char] = true;
  }

  return true;
};

/**
 * 1.2 - Is Permutation
 * Determine if str2 is a permutation of str1
 * Time Complexity: O(N), Space Complexity O(N)
 */
export const isPermutation = (str1: string, str2: string) => {
  // Edge Case - Strings are different lengths
  if (str1.length !== str2.length) return false;

  // Use a buffer to store str1 chars as they are seen
  interface CharBuffer { [char: string]: number }
  const buffer: CharBuffer = {};
  const lowerStr1 = str1.toLowerCase();
  const lowerStr2 = str2.toLowerCase();
  for (const char of lowerStr1) {
    if (buffer[char]) {
      buffer[char] += 1;
    } else {
      buffer[char] = 1;
    }
  }

  // Traverse str2, using buffer to confirm identical letters
  for (const char of lowerStr2) {
    if (!buffer[char]) return false;
    buffer[char] -= 1;
  }

  return true;
};

/**
 * 1.3 - urlIfy
 * Replace all non-consecutive spaces in a string with '%20'
 * Time Complexity: O(N), Space Complexity O(N)
 */
export const urlIfy = (str: string) => {
  // Edge Case - Short-circuit if empty string
  if (!str.length) return str;

  const urlArr: string[] = [];
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === ' ') {
      while (i < (str.length - 1)) {
        if (str[i + 1] === ' ') {
          i += 1;
        } else {
          urlArr.push('%20');
          break;
        }
      }
    } else {
      urlArr.push(str[i]);
    }
  }

  return urlArr.join('');
};

/**
 * 1.4 - Palindrome Permutation
 * Determine if str is a permutation of a palindrome
 * Time Complexity: O(N), Space Complexity O(N)
 */
export const palindromePermutation = (str: string): boolean => {
  // Edge Case - Short string
  if (!str.length || str.length <= 1) return true;

  const lowerStr = str.toLowerCase();
  interface CharBuffer { [char: string ]: boolean }
  const buffer: CharBuffer = {};
  // Iterate through string, toggling unique letters in buffer
  for (const char of lowerStr) {
    if ((/[a-z]/).test(char)) {
      if (buffer[char]) {
        delete buffer[char];
      } else {
        buffer[char] = true;
      }
    }
  }

  return Object.keys(buffer).length <= 1;
};

/**
 * 1.5 - One Away
 * Check if str2 is more than 1 character different from st1
 * Time Complexity: O(N), Space Complexity O(1)
 */
export const oneAway = (str1: string, str2: string) => {
  // Edge Case - Strings are more than 1 character apart
  if (Math.abs(str1.length - str2.length) >= 2) return false;

  let i = 0;
  while (i < str1.length) {
    if (str1[i] !== str2[i]) break;
    i += 1;
  }

  // Declare pointer for end of string and start searching from end for difference
  let str1End = str1.length - 1;
  let str2End = str2.length - 1;
  while (str1End > i) {
    if (str1[str1End] !== str2[str2End]) return false;
    str1End -= 1;
    str2End -= 1;
  }

  return true;
};

/**
 * 1.6 - String Compression
 * Compress identical letters on a string to letter#
 * Return compressed string only if shorter than original string
 * Ex: 'aabcccccaaa' => 'a2b1c5a3'
 * Time Complexity: O(N), Space Complexity O(N)
 */
export const stringCompression = (str: string) => {
  // Edge Case - String is less than 3 characters
  if (str.length <= 2) return str;

  // Declare a counter for savings and an array for compressed character chunks
  let savings = 0;
  const compressedArr: string[] = [];
  for (let i = 0; i < str.length; i += 1) {
    // Short-circuit if savings are too negative
    if (savings + (str.length - i - 1) < 0) break;

    // Determine how many consecutive letters there are
    const compressionStartIndex = i;
    while ((i < str.length - 1) && (str[i] === str[i + 1])) {
      i += 1;
    }

    const compressedLetterCount = i + 1 - compressionStartIndex;
    // Create compressed string, store in compressed array
    const compressedStr = str[compressionStartIndex] + String(compressedLetterCount);
    compressedArr.push(compressedStr);
    // Increment savings by number of letters saved (can be -1)
    savings += (compressedLetterCount - 2);
  }

  // Determine whether to return original string or compressed string and return
  return savings >= 1 ? compressedArr.join('') : str;
};

/**
 * 1.7 - Rotate Matrix
 * Given an image represented by an NxN matrix, rotate by 90 degrees in place
 * Time Complexity: O(N), Space Complexity O(1)
 */
export const rotateMatrix = (matrix: string[][]) => {
  // Traverse matrix one layer at a time, ignoring central square if any
  for (let layer = 0; layer < matrix.length / 2; layer += 1) {
    // Identify first and last index in a layer ( 0 and length - 1, then 1 and length - 2, etc)
    const first = layer;
    const last = matrix.length - 1 - layer;
    // Iterate from first to last within that layer
    for (let i = first; i < last; i += 1) {
      // Identify offset (starts at 0, goes up to last)
      const offset = i - first;
      const temp = matrix[first][i]; // Place top-left letter in a buffer;
      matrix[first][i] = matrix[last - offset][first]; // Move left-btm letter to top-left
      matrix[last - offset][first] = matrix[last][last - offset]; // Move right-btm to left-btm
      matrix[last][last - offset] = matrix[i][last]; // Move top-right to left-btm
      matrix[i][last] = temp; // Move saved top-left to top-right
    }
  }

  return matrix;
};

/**
 * 1.8 - Zero Matrix
 * If an element in an MxN matrix is 0, it's entire row and column are set to zero
 * Time Complexity: O(N), Space Complexity O(1)
 */
export const zeroMatrix = (matrix: number[][]) => {
  // Edge Case - Small Matrix
  if (matrix.length < 2) return matrix;

  // Check first row and first column for zeroes
  let firstRowHasZero = false;
  let firstColHasZero = false;
  for (const val of matrix[0]) {
    if (val === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  for (const row of matrix) {
    if (row[0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  // Iterate through matrix, starting at 2nd row and 2nd column, searching for zeroes
  for (let rowIndex = 1; rowIndex < matrix.length; rowIndex += 1) {
    for (let colIndex = 1; colIndex < matrix[0].length; colIndex += 1) {
      // If a zero is found, write that zero into the 1st row and 1st column
      if (matrix[rowIndex][colIndex] === 0) {
        matrix[0][colIndex] = 0;
        matrix[rowIndex][0] = 0;
      }
    }
  }

  // Iterate through matrix, overwriting rows and columns with zeroes
  for (let rowIndex = 1; rowIndex < matrix.length; rowIndex += 1) {
    for (let colIndex = 1; colIndex < matrix[0].length; colIndex += 1) {
      if (matrix[0][colIndex] === 0 || matrix[rowIndex][0] === 0) {
        matrix[rowIndex][colIndex] = 0;
      }
    }
  }

  // Overwrite first column and/or row if either contained a zero
  if (firstColHasZero) {
    for (const row of matrix) {
      row[0] = 0;
    }
  }

  if (firstRowHasZero) {
    for (let col = 0; col < matrix[0].length; col += 1) {
      matrix[0][col] = 0;
    }
  }

  // Return updated (in place) matrix
  return matrix;
};

/**
 * 1.9 - String Rotation
 * Assume a method, isSubstring, which checks if one word is a substring of another
 * Given two strings, write code to check if str2 is a rotation of str1 with one call to isSubstring
 * Time Complexity: O(N), Space Complexity O(N)
 */
export const stringRotation = (str1: string, str2: string) => {
  if (str1.length !== str2.length) return false;
  const doubleStr1 = str1 + str1;
  return doubleStr1.includes(str2);
};
