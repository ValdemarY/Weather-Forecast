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
	GRAY_BORDER_COLOR
} from '../constants/constant';
import {BASIC_TEXT_VIEW_HEIGHT, BASIC_FONT_SIZE} from '../constants/responsiveConstForecast';

export default StyleSheet.create({
	screenContainer:{
		flex: 1,
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

	appName:{
		position: 'absolute',
		top: 3*APP_WIDTH/7,
		right: 10,
		left: 10,
	},

	appNameFont:{
		fontFamily: 'Roboto-Light',
		fontSize: 40,
	},

	loginFacebookContainer:{
		position: 'absolute',
		bottom: 3*APP_WIDTH/7,
		right: 10,
		left: 10,
	},

	loginFacebookTextMargin:{
		marginBottom: 10,
	},

	loginButton:{
		height:BASIC_TEXT_VIEW_HEIGHT,
		backgroundColor: SCREEN_CONTAINER_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
	},

	loginButtonText:{
		fontSize: BASIC_FONT_SIZE,
		fontFamily: 'Roboto-Light',
		color:WHITE_COLOR,
	}
});