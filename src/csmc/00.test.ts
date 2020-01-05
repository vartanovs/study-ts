import {
  validAnagram,
  countUniqueValues,
  sameFrequency,
  areThereDuplicates,
  averagePair,
  isSubsequence,
  maxSubarraySum,
  minSubArrayLen,
  findLongestSubstring,
} from './00';

describe('src/csmc/00', () => {
  it('Challenge 001 - Valid Anagram', () => {
    expect(validAnagram('', '')).toBeTruthy();
    expect(validAnagram('aaz', 'zza')).toBeFalsy();
    expect(validAnagram('anagram', 'nagaram')).toBeTruthy();
    expect(validAnagram('rat', 'car')).toBeFalsy();
    expect(validAnagram('awesome', 'awesom')).toBeFalsy();
    expect(validAnagram('qwerty', 'qeywrt')).toBeTruthy();
    expect(validAnagram('texttwisttime', 'timetwisttext')).toBeTruthy();
  });

  it('Challenge 002 - Count Unique Values', () => {
    expect(countUniqueValues([1, 1, 1, 1, 1, 1, 2])).toEqual(2);
    expect(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])).toEqual(7);
    expect(countUniqueValues([])).toEqual(0);
    expect(countUniqueValues([-2, -1, -1, 0, 1])).toEqual(4);
  });

  it('Challenge 003 - Same Frequency', () => {
    expect(sameFrequency(182, 281)).toBeTruthy();
    expect(sameFrequency(34, 14)).toBeFalsy();
    expect(sameFrequency(3589578, 5879385)).toBeTruthy();
    expect(sameFrequency(22, 222)).toBeFalsy();
  });

  it('Challenge 004 - Are There Duplicates', () => {
    expect(areThereDuplicates()).toBeFalsy();
    expect(areThereDuplicates(1, 2, 2)).toBeTruthy();
    expect(areThereDuplicates(1, 2, 3)).toBeFalsy();
    expect(areThereDuplicates('d', 'e', 'f', 'd')).toBeTruthy();
    expect(areThereDuplicates('a', 'b', 'c')).toBeFalsy();
  });

  it('Challenge 005 - Average Pair', () => {
    expect(averagePair([1, 2, 3], 2.5)).toBeTruthy();
    expect(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)).toBeTruthy();
    expect(averagePair([-1, 0, 3, 4, 5, 6], 4.1)).toBeFalsy();
    expect(averagePair([], 4)).toBeFalsy();
  });

  it('Challenge 006 - Is Subsequence', () => {
    expect(isSubsequence('hello', 'hello world')).toBeTruthy();
    expect(isSubsequence('sing', 'sting')).toBeTruthy();
    expect(isSubsequence('abc', 'abracadabra')).toBeTruthy();
    expect(isSubsequence('cat', 'act')).toBeFalsy();
    expect(isSubsequence('cat', 'actac')).toBeFalsy();
  });

  it('Challenge 007 - Max Subarray Sum', () => {
    expect(maxSubarraySum([100, 200, 300, 400], 2)).toEqual(700);
    expect(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)).toEqual(39);
    expect(maxSubarraySum([-3, 4, 0, -2, 6, -1], 2)).toEqual(5);
    expect(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)).toEqual(5);
    expect(maxSubarraySum([2, 3], 3)).toBeNull();
  });

  it('Challenge 008 - Min Subarray Length', () => {
    expect(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)).toEqual(2);
    expect(minSubArrayLen([2, 1, 6, 5, 4], 9)).toEqual(2);
    expect(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)).toEqual(1);
    expect(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)).toEqual(3);
    expect(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)).toEqual(5);
    expect(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)).toEqual(2);
    expect(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)).toEqual(0);
  });

  it('Challenge 009 - Find Longest Substring', () => {
    expect(findLongestSubstring('')).toEqual(0);
    expect(findLongestSubstring('rithmschool')).toEqual(7);
    expect(findLongestSubstring('thisisawesome')).toEqual(6);
    expect(findLongestSubstring('thecatinthehat')).toEqual(7);
    expect(findLongestSubstring('bbbbbb')).toEqual(1);
    expect(findLongestSubstring('longestsubstring')).toEqual(8);
    expect(findLongestSubstring('thisishowwedoit')).toEqual(6);
  });
});
