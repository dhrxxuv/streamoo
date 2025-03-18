import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addClickedMovie, addTrailer } from "../Components/Redux/moviesSlice"; // Import both actions
import { options } from "./tmbdApi";

const useMovieData = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieAndTrailer = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        if (!movieResponse.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const movieData = await movieResponse.json();
        dispatch(addClickedMovie(movieData)); // Dispatch movie details to Redux store

        // Fetch trailer video
        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        if (!trailerResponse.ok) {
          throw new Error("Failed to fetch trailer video");
        }
        const trailerData = await trailerResponse.json();

        // Find the trailer video
        const trailers = trailerData.results.filter((video) => video.type === "Trailer");
        const trailer = trailers.length > 0 ? trailers[0] : trailerData.results[0]; // Use the first trailer or first video

        if (trailer) {
          dispatch(addTrailer(trailer)); // Dispatch trailer video to Redux store
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovieAndTrailer();
  }, [id, dispatch]); // Re-fetch when `id` changes
};

export default useMovieData;