import React, { useState } from 'react';
import Input from './components/Input';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { OPTIONS } from './constants';

function App() {

  const [departure, setDeparture] = useState<any>({})
  const [arrival, setArrival] = useState<any>({})
  const [distance, setDistance] = useState<number>(0)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleSubmit = () => {
    fetch(`https://geo-services-by-mvpc-com.p.rapidapi.com/distance?locationB=${arrival?.latitude}%2C%20${arrival?.longitude}&locationA=${departure?.latitude}%2C%20${departure?.longitude}&unit=miles`, OPTIONS)
      .then(response => response.json())
      .then(response => {
        const nauticalMilesConvertion = response.data * 0.868976

        if (nauticalMilesConvertion) {
          setDistance(Math.round(nauticalMilesConvertion))
          setErrorMsg('')
        } else {
          setDistance(0)
          setErrorMsg('Error whilte calculating distance. Please check your fields')
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div className='app'>
      <h2 className='app--title'>🌎 Airport Distance Calculator 🛫</h2>

      <div className='app--container'>
        <Input
          label='Departure'
          placeholder='Ex: MIA'
          setDeparture={setDeparture}
        />

        <Input
          label='Arrival'
          placeholder='Ex: JFK'
          setArrival={setArrival}
        />

        <Button
          variant="outlined"
          type='submit'
          size='large'
          endIcon={<SendIcon />}
          className='app--container_btn'
          onClick={handleSubmit}
        >
          Calculate distance
        </Button>
        {distance !== 0 && <p className='app--container-distance'>The distance between <b>{departure.name}</b> and <b>{arrival.name}</b> is {distance} nautical miles.</p>}

        {errorMsg && <p className='app--container-error'>{errorMsg}</p>}
      </div>
    </div>
  );
}

export default App;
