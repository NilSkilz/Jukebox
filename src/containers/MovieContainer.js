import React, { Component } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Axios from 'axios';

export default class MovieContainer extends Component {
  handleKeyDown = (e) => {
    const { unselectMovie, movie } = this.props;
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 37) {
      // Left
      unselectMovie(movie);
    } else if (e.keyCode === 13) {
      Axios.get(`https://nodered.pidgeonsnest.uk/plex/play/${movie.title}`);
    }
  };

  getDuration = () => {
    const { movie } = this.props;
    const minutes = movie.duration / 1000 / 60;
    const hours = Math.floor(minutes / 60);

    const remainingMins = Math.floor(minutes - hours * 60);

    return `${hours} hr ${remainingMins} min`;
  };

  getGenres = () => {
    const { movie } = this.props;
    if (!movie.Genre) return '';
    console.log(movie.Genre.map((genre) => genre.tag).join(', '));
    return movie.Genre.map((genre) => genre.tag).join(', ');
  };

  render() {
    const { movie } = this.props;
    console.log(movie);

    const artworkUrl = `https://plex.pidgeonsnest.uk${movie.thumb}?X-Plex-Token=${token}`;

    return (
      <div>
        <input autoFocus onKeyDown={this.handleKeyDown} />
        <Container>
          <Row className='mt-5'>
            <Col xs={3}>
              <Image src={artworkUrl} rounded />
            </Col>
            <Col>
              <Col className='mt-5'>
                <h1>{movie.title}</h1>
                <h2>{movie.year}</h2>
                <Row>
                  <Col>
                    <h3>{`${this.getDuration()} - ${movie.contentRating}`}</h3>
                  </Col>
                  <Col>
                    <h3>{this.getGenres()}</h3>
                  </Col>
                </Row>
                <Row>
                  <hr />
                </Row>
                <Row>
                  <Col>
                    <p style={{ fontSize: '16px' }}>{movie.summary}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button className='mt-5 play-btn'>Play Movie</Button>
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
