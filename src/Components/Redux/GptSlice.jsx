import { createSlice } from "@reduxjs/toolkit";

const GptSlice = createSlice({
  name: "gpt",
  initialState: {
    showgptsearch: false,
    geminiMoviesName:null,
    geminiMovies:null

  },
  reducers: {
    toogleGptSearchView: (state) => {
      state.showgptsearch = !state.showgptsearch;
    },
    addGeminiMoviesName:(state,action)=>{
      state.geminiMoviesName = action.payload
    },
    addGeminiMoviesResult:(state,action)=>{
      state.geminiMovies = action.payload
    }
  }
});

export const { toogleGptSearchView,addGeminiMoviesResult,addGeminiMoviesName} = GptSlice.actions;
export default GptSlice.reducer;