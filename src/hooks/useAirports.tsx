import { useEffect, useState } from "react"
import { OPTIONS } from "../constants"

export const useAirports = () => {
    const [airports, setAirports] = useState<any>({})
    const getAllUSAirports = async () => {
        fetch('https://geo-services-by-mvpc-com.p.rapidapi.com/airports?language=en&countrycode=US', OPTIONS)
            .then(response => response.json())
            .then(response => setAirports(response))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getAllUSAirports()
    }, [])

    return { airports }
}