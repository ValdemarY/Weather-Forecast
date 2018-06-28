import React, {Component} from 'react';
import {
	Text, 
	View, 
	TouchableOpacity,
	YellowBox, 
	Platform,
	Alert,
	NetInfo
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {
	Marker,
	Animated,
	PROVIDER_GOOGLE 
} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Drawer from 'react-native-drawer';
import SideBar from './components/SideBar';
import LoadingScreen from './components/LoadingComponent';
import ErrorScreen from './components/ErrorComponent';
import {itemIsLoading} from './actions/actionTransmitter';
import {markerChange, googleTextInputChange, passLocationDataToStorage} from './actions/locationActions';
import {weatherQueryManager} from './actions/action';
import styles from './style/LocationStylesheet';
import errorStyles from './style/ErrorStylesheet';
import {APP_WIDTH,APP_HEIGHT,LATITUDE_DELTA,LONGITUDE_DELTA} from './constants/constant';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
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

itemIsLoading: (bool) => {
	dispatch(itemIsLoading(bool))
}

markerChange: (latitude,longitude,res) => {
	dispatch(markerChange(latitude,longitude,res));
}

googleTextInputChange: (data,details) =>{
	dispatch(googleTextInputChange(data,details));
}

passLocationDataToStorage:(data) =>{
	dispatch(passLocationDataToStorage(data));
}

weatherQueryManager: (location) => {
	dispatch(forecastQueryManager(location))
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({markerChange, googleTextInputChange, passLocationDataToStorage, weatherQueryManager, itemIsLoading}, dispatch);
};

class Location extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			networkStatus:true,
		};
	}

	componentWillMount(){
		console.log('LOCATION_MOUNT!');
		this.checkConnection();
		this.props.itemIsLoading(false);
	}

	componentWillUnmount(){
		NetInfo.isConnected.removeEventListener(
			'connectionChange',
			this._connectionHandler
		);
	}

	checkConnection(){
		return new Promise((resolve) =>{
			NetInfo.isConnected.fetch()
			.then(status =>{
				this.setState({networkStatus:status});
				console.log('Network Status1: ',this.state.networkStatus);
				
				NetInfo.isConnected.addEventListener(
					'connectionChange',
					this._connectionHandler
				);
				resolve(true);
			})
		});
	}

	_connectionHandler = (isConnected) =>{
		this.setState({networkStatus:isConnected});
		console.log('Network Status2: ',this.state.networkStatus);
	}

	omMapPress(e){
		const latitude = e.nativeEvent.coordinate.latitude;
		const longitude = e.nativeEvent.coordinate.longitude;
		console.log(latitude,longitude);
		this.getLocationInfoFromCoords(latitude,longitude);
	}

	/*
		Достаем информацию о координате, после ее определения после нажатия на карте
	*/

	getLocationInfoFromCoords(latitude,longitude){
		Geocoder.geocodePosition({
			lat: latitude,
			lng: longitude
		})
		.then(res =>{
			this.props.markerChange(latitude,longitude,res);
			
			this.googleAutoCompleteInput.setAddressText(this.props.location.chosenLocationDescription);
			this.map.animateToCoordinate(
				this.props.location.marker.coordinate
			,1000);
		})
		.catch(err => console.log(err.message))
	}

	renderMainContent(){
		console.log('LOCATION PROPS: ',this.props); 

		if(this.props.error){
			return(<ErrorScreen error={this.props.error}/>);
		}
		else if(this.props.isLoading){
			return(<LoadingScreen/>);
		}
		else if(!this.state.networkStatus){                                   //Вывод экрана при не наличии интернет подключения
			return(
				<View style={errorStyles.connectionErrorContainer}>
					<View style={errorStyles.connectionErrorView}>
						<Text style={errorStyles.errorText}>Please, resolve your internet connection to properly work with location!</Text>
						<TouchableOpacity
							style={errorStyles.errorButton}
							onPress = {() => {
								this.props.navigation.navigate('Forecast');
							}}
						>
							<Text style={errorStyles.errorText}>Go back to Forecast Page!</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		}
		else{
			return(
				<View style={[styles.screenContainer,styles.locationContainer]}>
					<MapView
						region={this.props.location.region}
						provider={PROVIDER_GOOGLE}
						cacheEnabled={false}
						ref={ref => {this.map = ref}}
						onPress = {this.omMapPress.bind(this)}
						style = {styles.map}
					>
						<Marker
							coordinate={this.props.location.marker.coordinate}
							title={this.props.location.marker.title}
						/>
					</MapView>
					<GooglePlacesAutocomplete
						placeholder='Search'
						minLength={2} // minimum length of text to search
						autoFocus={false}
						returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
						listViewDisplayed='auto'    // true/false/undefined
						fetchDetails={true}
						renderDescription={row => row.description} // custom description render
						onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
							this.props.googleTextInputChange(data, details);
						}}

						ref={(instance) => {this.googleAutoCompleteInput = instance}}
						getDefaultValue={() => this.props.location.chosenLocationDescription}
						
						styles = {{
							container:styles.container,
							row:styles.row,
							textInput:styles.textInput,
							textInputContainer:styles.textInputContainer,
							poweredContainer:styles.poweredContainer,
							separator:styles.separator,
						}}
						
						query={{
							key: 'AIzaSyB_foslumkD_hhIhcC79cBI2m6CT223H9k',
							language: 'en', // language of the results
							types: '(cities)' // default: 'geocode'
						}}
						
						nearbyPlacesAPI='None' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
					/>
					<TouchableOpacity
						style={styles.buttonLocationToForecast}
						onPress = {() => {
							this.props.passLocationDataToStorage(this.props.location)
							.then(
								this.props.weatherQueryManager(this.props.location),
								this.props.navigation.navigate('Forecast')
							)
						}}
					>
						<Text style={styles.textLocationToForecast}>Pass Location</Text>
					</TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Location);
