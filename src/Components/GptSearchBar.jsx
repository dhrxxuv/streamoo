import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import genAI from "../utlis/openai";
import lang from "../utlis/languageConstant";
import { options } from "../utlis/tmbdApi";
import { addGeminiMoviesResult, addGeminiMoviesName } from "./Redux/GptSlice";

const GptSearchBar = () => {
  const searchTextRef = useRef(null);
  const langKey = useSelector((state) => state.config.lang);
  const dispatch = useDispatch();

  const searchTMBD = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie.trim()
        )}&include_adult=false&language=en-US&page=1`,
        options
      );
      const json = await response.json();
      return json.results;
    } catch (error) {
      console.error(`Error fetching TMDB data for "${movie}":`, error);
      return [];
    }
  };

  const handleGptSearchClick = async (e) => {
    e.preventDefault();

    const query = searchTextRef.current?.value.trim();
    if (!query) {
      console.warn("Search query is empty!");
      return;
    }

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for query: ${query}. Only give me the names of 6 movies, comma-separated like the example result given ahead. Example Result: Border, Sholay, Kick, Luck, All the Best, 3 Idiots`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(gptQuery);
      const movieNames = result.response.candidates[0].content.parts[0].text
        .split(",")
        .map((name) => name.trim());

      console.log("GPT Movie Names:", movieNames);

      const promisesArray = movieNames.map((movie) => searchTMBD(movie));
      const geminiMovies = await Promise.all(promisesArray);

      console.log("TMDB Results:", geminiMovies);
      dispatch(addGeminiMoviesName(movieNames));
      dispatch(addGeminiMoviesResult(geminiMovies));
    } catch (error) {
      console.error("Error fetching GPT recommendations:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/10 overflow-hidden"
      >
        <input
          ref={searchTextRef}
          type="text"
          className="flex-grow p-4 bg-transparent text-white placeholder-gray-300 outline-none"
          placeholder={lang[langKey].searchPrompt}
        />
        <button
          onClick={handleGptSearchClick}
          className="py-3 px-6 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;