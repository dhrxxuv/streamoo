import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GptSuggestions = () => {
  const { geminiMoviesName, geminiMovies } = useSelector((store) => store.gpt);
  const noMovies = !geminiMovies || !geminiMoviesName || geminiMoviesName.length === 0;

  return (
    <div className="bg-transparent text-white px-4 sm:px-6 md:px-8 py-4">
      {noMovies ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Search Movies
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 text-center">
            Find your favorite movies and shows.
            
          </p>
        </div>
      ) : (
        geminiMoviesName.map((movieName, index) => (
          <MoviesList
            key={`${movieName}`}
            title={String(movieName)}
            movies={geminiMovies[index]}
          />
        ))
      )}
    </div>
  );
};

export default GptSuggestions;