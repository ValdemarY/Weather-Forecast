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

const availWidth = windowSize.width-20-20;
const availHeight = windowSize.height-20-20;

module.exports = StyleSheet.create({
	//стили использущиеся всеми скринами из StackNavigator
	screenContainer:{
		flex: 1,
		backgroundColor: '#428bca',
	},

	componentContainer:{
		flex:1,
		margin:10,
		padding:10,
		backgroundColor:'#f9f9f9',
	},

	textFont:{
		fontFamily: 'Vollkorn-Regular',
		fontSize: 16,
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
		marginTop:10,
		marginBottom:10,
	},

	appName:{
		position: 'absolute',
		top: 3*availWidth/7,
		right: 10,
		left: 10,
	},

	appNameFont:{
		fontFamily: 'Vollkorn-Italic',
		fontSize: 40,
	},

	loginFacebookContainer:{
		position: 'absolute',
		bottom: 3*availWidth/7,
		right: 10,
		left: 10,
	},

	loginFacebookTextMargin:{
		marginBottom: 10,
	},

	//стили для SideBar

	sideBarContainer:{
		flex:1,
		backgroundColor: '#7adaf6',
	},

		sideBarView:{
			flex:1,
			margin:10,
		},

	//стили для Forecast
	weatherContainer:{
		borderWidth: 1,
		borderColor: '#c0c5ce',
		flex: 3,
		marginBottom: 10,
	},

		cityName:{
			paddingLeft: 10,
			paddingRight: 10,
			height:availHeight/14,
			justifyContent: 'center',
			alignItems: 'flex-start',
		},

		weatherStatus:{
			borderTopWidth: 1,
			borderColor: '#c0c5ce',
			paddingLeft: 10,
			paddingRight: 10,
			height:availHeight/14,
			justifyContent:'flex-start',
			alignItems:'center',
			flexDirection: 'row', 
		},

		weatherInfo:{
			flex: 1,
			flexDirection: 'row',
		},

			temperature:{
				flex: 1,
				alignItems:'center',
				justifyContent:'center',
			},

			weatherIcon:{
				flex: 1,
				justifyContent:'center',
				alignItems:'center',
			},
				
				iconCircle:{
					width: availHeight/6,
					height: availHeight/6,
					borderRadius: 100/2,
					backgroundColor: 'white',
					justifyContent:'center',
					alignItems:'center',
				},

		humidityInfo:{
			paddingLeft: 10,
			paddingRight: 10,
			height:availHeight/14,
			justifyContent: 'center',
			alignItems: 'flex-start',
		},

		pressureInfo:{
			borderTopWidth: 1,
			borderColor: '#c0c5ce',
			paddingLeft: 10,
			paddingRight: 10,
			height:availHeight/14,
			justifyContent: 'center',
			alignItems: 'flex-start',
		},

	weatherButtonContainer:{
		borderWidth: 1,
		borderColor: '#c0c5ce',
		flex: 1,
		marginBottom: 10,
	},
		weatherImage:{
			flex:1,
		},

		weatherButton:{
			flex:1,
		},

	locationButtonContainer:{
		borderWidth: 1,
		borderColor: '#c0c5ce',
		flex: 1,
	},

		locationImage:{
			flex:1,
		},

		locationButton:{
			flex:1,
		},

	//стили для Location
	locationContainer:{
		borderWidth: 0,
	},

	map:{
		...StyleSheet.absoluteFillObject,
	},

	buttonLocationMap:{
		height: availHeight/16,
		backgroundColor: '#3570a3'
	},

	connectionErrorContainer:{
		flex: 1,
		backgroundColor: '#d9534f',
	},

	connectionErrorView:{
		flex:1,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	errorButton:{
		height:availHeight/16,
		backgroundColor: '#9f3c39'
	},

	//стили для AdvancedForecast

	dayContainer:{
		flex: 1,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#c0c5ce',
	},

		dayHeader:{
			height:availHeight/16,
			backgroundColor: '#428bca',
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderColor: '#c0c5ce',
		},

		dayList:{
			flex:1,
		},

			dayScrollViewComponent:{
				flex:1,
				width: deviceWidth/3,
				padding:10,
				borderRightWidth: 1,
				borderColor: '#c0c5ce',
			},

	hourContainer:{
		flex: 1,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#c0c5ce',
	},

		hourHeader:{
			height:availHeight/16,
			backgroundColor: '#428bca',
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderColor: '#c0c5ce',
		},

		hourList:{
			flex:1,
		},

			hourScrollViewComponent:{
				flex:1,
				padding:10,
				borderBottomWidth: 1,
				borderColor: '#c0c5ce',
			},

	evenListItem:{
		backgroundColor: '#5bc0de',
	},

	backToForecast:{
		height:availHeight/16,
		backgroundColor: '#428bca',
		borderWidth: 1,
		borderColor: '#c0c5ce',
	},
});
