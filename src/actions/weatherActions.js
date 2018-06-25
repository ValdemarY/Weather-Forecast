import {AsyncStorage} from 'react-native';
import {weatherFetchSuccess, advancedWeatherFetchSuccess} from './actionTransmitter'
import {WEATHER_API_KEY,MONTH_NAMES,DAY_NAMES} from '../constants/constant';

export function weatherFetch(dispatch, location){
	return new Promise((resolve,reject) =>{
		console.log('COORDS: ',location.marker.coordinate.latitude,location.marker.coordinate.longitude);
		fetch('http://api.openweathermap.org/data/2.5/weather?lat='+location.marker.coordinate.latitude+
			'&lon='+location.marker.coordinate.longitude+
			'&APPID='+WEATHER_API_KEY+
			'&units=metric'
		)
		.then((response) => response.json())
		.then(weather =>{
			console.log('weather: ',weather);
			let weatherInfo = {
				weatherDescription:{
					main: weather.weather[0].main,
					description: weather.weather[0].description, 
					icon: weather.weather[0].icon,
				},
				data:{
					humidity:weather.main.humidity,
					pressure:weather.main.pressure,
					temp:weather.main.temp,
					temp_max:weather.main.temp_max,
					temp_min:weather.main.temp_min,
				}
			}
			AsyncStorage.setItem('weatherData', JSON.stringify(weatherInfo));
			dispatch(weatherFetchSuccess(weatherInfo))
			resolve(weather)
		})
		.catch(error => {
			if(error.message!=='Network request failed')
				reject(error.message);
			else{
				AsyncStorage.getItem('weatherData')
				.then((value) => JSON.parse(value))
				.then(weather =>{
					dispatch(weatherFetchSuccess(weather))
					console.log('weather: ',weather);
					resolve(weather)
				})
			}
		})
	});
}

export function advancedWeatherFetch(dispatch,location){
	return new Promise((resolve,reject) =>{
		console.log(location);
		fetch(
			'http://api.openweathermap.org/data/2.5/forecast?lat='+location.marker.coordinate.latitude+
			'&lon='+location.marker.coordinate.longitude+
			'&APPID='+WEATHER_API_KEY+
			'&units=metric'
		)
		.then(response => response.json())
		.then(responseJson =>{
			let dayWeatherDataArray = [];
			let dayWeatherData = {};
			let previousDayValue = 0;

			responseJson.list.map((data,i) =>{                                   //Прорабатываем каждый час полученные при запросе в буферной переменной чтобы потом закинуть ее в масив погоды по числам
				let fulldate = new Date(data.dt*1000);

				let hour = fulldate.getHours();
				let date = fulldate.getDate();
				let day = DAY_NAMES[fulldate.getDay()];
				let month = MONTH_NAMES[fulldate.getMonth()];
				let year = fulldate.getFullYear();

				if((i>0 && day!==previousDayValue)||(i==(data.cnt-1))){
					console.log(dayWeatherData);
					dayWeatherDataArray.push(dayWeatherData);
				}
				
				previousDayValue = day;
				dayWeatherData = {
					curDayData:{
						...dayWeatherData.curDayData,
						date:date,
						day:day,
						year:year,
						month:month,
						[hour]:{
							hour:hour,
							weatherDescription:data.weather[0],
							weatherData:data.main,
						}
					}
				};
			});
			AsyncStorage.setItem('advancedWeatherData', JSON.stringify(dayWeatherDataArray));
			dispatch(advancedWeatherFetchSuccess(dayWeatherDataArray))
			resolve(true);
		})
		.catch(error =>{
			if(error.message!=='Network request failed')
				reject(error.message);
			else{
				AsyncStorage.getItem('advancedWeatherData')
				.then(newValue => JSON.parse(newValue))
				.then(parsedValue =>{
					let dayWeatherDataArray = [];

					for(let i=0; i<5;i++){
						if(parsedValue[i]!==undefined){
							dayWeatherDataArray.push(parsedValue[i]);
						}
					}
					dispatch(advancedWeatherFetchSuccess(dayWeatherDataArray))
					resolve(true);
				})
			}
		})
	})
}