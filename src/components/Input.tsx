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
    const [search, setSearch] = useState<SearchI | any>()
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e: any) => {
        const foundAirport = airports && airports?.data?.filter((airport: AirportI) => airport?.iatacode === e.target.value.toUpperCase() || airport?.name.toLowerCase().includes(e.target.value))

        !foundAirport?.length ? setErrorMsg('No results for you search 😞') : setErrorMsg('')

        setMessage(e.target.value)

        setSearch({
            param: e.target.name,
            airportsArr: foundAirport
        })
    }

    const handleClick = (param: string, dep: any) => {
        setMessage(dep.iatacode)
        param === 'Departure' ? setDeparture(dep) : setArrival(dep)
        setSearch({})
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
                onChange={handleChange}
                value={message}
                error={errorMsg ? true : false}
                helperText={errorMsg && "No results for this search 😞"}
            />
            <List className='input--dropdown'>
                {search?.airportsArr?.length && search?.airportsArr?.length >= 0 ? search?.airportsArr?.map((airport: AirportI) =>
                    <div key={airport.iatacode}>
                        <ListItem onClick={() => handleClick(search.param, airport)}>
                            {airport.name}, {airport.cityname}
                        </ListItem>
                        <Divider />
                    </div>
                ) : <Fragment />}
            </List>
        </div >
    )
}

export default Input