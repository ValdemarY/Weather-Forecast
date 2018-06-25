import {AsyncStorage} from 'react-native';
import {locationData} from './actionTransmitter'

export function locationFetch(status, dispatch){
	return new Promise((resolve,reject) =>{
		AsyncStorage.getItem('locationData')
		.then((value) => JSON.parse(value))
		.then(location =>{
			dispatch(locationData(location))
			console.log('locationHERE: ',location, status);
			resolve(location)
		})
		.catch(error => {
			console.log('ERROR: ',error.message);
			if(error.message!=='Network request failed')
				reject(error.message);
		})
	});
}