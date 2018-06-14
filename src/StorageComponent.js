import React from 'react';
import {
	StyleSheet, 
	Text, 
	View, 
	TouchableHighlight,
	AsyncStorage,
	YellowBox,
	Image
} from 'react-native';
import {StackNavigator} from 'react-navigation';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class StorageComponent extends React.Component{
	constructor(props) {
		super(props);
		this.state = {};
	}

	/*
		Инициализация хранилища начальными данными для нормального отображения в оффлайне
	*/

	firstTimeStorageInit(){
		return new Promise(async (resolve) =>{
			const getItemValue = await AsyncStorage.getItem('locationData');

			if(getItemValue == null){
				console.log("location item == null");
				let setItemValue = await AsyncStorage.setItem('locationData', JSON.stringify({
					chosenLocationName:'Запорожье',
					chosenLocationDescription:'Запорожье, Запорожская область, Украина',
					region:{
						latitude:47.83880000000001,
						longitude:35.139567,
						latitudeDelta:LATITUDE_DELTA,
						longitudeDelta:LONGITUDE_DELTA,
					},
					marker:{
						title:'Current Position',
						coordinate:{
							latitude: 47.83880000000001,
							longitude: 35.139567,
						}
					},
					isLoading:true,
				}));
			}
			
			const getWeatherItemValue = await AsyncStorage.getItem('weatherData');

			if(getWeatherItemValue == null){
				console.log("weather item == null");
				let setItemValue = await AsyncStorage.setItem('weatherData', JSON.stringify({
					weatherDescription:{
						main: 'Clear',
						description: 'clear sky', 
						icon: '01d',
					},
					data:{
						humidity:26,
						pressure:1000,
						temp:20.5,
						temp_max:21,
						temp_min:20,
					}
				}));
			}

			const getAdvancedWeatherItemValue = await AsyncStorage.getItem('advancedWeatherData');

			if(getAdvancedWeatherItemValue == null){
				console.log("advanced weather item == null");
				let setItemValue = await AsyncStorage.setItem('advancedWeatherData', JSON.stringify({
					'0':{
						curDayData:{
							day:9,
							year:2018,
							month:'June',
							'12':{
								hour:12,
								weatherDescription:{
									description:"clear sky",
									icon:"02d",
									id:800,
									main:"Clear",
								},
								weatherData:{
									grnd_level:1013.75,
									humidity:34,
									pressure:1013.75,
									sea_level:1027.65,
									temp:27.76,
									temp_kf:0.24,
									temp_max:27.76,
									temp_min:27.52,
								},
							}
						}
					}
				}));
			}

			resolve(true);
		});
	}

	stateInit(){
		return new Promise(async (resolve) =>{
			const newValue = await AsyncStorage.getItem('locationData');
			const parsedValue = JSON.parse(newValue);
			resolve(parsedValue);
		});
	}

	/*
		Возвращение иконки для отображения соответсвующей погоды на скрине Форекаст
	*/

	requireImage(string){
		switch(string){
			case '01d': return require('./images/01d.png');
			case '02d': return require('./images/02d.png');
			case '03d': return require('./images/03d.png');
			case '04d': return require('./images/04d.png');
			case '09d': return require('./images/09d.png');
			case '10d': return require('./images/10d.png');
			case '11d': return require('./images/11d.png');
			case '13d': return require('./images/13d.png');
			case '50d': return require('./images/50d.png');

			case '01n': return require('./images/01n.png');
			case '02n': return require('./images/02n.png');
			case '03n': return require('./images/03n.png');
			case '04n': return require('./images/04n.png');
			case '09n': return require('./images/09n.png');
			case '10n': return require('./images/10n.png');
			case '11n': return require('./images/11n.png');
			case '13n': return require('./images/13n.png');
			case '50n': return require('./images/50n.png');

			default: return require('./images/01d.png');
		}
	}

	/*
		Возвращение цвета соответсвующей погоды
	*/

	requireColor(string){
		switch(string){
			case '01d': return '#ffa700';
			case '02d': return '#999999';
			case '03d': return '#777777';
			case '04d': return '#555555';
			case '09d': return '#4f5b66';
			case '10d': return '#a7adba';
			case '11d': return '#3b444b';
			case '13d': return '#4f5b66';
			case '50d': return '#000000';

			case '01n': return '#151515';
			case '02n': return '#555555';
			case '03n': return '#333333';
			case '04n': return '#272727';
			case '09n': return '#343d46';
			case '10n': return '#4f5b66';
			case '11n': return '#353839';
			case '13n': return '#343d46';
			case '50n': return '#000000';

			default: return '#ffa700';
		}
	}

	/*
		Возвращение иконки для отображения соответсвующей погоды на скрине Форекаст
	*/

	requireIcon(string){
		switch(string){
			case '01d': return require('./images/weather_icon-01.png');
			case '02d': return require('./images/weather_icon-17.png');
			case '03d': return require('./images/weather_icon-16.png');
			case '04d': return require('./images/weather_icon-16.png');
			case '09d': return require('./images/weather_icon-19.png');
			case '10d': return require('./images/weather_icon-20.png');
			case '11d': return require('./images/weather_icon-28.png');
			case '13d': return require('./images/weather_icon-31.png');
			case '50d': return require('./images/weather_icon-39.png');

			case '01n': return require('./images/weather_icon-08.png');
			case '02n': return require('./images/weather_icon-18.png');
			case '03n': return require('./images/weather_icon-16.png');
			case '04n': return require('./images/weather_icon-16.png');
			case '09n': return require('./images/weather_icon-19.png');
			case '10n': return require('./images/weather_icon-21.png');
			case '11n': return require('./images/weather_icon-28.png');
			case '13n': return require('./images/weather_icon-31.png');
			case '50n': return require('./images/weather_icon-39.png');

			default: return require('./images/weather_icon-01.png');
		}
	}
}