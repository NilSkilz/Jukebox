import React, { Component } from 'react';
import Axios from 'axios';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

import Card from '../components/Card';

export default class MovieListContainer extends Component {
  state = {
    movies: [],
    metadata: {},
    selectedIndex: 0,
  };

  cardRef = null;

  componentDidMount = () => {
    this.getMovies();
  };

  getMovies = () => {
    Axios.get(`https://plex.pidgeonsnest.uk/library/sections/1/all?X-Plex-Token=${token}`).then(({ data }) => {
      const { Metadata, ...rest } = data.MediaContainer;

      this.setState({ movies: Metadata.filter((movie) => movie.contentRating !== 'NC-17'), metadata: rest });
    });
  };

  handleKeyDown = (e) => {
    const { selectedIndex, movies } = this.state;
    const width = window.innerWidth;

    let cardsPerRow = 6;
    if (width < 1000) cardsPerRow = 5;
    let newIndex;
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 37 && selectedIndex > 0) {
      // Left
      newIndex = this.state.selectedIndex - 1;
    } else if (e.keyCode === 39 && selectedIndex < movies.length) {
      // Right
      newIndex = this.state.selectedIndex + 1;
    } else if (e.keyCode === 38 && selectedIndex >= cardsPerRow) {
      // Up
      newIndex = this.state.selectedIndex - cardsPerRow;
    } else if (e.keyCode === 40 && selectedIndex < movies.length - cardsPerRow) {
      // Right
      newIndex = this.state.selectedIndex + cardsPerRow;
    } else if (e.keyCode === 13) {
      const { setSelectedMovie } = this.props;
      setSelectedMovie(this.state.movies[this.state.selectedIndex]);
    }
    if (newIndex || newIndex === 0) {
      this.setState({ selectedIndex: newIndex }, () => {
        this.scrollToMyRef();
      });
    }
  };

  scrollToMyRef = () => {
    window.scrollTo(0, this.cardRef.offsetTop - 200);
  };

  render() {
    return (
      <div>
        <input autoFocus onKeyDown={this.handleKeyDown} />
        <div class='centered'>
          <section class='cards'>
            {this.state.movies.map((movie, index) => {
              const selected = index === this.state.selectedIndex;
              return (
                <Card
                  setReference={(ref) => {
                    this.cardRef = ref;
                  }}
                  data={movie}
                  selected={selected}
                />
              );
            })}
          </section>
        </div>
      </div>
    );
  }
}
