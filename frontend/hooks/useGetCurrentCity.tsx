'use client'

import { setCity } from '@/redux/slices/user.slice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetCurrentCity = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.user)
  const API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY

  const getUsersCurrentCity = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = await position.coords

      try {
        const { data } = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${API_KEY}`
        )
        if (!data) return
        dispatch(setCity(data.results[0].city))
      } catch (error) {
        console.log("cannot get user's city", error)
      }
    })
  }

  useEffect(() => {
    async function fetchCity() {
      await getUsersCurrentCity()
    }
    fetchCity()
  }, [userData])

  return { getUsersCurrentCity }
}

export default useGetCurrentCity
