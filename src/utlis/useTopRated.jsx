import { useEffect} from "react";
import { options } from "./tmbdApi";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../Components/Redux/moviesSlice";
const useTopRated = () => {

    const dispatch = useDispatch()

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json();
        dispatch(addTopRatedMovies(data.results))
        
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  
 
};

export default useTopRated;