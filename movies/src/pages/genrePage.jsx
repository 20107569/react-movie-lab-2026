import React from "react";
import { useParams } from 'react-router';
import { getMoviesByGenre } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'


const GenrePage = () => {

  const { id } = useParams();

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['genreMovies', { id }],
    queryFn: getMoviesByGenre,
  })



  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  

  
    const movies = data.results;



   return (
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
  );

};
export default GenrePage;
