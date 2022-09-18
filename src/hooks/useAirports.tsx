import { useEffect, useState } from "react"
import { OPTIONS, URL } from "../constants"

export const useAirports = () => {
    const [airports, setAirports] = useState<any>({})

    const getUsaAirports = async () => {
        try {
            const response = await fetch(URL, OPTIONS)
            const airportsData = await response.json()
            return setAirports(airportsData)
        } catch (error) {
            console.error('Error while getting US airports', error)
        }
    }

    useEffect(() => {
        getUsaAirports()
    }, [])

    return { airports }
}