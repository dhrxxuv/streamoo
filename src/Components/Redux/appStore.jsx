import { configureStore } from "@reduxjs/toolkit";
import userReducer from"./userSlice"
import moviesReducer from  "./moviesSlice";
import GptReducer from './GptSlice'
import configReducer from"./configSlice"
const appStore = configureStore({
    reducer:{
       user:userReducer,
       movies:moviesReducer,
       gpt:GptReducer,
       config:configReducer
    }
})

export default appStore