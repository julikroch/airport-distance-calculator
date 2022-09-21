import React, { Fragment, useState } from 'react'
import { useAirports } from '../hooks/useAirports'
import { List, ListItem, Divider, TextField } from '@mui/material';
import type { InputI, SearchI, AirportI } from '../typings';

const Input = (props: InputI) => {

    const { label, placeholder, setDeparture, setArrival } = props

    const { airports } = useAirports()
    const [search, setSearch] = useState<SearchI>()
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const foundAirport = airports && airports?.data?.filter((airport: AirportI) =>
            airport?.iatacode?.includes(e.target.value.toUpperCase()) ||
            airport?.name?.toLowerCase()?.includes(e.target.value.toLowerCase()) ||
            airport?.cityname?.toLowerCase()?.includes(e.target.value.toLowerCase()))

        setErrorMsg(!foundAirport?.length ? true : false)
        setMessage(e.target.value)
        setSearch({ ...search, param: e.target.name, airportsArr: foundAirport ?? [] })
        search?.param === 'Departure' && setDeparture(foundAirport)
        search?.param === 'Arrival' && setArrival(foundAirport)
    }

    const handleClick = (param: string, airport: AirportI) => {
        setMessage(airport.iatacode)
        param === 'Departure' && setDeparture(airport)
        param === 'Arrival' && setArrival(airport)
        setSearch({ ...search, param: '', airportsArr: [] })
    }

    return (
        <div className='input'>
            <TextField
                type="text"
                label={label === 'Departure' ? 'Starting Airport' : 'Destination Airport'}
                variant="filled"
                aria-describedby={label}
                name={label}
                className='input--text'
                placeholder={placeholder}
                value={message}
                error={errorMsg ? true : false}
                helperText={errorMsg && "No results for this search."}
                onChange={handleChange}
            />

            {search?.airportsArr && search?.airportsArr?.length && message ?
                <List className='input--dropdown'>
                    {search?.airportsArr?.map((airport: AirportI) =>
                        <div
                            key={airport?.iatacode}
                            tabIndex={0}
                            onKeyPress={() => handleClick(search.param, airport)}
                        >
                            <ListItem
                                className='input--option'
                                onClick={() => handleClick(search.param, airport)}
                            >
                                {airport?.name}, {airport?.cityname}
                            </ListItem>
                            <Divider />
                        </div>
                    )}
                </List>
                : <Fragment />}
        </div>
    )
}

Input.defaultProps = {
    label: 'Departure',
    placeholder: 'Ex: JFK'
}

export default Input