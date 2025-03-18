import {options} from './tmbdApi'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addNowPLayingMovies } from '../Components/Redux/moviesSlice'


const useMovies = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetching = async()=>{
          const data  = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
          const response = await data.json()
          console.log(response.results)
          dispatch(addNowPLayingMovies(response.results))
        }
        fetching()
    },[])
}

export default useMovies