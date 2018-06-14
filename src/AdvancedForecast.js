import React from 'react';
import {
	StyleSheet, 
	Text, 
	View, 
	ScrollView,
	TouchableOpacity,
	AsyncStorage,
	YellowBox,
	Image,
	Alert
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Button} from 'react-native-elements'
import Sidebar from 'react-native-sidebar';
import StorageComponent from './StorageComponent'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

const styles = require('./style/Styles');
const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
	AccessToken
} = FBSDK;

const windowSize = require('Dimensions').get('window');
const availWidth = windowSize.width-20-20;
const availHeight = windowSize.height-20-20;

const WEATHER_API_KEY = '574020de38f6a61ef87e0d8489c58ee0';
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class AdvancedForecast extends StorageComponent{
	constructor(props) {
		super(props);

		this.state = {
			location:{},
			weather:[],
			dayIndex:0,
			
			fetchSuccess:false,
			isLoading:true,
		};
	}

	componentWillMount(){
		this.dataInit();
	}

	async dataInit(){
		try{
			let state_init = await this.stateInit();
			console.log('State Init: ',state_init);

			let weather_data = await this.getAdvancedWeatherData();
			console.log('Current Weather Data: ',weather_data);

			let facebook_info = await this.getFacebookData();
			console.log('Facebook Info: ',facebook_info);

			this.cancelLoadingScreen();
		}catch(error){
			Alert.alert(error.message);
		}
	}

	stateInit(){
		return new Promise(async (resolve) =>{
			let locationData = await super.stateInit();
			this.setState({location:locationData});
			resolve(true);
		});
	}

	/*
		Делаем запрос на получение данных о погоде по дням и по часам, записываем данные в виде массива в стейт
	*/

	getAdvancedWeatherData(){
		return new Promise(async (resolve,reject) =>{
			try{
				let response = await fetch(
					'http://api.openweathermap.org/data/2.5/forecast?lat='+this.state.location.region.latitude+
					'&lon='+this.state.location.region.longitude+
					'&APPID='+WEATHER_API_KEY+
					'&units=metric'
				);

				let responseJson = await response.json();
				console.log(responseJson);

				let dayWeatherData = {};
				let previousDayValue = 0;
				
				responseJson.list.map((data,i) =>{                                   //Прорабатываем каждый час полученные при запросе в буферной переменной чтобы потом закинуть ее в масив погоды по числам
					let fulldate = new Date(data.dt*1000);
					let locale = 'en-us';

					let hour = fulldate.getHours();
					let date = fulldate.getDate();
					let day = dayNames[fulldate.getDay()];
					let month = monthNames[fulldate.getMonth()];
					let year = fulldate.getFullYear();

					if((i>0 && day!==previousDayValue)||(i==(data.cnt-1))){
						this.setState(prevstate =>({
							weather:[
								...prevstate.weather,
								dayWeatherData,
							]
						}));
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
				
				console.log(this.state);
				let setItemValue = await AsyncStorage.setItem('advancedWeatherData', JSON.stringify(this.state.weather));
				
				this.setState({
					fetchSuccess:true,
				});
				resolve(true);
			
			}
			catch(error){
				if(error.message=='Network request failed'){
					let newValue = await AsyncStorage.getItem('advancedWeatherData');
					let parsedValue = JSON.parse(newValue);
					console.log(parsedValue);

					for(let i=0; i<5;i++){
						if(parsedValue[i]!==undefined){
							this.setState(prevstate=>({
								weather:[
									...prevstate.weather,
									parsedValue[i],
								]
							}));
						}
					}

					this.setState({
						fetchSuccess:true,
					});
					resolve(true);
				}
				reject(error);
			}
		});
	}

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

	cancelLoadingScreen(){
		this.setState({
			isLoading:false,
		});
	}

	changeHourlyData(i){                                   //Сменить число для которого будет почасово отображатся погода в нижнем скролле
		return(() =>{
			this.setState({
				dayIndex:i,
			});
			console.log('pressed')
		});
	}

	/*
		Вывод данных о погоде по дням
	*/

	processWeatherData(){                                   //Вывод погоды по дням в верхнем скролле
		let temp_min = 0;
		let temp_max = 0;

		return this.state.weather.map((date,i) =>{
			temp_min = 1000;
			temp_max = -1000;

			for(let j=0; j<=21; j+=3){
				if(date.curDayData[j]!==undefined){
					if(temp_min>date.curDayData[j].weatherData.temp_min) 
						temp_min = date.curDayData[j].weatherData.temp_min;
					if(temp_max<date.curDayData[j].weatherData.temp_max) 
						temp_max = date.curDayData[j].weatherData.temp_max;
				}
			}

			return(
				<View key={i} style={i%2==0?[styles.dayScrollViewComponent,styles.evenListItem]:styles.dayScrollViewComponent}>
					<TouchableOpacity
						style={[{flex:1},styles.centered]}
						onPress={this.changeHourlyData(i)}
					>
						<View style={styles.centered}>
							<Text style={styles.textFont}>{date.curDayData.day}</Text>
							<Text style={styles.textFont}>{date.curDayData.date}</Text>
							<Text style={styles.textFont}>{date.curDayData.month}</Text>
							<Text style={styles.textFont}>{date.curDayData.year}</Text>
							<Text style={styles.textFont}>Min - {temp_min}°C</Text>
							<Text style={styles.textFont}>Max - {temp_max}°C</Text>
						</View>
					</TouchableOpacity>
				</View>
			);
		});
	}

	/*
		Вывод данных о погоде по часам
	*/

	getHourlyWeather(){ 
		console.log('getHourlyWeather');
		
		if(this.state.fetchSuccess){
			let hourWeatherComponents =[];

			for(let j=0; j<=21; j+=3){
				if(this.state.weather[this.state.dayIndex].curDayData[j]!==undefined){
					hourWeatherComponents.push(
						<View 
							key={j} 
							style={j%2==0?[styles.hourScrollViewComponent,styles.centered,styles.evenListItem]:[styles.hourScrollViewComponent,styles.centered]}
						>
							<Text style={styles.textFont}>{this.state.weather[this.state.dayIndex].curDayData[j].hour}:00</Text>
							<Text style={styles.textFont}>{this.state.weather[this.state.dayIndex].curDayData[j].weatherData.temp}°C</Text>
							<View style={{flexDirection: 'row' }}>
								<Text style={styles.textFont}>
								{this.state.weather[this.state.dayIndex].curDayData[j].weatherDescription.main}, 
								{this.state.weather[this.state.dayIndex].curDayData[j].weatherDescription.description}, 
								</Text>
								<Image 
									style={{
										width: availHeight/25, 
										height: availHeight/25,
									}}
									source={super.requireImage(this.state.weather[this.state.dayIndex].curDayData[j].weatherDescription.icon)} 
								/>
							</View>
							<Text style={styles.textFont}>Humidity - {this.state.weather[this.state.dayIndex].curDayData[j].weatherData.humidity}%</Text>
							<Text style={styles.textFont}>Pressure - {this.state.weather[this.state.dayIndex].curDayData[j].weatherData.pressure} hpa.</Text>
						</View>
					);
				}
			}

			return hourWeatherComponents;
		}
	}

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
					<View style = {styles.screenContainer}>
						
						<View style={styles.componentContainer}>
							
							<View style={styles.dayContainer}>
								
								<View style={styles.dayHeader}>
									<Text
										numberOfLines={1}
										style={{
											fontFamily:'Roboto-LightItalic',
											fontSize:availHeight/20,
											color:"#ffffff",
										}}
									>
									Daily Forecast
									</Text>
								</View>
								<ScrollView
									style={styles.dayList}
									horizontal={true}
									showsVerticalScrollIndicator={true}
								>
									{this.processWeatherData()}
								</ScrollView>

							</View>

							<View style={styles.hourContainer}>
								
								<View style={styles.hourHeader}>
									<Text
										numberOfLines={1}
										style={{
											fontFamily:'Roboto-LightItalic',
											fontSize:availHeight/20,
											color:"#ffffff",
										}}
									>
									Hourly Forecast
									</Text>
								</View>

								<ScrollView
									style={styles.hourList}
								>
									{this.getHourlyWeather()}
								</ScrollView>

							</View>

							<View style={styles.backToForecast}>
								<Button
									containerViewStyle={{
										marginLeft: 0,
										width: '100%',
									}}
									buttonStyle={{
										height: '100%',
										backgroundColor: '#428bca',
									}}
									title='Go back to Forecast Page'
									onPress = {() => {
										this.props.navigation.replace('Forecast');
									}}
								/>
							</View>

						</View>
					
					</View>

				</Sidebar>
			);
		}
	}
}