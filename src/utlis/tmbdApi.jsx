export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE__TMBD_KEY}`
  },
};



export const imageCdnUrl = "https://image.tmdb.org/t/p/w500";