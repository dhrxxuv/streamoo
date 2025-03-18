import { createSlice } from "@reduxjs/toolkit";

const moviesSlice  = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo:null
    },
    reducers:{
        addNowPLayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addTrailer:(state,action)=>{
            state.trailerVideo = action.payload;
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies = action.payload;
        },
        addTopRatedMovies:(state,action)=>{
            state.topRatedMovies = action.payload;
        },
        addUpComingMovies:(state,action)=>{
            state.UpComingMovies = action.payload
        },
        addClickedMovie:(state,action)=>{
            state.clickedMovie = action.payload
        },
        addClickedMovieVideo:(state,action)=>{
            state.clickedMovieVideo = action.payload
        }

    }
})
export const{addNowPLayingMovies,addTrailer,addPopularMovies,addTopRatedMovies,addUpComingMovies,addClickedMovie,addClickedMovieVideo} = moviesSlice.actions 
export default moviesSlice.reducer