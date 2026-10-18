import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MovieContainer = () => {
    const movie= useSelector(store=>store.movie); 

    return (
        <div className="bg-black">
            <div className="-mt-52 relative z-10"><MovieList /></div>
             <MovieList title={"Popular Movie"} movies={movie.popularMovie}/>
             <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovies}/>
             <MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovies}/>
             <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies}/>
        </div>
    )
}


export default MovieContainer;