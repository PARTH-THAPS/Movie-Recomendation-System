import axios from 'axios';
import React, { useEffect } from 'react';
import { options } from '../uitils/constant';
import { useDispatch } from 'react-redux';
import { getTrailerMovie } from '../redux/movieSlice';


const useMovieById = async (movieId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieById=async()=>{
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
            const trailer = res.data.results.filter((item) => {
                return item.type == "Trailer";
            })
            dispatch(getTrailerMovie(trailer.length > 0 ? trailer[0] : res.data.results[0]))
        }
        catch (err) {
            console.log(err);
        }
    }
getMovieById();
    }, [])



}

export default useMovieById;