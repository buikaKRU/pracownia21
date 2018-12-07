import axios from 'axios';

const axiosInstance = axios.create({
        baseURL: 'https://data.pracownia21.pl/wp-json/wp/v2/'
    }
);

export default axiosInstance;