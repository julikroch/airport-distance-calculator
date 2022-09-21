import React, { Fragment, useState } from 'react';
import Input from './components/Input';
import { CircularProgress, Box, Button } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { OPTIONS, RATE_CONVERTION } from './constants';
import type { AirportI, ResultI } from './typings';

function App() {
  const [departure, setDeparture] = useState<AirportI>()
  const [arrival, setArrival] = useState<AirportI>()
  const [distance, setDistance] = useState(0)
  const [updatedResults, setUpdatedResults] = useState<ResultI>()
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setErrorMsg('')

    try {
      const response = await fetch(`https://geo-services-by-mvpc-com.p.rapidapi.com/distance?locationB=${arrival?.latitude}%2C%20${arrival?.longitude}&locationA=${departure?.latitude}%2C%20${departure?.longitude}&unit=miles`, OPTIONS)
      const distanceData = await response.json()
      const nauticalMilesConvertion = distanceData?.data * RATE_CONVERTION // rate convertion between miles and nautical miles.

      if (nauticalMilesConvertion) {
        setDistance(Math.round(nauticalMilesConvertion))
        departure && arrival && setUpdatedResults({ departureAirport: departure.name, arrivalAirport: arrival.name })
      } else {
        setDistance(0)
        setUpdatedResults({ departureAirport: '', arrivalAirport: '' })
        setErrorMsg('Error while calculating nautical miles. Please check the submitted fields.')
      }

    } catch (error) {
      console.error('Error while calculating the distance between airports', error)
    }
    setLoading(false)
  }

  return (
    <div className='app'>
      <div className='app--container'>
        <h1 className='app--container__title'>🌎 Airport Distance Calculator 🛫</h1>
        <Input
          label='Departure'
          placeholder='Ex: MIA'
          setDeparture={setDeparture}
          setArrival={setArrival}
        />

        <Input
          label='Arrival'
          placeholder='Ex: JFK'
          setDeparture={setDeparture}
          setArrival={setArrival}
        />

        <Button
          variant="contained"
          color="success"
          type='submit'
          size='large'
          endIcon={<PublicIcon />}
          className='app--container__btn'
          onClick={handleSubmit}
        >
          Calculate distance
        </Button>

        {loading
          ? <Box className='app--container__spinner'><CircularProgress /></Box>
          : distance !== 0 && updatedResults
            ?
            <p className='app--container__distance'>
              The distance between
              <b> {updatedResults.departureAirport}</b> and
              <b> {updatedResults.arrivalAirport}</b> is:
              <span className='app--container__miles'> <b>🧭 {distance} nautical miles 🧭</b></span>
            </p>
            : <Fragment />}
        {errorMsg && <p data-testid='error-msg' className='app--container__error'>{errorMsg}</p>}
      </div>
    </div>
  );
}

export default App;
