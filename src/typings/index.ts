export interface InputI {
    label: string
    placeholder: string
    setDeparture: React.Dispatch<AirportI>
    setArrival: React.Dispatch<AirportI>
}

export interface SearchI {
    param: string
    airportsArr: AirportI[]
}

export interface AirportI {
    iatacode: string
    name: string
    cityname: string
    latitude: number
    longitude: number
}

export interface ResultI {
    departureAirport: string
    arrivalAirport: string
}