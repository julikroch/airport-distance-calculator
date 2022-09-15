import React, { Fragment, useState } from 'react'
import { useAirports } from '../hooks/useAirports'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { InputI, SearchI, AirportI } from '../typings';

const Input = (props: InputI) => {

    const { label, placeholder, setDeparture, setArrival } = props

    const { airports } = useAirports()
    const [search, setSearch] = useState<SearchI>()
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e: any) => {
        const foundAirport = airports && airports?.data?.filter((airport: AirportI) =>
            airport?.iatacode === e.target.value.toUpperCase() ||
            airport?.name.toLowerCase().includes(e.target.value) ||
            airport?.cityname?.toLowerCase().includes(e.target.value))

        setErrorMsg(!foundAirport?.length ? 'No results for you search 😞' : '')
        setMessage(e.target.value)
        setSearch({ param: e.target.name, airportsArr: foundAirport ?? [] })
    }

    const handleClick = (param: string, airport: AirportI) => {
        setMessage(airport.iatacode)
        param === 'Departure' && airport ? setDeparture(airport) : setArrival(airport)
        setSearch({ param: '', airportsArr: [] })
    }

    return (
        <div className='input'>
            <TextField
                type="text"
                label={label === 'Departure' ? 'Starting Airport' : 'Destination Airport'}
                variant="filled"
                name={label}
                className='input--text'
                placeholder={placeholder}
                value={message}
                error={errorMsg ? true : false}
                helperText={errorMsg && "No results for this search 😞"}
                onChange={handleChange}
            />
            {search?.airportsArr && search?.airportsArr?.length >= 0 && message ?
                <List className='input--dropdown'>
                    {search?.airportsArr?.map((airport: AirportI) =>
                        <div key={airport.iatacode}>
                            <ListItem onClick={() => handleClick(search.param, airport)}>
                                {airport.name}, {airport.cityname}
                            </ListItem>
                            <Divider />
                        </div>
                    )}
                </List> : <Fragment />
            }
        </div>
    )
}

export default Input