import { API_KEY } from '../variables'

export const URL = 'https://geo-services-by-mvpc-com.p.rapidapi.com/airports?language=en&countrycode=US'

export const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'geo-services-by-mvpc-com.p.rapidapi.com'
    }
};