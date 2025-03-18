/* eslint-disable no-unused-vars */
import { usericon } from "../utlis/usericon";
import { signOut } from "firebase/auth";
import { auth } from "../utlis/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { adduser, removeuser } from "./Redux/userSlice";
import { toogleGptSearchView } from "./Redux/GptSlice";
import { SupportedLanguages } from "../utlis/SupportedLanguages";
import { changeLanguage } from "./Redux/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const config = useSelector((store) => store.config);
  const tooglegpt = useSelector((store) => store.gpt.showgptsearch);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLanguageChange = (e) => {
    e.stopPropagation();
    dispatch(changeLanguage(e.target.value));
  };

  const handlegpt = (e) => {
    e.stopPropagation();
    dispatch(toogleGptSearchView());
  };

  const handlesignout = (e) => {
    e.stopPropagation();
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(adduser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeuser());
        navigate("/");
      }
    });
    return () => unSubscribe();
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest("#dropdown") && !e.target.closest("#user-button")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="absolute top-0 left-0 w-full px-6 py-4 bg-gradient-to-b from-black via-gray-900 to-transparent z-20 flex justify-between items-center shadow-lg hover:shadow-xl transition-all duration-300">
      <img
        className="w-32 md:w-44 transform transition-transform duration-300 hover:scale-105"
        src="logo.png"
        alt="Netflix Logo"
      />
      {user && (
        <div className="relative">
          <button
            id="user-button"
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none transform transition-transform duration-300 hover:scale-110 hover:shadow-md rounded-full overflow-hidden"
          >
            <img
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover hover:brightness-110 transition-all duration-300"
              src={usericon}
              alt="User Icon"
            />
          </button>

          <div
            id="dropdown"
            className={`absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl transition-all duration-300 ease-in-out origin-top-right ${
              isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
            }`}
          >
            <h3 className="text-white text-sm px-4 py-2 font-semibold bg-gray-800">
              Hi, {user.displayName}
            </h3>

            <button
              onClick={handlegpt}
              className="w-full text-left px-4 py-2 text-gray-300 bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:text-white"
            >
              {tooglegpt ? "Home" : "GPT Search"}
            </button>

            {tooglegpt && (
              <select
                value={config.lang}
                onChange={handleLanguageChange}
                className="w-full bg-transparent text-white text-sm px-4 py-2 border-b border-gray-700 focus:outline-none appearance-none"
              >
                {SupportedLanguages.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier} className="bg-gray-800 hover:bg-gray-700 text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={handlesignout}
              className="w-full text-left px-4 py-2 text-gray-300 bg-gray-800 hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;