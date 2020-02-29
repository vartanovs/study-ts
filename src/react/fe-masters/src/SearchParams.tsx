import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import pet, { ANIMALS, Animal } from '@frontendmasters/pet';

import Results from './Results';
import ThemeContext from './ThemeContext';
import useDropdown from './useDropdown';

const SearchParams: React.FC<RouteComponentProps> = () => {
  const [breeds, setBreeds] = useState([] as string[]);
  const [location, setLocation] = useState('Seattle, WA');
  const [pets, setPets] = useState([] as Animal[]);
  const [theme] = useContext(ThemeContext);

  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);

  function requestPets() {
    pet.animals({
      location,
      breed,
      type: animal
    }).then(({ animals }) => setPets(animals || []));
    
  }

  useEffect(() => {
    setBreeds([]);
    setBreed('');

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error)
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form onSubmit={(event) => {
        event.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Location"
            value={location}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button style={{ background: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
};

export default SearchParams;
