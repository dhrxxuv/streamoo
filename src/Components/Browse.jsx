import Header from "./Header";
import useMovies from "../utlis/useMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopular from "../utlis/usepopular";
import useTopRated from "../utlis/useTopRated";
import useUpComingMovies from "../utlis/useUpComingMovies";
import { Outlet } from "react-router";
import GptSearch from './GptSearch';
import { useSelector } from "react-redux";

const Browse = () => {
  const showgptsearch = useSelector((store) => store.gpt.showgptsearch);
  useMovies();
  usePopular();
  useTopRated();
  useUpComingMovies();

  return (
    <div>
      <div>
        <Header />
      </div>

      {showgptsearch ? (
        <GptSearch />
      ) : (
        <div className="mt-5">
          <div>
            <MainContainer />
          </div>
          <div>
            <SecondaryContainer />
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;