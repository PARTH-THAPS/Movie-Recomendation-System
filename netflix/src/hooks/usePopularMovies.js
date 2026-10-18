import axios from "axios";
import React from "react";
import { options, Popular_Movie } from "../uitils/constant";
import { useDispatch } from "react-redux";
import { getPopularMovie } from "../redux/movieSlice";

const usePopularMovies= async()=>
    {
        const dispatch =useDispatch();
        try{
            const res= await axios.get(Popular_Movie,options);  
            dispatch(getPopularMovie(res.data.results));
        }
        catch(err)
        {
           console.log(err);
        }
    }

    export default usePopularMovies;