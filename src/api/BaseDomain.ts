import AuthStore from '@/utils/AuthStore';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const baseUrl = `${BASE_URL}api`;
// export const baseUrl = `https://xion-commerce.onrender.com/api`;
export const baseUrl = 'http://localhost:5000/api';
// export const baseUrl = 'http://13.247.245.19:5000/api';

export const baseDomain = createApi({
  reducerPath: 'baseDomainApi',
  refetchOnMountOrArgChange: 5,  
  keepUnusedDataFor: 300,          
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


