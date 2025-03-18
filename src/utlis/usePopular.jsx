import { useEffect} from "react";
import { options } from "./tmbdApi";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../Components/Redux/moviesSlice";
const usePopular = () => {

    const dispatch = useDispatch()

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json();
        dispatch(addPopularMovies(data.results))
        
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  
 
};

export default usePopular;