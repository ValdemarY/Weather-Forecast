import React from 'react';
import {StyleSheet} from 'react-native';
import {
	WINDOW_WIDTH, 
	WINDOW_HEIGHT, 
	APP_WIDTH, 
	APP_HEIGHT, 
	APP_CONTAINER_MARGIN, 
	APP_CONTAINER_PADDING,
	SCREEN_CONTAINER_COLOR,
	SCREEN_BACKGROUND_COLOR,
	WHITE_COLOR,
	GRAY_BORDER_COLOR,
	LIGHT_CONTAINER_COLOR,
	D01_COLOR,
	D50_COLOR
} from '../constants/constant';
import {BASIC_TEXT_VIEW_HEIGHT, BASIC_FONT_SIZE} from '../constants/responsiveConstForecast';

export default StyleSheet.create({
	screenContainer:{
		height: WINDOW_HEIGHT,
		width: WINDOW_WIDTH,
		backgroundColor: SCREEN_CONTAINER_COLOR,
	},

	componentContainer:{
		flex:1,
		margin:APP_CONTAINER_MARGIN,
		padding:APP_CONTAINER_PADDING,
		backgroundColor:SCREEN_BACKGROUND_COLOR,
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
		borderColor: GRAY_BORDER_COLOR,
	},

		dayHeader:{
			height:BASIC_TEXT_VIEW_HEIGHT,
			backgroundColor: SCREEN_CONTAINER_COLOR,
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderColor: GRAY_BORDER_COLOR,
		},

			dayHeaderText:{
				color:WHITE_COLOR,
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
					borderColor: GRAY_BORDER_COLOR,
				},

					minTemp:{
						color:D01_COLOR,
					},

					maxTemp:{
						color:D50_COLOR,
					},

					marginBetweenBlocks:{
						marginBottom: 10,
					},

	hourContainer:{
		flex: 3,
		marginBottom: APP_CONTAINER_MARGIN,
		borderWidth: 1,
		borderColor: GRAY_BORDER_COLOR,
	},

		hourHeader:{
			height:BASIC_TEXT_VIEW_HEIGHT,
			backgroundColor: SCREEN_CONTAINER_COLOR,
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderColor: GRAY_BORDER_COLOR,
		},

			hourHeaderText:{
				color:WHITE_COLOR,
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
				borderColor: GRAY_BORDER_COLOR,
			},

				weatherIcon:{
					height:32,
					width:32,
				},

	evenListItem:{
		backgroundColor: LIGHT_CONTAINER_COLOR,
	},

	backToForecast:{
		height:BASIC_TEXT_VIEW_HEIGHT,
		backgroundColor: SCREEN_CONTAINER_COLOR,
		borderWidth: 1,
		borderColor: GRAY_BORDER_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
	},

		backToForecastButton:{
			flex:1,
			justifyContent: 'center',
			alignItems: 'center',
		},

			backToForecastButtonText:{
				color:WHITE_COLOR,
				fontFamily:'Roboto-Light',
				fontSize:BASIC_FONT_SIZE,
			},
})