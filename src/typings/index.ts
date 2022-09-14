export interface InputI {
    label: string
    placeholder: string
    setDeparture?: React.Dispatch<any> | any
    setArrival?: React.Dispatch<any> | any
}

export interface SearchI {
    param: string
    airportsArr: any[]
}

export interface AirportI {
    iatacode: string
    name: string | any
    cityname: string
}