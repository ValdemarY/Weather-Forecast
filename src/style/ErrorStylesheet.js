import React from 'react';
import {StyleSheet} from 'react-native';
import {
	WINDOW_WIDTH, 
	WINDOW_HEIGHT,
	ERROR_CONTAINER_COLOR,
	ERROR_BUTTON_COLOR,
	WHITE_COLOR
} from '../constants/constant';
import {BASIC_TEXT_VIEW_HEIGHT, BASIC_FONT_SIZE} from '../constants/responsiveConstForecast';

export default StyleSheet.create({
	connectionErrorContainer:{
		height: WINDOW_HEIGHT,
		width: WINDOW_WIDTH,
		backgroundColor: ERROR_CONTAINER_COLOR,
	},
	connectionErrorView:{
		flex:1,
		margin: 10,
		justifyContent: 'center',
	},
	errorText:{
		color:WHITE_COLOR,
		fontFamily:'Roboto-Light',
		fontSize:BASIC_FONT_SIZE,
		textAlign: 'center' 
	},
	errorButton:{
		height:BASIC_TEXT_VIEW_HEIGHT,
		backgroundColor: ERROR_BUTTON_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
	},
})