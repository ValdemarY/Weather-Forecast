import {AsyncStorage} from 'react-native';
import {locationData} from './actionTransmitter'

export function locationFetch(dispatch){
	return new Promise((resolve,reject) =>{
		AsyncStorage.getItem('locationData')
		.then((value) => JSON.parse(value))
		.then(location =>{
			dispatch(locationData(location))
			console.log('location: ',location);
			resolve(location)
		})
		.catch(error => {
			if(error.message!=='Network request failed')
				reject(error.message);
		})
	});
}