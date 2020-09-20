import React, { useState } from 'react';
import './App.css';
import { Navbar } from 'react-bootstrap';
import MovieListContainer from './containers/MovieListContainer';
import MovieContainer from './containers/MovieContainer';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedMovie, setSelectedMovie] = useState();

  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='/'>JUKEBOX</Navbar.Brand>
      </Navbar>
      {selectedMovie ? (
        <MovieContainer
          movie={selectedMovie}
          unselectMovie={(movie) => {
            setSelectedMovie(null);
          }}
        />
      ) : (
        <MovieListContainer setSelectedMovie={setSelectedMovie} />
      )}
    </div>
  );
}

export default App;
