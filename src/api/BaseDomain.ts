import AuthStore from '@/utils/AuthStore';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const baseUrl = `${BASE_URL}api`;
// export const baseUrl = `https://xion-commerce.onrender.com/api`;
export const baseUrl = 'http://localhost:8080/api';
// export const baseUrl = 'http://13.247.245.19:5000/api';

export const getAntiForgeryToken = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/antiforgery`, {
      withCredentials: true,  
    });
    
    return response.headers['x-xsrf-token'];
  } catch (error) {
    console.error('Failed to get anti-forgery token', error);
    return null;
  }
};

export const baseDomain = createApi({
  reducerPath: 'baseDomainApi',
  refetchOnMountOrArgChange: 5,  
  keepUnusedDataFor: 5,          
  tagTypes: ["Product",'Cart','Order','User'],
  baseQuery: fetchBaseQuery({
    baseUrl,  
    // baseUrl: '/api',           
    // credentials: 'include', 
    // mode:'no-cors',
    prepareHeaders:(headers, ) => {
      try {
        const accessToken = AuthStore.getAccessToken()
        if(accessToken){
          headers.set('Authorization',`Bearer ${accessToken}`)
        }
        // const token = await getAntiForgeryToken();
        // console.log(token, 'after api anti-forgery token');
        // if (token) {
        // //   headers.set('X-XSRF-TOKEN', cookie.load('XSRF-TOKEN'));
        // }
        // console.log(headers);
        return headers;
      } catch (error) {
        console.error('Error preparing headers', error);
        return headers; 
      }
    //   return headers;
    },
  }),
  endpoints: () => ({}),
});


