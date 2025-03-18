import { useEffect } from "react";
import { options } from "./tmbdApi";
import { useDispatch} from "react-redux";
import { addClickedMovieVideo } from "../Components/Redux/moviesSlice";

const useMovieVideo = (id) => {
   const dispatch = useDispatch()
    useEffect(() => {
      getVideoTrailer();
    }, []);
  
    const getVideoTrailer = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
         id +
          "/videos?language=en-US",
        options
      );
      const json = await data.json();
      const filterData = json.results?.filter((video) => video.type === "Trailer");
      const trailer = filterData.length == 0 ? filterData[0] : json.results[0];
      dispatch(addClickedMovieVideo(trailer))
  
    };
}

export default useMovieVideo