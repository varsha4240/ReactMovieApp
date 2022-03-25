import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import MovieinfoComponent from './MovieinfoComponent';

export const API_KEY = "ab14c260";

const Container = styled.div`
display:flex;
flex-direction: column;
`;

const Header = styled.div`
display:flex;
flex-direction:row;
background-color:black;
color:white;
padding:10px;
font-size: 25px;
font-weight:bold;
box-shadow: 0 3px 6px 0 #555;
justify-content:space-between;
align-items: center;
`;

const AppName = styled.div`
display:flex;
flex-direction:row;
align-items: center;
`;
const MovieImage = styled.img`
height:48px;
width:48px;
margin:15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`

width:32px;
height:32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 12px;
  font-weight: bold;
  border: none;
  outline: none;
 
`;

const MovieListContainer = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding:30px;
gap:24px;
justify-content: space-evenly;
`;

const Placeholder = styled.img ``;


function App() {

  const [searchQuery, updateSearchQueary] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList,updateMovieList] = useState([]);
  const [selectMovie,onMovieSelect] = useState();
  // http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}

  const fetchData = async (searchString) => {
    const response = await axios.get(`http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`)

    console.log(response)
    updateMovieList(response.data.Search)
  };

  const onTextChange = (event) => {
    updateSearchQueary(event.target.value);

    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.svg" />
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput placeholder='Search Movie'
            value={searchQuery}
            onChange={onTextChange} />
        </SearchBox>
      </Header>
      {selectMovie && <MovieinfoComponent selectMovie={selectMovie}

        onMovieSelect={onMovieSelect}
      />}
      <MovieListContainer>
        {
          movieList?.length 
          ? movieList.map((movie ,index ) =>
          ( <MovieComponent
           key={index} movie={movie}
          onMovieSelect={onMovieSelect}

          />))
          : (
            <Placeholder src='https://cdn.pixabay.com/photo/2016/04/14/07/50/film-1328404_960_720.jpg'/>
          )
        }
      </MovieListContainer>
    </Container>)
}

export default App;

