import React, { Fragment, useState } from 'react';
import Input from './components/Input';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PublicIcon from '@mui/icons-material/Public';
import { OPTIONS } from './constants';
import { AirportI, ResultI } from './typings';

function App() {

  const [departure, setDeparture] = useState<AirportI>()
  const [arrival, setArrival] = useState<AirportI>()
  const [distance, setDistance] = useState(0)
  const [updatedResults, setUpdatedResults] = useState<ResultI>()
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    fetch(`https://geo-services-by-mvpc-com.p.rapidapi.com/distance?locationB=${arrival?.latitude}%2C%20${arrival?.longitude}&locationA=${departure?.latitude}%2C%20${departure?.longitude}&unit=miles`, OPTIONS)
      .then(response => response.json())
      .then(response => {
        const nauticalMilesConvertion = response.data * 0.868976 // rate convertion between miles and nautical miles.

        setLoading(true)
        setErrorMsg('')

        setTimeout(() => {
          if (nauticalMilesConvertion) {
            setDistance(Math.round(nauticalMilesConvertion))
            departure && arrival && setUpdatedResults({ departureAirport: departure.name, arrivalAirport: arrival.name })
          } else {
            setDistance(0)
            setUpdatedResults({ departureAirport: '', arrivalAirport: '' })
            setErrorMsg('Error while calculating distance. Please check submitted fields.')
          }
          setLoading(false)
        }, 2000);
      })
      .catch(err => console.error(err));
  }

  return (
    <div className='app'>
      <div className='app--container'>
        <h2 className='app--container__title'>🌎 Airport Distance Calculator 🛫</h2>
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
              <b> {updatedResults.arrivalAirport}</b> is
              <b><span className='app--container__miles'> 🧭 {distance} nautical miles 🧭</span></b>
            </p>
            : <Fragment />}

        {errorMsg && <p data-testid='error-msg' className='app--container__error'>{errorMsg}</p>}
      </div>
    </div>
  );
}

export default App;
