import React from "react";
import { useParams } from 'react-router';
import { getMoviesByGenre, getGenres } from "../api/tmdb-api";
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

  // Get the full list of genres from the API using React Query
  const { data: genreData, error: genreErrorMessage, isPending: genrePending, isError: genreError  } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  })


  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  if (genrePending) {
    return <Spinner />
  }

  if (genreError) {
    return <h1>{genreErrorMessage.message}</h1>
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
