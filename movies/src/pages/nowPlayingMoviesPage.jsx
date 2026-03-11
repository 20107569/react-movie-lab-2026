//NEW

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const NowPlayingMoviesPage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['popular'],
    queryFn: getNowPlayingMovies,
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
        title="Now Playing Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
  );

};
export default NowPlayingMoviesPage;
