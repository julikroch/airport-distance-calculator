import { useEffect, useState } from "react"
import { OPTIONS, URL } from "../constants"

export const useAirports = () => {
    const [airports, setAirports] = useState<any>({})

    const getUsaAirports = () => {
        fetch(URL, OPTIONS)
            .then(response => response.json())
            .then(response => setAirports(response))
            .catch(err => console.error(err));
    }

    useEffect(() => getUsaAirports(), [])

    return { airports }
}