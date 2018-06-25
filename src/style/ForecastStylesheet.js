import React from 'react';
import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT, APP_WIDTH, APP_HEIGHT, APP_CONTAINER_MARGIN, APP_CONTAINER_PADDING} from '../constants/constant';
import {FORECAST_CONTAINER_WIDTH, FORECAST_INFO_CONTAINER_HEIGHT, FORECAST_TEMPERATURE_FONT_SIZE} from '../constants/responsiveConstForecast';

// weatherContainer = 3/5: every view inside = 1/8 ~ 3/40 of all APP_HEIGHT; weatherButtonContainer = 1/5; locationButtonContainer = 1/5;

export default StyleSheet.create({
	screenContainer:{
		height: WINDOW_HEIGHT,
		width: WINDOW_WIDTH,
		backgroundColor: '#428bca',
	},

	componentContainer:{
		flex:1,
		margin:APP_CONTAINER_MARGIN,
		padding:APP_CONTAINER_PADDING,
		backgroundColor:'#f9f9f9',
	},

	textFont:{
		fontFamily: 'Roboto-Light',
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

	weatherContainer:{
		borderWidth: 1,
		borderColor: '#c0c5ce',
		flex: 3,
		marginBottom: APP_CONTAINER_MARGIN,
	},

		cityName:{
			flex:1,

			paddingLeft: 10,
			paddingRight: 10,
			justifyContent: 'center',
			alignItems: 'flex-start',
		},

		weatherStatus:{
			flex:1,

			paddingLeft: 10,
			paddingRight: 10,
			justifyContent: 'center',
			alignItems: 'flex-start',
			borderBottomWidth: 1,
			borderColor: '#FFFFFF' ,
		},

		weatherInfo:{
			flex: 5,
		},

			temperatureAndWeatherGraphics:{
				flex:3,
				flexDirection: 'row',
				borderBottomWidth: 1,
				borderColor: '#FFFFFF'
			},

				temperature:{
					flex:1,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems:'center',
				},

					temperatureIcon:{
						width:FORECAST_TEMPERATURE_FONT_SIZE,
						height:FORECAST_TEMPERATURE_FONT_SIZE,
					},

				weatherGraphics:{
					flex: 1,
					justifyContent:'center',
					alignItems:'flex-end',
					paddingRight: 5,
				},
					
					weatherGraphicsContainer:{
						width: FORECAST_CONTAINER_WIDTH*2/3,
						height: FORECAST_CONTAINER_WIDTH*2/3,
						borderRadius: 90,
						backgroundColor: 'white',
						justifyContent:'center',
						alignItems:'center',
					},

						weatherGraphicsIcon:{
							width: FORECAST_CONTAINER_WIDTH*1/2,
							height: FORECAST_CONTAINER_WIDTH*1/2
						},

			otherWeatherInfo:{
				flex:2,
			},

				otherWeatherInfoContainer:{
					flex:1,
					flexDirection: 'row',
				},

					leftWeatherInfo:{
						flex:1,
						paddingLeft: 10,
						justifyContent:'flex-start',
						alignItems:'center',
						flexDirection: 'row',
					},

						leftIcon:{
							marginRight: 10,
						},

					rightWeatherInfo:{
						flex:1,
						paddingRight: 10,
						justifyContent:'flex-end',
						alignItems:'center',
						flexDirection: 'row',
					},

						rightIcon:{
							marginLeft: 10,
						},

					otherWeatherInfoIcon:{
						width:FORECAST_INFO_CONTAINER_HEIGHT,
						height:FORECAST_INFO_CONTAINER_HEIGHT,
					},

	weatherButtonContainer:{
		borderWidth: 1,
		borderColor: '#c0c5ce',
		flex: 1,
		marginBottom: APP_CONTAINER_MARGIN,
	},
		weatherImage:{
			flex:1,
		},

		weatherButton:{
			flex:1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#5cb85c',
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
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#428bca',
		},

	image:{
		width: '100%', 
		height: '100%',
		resizeMode: 'cover'
	}
})