import React from 'react';
import {
	StyleSheet, 
	Text, 
	View, 
	ScrollView,
	TouchableOpacity,
	AsyncStorage,
	YellowBox,
	Image
} from 'react-native';
import {StackNavigator} from 'react-navigation';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

const styles = require('./style/Styles');
const windowSize = require('Dimensions').get('window');
const deviceWidth = windowSize.width;
const deviceHeight = windowSize.height;
const WEATHER_API_KEY = '574020de38f6a61ef87e0d8489c58ee0';

export default class AdvancedForecast extends React.Component{
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

	cancelLoadingScreen(){
		this.setState({
			isLoading:false,
		});
	}

	stateInit(){
		return new Promise(async (resolve) =>{
			const newValue = await AsyncStorage.getItem('locationData');
			const parsedValue = JSON.parse(newValue);
			
			this.setState({
				location:parsedValue,
			});

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
				
				responseJson.list.map((data,i) =>{
					let fulldate = new Date(data.dt*1000);
					let locale = 'en-us';

					let year = fulldate.getFullYear();
					let month = fulldate.toLocaleString(locale, { month: "long" });
					let day = fulldate.getDate();
					let hour = fulldate.getHours();

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
			
			}catch(error){
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
				reject(error.message);
			}
		});
	}

	async dataInit(){
		try{
			let state_init = await this.stateInit();
			console.log('State Init: ',state_init);

			let weather_data = await this.getAdvancedWeatherData();
			console.log('Current Weather Data: ',weather_data);

			this.cancelLoadingScreen();
		}catch(error){
			console.log(error);
			this.cancelLoadingScreen();
		}
	}

	changeHourlyData(i){
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

	processWeatherData(){
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
				<View key={i} style={styles.dayScrollViewComponent}>
					<TouchableOpacity
						style={[{flex:1},styles.centered]}
						onPress={this.changeHourlyData(i)}
					>
						<View style={styles.centered}>
							<Text style={styles.textFont}>{date.curDayData.day}</Text>
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
						<View key={j} style={[styles.hourScrollViewComponent,styles.centered]}>
							<Text style={styles.textFont}>{this.state.weather[this.state.dayIndex].curDayData[j].hour}:00</Text>
							<Text style={styles.textFont}>{this.state.weather[this.state.dayIndex].curDayData[j].weatherData.temp}°C</Text>
							<Text style={styles.textFont}>{this.state.weather[this.state.dayIndex].curDayData[j].weatherDescription.main}, {this.state.weather[this.state.dayIndex].curDayData[j].weatherDescription.description}</Text>
							<Text style={styles.textFont}>Humidity - {this.state.weather[this.state.dayIndex].curDayData[j].weatherData.humidity}%</Text>
							<Text style={styles.textFont}>Pressure - {this.state.weather[this.state.dayIndex].curDayData[j].weatherData.pressure} hpa.</Text>
						</View>
					);
				}
			}

			return hourWeatherComponents;
		}
	}

	componentWillMount(){
		this.dataInit();
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
				<View style = {styles.screenContainer}>
					<View style={styles.componentContainer}>
						<View style={[styles.advancedForecastText,styles.centered]}>
							<Text style={styles.textFont}>Daily Weather Forecast</Text>
						</View>
						
						<View style = {styles.dayContainer}>
							<ScrollView
								horizontal={true}
								showsVerticalScrollIndicator={true}
							>
								{this.processWeatherData()}
							</ScrollView>
						</View>

						<View style={[styles.advancedForecastText,styles.centered]}>
							<Text style={styles.textFont}>Hourly Weather Forecast</Text>
						</View>
						
						<View style = {styles.hourContainer}>
							<ScrollView>
								{this.getHourlyWeather()}
							</ScrollView>
						</View>
						
						<View>
							<TouchableOpacity
								style = {[styles.button,styles.centered]}
								onPress = {() => {
									this.props.navigation.replace('Forecast')
								}}
							>
								<Text style={styles.textFont}>Go back to The Main Screen</Text>
							</TouchableOpacity>
						</View>

					</View>
				</View>
			);
		}
	}
}