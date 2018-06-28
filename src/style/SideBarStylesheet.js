import React from 'react';
import {StyleSheet} from 'react-native';
import {
	APP_WIDTH, 
	APP_HEIGHT, 
	APP_CONTAINER_MARGIN, 
	APP_CONTAINER_PADDING,
	SCREEN_CONTAINER_COLOR,
	SCREEN_BACKGROUND_COLOR
} from '../constants/constant';
import {BASIC_TEXT_VIEW_HEIGHT, BASIC_FONT_SIZE} from '../constants/responsiveConstForecast';

export default StyleSheet.create({
	sideBarContainer:{
		flex:1,
		backgroundColor: SCREEN_CONTAINER_COLOR,
	},

	sideBarView:{
		flex:1,
		marginRight: APP_CONTAINER_MARGIN,
		padding: APP_CONTAINER_PADDING,
		backgroundColor: SCREEN_BACKGROUND_COLOR,
	},

	sideBarText:{
		fontFamily: 'Roboto-Light',
		fontSize: BASIC_FONT_SIZE,
	},

	sideBarButton:{
		height: BASIC_TEXT_VIEW_HEIGHT,
		backgroundColor: SCREEN_CONTAINER_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
	},
})