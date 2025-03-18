import { useParams } from "react-router";
import VideoPlay from "./VideoPlay";

const MoviesDetails = () => {
  const { id } = useParams(); // Get the `id` from the URL

  return (
    <div>
      <VideoPlay id={id} /> {/* Pass the `id` to VideoPlay */}
    </div>
  );
};

export default MoviesDetails;