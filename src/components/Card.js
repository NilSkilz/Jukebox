import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import validUrl from 'valid-url';

class Card extends React.Component {
  render() {
    const { data, selected, setReference } = this.props;

    const url = `http://plex.pidgeonsnest.uk/photo/:/transcode?url=${data.thumb}&width=150&height=225&X-Plex-Token=${process.env.REACT_APP_TOKEN}`;
    // const url = `https://plex.pidgeonsnest.uk${data.thumb}?X-Plex-Token=${process.env.REACT_APP_TOKEN}`;

    console.log('Loading', data.title);

    return (
      <div
        className='card'
        ref={(ref) => {
          // if (selected) setReference(ref);
        }}>
        <div className={`movie ${selected ? 'selected' : ''}`}>
          <div className='card-content'>
            {url && <LazyLoadImage height={225} width={150} src={url} />}
            {/* {url && <img className="coverArt" src={url} alt="cover art" />} */}
            <div className='metadata'>
              <div className='titles'></div>
            </div>
          </div>
        </div>
        <h5>{data.title}</h5>
        <p>{data.year}</p>
      </div>
    );
  }
}

export default Card;
