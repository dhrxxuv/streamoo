// SecondaryContainer.jsx
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);


  return (
    <div className="bg-black">
          <div className="relative z-10 -mt-40">
          <MoviesList title="Now Playing" movies={movies.nowPlayingMovies} />
          <MoviesList title="Popular" movies={movies.popularMovies} />
          <MoviesList title="Top Movies" movies={movies.topRatedMovies} />
          <MoviesList title="Up Coming" movies={movies.UpComingMovies} />
          </div>
    </div>
    
  );
};

export default SecondaryContainer;