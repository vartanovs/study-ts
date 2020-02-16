import deepFreeze from 'deep-freeze';
import expect from 'expect';

const addCounter = (list: number[]) => [...list, 0];

const incrementCounter = (list: number[], index: number) => [
  ...list.slice(0, index),
  list[index] + 1,
  ...list.slice(index + 1),
];

const removeCounter = (list: number[], index: number) => [
  ...list.slice(0, index),
  ...list.slice(index + 1),
];

const testAddCounter = () => {
  const listBefore: number[] = [];
  const listAfter: number[] = [0];

  deepFreeze(listBefore);

  expect(addCounter(listBefore)).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

testAddCounter();
testIncrementCounter();
testRemoveCounter();
