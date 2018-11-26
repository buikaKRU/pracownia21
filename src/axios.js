import axios from 'axios';

const axiosInstance = axios.create({
        baseURL: 'http://staging.pracownia21.pl/wp-json/wp/v2/'
    }
);

export default axiosInstance;