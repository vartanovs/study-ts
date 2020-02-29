import * as React from 'react';
import { Link } from '@reach/router';
import { Photo } from '@frontendmasters/pet';

interface PetProps {
	animal: string;
	breed: string;
	id: number;
	location: string;
	media: Photo[];
	name: string;
}

const Pet: React.FC<PetProps> = ({  animal, breed, id, location, media, name }) => {
	let hero = 'http://placecorgi.com/300/300'
	if (media.length) {
		hero = media[0].small;
	}
	return (
		<Link to={`/details/${id}`} className="pet">
			<div className="image-container">
				<img alt={name} src={hero} />
			</div>
			<div className="info">
				<h1>Name: {name}</h1>
				<h2>{`${animal} - ${breed} - ${location}`}</h2>
			</div>
		</Link>
	)
};

export default Pet;
