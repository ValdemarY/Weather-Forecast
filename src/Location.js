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
import {Button} from 'react-native-elements'
import Sidebar from 'react-native-sidebar';
import StorageComponent from './StorageComponent'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Remote debugger is in a background tab which may cause apps to perform slowly.']);

const styles = require('./style/Styles');
const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
	AccessToken
} = FBSDK;

const windowSize = require('Dimensions').get('window');
const availWidth = windowSize.width-20-20;
const availHeight = windowSize.height-20-20;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class Location extends StorageComponent{
	constructor(props) {
		super(props);

		this.state = {
			networkStatus:true,
			isLoading:true,
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

	async dataInit(){
		try{
			let state_init = await this.stateInit();
			console.log('State Init: ',state_init);

			let facebook_info = await this.getFacebookData();
			console.log('Facebook Info: ',facebook_info);

			let connection = await this.checkConnection();
			console.log('checkConnection: ',connection);

			this.cancelLoadingScreen();
		}catch(error){
			Alert.alert('Error has happened: '+error.message);
		}
	}

	stateInit(){
		return new Promise(async (resolve) =>{
			let locationData = await super.stateInit();
			this.setState(locationData);
			
			resolve(true);
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


	checkConnection(){
		return new Promise(async (resolve) =>{
			let status = await NetInfo.isConnected.fetch();
			this.setState({networkStatus:status});
			console.log('Network Status1: ',this.state.networkStatus);
			
			NetInfo.isConnected.addEventListener(
				'connectionChange',
				this._connectionHandler
			);
			
			resolve(true);
		});
	}

	_connectionHandler = (isConnected) =>{
		this.setState({networkStatus:isConnected});
		console.log('Network Status2: ',this.state.networkStatus);
	}

	/*
		Инициализируем state с данными о локации
	*/


	cancelLoadingScreen(){
		this.setState({
			isLoading:false,
		});
	}

	/*
		Синхронизируем данные
	*/

	async passLocationData(){
		let passdata = await this.passDataToStorage();
		this.props.navigation.replace('Forecast');
	}

	passDataToStorage(){
		return new Promise(async (resolve) =>{
			const setItemValue = await AsyncStorage.setItem('locationData', JSON.stringify(this.state));
			resolve(true);
		});
	}

	onRegionChange(region){
		this.setState({region});
	}

	/*
		Получаем координату при нажатии на карту
	*/

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
		if(!this.state.networkStatus){                                   //Вывод экрана при не наличии интернет подключения
			return(
				<View style={styles.connectionErrorContainer}>
					<View style={styles.connectionErrorView}>
						<Text style={{
							color:'white',
							fontFamily:'Roboto-Light',
							fontSize:21,
						}}>
						Please, resolve your internet connection to properly work with location!
						</Text>
						<Button
							containerViewStyle={{
								marginLeft: 0,
								marginRight: 0,
								width: '100%',
							}}
							buttonStyle={styles.errorButton}
							title='Go back to Forecast Page'
							onPress = {() => {
								this.props.navigation.replace('Forecast');
							}}
						/>
					</View>
				</View>
			);
		}
		else{
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
										},
										marker:{
											title:'Current Position',
											coordinate:{
												latitude: details.geometry.location.lat,
												longitude: details.geometry.location.lng
											}
										}
									});
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

									textInputContainer: {
										width: availWidth+40,
										height: 44,
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
							<Button
								containerViewStyle={{
									position:'absolute', 
									bottom: 0,
									marginLeft: 0,
									width: '100%',
								}}
								buttonStyle={styles.buttonLocationMap}
								title='Pass Location'
								onPress = {() => {
									this.passLocationData()
								}}
							/>
						</View>

					</Sidebar>
				);
			}
		}
	}
}