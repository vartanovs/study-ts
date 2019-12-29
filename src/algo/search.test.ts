import search from './search';

describe('src/algo/search', () => {
  const emptyArray: number[] = [];
  const oneElemArray = [5];
  const completeArray = [2, 3, 4, 5, 6];
  const incompleteArray = [2, 3, 5, 6];

  it('Given an empty array, returns false', () => {
    for (const key in search) {
      if (Object.prototype.hasOwnProperty.call(search, key)) {
        expect(search[key](emptyArray, 5)).toEqual(false);
      }
    }
  });

  it('Given an array of one element and a target, returns true if the target is in array', () => {
    for (const key in search) {
      if (Object.prototype.hasOwnProperty.call(search, key)) {
        expect(search[key](oneElemArray, 5)).toEqual(true);
      }
    }
  });

  it('Given a sorted array and a target, returns true if target is in array', () => {
    for (const key in search) {
      if (Object.prototype.hasOwnProperty.call(search, key)) {
        expect(search[key](completeArray, 2)).toEqual(true);
        expect(search[key](completeArray, 4)).toEqual(true);
        expect(search[key](completeArray, 6)).toEqual(true);
      }
    }
  });

  it('Given a sorted array and a target, returns false if target is not in array', () => {
    for (const key in search) {
      if (Object.prototype.hasOwnProperty.call(search, key)) {
        expect(search[key](incompleteArray, 1)).toEqual(false);
        expect(search[key](incompleteArray, 4)).toEqual(false);
        expect(search[key](incompleteArray, 7)).toEqual(false);
      }
    }
  });
});
