import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailer } from "../Components/Redux/moviesSlice";
import { options } from "./tmbdApi";

const useTrailerVideo = ({ id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; 
    const controller = new AbortController(); 
    const fetching = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          { ...options, signal: controller.signal }
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        const trailers = data.results.filter((video) => video.type === "Trailer");
        let trailer = null;
        if (trailers.length > 0) {
          trailer = trailers[0];
        } else if (data.results.length > 0) {
          trailer = data.results[0];
        }

        if (isMounted && trailer) {
          dispatch(addTrailer(trailer));
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching videos:", error);
          if (isMounted) {
            dispatch(addTrailer(null)); // Reset trailer on error
          }
        }
      }
    };

    fetching();

    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, dispatch]); 
};

export default useTrailerVideo;