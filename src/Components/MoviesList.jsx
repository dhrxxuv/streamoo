/* eslint-disable react/prop-types */
import { useRef } from "react";
import MoviesCart from "./MoviesCart";


const MoviesList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeftStart = 0;



  const handleMouseDown = (e) => {
    if (e.button !== 0) return; 
    isDragging = true;
    startX = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    isDragging = false;
    scrollContainerRef.current.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    isDragging = false;
    scrollContainerRef.current.style.cursor = "grab";
  };



  return (
    <div className="p-2">

      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {typeof title === "string" ? title : "Untitled"}
      </h1>
      <div className="flex">
   
        <div
          ref={scrollContainerRef}
          className="flex p-2 space-x-4 overflow-x-scroll scrollbar-hidden cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          
        >
         
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((item, index) => (
                <MoviesCart key = {index} poster_path={item.poster_path} id = {item.id} />
       
            ))
          ) : (
            <p className="text-gray-400 opacity-100">No movies available</p>
          )}
          </div>
        </div>
      </div>
  );
};

export default MoviesList