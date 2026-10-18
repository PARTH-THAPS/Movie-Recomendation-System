import {createSlice } from "@reduxjs/toolkit";



const movieSlice= createSlice({
    name:"movie",
    initialState:{
        nowPlayingMovies:null,
        popularMovie:null,
        topRatedMovies:null,
        upcomingMovies:null
    },
    reducers:{
        getNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        getPopularMovie:(state,action)=>{
            state.popularMovie=action.payload;
        },
        getTopRatedMovie:(state,action)=>{
            state.topRatedMovies=action.payload;
        },
        getUpComingMovies:(state,action)=>{
            state.upcomingMovies=action.payload;
        }
    }
})

export const {getNowPlayingMovies,getPopularMovie,getTopRatedMovie,getUpComingMovies}= movieSlice.actions;
export default movieSlice.reducer;