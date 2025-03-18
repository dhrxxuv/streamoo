/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import useTrailerVideo from "../utlis/useTrailerVideo";

const VideoBackground = ({ id }) => {
  useTrailerVideo({ id });
  const trailervideo = useSelector((store) => store?.movies?.trailerVideo);

  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      {trailervideo && trailervideo.key ? (
        <iframe
          className="w-full h-full object-cover"
          src={`https://www.youtube.com/embed/${trailervideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailervideo.key}`}
          title={trailervideo.name || "Trailer"}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="w-full h-full bg-[#141414] flex items-center justify-center">
          <p className="text-[#e5e5e5] text-lg">Loading trailer...</p>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;