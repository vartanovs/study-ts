import sort from './sort';

describe('src/ds/sort', () => {
  it('Given an empty array, returns an empty array', () => {
    for (const key in sort) {
      if (Object.prototype.hasOwnProperty.call(sort, key)) {
        expect(sort[key]([])).toEqual([]);
      }
    }
  });

  it('Given an array of one element, returns that array', () => {
    for (const key in sort) {
      if (Object.prototype.hasOwnProperty.call(sort, key)) {
        expect(sort[key]([5])).toEqual([5]);
      }
    }
  });

  it('Given a pre-sorted array, returns that array', () => {
    for (const key in sort) {
      if (Object.prototype.hasOwnProperty.call(sort, key)) {
        expect(sort[key]([2, 3, 4, 5, 6])).toEqual([2, 3, 4, 5, 6]);
      }
    }
  });

  it('Given an unsorted array, sorts that array small > large', () => {
    for (const key in sort) {
      if (Object.prototype.hasOwnProperty.call(sort, key)) {
        expect(sort[key]([4, 2, 6, 5, 3])).toEqual([2, 3, 4, 5, 6]);
      }
    }
  });

  it('Given an array sorted large > small, sorts that array small > large', () => {
    for (const key in sort) {
      if (Object.prototype.hasOwnProperty.call(sort, key)) {
        expect(sort[key]([6, 5, 4, 3, 2])).toEqual([2, 3, 4, 5, 6]);
      }
    }
  });

  it('Given an array with negative numbers sorts that array small > large', () => {
    for (const key in sort) {
      if (Object.prototype.hasOwnProperty.call(sort, key)) {
        expect(sort[key]([2, 5, -1, 3, -4, 1, -3, -2, 4, -5, 0])).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
      }
    }
  });
});
