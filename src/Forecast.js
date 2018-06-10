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

const styles = require('./style/Styles');
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
YellowBox.ignoreWarnings(['Remote debugger is in a background tab which may cause apps to perform slowly.']);

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const WEATHER_API_KEY = '574020de38f6a61ef87e0d8489c58ee0';

export default class Forecast extends React.Component{
	constructor(props) {
	super(props);
		this.state = {
			locationName:'',
			locationDescription:'',
			region:{},
			marker:{},
			weather:{},

			user:'',
			isLoading:true,
			isLoggedIn:true,
		};
	}

	/*
		Инициализируем AsyncStorage когда приложение было запущено впервые
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

	/*
		Инициализируем state с информацией о локации для прогноза
	*/

	stateInit(){
		return new Promise(async (resolve) =>{
			const newValue = await AsyncStorage.getItem('locationData');
			const parsedValue = JSON.parse(newValue);
			
			this.setState({
				locationName: parsedValue.chosenLocationName,
				locationDescription: parsedValue.chosenLocationDescription,
				region:parsedValue.region,
				marker:parsedValue.marker,
			});

			resolve(true);
		});
	}

	/*
		Делаем запрос на получние прогноза на сегодня или достаем информацию с лок. хранилища.
	*/

	getCurrentWeatherData(){
		return new Promise(async (resolve,reject) =>{
			try{
				let response = await fetch(
					'http://api.openweathermap.org/data/2.5/weather?lat='+this.state.region.latitude+
					'&lon='+this.state.region.longitude+
					'&APPID='+WEATHER_API_KEY+
					'&units=metric'
				);

				let responseJson = await response.json();
				console.log(responseJson);
				
				this.setState({
					weather:{
						weatherDescription:{
							main: responseJson.weather[0].main,
							description: responseJson.weather[0].description, 
							icon: responseJson.weather[0].icon,
						},
						data:{
							humidity:responseJson.main.humidity,
							pressure:responseJson.main.pressure,
							temp:responseJson.main.temp,
							temp_max:responseJson.main.temp_max,
							temp_min:responseJson.main.temp_min,
						}
					}
				}, async function(){
					let setItemValue = await AsyncStorage.setItem('weatherData', JSON.stringify(this.state.weather));
				});
				
				resolve(true);
			
			}catch(error){
				const newValue = await AsyncStorage.getItem('weatherData');
				const parsedValue = JSON.parse(newValue);

				this.setState({weather:parsedValue});
				reject(error.message);
			}
		});
	}

	/*
		Запрос на получение данных о пользователе
	*/

	getFacebookData(){
		return new Promise(async (resolve,reject) =>{
			try{
				let access = await AccessToken.getCurrentAccessToken();
				let response = await fetch(
					'https://graph.facebook.com/v2.5/me?fields=email,name&access_token='+ access.accessToken
				);
				let responseJson = await response.json();

				this.setState({
					user:responseJson.name,
					isLoggedIn:true,
				});

				let setItemValue = await AsyncStorage.setItem('userData', JSON.stringify(this.state.user));
				resolve(true);
			}catch(error){
				const newValue = await AsyncStorage.getItem('userData');
				const parsedValue = JSON.parse(newValue);
				console.log(parsedValue);

				this.setState({
					user:parsedValue,
					isLoggedIn:false,
				});

				reject(error.message);
			}
		});
	}

	/*
		Убираем LoadingScreen
	*/

	cancelLoadingScreen(){
		this.setState({
			isLoading:false,
		});
	}

	/*
		Инициализуем state
	*/

	async dataInit(){
		try{
			let storage_init = await this.firstTimeStorageInit();
			console.log('Storage Init: ',storage_init);
			
			let state_init = await this.stateInit();
			console.log('State Init: ',state_init);

			let weather_data = await this.getCurrentWeatherData();
			console.log('Current Weather Data: ',weather_data);

			let facebook_info = await this.getFacebookData();
			console.log('Facebook Info: ',facebook_info);

			this.cancelLoadingScreen();
			
		}catch(error){
			console.log(error);
			this.cancelLoadingScreen();
		}
	}

	componentWillMount(){
		this.dataInit();
	}

	logoutUser(){
		LoginManager.logOut();
		this.props.navigation.replace('Login');
	}

	render(){
		if(this.state.isLoading){
			return(
				<View style={[styles.screenContainer,styles.centered]}>
					<Text style={styles.textFont}>Loading...</Text>
				</View>
			);
		}
		else{
			return(
				<View style={styles.screenContainer}>
					<View style={styles.componentContainer}>

						<View style={styles.weatherContainer}>
							<View style={styles.userAndTemperatureContainer}>

								<View style={[styles.userContainer,styles.justifyCentered]}>
									<View>
										<Text style={styles.textFont}>Welcome,</Text>
										<Text style={styles.textFont}>{this.state.user}!</Text>
									</View>
									<TouchableHighlight
										style = {[styles.button,styles.centered]}
										onPress = {() => {this.logoutUser()}}
									>
										<Text style = {styles.textStyle}>Logout with Facebook</Text>
									</TouchableHighlight>
								</View>

								<View style={styles.separator}></View>

								<View style={[styles.temperatureContainer,styles.centered]}>
									<Text style={styles.temperatureFont}>{this.state.weather.data.temp}°C</Text>
									<Text style={styles.textFont}>Min - {this.state.weather.data.temp_min}°C</Text>
									<Text style={styles.textFont}>Max - {this.state.weather.data.temp_max}°C</Text>
								</View>

							</View>

							<View style={[styles.weatherDataContainer,styles.centered]}>
								<Text style={styles.textFont}>{this.state.locationName}</Text>
								<Text style={styles.textFont}>{this.state.weather.weatherDescription.main}, {this.state.weather.weatherDescription.description}</Text>
								<Text style={styles.textFont}>Humidity - {this.state.weather.data.humidity}%</Text>
								<Text style={styles.textFont}>Pressure - {this.state.weather.data.pressure} hpa.</Text>
							</View>
						</View>

						<View style={styles.buttonContainer}>
							<TouchableHighlight
								style = {[styles.button,styles.buttonWeather,styles.centered]}
								onPress = {() => {
									this.props.navigation.replace('AdvancedForecast')
								}}
							>
								<Text style = {[styles.textFont,{color:'#f9f9f9'}]}>Advanced Weather Forecast</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style = {[styles.button,styles.buttonLocation,styles.centered]}
								onPress = {() => {
									this.props.navigation.replace('Location')
								}}
							>
								<Text style = {[styles.textFont,styles.textColor]}>Change Location</Text>
							</TouchableHighlight>
						</View>

					</View>
				</View>
			);
		}
	}
}
