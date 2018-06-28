import {AsyncStorage} from 'react-native';
import {itemIsLoading, errorHandler, locationData} from './actionTransmitter'
import {firstTimeStorageInitFetch} from './generalActions'
import {facebookTokenFetch, facebookUserFetch} from './facebookActions'
import {locationFetch} from './locationActions'
import {weatherFetch, advancedWeatherFetch} from './weatherActions'

export function loginQueryManager(){
	return dispatch =>{
		dispatch(itemIsLoading(true))
		
		facebookTokenFetch(dispatch)
		.then(token => dispatch(itemIsLoading(false)))
		.catch(error => dispatch(errorHandler(error)))
	}
}

export function forecastQueryManager(){
	return dispatch =>{
		dispatch(itemIsLoading(true))

		facebookTokenFetch(dispatch)
		.then(token => facebookUserFetch(dispatch,token))
		.then(user => firstTimeStorageInitFetch())
		.then(status => locationFetch(status, dispatch))
		.then(location => weatherFetch(dispatch,location))
		.then(weather => dispatch(itemIsLoading(false)))
		.catch(error => dispatch(errorHandler(error)))
	}
}

export function weatherQueryManager(location){
	return dispatch =>{
		dispatch(itemIsLoading(true))

		weatherFetch(dispatch,location)
		.then(weather => dispatch(itemIsLoading(false)))
		.catch(error => dispatch(errorHandler(error)))
	}	
}

export function advancedQueryManager(location){
	return dispatch =>{
		dispatch(itemIsLoading(true))

		advancedWeatherFetch(dispatch,location)
		.then(weather => dispatch(itemIsLoading(false)))
		.catch(error => dispatch(errorHandler(error)))
	}
}
