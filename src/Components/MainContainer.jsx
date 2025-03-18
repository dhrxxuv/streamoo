import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovies);
  if (!movies || movies.length === 0) return null;

  const mainmovie = movies[0];
  const { original_title, overview, id } = mainmovie;

  return (
<div className="relative h-screen w-full bg-black">
  <div className="absolute top-3/4 left-0 right-0 z-20 ">
          <VideoTitle title={original_title} overview={overview} />
  </div>
  <VideoBackground id={id} />
  
</div>
  );
};

export default MainContainer;
