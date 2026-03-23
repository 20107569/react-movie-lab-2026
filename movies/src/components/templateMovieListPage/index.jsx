import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";  
import Stack from "@mui/material/Stack";

function MovieListPageTemplate({ movies, title, action, page, setPage }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [sortBy, setSortBy] = useState("0");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return ratingFilter > 0 ? m.vote_average >= ratingFilter : true;
    });
  
    if (sortBy === "title_asc") {
    displayedMovies = displayedMovies.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

    if (sortBy === "rating_asc") {
    displayedMovies = displayedMovies.sort((a, b) =>
      a.vote_average - b.vote_average
    );
  }

      if (sortBy === "rating_desc") {
    displayedMovies = displayedMovies.sort((a, b) =>
      b.vote_average - a.vote_average
    );
  }

  function handleChange(type, value) {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "sort") setSortBy(value);
  }

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            sortBy={sortBy}
          />
        </Grid>

        <MovieList action={action} movies={displayedMovies}></MovieList>

        <Grid key="list" size={12}>
          <Stack spacing={2} sx={{ mt: 4, alignItems: "center"}}>
            <Pagination
              count={10}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
