import {
  isUnique,
  isPermutation,
  urlIfy,
  palindromePermutation,
  oneAway,
  stringCompression,
  rotateMatrix,
  zeroMatrix,
  stringRotation,
} from './01';

describe('src/ctci/01 - Arrays and Strings', () => {
  it('Challenge 1.1 - Is Unique', () => {
    expect(isUnique('')).toBeTruthy();
    expect(isUnique('abcdefg')).toBeTruthy();
    expect(isUnique('Wonderwasp')).toBeTruthy();
    expect(isUnique('hello')).toBeFalsy();
    expect(isUnique('ratatat')).toBeFalsy();
  });

  it('Challenge 1.2 - Is Permutation', () => {
    expect(isPermutation('', '')).toBeTruthy();
    expect(isPermutation('Hello', 'Hello')).toBeTruthy();
    expect(isPermutation('Tacocat', 'Cattaco')).toBeTruthy();
    expect(isPermutation('clearly', 'incorrect')).toBeFalsy();
    expect(isPermutation('Express', 'Xpresso')).toBeFalsy();
  });

  it('Challenge 1.3 - urlIfy', () => {
    expect(urlIfy('google')).toEqual('google');
    expect(urlIfy('ya hoo')).toEqual('ya%20hoo');
    expect(urlIfy('hello there world')).toEqual('hello%20there%20world');
    expect(urlIfy('too   many   spaces   ')).toEqual('too%20many%20spaces');
  });

  it('Challenge 1.4 - Palindrome Permutation', () => {
    expect(palindromePermutation('cat')).toBeFalsy();
    expect(palindromePermutation('taccat')).toBeTruthy();
    expect(palindromePermutation('tacocat')).toBeTruthy();
    expect(palindromePermutation('Taco Cat')).toBeTruthy();
    expect(palindromePermutation('Taco Cats')).toBeFalsy();
  });

  it('Challenge 1.5 - One Away', () => {
    expect(oneAway('cat', 'caterpillar')).toBeFalsy();
    expect(oneAway('banana', 'papaya')).toBeFalsy();
    expect(oneAway('banana', 'banana')).toBeTruthy();
    expect(oneAway('banana', 'bananas')).toBeTruthy();
    expect(oneAway('banana', 'barnana')).toBeTruthy();
    expect(oneAway('banana', 'panana')).toBeTruthy();
    expect(oneAway('banana', 'banama')).toBeTruthy();
    expect(oneAway('bananas', 'banana')).toBeTruthy();
    expect(oneAway('bamana', 'banana')).toBeTruthy();
    expect(oneAway('bonana', 'banama')).toBeFalsy();
  });

  it('Challenge 1.6 - String Compression', () => {
    expect(stringCompression('abcde')).toEqual('abcde');
    expect(stringCompression('aaabbbcccdddeee')).toEqual('a3b3c3d3e3');
    expect(stringCompression('aaabbbcccdddef')).toEqual('a3b3c3d3e1f1');
    expect(stringCompression('aaabbbcccdef')).toEqual('aaabbbcccdef');
    expect(stringCompression('aaabbbcdef')).toEqual('aaabbbcdef');
  });

  it('Challenge 1.7 - Rotate Matrix', () => {
    expect(rotateMatrix([
      ['a', 'b', 'c', 'd', 'e'],
      ['f', 'g', 'h', 'i', 'j'],
      ['k', 'l', 'm', 'n', 'o'],
      ['p', 'q', 'r', 's', 't'],
      ['u', 'v', 'w', 'x', 'y'],
    ])).toEqual([
      ['u', 'p', 'k', 'f', 'a'],
      ['v', 'q', 'l', 'g', 'b'],
      ['w', 'r', 'm', 'h', 'c'],
      ['x', 's', 'n', 'i', 'd'],
      ['y', 't', 'o', 'j', 'e'],
    ]);
  });

  it('Challenge 1.8 - Zero Matrix', () => {
    expect(zeroMatrix([
      [0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0],
    ])).toEqual([
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  it('Challenge 1.9 - String Rotation', () => {
    expect(stringRotation('watermelon', 'melonwater')).toBeTruthy();
    expect(stringRotation('watermelon', 'melonstarwater')).toBeFalsy();
    expect(stringRotation('tacocat', 'cattaco')).toBeTruthy();
    expect(stringRotation('tacocat', 'catacot')).toBeFalsy();
  });
});
