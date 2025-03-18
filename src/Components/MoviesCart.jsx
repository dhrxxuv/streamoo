import { imageCdnUrl } from "../utlis/tmbdApi";
import { useNavigate } from "react-router";
// eslint-disable-next-line react/prop-types
const MoviesCart = ({ poster_path,id }) => {

  const navigate = useNavigate();

  const handleClick =() =>{
    navigate('/movies/' + id)
  }


  if(!poster_path) return
    return (
      <div 
      onClick={handleClick}
      className="relative flex-shrink-0 w-40 md:w-48 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg group">
        <img
          className="w-full h-auto rounded-lg object-cover"
          src={imageCdnUrl + poster_path}
          alt="movie cart"
          
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Watch Now
          </p>
        </div>
      </div>
    );
  };

export default MoviesCart;