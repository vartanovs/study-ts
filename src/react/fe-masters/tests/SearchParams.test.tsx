import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import pet from '@frontendmasters/pet';
import * as fromPet from '@frontendmasters/pet';

import SearchParams from '../src/SearchParams';

afterEach(cleanup);

test("SearchParams", async () => {
  const { getByTestId, getByText } = render(<SearchParams />);

  const animalDropdown = getByTestId('use-dropdown-animal')

  expect(animalDropdown.children.length).toEqual(fromPet.ANIMALS.length + 1);

  expect(pet.breeds).toHaveBeenCalled();
  const breedDropdown = getByTestId('use-dropdown-breed')
  expect(breedDropdown.children.length).toEqual((fromPet as any)._breeds.length + 1); 

  const searchResults = getByTestId('search-results');
  expect(searchResults.textContent).toEqual('No Pets Found');
  fireEvent(getByText('Submit'), new MouseEvent('click'))
  expect(pet.animals).toHaveBeenCalled();
  expect(searchResults.children.length).toEqual((fromPet as any)._dogs.length); 
})