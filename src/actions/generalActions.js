import {AsyncStorage} from 'react-native';

export function firstTimeStorageInitFetch(){
	return new Promise((resolve,reject) =>{
		AsyncStorage.getItem('locationData').then(
			data =>{
				if(data==null){
					console.log("location item == null");
					AsyncStorage.setItem('locationData', JSON.stringify({
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
					}));
				}
			}
		)
		.catch(error => reject(error.message))

		AsyncStorage.getItem('weatherData').then(
			data =>{
				if(data==null){
					console.log("weather item == null");
					AsyncStorage.setItem('weatherData', JSON.stringify({
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
			}
		)
		.catch(error => reject(error.message))

		AsyncStorage.getItem('advancedWeatherData').then(
			data =>{
				if(data==null){
					console.log("advanced weather item == null");
					AsyncStorage.setItem('advancedWeatherData', JSON.stringify({
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
			}
		)
		.catch(error => reject(error.message))
		resolve(true);
	});
}