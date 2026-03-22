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

  // Extract the genre name that matches the ID in the URL
    const genreName = genreData?.genres?.find( //Go get all genres from TMDB and store them in genreData
        // Only continue if genreData exists (prevents crashing), look through list of genres and find the one that matches the URL id
        (g) => g.id === Number(id) // Compare genre IDs (convert URL string to number) 
    )?.name; // Once found, extract the genre name (like 'Crime')

    // URL gives ID → we look up ID → we get name → we build title

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
        title={`${genreName} Movies`}
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
  );

};
export default GenrePage;
