import React, {Component} from 'react';
import {
	StyleSheet, 
	Text, 
	View, 
	TouchableOpacity,
	TextInput,
	AsyncStorage,
	YellowBox, 
	Platform,
	Alert
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {
	Marker,
	Animated,
	PROVIDER_GOOGLE 
} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

const styles = require('./style/Styles');
const windowSize = require('Dimensions').get('window');
const deviceWidth = windowSize.width;
const deviceHeight = windowSize.height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class Location extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
		isLoading:true,
		};
	}

	/*
		Инициализируем state с данными о локации
	*/

	async stateInit(){
		const newValue = await AsyncStorage.getItem('locationData');
		console.log('Before getItemValue setState: ',newValue);
		const parsedValue = JSON.parse(newValue);
		console.log(parsedValue);
		
		this.setState(parsedValue,function(){
			this.cancelLoadingScreen();
			console.log(this.state);
		});
	}

	cancelLoadingScreen(){
		this.setState({
			isLoading:false,
		});
	}

	componentWillMount(){
		this.stateInit();
	}

	/*
		Синхронизируем данные
	*/

	passDataToStorage(){
		return new Promise(async (resolve) =>{
			const setItemValue = await AsyncStorage.setItem('locationData', JSON.stringify(this.state));
			resolve(true);
		});
	}

	async passLocationData(){
		let passdata = await this.passDataToStorage();
		this.props.navigation.replace('Forecast');
	}

	onRegionChange(region){
		this.setState({region});
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

	getLocationInfoFromCoords = (latitude,longitude) =>{
		Geocoder.geocodePosition({
			lat: latitude,
			lng: longitude
		}).then(res =>{
			this.setState({
				chosenLocationName:res[0].locality!==null?res[0].locality:res[0].adminArea,
				chosenLocationDescription:res[0].locality!==null?
				res[0].locality+', '+res[0].adminArea+', '+res[0].country:
				res[0].adminArea+', '+res[0].country,
				marker:{
					title:'Current Position',
					coordinate:{
						latitude: latitude,
						longitude: longitude
					}
				}
			},
			function(){
				this.googleAutoCompleteInput.setAddressText(this.state.chosenLocationDescription);
				this.map.animateToCoordinate(
					this.state.marker.coordinate
				, 1000);
			});	
		}).catch(err => console.log(err))
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
				<View style={[styles.screenContainer,styles.locationContainer]}>
					<MapView
						region={this.state.region}
						provider={PROVIDER_GOOGLE}
						cacheEnabled={false}
						onRegionChangeComplete = {this.onRegionChange.bind(this)}
						ref={ref => {this.map = ref}}
						onPress = {this.omMapPress.bind(this)}
						style = {styles.map}
					>
						<Marker
						coordinate={this.state.marker.coordinate}
						title={this.state.marker.title}
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
							this.setState({
								chosenLocationDescription:data.description,
								chosenLocationName:data.structured_formatting.main_text,
								region:{
									latitude: details.geometry.location.lat,
									longitude: details.geometry.location.lng,
									latitudeDelta: LATITUDE_DELTA,
									longitudeDelta: LONGITUDE_DELTA,
								}
							},
							this.setState({
								marker:{
									title:'Current Position',
									coordinate:{
										latitude: details.geometry.location.lat,
										longitude: details.geometry.location.lng
									}
								}
							}));
						}}

						ref={(instance) => {this.googleAutoCompleteInput = instance}}
						getDefaultValue={() => this.state.chosenLocationDescription}
						
						styles = {{
							container:{
								position: 'absolute',
								top: 0
							},

							row: {
								padding: 13,
								height: 44,
								flexDirection: 'row',
								backgroundColor: '#f9f9f9',
							},

							textInputContainer: {
								backgroundColor: '#C9C9CE',
								width: deviceWidth,
								height: 44,
								borderTopColor: '#7e7e7e',
								borderBottomColor: '#b5b5b5',
								flexDirection: 'row',
							},

							textInput: {
								backgroundColor: '#FFFFFF',
								height: 28,
								borderRadius: 5,
								paddingTop: 4.5,
								paddingBottom: 4.5,
								paddingLeft: 10,
								paddingRight: 10,
								marginTop: 7.5,
								marginLeft: 8,
								marginRight: 8,
								fontSize: 15,
								flex: 1
							},

							poweredContainer: {
								justifyContent: 'flex-end',
								alignItems: 'center',
								backgroundColor: '#428bca',
							},

							separator: {
								height: StyleSheet.hairlineWidth,
								backgroundColor: '#f9f9f9',
							},
						}}
						
						query={{
							key: 'AIzaSyB_foslumkD_hhIhcC79cBI2m6CT223H9k',
							language: 'en', // language of the results
							types: '(cities)' // default: 'geocode'
						}}
						
						nearbyPlacesAPI='None' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
					/>
					<TouchableOpacity
						style = {styles.buttonLocationMap}
						onPress = {() =>{this.passLocationData()}}
					>
						<Text style={[styles.textFont,styles.textColor]}>Tap to Pass Location</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
}