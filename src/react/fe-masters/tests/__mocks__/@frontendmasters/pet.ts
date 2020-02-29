import { readFileSync } from 'fs';
import path from 'path';
import { act } from '@testing-library/react';

const breeds = [
  { name: "Bichon Frise"},
  { name: "Bolognese"},
  { name: "Coton de Tulear"},
  { name: "Havanese"},
  { name: "Maltese"},
];

const doggos = JSON.parse(readFileSync(path.join(__dirname, 'res.json')).toString());

export const ANIMALS = ['cat', 'dog', 'bird'];
export const _breeds = breeds;
export const _dogs = doggos.animals;

const mock = {
  animals: jest.fn(() => ({ then: (cb: any) => act(() => cb(doggos))})),
  breeds: jest.fn(() => ({ then: (cb: any) => act(() => cb({ breeds }))})),
}

export default mock;
