import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`,
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
