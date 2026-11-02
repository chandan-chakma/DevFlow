import axios from 'axios';
import React from 'react';


const axiosSecure = axios.create({
    baseURL: 'https://devflow-server-kin7.onrender.com/',
    withCredentials: true
})
const UseAxiosSecures = () => {
    return axiosSecure;
};

export default UseAxiosSecures;