import GptSearchBar from "./GptSearchBar";
import { bg_Img } from "../utlis/backgeoundImg";
import GptSuggetions from "./GptSuggetions";

const GptSearch = () => {
  return (
    <>
      {/* Background Image with Gradient Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          className="h-full w-full object-cover"
          src={bg_Img}
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      {/* GptSearchBar and Suggestions */}
      <div className="relative z-10 pt-32 pb-8 min-h-screen">
        <GptSearchBar />
        <GptSuggetions />
      </div>
    </>
  );
};

export default GptSearch;