import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits, getMovieRecommendations, getMovieWatchProviders } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
// import useMovie from "../hooks/useMovie";   Redundant


const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  const { data: credits, error: creditsErrorMessage, isPending: creditsPending, isError: creditsError  } = useQuery({
    queryKey: ['movieCredits', {id}],
    queryFn: getMovieCredits,
  })

  const { data: recommendations, error: recommendationsErrorMessage, isPending: recommendationsPending, isError: recommendationsError  } = useQuery({
    queryKey: ['movieRecommendations', {id}],
    queryFn: getMovieRecommendations,
  })

  const { data: watchProviders, error: watchProvidersErrorMessage, isPending: watchProvidersPending, isError: watchProvidersError  } = useQuery({
    queryKey: ['movieWatchProviders', {id}],
    queryFn: getMovieWatchProviders,
  })



  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (creditsPending) {
    return <Spinner />;
  }

  if (creditsError) {
    return <h1>{creditsErrorMessage.message}</h1>;
  }

  if (recommendationsPending) {
    return <Spinner />;
  }
  
  if (recommendationsError) {
    return <h1>{recommendationsErrorMessage.message}</h1>;
  }

  if (watchProvidersPending) {
    return <Spinner />;
  }
  
  if (watchProvidersError) {
    return <h1>{watchProvidersErrorMessage.message}</h1>;
  }



  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} credits={credits} recommendations={recommendations} watchProviders={watchProviders} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
