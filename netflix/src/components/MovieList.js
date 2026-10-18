import React from 'react';
import MovieCard from './MovieCard';


const MovieList = ({ title, movies }) => {
    console.log()
    return (<div className='px-8'>
        <h1 className='text-3xl py-3 text-white'>{title}</h1>
        <div className='flex overflow-x-auto no-scrollbar cursor-pointer'>
            <div className='flex items-center '>
             {movies?.map((movie) => (
            <MovieCard key={movie.id} PosterPath={movie.poster_path} />
          ))}
            </div>
        </div>
    </div>)
}

export default MovieList;
