/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import useMovieData from "../utlis/useMovieData";
import useMovieVideo from "../utlis/useMovieVideo";

const VideoPlay = ({ id }) => {
  const [showVideo, setShowVideo] = useState(false);
  useMovieData(id);
  useMovieVideo(id);
  const movie = useSelector((store) => store.movies.clickedMovie);
  const moviesVideo = useSelector((store) => store.movies.clickedMovieVideo);

  if (!movie) {
    return (
      <div className="text-white text-center p-4 bg-gray-900 min-h-screen">
        Loading movie details...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {showVideo && moviesVideo?.key && (
        <div className="absolute inset-0 z-0 w-full h-full opacity-90">
          <iframe
            className="w-full h-full object-cover scale-110"
            src={`https://www.youtube.com/embed/${moviesVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${moviesVideo.key}`}
            title={moviesVideo.name || "Trailer"}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}


      {!showVideo && (
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent flex flex-col justify-end items-center p-6 md:p-10">
          <div className="max-w-7xl w-full space-y-8">
            {/* Movie Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              {movie.title}
            </h1>

  
            <div className="flex flex-col md:flex-row gap-10">
    
              <div
                className="w-full md:w-1/3 lg:w-1/4 relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => setShowVideo(true)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl shadow-2xl w-full object-cover border-2 border-red-600/50 transition-all duration-300 group-hover:border-red-600"
                />
            
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600/80 p-4 rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-red-700">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l13.5-7.89a1.5 1.5 0 000-2.538l-13.5-7.89z" />
                    </svg>
                  </div>
                </div>
              </div>

              
              <div className="w-full md:w-2/3 text-white space-y-6">
                <p className="text-xl md:text-2xl leading-relaxed font-light text-gray-200 drop-shadow-md">
                  {movie.overview}
                </p>
                <div className="flex flex-col md:flex-row gap-6 text-gray-300">
                  <p className="text-lg bg-gray-800/50 px-4 py-2 rounded-lg">
                    <strong className="text-red-500">Release:</strong>{" "}
                    {movie.release_date}
                  </p>
                  <p className="text-lg bg-gray-800/50 px-4 py-2 rounded-lg">
                    <strong className="text-red-500">Rating:</strong>{" "}
                    <span className="text-yellow-400">{parseInt(movie.vote_average)}</span>/10
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlay;