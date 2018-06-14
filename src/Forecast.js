import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet, 
	Text, 
	View, 
	TouchableHighlight,
	AsyncStorage,
	YellowBox,
	Image,
	Alert,
	NetInfo,
	DrawerLayoutAndroid
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Button} from 'react-native-elements'
import Sidebar from 'react-native-sidebar';
import StorageComponent from './StorageComponent'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
YellowBox.ignoreWarnings(['Remote debugger is in a background tab which may cause apps to perform slowly.']);

const styles = require('./style/Styles');
const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
	AccessToken
} = FBSDK;

const WEATHER_API_KEY = '574020de38f6a61ef87e0d8489c58ee0';
const windowSize = require('Dimensions').get('window');
const availWidth = windowSize.width-20-20;
const availHeight = windowSize.height-20-20;

export default class Forecast extends StorageComponent{
	constructor(props) {
	super(props);
		this.state = {
			location:{},
			weather:{},
			user:'',

			networkStatus:false,
			isLoading:true,
			isLoggedIn:true,
		};
	}

	componentWillMount(){
		this.dataInit();
	}

	componentWillUnmount(){
		NetInfo.isConnected.removeEventListener(
			'connectionChange',
			this._connectionHandler
		);
	}

	/*
		Выполнение асинхронных методов, инициализация стейтов
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

			let connection = await this.checkConnection();
			console.log('checkConnection: ',connection);

			this.cancelLoadingScreen();
		}catch(error){
			Alert.alert('Error has happened: '+error.message);
		}
	}

	/*
		Инициализируем AsyncStorage когда приложение было запущено впервые
	*/

	firstTimeStorageInit(){
		return new Promise(async (resolve) =>{
			let initData = await super.firstTimeStorageInit();
			resolve(initData);
		});
	}

	/*
		Инициализируем state с информацией о локации для прогноза
	*/

	stateInit(){
		return new Promise(async (resolve) =>{
			let locationData = await super.stateInit();
			this.setState({location:locationData});
			resolve(true);
		});
	}

	checkConnection(){
		return new Promise(async (resolve) =>{
			let status = await NetInfo.isConnected.fetch();
			this.setState({networkStatus:status});
			console.log('Network Status3: ',this.state.networkStatus);
			
			NetInfo.isConnected.addEventListener(
				'connectionChange',
				this._connectionHandler
			);
			
			resolve(true);
		});
	}

	_connectionHandler = (isConnected) =>{
		this.setState({networkStatus:isConnected});
		console.log('Network Status4: ',this.state.networkStatus);
	}

	/*
		Делаем запрос на получние прогноза на сегодня или достаем информацию с лок. хранилища.
	*/

	getCurrentWeatherData(){
		return new Promise(async (resolve,reject) =>{
			try{
				let response = await fetch(
					'http://api.openweathermap.org/data/2.5/weather?lat='+this.state.location.region.latitude+
					'&lon='+this.state.location.region.longitude+
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
				},
				async function(){
					let setItemValue = await AsyncStorage.setItem('weatherData', JSON.stringify(this.state.weather));
					console.log(this.state.weather.weatherDescription.icon,typeof this.state.weather.weatherDescription.icon)
				});

				resolve(true);
			}
			catch(error){
				console.log(error.message);
				if(error.message=='Network request failed'){
					await this.getCurrentWeatherDataFromStorage();
					resolve(true);
				}
				else reject(error);
			}
		});
	}

	async getCurrentWeatherDataFromStorage(){
		const newValue = await AsyncStorage.getItem('weatherData');
		const parsedValue = JSON.parse(newValue);
		this.setState({weather:parsedValue});
	}

	/*
		Запрос на получение данных о пользователе
	*/

	getFacebookData(){
		return new Promise(async (resolve,reject) =>{
			try{
				let access = await AccessToken.getCurrentAccessToken();
				if(access.accessToken==null) this.props.navigation.replace('Login');
				
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
			}
			catch(error){
				console.log(error.message);
				if(error.message=='Network request failed'){
					await this.getFacebookDataFromStorage();
					resolve(true);
				}
				else reject(error);
			}
		});
	}

	async getFacebookDataFromStorage(){
		const newValue = await AsyncStorage.getItem('userData');
		const parsedValue = JSON.parse(newValue);

		this.setState({
			user:parsedValue,
			isLoggedIn:true,
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
		Метод для аккуратного отображения фонтсайзов по всему скрину
	*/

	responsFS(width,height,multiplier,textlength){
		let oneSymbol = multiplier*width/textlength;
		console.log(oneSymbol);
		if(oneSymbol<height) return oneSymbol;
		else return height;
	}

	/*
		Компонент сайдбара с именем пользователя и логаутом
	*/

	renderLeftSidebar(){
		return(
			<View style={styles.sideBarContainer}>
				<View style={styles.sideBarView}>
					<Text
						style={{
							fontFamily:'Roboto-Light',
							fontSize:availHeight/20,
						}}
					>
					Hello, {this.state.user}!
					</Text>
					<Button
						containerViewStyle={{
							marginLeft: 0,
							width: '100%',
						}}
						buttonStyle={{
							height: availHeight/14,
							backgroundColor: '#428bca',
						}}
						title='Logout'
						onPress = {() => {
							this.logoutUser();
						}}
					/>
				</View>
			</View>
		);
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
				<Sidebar
					leftSidebar={this.renderLeftSidebar()}
					leftSidebarWidth={2*availWidth/3}
					style={{flex: 1}}>

					<View style={styles.screenContainer}>

						<View style={styles.componentContainer}>

							<View style={styles.weatherContainer}>
								
								<View style={styles.cityName}>
									<Text                                           //Вывод информации о городе
										numberOfLines={1}
										style={{
											fontFamily:'Roboto-Light',
											fontSize:this.responsFS(
												availWidth,
												availHeight/14,
												1.8,
												(this.state.location.chosenLocationDescription).length
											)
										}}
									>
									{this.state.location.chosenLocationDescription}
									</Text>
								</View>

								<View style={styles.weatherStatus}>
									<Text                                           //Вывод состояния погоды и иконки, находящейся в папке выше, предоставленна openweathermap.org
										numberOfLines={1}
										style={{
											fontFamily:'Roboto-LightItalic',
											fontSize:this.responsFS(
												availWidth,
												availHeight/14,
												1.2,
												(this.state.weather.weatherDescription.main+this.state.weather.weatherDescription.description).length
											)
										}}
									>
										{this.state.weather.weatherDescription.main}, {this.state.weather.weatherDescription.description}, 
									</Text>
									<Image 
										style={{
											width: availHeight/14, 
											height: availHeight/14,
										}}
										source={super.requireImage(this.state.weather.weatherDescription.icon)} 
									/>
								</View>

								<View style={[styles.weatherInfo,
									{backgroundColor: super.requireColor(this.state.weather.weatherDescription.icon)}
								]}>
									
									<View style={styles.temperature}>
										<Text                                           //Вывод температуры
											numberOfLines={1}
											style={{
												color:'white',
												fontFamily:'Roboto-Light',
												fontSize:this.responsFS(
													availWidth/2,
													availHeight/5,
													1.3,
													(this.state.weather.data.temp+'°C').length
												)
											}}
										>
											{this.state.weather.data.temp}°C
										</Text>
										<Text                                           //Вывод минимальной и максимальной температуры
											numberOfLines={1}
											style={{
												color:'white',
												fontFamily:'Roboto-Light',
												fontSize:14
											}}
										>
											Min: {this.state.weather.data.temp_min}°C, Max: {this.state.weather.data.temp_max}°C
										</Text>
									</View>
									
									<View style={styles.weatherIcon}>
										<View style={styles.iconCircle}>
											<Image                                            //Вывод большой иконки для отображения погоды в настоящее время
												style={{
													width: availHeight/6, 
													height: availHeight/6,
												}}
												source={super.requireIcon(this.state.weather.weatherDescription.icon)} 
											/>	
										</View>
									</View>

								</View>

								<View style={styles.humidityInfo}>
									<Text                                           //Влажность
										numberOfLines={1}
										style={{
											fontFamily:'Roboto-LightItalic',
											fontSize:this.responsFS(
												availWidth,
												availHeight/14,
												1.2,
												('Humidity: '+this.state.weather.data.humidity+'%.').length
											)
										}}
									>
									Humidity: {this.state.weather.data.humidity}%.
									</Text>
								</View>
								
								<View style={styles.pressureInfo}>
									<Text                                           //Давление
										numberOfLines={1}
										style={{
											fontFamily:'Roboto-Light',
											fontSize:this.responsFS(
												availWidth,
												availHeight/14,
												1.2,
												('Pressure: '+this.state.weather.data.humidity+' hpa.').length
											)
										}}
									>
									Pressure: {this.state.weather.data.pressure} hpa.
									</Text>
								</View>

							</View>
							
							<View style={styles.weatherButtonContainer}>
								<View style={styles.weatherImage}>
									<Image
										style={{
											width: '100%', 
											height: '100%',
											resizeMode: 'cover'
										}}
										source={require('./images/grass.jpg')} 
									/>
								</View>
								<View style={styles.weatherButton}>
									<Button                                           //Кнопка для перехода в AdvancedForecast
										containerViewStyle={{
											marginLeft: 0,
											width: '100%',
										}}
										buttonStyle={{
											height: '100%',
											backgroundColor: '#5cb85c',
										}}
										title='Advanced Weather Forecast'
										onPress = {() => {
											this.props.navigation.replace('AdvancedForecast')
										}}
									/>
								</View>
							</View>
							
							<View style={styles.locationButtonContainer}>
								<View style={styles.locationImage}>
									<Image
										style={{
											width: '100%', 
											height: '100%',
											resizeMode: 'cover'
										}}
										source={require('./images/world_map.png')} 
									/>
								</View>
								<View style={styles.locationButton}>
									<Button                                           //Кнопка для перехода в Location
										containerViewStyle={{
											marginLeft: 0,
											width: '100%',
										}}
										buttonStyle={{
											height: '100%',
											backgroundColor: '#428bca',
										}}
										title='Location'
										onPress = {() => {
											this.props.navigation.replace('Location')
										}}
									/>
								</View>
							</View>

						</View>

					</View>
				
				</Sidebar>
			);
		}
	}
}
