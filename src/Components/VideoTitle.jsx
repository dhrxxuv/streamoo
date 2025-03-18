/* eslint-disable react/prop-types */
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 bg-gradient-to-t from-black via-transparent text-white">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{title}</h1>
      <p className="text-sm md:text-base lg:text-lg max-w-xs md:max-w-md lg:max-w-lg mb-6 leading-relaxed">{overview}</p>
      <div className="flex space-x-4">
        <button className="bg-[#e50914] text-white px-6 py-2 md:px-8 md:py-3 rounded font-semibold text-base md:text-lg hover:bg-[#f6121d] transition duration-200">
          Play
        </button>
        <button className="bg-[#333] bg-opacity-70 text-white px-6 py-2 md:px-8 md:py-3 rounded font-semibold text-base md:text-lg hover:bg-opacity-100 transition duration-200">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;