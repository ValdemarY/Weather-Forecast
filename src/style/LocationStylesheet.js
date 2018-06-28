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
	LOCATION_BUTTON_COLOR
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
	
	locationContainer:{
		borderWidth: 0,
	},

	map:{
		...StyleSheet.absoluteFillObject,
	},

	container:{
		position: 'absolute',
		top: 0
	},

	row: {
		padding: 13,
		height: 44,
		flexDirection: 'row',
		backgroundColor: SCREEN_BACKGROUND_COLOR,
	},

	textInput: {
		backgroundColor: WHITE_COLOR,
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
		width: APP_WIDTH+2*APP_CONTAINER_MARGIN+4*APP_CONTAINER_PADDING,
		height: 44,
	},

	poweredContainer: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: SCREEN_CONTAINER_COLOR,
	},

	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: SCREEN_BACKGROUND_COLOR,
	},

	buttonLocationToForecast:{
		position:'absolute', 
		bottom: 0,
		height: 44,
		width: '100%',
		backgroundColor: LOCATION_BUTTON_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
	},

	textLocationToForecast:{
		color:WHITE_COLOR,
		fontFamily:'Roboto-Light',
		fontSize: 15,
	},
})