import React from "react";
import { useParams } from 'react-router';
import { getPerson, getPersonMovies } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { Link } from "react-router";


const ActorPage = () => {
  const { id } = useParams();

  const { data: actor, error, isPending, isError  } = useQuery({
    queryKey: ['actor', { id }],
    queryFn: getPerson,
  })

  const { data: movies, error: moviesErrorMessage, isPending: moviesPending, isError: moviesError  } = useQuery({
    queryKey: ['actorMovies', { id }],
    queryFn: getPersonMovies,
  })


  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (moviesPending) {
    return <Spinner />;
  }

  if (moviesError) {
    return <h1>{moviesErrorMessage.message}</h1>;
  }

  

  return (
    <>
      <h1>{actor.name}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
        alt={actor.name}
      />

      <p>{actor.biography || "No biography available."}</p>

        <h2>Movies</h2>
        {movies?.cast.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
                <p>{movie.title}</p>
            </Link>
        ))}

    </>
  );
};

export default ActorPage;
