import { useRef, useEffect, useState } from 'react'
import axios from 'axios';

import { useQuery, useQueryClient } from '@tanstack/react-query';


export default function useDragStatic({enabled}){


    const queryClient = useQueryClient()
    const {data : information, status, isLoading, refetch } = useQuery({
      queryKey : ['UserData'],
      queryFn : fetchUserData,
      enabled : enabled,
    })

    async function fetchUserData(){
      console.log('fetching')
      const instance = axios.create({
        retry: 0, 
      });
        const info = {
          "name" : `f`,
          "password" : `f`
        }
        try {
          const response = await instance.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/Authorization/findUserDetails`, info, { withCredentials: true })
          return response.data;
        } catch (error) {
          return null
        }
    }
    async function Logout(){
      const instance = axios.create({
        retry: 0, 
      });
      const info = {
        "name" : `f`,
        "password" : `f`
      }
      await instance.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/Authorization/Logout`, info, { withCredentials: true })
      queryClient.invalidateQueries(['UserData']);
      window.location.reload();
      return null
    }
   
    return [information, Logout, refetch]
}
