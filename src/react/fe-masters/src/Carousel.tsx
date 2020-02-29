import * as React from 'react';
import { Photo } from '@frontendmasters/pet';

interface CarouselProps {
  media: Photo[];
}

interface CarouselState {
  active: number;
  photos: string[];
  media: Photo[];
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
  constructor(state: CarouselState) {
    super(state);

    this.state = {
      active: 0,
      photos: [],
      media: [],
    };

    this.handleIndexClick = this.handleIndexClick.bind(this);
  }

  public static getDerivedStateFromProps({ media }: CarouselProps) {
    let photos = ['http://placecorgi.com/600/600'];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }
  
    return { photos };
  }

  public handleIndexClick(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    if (event.target instanceof HTMLImageElement && event.target.dataset.index) {
      this.setState({
        active: Number(event.target.dataset.index),
      });
    }
  }

  public render() {
    const { active, photos } = this.state;
    return (
      <div className="carousel">
        <img alt="animal" src={photos[active]} />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              alt="animal thumbnail"
              className={index === active ? "active" : ""}
              data-index={index}
              key={photo}
              onClick={this.handleIndexClick}
              src={photo}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
