import React from 'react';
import {
	ActivityIndicator,
	Text, 
	View, 
	TouchableOpacity,
	YellowBox,
	Image,
	Alert,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Drawer from 'react-native-drawer';

import SideBar from './components/SideBar';
import LoadingScreen from './components/LoadingComponent';
import ErrorScreen from './components/ErrorComponent';
import ResponsiveText from './components/responsiveText';
import {itemIsLoading} from './actions/actionTransmitter';
import {forecastQueryManager} from './actions/action';
import {requireImage, requireColor, requireIcon} from './functions/iconManager';
import styles from './style/ForecastStylesheet';
import * as textConstants from './constants/responsiveConstForecast';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
YellowBox.ignoreWarnings(['Remote debugger is in a background tab which may cause apps to perform slowly.']);

const mapStateToProps = (state) => {
    return {
		isLoading:state.isLoading,
		isLoggedIn:state.isLoggedIn,
		user:state.user,
		location:state.location,
		weather:state.weather,
		error:state.error
    };
};

forecastQueryManager: () => {
	dispatch(forecastQueryManager())
}

itemIsLoading: (bool) => {
	dispatch(itemIsLoading(bool))
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({forecastQueryManager, itemIsLoading}, dispatch);
};

class Forecast extends React.Component{

	componentWillMount(){
		console.log('FORECAST_MOUNT!');
		this.props.forecastQueryManager();
	}

	renderMainContent(){
		console.log('FORECAST PROPS: ',this.props);
		if(this.props.error){
			return(<ErrorScreen error={this.props.error}/>);
		}
		else if(this.props.isLoading){
			return(<LoadingScreen/>);
		}
		else{
			return(
				<View style={styles.screenContainer}>
					<View style={styles.componentContainer}>
						<View style={[styles.weatherContainer,{backgroundColor: requireColor(this.props.weather.weatherDescription.icon)}]}>
							<View style={styles.cityName}>
								<ResponsiveText
									height={textConstants.LOCATION_NAME_FONT_SIZE}
									text={this.props.location.chosenLocationDescription}
									color={'white'}
								/>
							</View>
							<View style={styles.weatherStatus}>
								<ResponsiveText
									height={textConstants.BASIC_FONT_SIZE}
									text={this.props.weather.weatherDescription.main+', '+this.props.weather.weatherDescription.description}
									color={'white'}
								/>
							</View>
							<View style={styles.weatherInfo}>

								<View style={styles.temperatureAndWeatherGraphics}>
									<View style={styles.temperature}>
										<Image
											style={styles.temperatureIcon}
											source={require('./images/thermometer.png')} 
										/>
										<ResponsiveText
											width={textConstants.FORECAST_CONTAINER_WIDTH}
											height={textConstants.FORECAST_TEMPERATURE_FONT_SIZE}
											color={'white'}
											text={this.props.weather.data.temp+'°C'}
										/>
									</View>
									<View style={styles.weatherGraphics}>
										<View style={styles.weatherGraphics}>
											<View style={styles.weatherGraphicsContainer}>
												<Image                                            //Вывод большой иконки для отображения погоды в настоящее время
													style={styles.weatherGraphicsIcon}
													source={requireIcon(this.props.weather.weatherDescription.icon)} 
												/>	
											</View>
										</View>
									</View>
								</View>
								<View style={styles.otherWeatherInfo}>
									<View style={styles.otherWeatherInfoContainer}>
										<View style={styles.leftWeatherInfo}>
											<Image
												style={[styles.otherWeatherInfoIcon,styles.leftIcon]}
												source={require('./images/freezing.png')} 
											/>
											<ResponsiveText
												width={textConstants.FORECAST_CONTAINER_WIDTH}
												height={textConstants.FORECAST_INFO_CONTAINER_HEIGHT}
												color={'white'}
												text={this.props.weather.data.temp_min+'°C'}
											/>
										</View>
										<View style={styles.rightWeatherInfo}>
											<ResponsiveText
												width={textConstants.FORECAST_CONTAINER_WIDTH}
												height={textConstants.FORECAST_INFO_CONTAINER_HEIGHT}
												color={'white'}
												text={this.props.weather.data.humidity+'%'}
											/>
											<Image
												style={[styles.otherWeatherInfoIcon,styles.rightIcon]}
												source={require('./images/humidity.png')} 
											/>
										</View>
									</View>
									<View style={styles.otherWeatherInfoContainer}>
										<View style={styles.leftWeatherInfo}>
											<Image
												style={[styles.otherWeatherInfoIcon,styles.leftIcon]}
												source={require('./images/temperature.png')} 
											/>
											<ResponsiveText
												width={textConstants.FORECAST_CONTAINER_WIDTH}
												height={textConstants.FORECAST_INFO_CONTAINER_HEIGHT}
												color={'white'}
												text={this.props.weather.data.temp_max+'°C'}
											/>
										</View>
										<View style={styles.rightWeatherInfo}>
											<ResponsiveText
												width={textConstants.FORECAST_CONTAINER_WIDTH}
												height={textConstants.FORECAST_INFO_CONTAINER_HEIGHT}
												color={'white'}
												text={this.props.weather.data.pressure+' hpa'}
											/>
											<Image
												style={[styles.otherWeatherInfoIcon,styles.rightIcon]}
												source={require('./images/barometer.png')} 
											/>
										</View>
									</View>
								</View>
							</View>		
						</View>
						
						<View style={styles.weatherButtonContainer}>
							<View style={styles.weatherImage}>
								<Image
									style={styles.image}
									source={require('./images/grass.jpg')} 
								/>
							</View>
							<TouchableOpacity
								style={styles.weatherButton}
								onPress = {() => {
									this.props.itemIsLoading(true);
									this.props.navigation.navigate('AdvancedForecast');
								}}
							>
								<ResponsiveText
									fontSize={textConstants.BASIC_FONT_SIZE}
									color={'white'}
									text={'Get Weather Forecast'}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.locationButtonContainer}>
							<View style={styles.locationImage}>
								<Image
									style={styles.image}
									source={require('./images/world_map.png')} 
								/>
							</View>
							<TouchableOpacity
								style={styles.locationButton}
								onPress = {() => {
									this.props.navigation.navigate('Location',{weatherUpdate:this.weatherUpdate})
								}}
							>
								<ResponsiveText
									fontSize={textConstants.BASIC_FONT_SIZE}
									color={'white'}
									text={'Get Location'}
								/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);