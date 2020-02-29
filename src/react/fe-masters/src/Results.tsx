import * as React from 'react';
import Pet from './Pet';
import type { Animal } from '@frontendmasters/pet';

interface ResultsProps { pets: Animal[] }

const Results: React.FC<ResultsProps> = ({ pets }) => (
  <div className="search" data-testid="search-results" >
    {pets.length === 0 ? <h1>No Pets Found</h1> : (
      pets.map(({ breeds, contact, id, name, photos, type }) => (
        <Pet
          animal={type}
          breed={breeds.primary}
          id={id}
          key={id}
          location={`${contact.address.city}, ${contact.address.state}`}
          name={name}
          media={photos}
        />
      ))
    )}
  </div>
);

export default Results;
