import React, { useEffect } from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import axios from 'axios';
import { Now_Playing_Movies, options } from '../uitils/constant';
import { getNowPlayingMovies } from '../redux/movieSlice';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';


const Browse = () => {
    const user = useSelector(store => store.app.user)
    const navigate = useNavigate();
    const dispatch =useDispatch();

    useNowPlayingMovies();
    usePopularMovies();

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
        nowPlayingMovies();

    }, [])

    if (!user) {
        navigate("/")
    }
    return (
        <div>
            <Header/>
            <div>
                <MainContainer />
                <MovieContainer />
            </div>
        </div>
    )
}



export default Browse;