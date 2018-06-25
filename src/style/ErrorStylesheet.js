import React from 'react';
import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../constants/constant';
import {BASIC_TEXT_VIEW_HEIGHT, BASIC_FONT_SIZE} from '../constants/responsiveConstForecast';

export default StyleSheet.create({
	connectionErrorContainer:{
		height: WINDOW_HEIGHT,
		width: WINDOW_WIDTH,
		backgroundColor: '#d9534f',
	},
	connectionErrorView:{
		flex:1,
		margin: 10,
		justifyContent: 'center',
	},
	errorText:{
		color:'white',
		fontFamily:'Roboto-Light',
		fontSize:BASIC_FONT_SIZE,
		textAlign: 'center' 
	},
	errorButton:{
		height:BASIC_TEXT_VIEW_HEIGHT,
		backgroundColor: '#9f3c39',
		alignItems: 'center',
		justifyContent: 'center',
	},
})