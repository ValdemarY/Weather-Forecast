import {AsyncStorage} from 'react-native';
import {itemIsLoading, errorHandler, locationData} from './actionTransmitter'
import {firstTimeStorageInitFetch} from './generalActions'
import {facebookTokenFetch, facebookUserFetch} from './facebookActions'
import {locationFetch} from './locationActions'
import {weatherFetch, advancedWeatherFetch} from './weatherActions'
import {LATITUDE_DELTA,LONGITUDE_DELTA} from '../constants/constant';

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
		weatherFetch(dispatch,location)
		.then(weather => console.log(weather))
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

export function markerChange(latitude,longitude,res){
	return dispatch =>{
		dispatch(locationData({
			chosenLocationName:res[0].locality!==null?res[0].locality:res[0].adminArea,
			chosenLocationDescription:res[0].locality!==null?
			res[0].locality+', '+res[0].adminArea+', '+res[0].country:
			res[0].adminArea+', '+res[0].country,
			marker:{
				title:'Current Position',
				coordinate:{
					latitude: latitude,
					longitude: longitude
				}
			}
		}))
	}
}

export function googleTextInputChange(data,details){
	return dispatch =>{
		dispatch(locationData({
			chosenLocationDescription:data.description,
			chosenLocationName:data.structured_formatting.main_text,
			marker:{
				title:'Current Position',
				coordinate:{
					latitude: details.geometry.location.lat,
					longitude: details.geometry.location.lng
				}
			},
			region:{
				latitude: details.geometry.location.lat,
				longitude: details.geometry.location.lng,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			}
		}))
	}
}

export function passLocationDataToStorage(data){
	return dispatch =>{
		return new Promise((resolve,reject) =>{
			console.log('DATA',data);
			let data_location = {
				chosenLocationDescription:data.chosenLocationDescription,
				chosenLocationName:data.chosenLocationName,
				marker:{
					title:'Current Position',
					coordinate:{
						latitude: data.marker.coordinate.latitude,
						longitude: data.marker.coordinate.longitude,
					}
				},
				region:{
					latitude: data.marker.coordinate.latitude,
					longitude: data.marker.coordinate.longitude,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA,
				}
			};

			AsyncStorage.setItem('locationData', JSON.stringify(data_location))
			.then(response =>{
				dispatch(locationData(data_location))
				resolve(true)
			})
			.catch(error => {
				if(error.message!=='Network request failed')
					reject(false)
				else{
					dispatch(errorHandler(error.message))
					resolve(true)
				}
			})
		});
	}
}
