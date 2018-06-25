import React from 'react';
import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT, APP_WIDTH, APP_HEIGHT, APP_CONTAINER_MARGIN, APP_CONTAINER_PADDING} from '../constants/constant';
import {BASIC_TEXT_VIEW_HEIGHT, BASIC_FONT_SIZE} from '../constants/responsiveConstForecast';

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

	dayContainer:{
		flex: 5,
		marginBottom: APP_CONTAINER_MARGIN,
		borderWidth: 1,
		borderColor: '#c0c5ce',
	},

		dayHeader:{
			height:BASIC_TEXT_VIEW_HEIGHT,
			backgroundColor: '#428bca',
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderColor: '#c0c5ce',
		},

			dayHeaderText:{
				color:'white',
				fontFamily:'Roboto-Light',
				fontSize:BASIC_FONT_SIZE,
			},

		dayList:{
			flex:1,
		},

			dayTouchable:{
				flex:1,
				justifyContent: 'center',
				alignItems: 'center',
			},

				dayScrollViewComponent:{
					flex:1,
					width: APP_WIDTH/2.5,
					padding:10,
					borderRightWidth: 1,
					borderColor: '#c0c5ce',
				},

					minTemp:{
						color:'#000000'
					},

					maxTemp:{
						color:'#ffa700'
					},

					marginBetweenBlocks:{
						marginBottom: 10,
					},

	hourContainer:{
		flex: 3,
		marginBottom: APP_CONTAINER_MARGIN,
		borderWidth: 1,
		borderColor: '#c0c5ce',
	},

		hourHeader:{
			height:BASIC_TEXT_VIEW_HEIGHT,
			backgroundColor: '#428bca',
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderColor: '#c0c5ce',
		},

			hourHeaderText:{
				color:'white',
				fontFamily:'Roboto-Light',
				fontSize:BASIC_FONT_SIZE,
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

				weatherIcon:{
					height:32,
					width:32,
				},

	evenListItem:{
		backgroundColor: '#5bc0de',
	},

	backToForecast:{
		height:BASIC_TEXT_VIEW_HEIGHT,
		backgroundColor: '#428bca',
		borderWidth: 1,
		borderColor: '#c0c5ce',
		justifyContent: 'center',
		alignItems: 'center',
	},

		backToForecastButton:{
			flex:1,
			justifyContent: 'center',
			alignItems: 'center',
		},

			backToForecastButtonText:{
				color:'white',
				fontFamily:'Roboto-Light',
				fontSize:BASIC_FONT_SIZE,
			},
})