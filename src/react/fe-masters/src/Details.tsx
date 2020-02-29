import pet, { Photo } from '@frontendmasters/pet';
import * as React from 'react';
import { Component } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';

import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import Modal from './Modal';
import ThemeContext from './ThemeContext';

interface DetailsState {
  loading: boolean;
  media: Photo[];
  showModal: boolean;
  animal?: string;
  breed?: string;
  description?: string;
  location?: string;
  name?: string;
  url?: string;
}

class Details extends Component<RouteComponentProps<{ id: string }>, DetailsState> {
  constructor(props: { id: string }) {
    super(props);
    
    this.state = { loading: true, media: [], showModal: false };
    this.adopt = this.adopt.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  public componentDidMount() {
    const { id } = this.props;
    if (!id) {
      navigate('/');
      return;
    }

    pet.animal(Number(id))
      .then(({ animal }) => {
        const { breeds, contact, description, name, photos, type, url } = animal;
        this.setState({
          description,
          name,
          url,
          animal: type,
          breed: breeds.primary,
          loading: false,
          location: `${contact.address.city}, ${contact.address.state}`,
          media: photos,
        });
      }, console.error)
  }

  public adopt() {
    return this.state.url ? navigate(this.state.url) : null;
  }

  public toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  public render() {
    if (this.state.loading) return (<h1>Loading...</h1>);
    const { animal, breed, description, location, media, name, showModal } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>Name: {name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {(themeHook) => <button onClick={this.toggleModal} style={{ background: themeHook[0]}}>Adopt {name}</button>}
          </ThemeContext.Consumer>
          
          <p>{description}</p>
          {
            showModal ?
            (<Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>) : null
          }
        </div>
      </div>
    )
  }
}

export default function DetailsWithErrorBoundary(props: RouteComponentProps<{ id: string }>) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  )
};
