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

const windowSize = require('Dimensions').get('window');
const deviceWidth = windowSize.width;
const deviceHeight = windowSize.height;

module.exports = StyleSheet.create({
	//стили использущиеся всеми скринами из StackNavigator

	screenContainer:{
		flex: 1,
		backgroundColor: '#428bca',
		borderWidth: 5,
		borderColor: '#5bc0de',
	},

	componentContainer:{
		flex:1,
		margin:10,
		padding:10,
		borderWidth:5,
		borderColor:'#5bc0de',
		backgroundColor:'#f9f9f9',
	},

	textColor:{
		color:'#f9f9f9',
	},

	buttonContainer:{
		flex:1,
	},

	textFont:{
		fontFamily: 'Vollkorn-Regular',
		fontSize: 16,
	},

	button:{
		height:40,
		borderWidth:1,
		borderColor:'#428bca',
		backgroundColor:'#5bc0de',
	},

	centered:{
		alignItems: 'center',
		justifyContent: 'center',
	},

	alignCentered:{
		alignItems: 'center',
	},

	justifyCentered:{
		justifyContent: 'center',
	},

	//стили для Login

	contentContainer:{
		flex: 1,
		marginTop:deviceWidth/7,
		marginBottom:deviceWidth/7,
	},

	appName:{
		position: 'absolute',
		top: 2*deviceWidth/7,
		right: 10,
		left: 10,
	},

	appNameFont:{
		fontFamily: 'Vollkorn-Italic',
		fontSize: 40,
	},

	loginFacebookContainer:{
		position: 'absolute',
		bottom: 2*deviceWidth/7,
		right: 10,
		left: 10,
	},

	loginFacebookTextMargin:{
		marginBottom: 10,
	},

	//стили для Forecast

	weatherContainer:{
		flex:2,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderColor: '#5bc0de'
	},

			userAndTemperatureContainer:{
				flexDirection: 'row',
				flex:1,
				borderBottomWidth: 1,
				borderColor: '#5bc0de'
			},

					userContainer:{
						flex:2,
						padding:10,
						borderRightWidth: 1,
						borderColor: '#5bc0de'
					},

					temperatureContainer:{
						flex:1.5,
					},

			weatherDataContainer:{
				flex:2,
			},

	temperatureFont:{
		fontFamily: 'Vollkorn-Regular',
		fontSize: deviceWidth/13,
	},

	buttonWeather:{
		flex:1,
		backgroundColor: '#428bca',
	},

	buttonLocation:{
		flex:1,
		backgroundColor: '#5cb85c',
	},

	advancedForecastText:{
		marginBottom: 10,
	},

	//стили для Location

	locationContainer:{
		borderWidth: 0,
	},

	map:{
		...StyleSheet.absoluteFillObject,
	},

	buttonLocationMap:{
		position:'absolute', 
		bottom: 0,
		
		width: deviceWidth,
		height: 40,
		
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3570a3',
	},

	//стили для AdvancedForecast

	dayContainer:{
		flex: 1,
		marginBottom: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor:'#5bc0de',
	},

	hourContainer:{
		flex: 1,
		marginBottom: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor:'#5bc0de',
	},

	dayScrollViewComponent:{
		flex:1,
		width: deviceWidth/3,
		padding:10,
		borderRightWidth: 1,
		borderColor:'#5bc0de',
	},

	hourScrollViewComponent:{
		flex:1,
		padding:10,
		borderBottomWidth: 1,
		borderColor:'#5bc0de',
	},
});
