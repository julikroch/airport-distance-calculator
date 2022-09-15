export interface InputI {
    label: string
    placeholder: string
    setDeparture?: React.Dispatch<AirportI> | any
    setArrival?: React.Dispatch<AirportI> | any
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
    departureAirport: string | any
    arrivalAirport: string | any
}