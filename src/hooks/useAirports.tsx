import { useEffect, useState } from "react"
import { OPTIONS } from "../constants"

export const useAirports = () => {

    const URL = 'https://geo-services-by-mvpc-com.p.rapidapi.com/airports?language=en&countrycode=US'
    const [airports, setAirports] = useState<any>({})

    const getAllUSAirports = () => {
        fetch(URL, OPTIONS)
            .then(response => response.json())
            .then(response => setAirports(response))
            .catch(err => console.error(err));
    }

    useEffect(() => getAllUSAirports(), [])

    return { airports }
}