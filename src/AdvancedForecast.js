import React from 'react';
import { 
	Text, 
	View, 
	ScrollView,
	TouchableOpacity,
	YellowBox,
	Image,
	Alert
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Drawer from 'react-native-drawer';

import SideBar from './components/SideBar';
import LoadingScreen from './components/LoadingComponent';
import ErrorScreen from './components/ErrorComponent';
import {itemIsLoading} from './actions/actionTransmitter';
import {advancedQueryManager} from './actions/action';
import {requireImage} from './functions/iconManager';
import styles from './style/AdvancedStylesheet';
import {APP_WIDTH, APP_HEIGHT, WEATHER_API_KEY, MONTH_NAMES, DAY_NAMES} from './constants/constant';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

const mapStateToProps = (state) => {
    return {
		isLoading:state.isLoading,
		isLoggedIn:state.isLoggedIn,
		user:state.user,
		location:state.location,
		advanced_weather:state.advanced_weather,
		error:state.error
    };
};

advancedQueryManager: (location) => {
	dispatch(advancedQueryManager(location))
}

itemIsLoading: (bool) => {
	dispatch(itemIsLoading(bool))
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({advancedQueryManager, itemIsLoading}, dispatch);
};

class AdvancedForecast extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			dayIndex:0,
		};
	}

	componentWillMount(){
		console.log('ADVANCED_MOUNT!');
		console.log(this.props.location);
		this.props.advancedQueryManager(this.props.location);
	}

	changeHourlyData(i){                                   //Сменить число для которого будет почасово отображатся погода в нижнем скролле
		return(() =>{
			this.setState({
				dayIndex:i,
			});
			console.log('pressed')
		});
	}

	processWeatherData(){                                   //Вывод погоды по дням в верхнем скролле
		let temp_min = 0;
		let temp_max = 0;

		return this.props.advanced_weather.map((date,i) =>{
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
				<View 
					key={i} 
					style={i%2==0?[styles.dayScrollViewComponent,styles.evenListItem]:styles.dayScrollViewComponent}
				>
					<TouchableOpacity
						style={styles.dayTouchable}
						onPress={this.changeHourlyData(i)}
					>
						<View style={styles.centered}>
							<Text style={styles.textFont}>{date.curDayData.day}</Text>
							<Text style={styles.textFont}>{date.curDayData.date}</Text>
							<Text style={styles.textFont}>{date.curDayData.month}</Text>
							<Text style={[styles.textFont, styles.marginBetweenBlocks]}>{date.curDayData.year}</Text>
							<Text style={[styles.textFont, styles.minTemp]}>Min Temp</Text>
							<Text style={[styles.textFont, styles.marginBetweenBlocks, styles.minTemp]}>{temp_min}°C</Text>
							<Text style={[styles.textFont, styles.maxTemp]}>Max Temp</Text>
							<Text style={[styles.textFont, styles.maxTemp]}>{temp_max}°C</Text>
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
		let hourWeatherComponents =[];

		for(let j=0; j<=21; j+=3){
			if(this.props.advanced_weather[this.state.dayIndex].curDayData[j]!==undefined){
				hourWeatherComponents.push(
					<View 
						key={j} 
						style={j%2==0?[styles.hourScrollViewComponent,styles.centered,styles.evenListItem]:[styles.hourScrollViewComponent,styles.centered]}
					>
						<Text style={styles.textFont}>{this.props.advanced_weather[this.state.dayIndex].curDayData[j].hour}:00</Text>
						<Image 
							style={styles.weatherIcon}
							source={requireImage(this.props.advanced_weather[this.state.dayIndex].curDayData[j].weatherDescription.icon)} 
						/>
						<Text style={styles.textFont}>{this.props.advanced_weather[this.state.dayIndex].curDayData[j].weatherData.temp}°C</Text>
						<Text style={styles.textFont}>
							{this.props.advanced_weather[this.state.dayIndex].curDayData[j].weatherDescription.main}, {this.props.advanced_weather[this.state.dayIndex].curDayData[j].weatherDescription.description} 
						</Text>
						<Text style={styles.textFont}>Humidity - {this.props.advanced_weather[this.state.dayIndex].curDayData[j].weatherData.humidity}%</Text>
						<Text style={styles.textFont}>Pressure - {this.props.advanced_weather[this.state.dayIndex].curDayData[j].weatherData.pressure} hpa.</Text>
					</View>
				);
			}
		}

		return hourWeatherComponents;
	}

	renderMainContent(){
		console.log('ADVANCED FORECAST PROPS: ',this.props);

		if(this.props.error){
			return(<ErrorScreen error={this.props.error}/>);
		}
		else if(this.props.isLoading){
			return(<LoadingScreen/>);
		}
		else{
			return(
				<View style = {styles.screenContainer}>
					<View style={styles.componentContainer}>
						<View style={styles.dayContainer}>
							<View style={styles.dayHeader}>
								<Text style={styles.dayHeaderText}>Daily Forecast</Text>
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
								<Text style={styles.hourHeaderText}>Hourly Forecast</Text>
							</View>
							<ScrollView
								style={styles.hourList}
								showsHorizontalScrollIndicator={true}
							>
								{this.getHourlyWeather()}
							</ScrollView>
						</View>
						<View style={styles.backToForecast}>
							<TouchableOpacity
								style={styles.backToForecastButton}
								onPress = {() => {
									this.props.navigation.navigate('Forecast');
								}}
							>
								<Text style={styles.backToForecastButtonText}>Go back to Forecast Page</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			);
		}
	}

	render(){
		return(
			<Drawer
				type="overlay"
				captureGestures={false}
				panOpenMask={0.25}
				panCloseMask={0.75}
				openDrawerOffset={0.25}
				disabled={this.props.isLoading}
				content={<SideBar user={this.props.user} navigation={this.props.navigation}/>}
			>
				{this.renderMainContent()}
			</Drawer>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedForecast);