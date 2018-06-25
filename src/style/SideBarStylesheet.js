import React from 'react';
import {StyleSheet} from 'react-native';
import {APP_WIDTH, APP_HEIGHT, APP_CONTAINER_MARGIN, APP_CONTAINER_PADDING} from '../constants/constant';
import {BASIC_TEXT_VIEW_HEIGHT, BASIC_FONT_SIZE} from '../constants/responsiveConstForecast';

export default StyleSheet.create({
	sideBarContainer:{
		flex:1,
		backgroundColor: '#428bca',
	},

	sideBarView:{
		flex:1,
		marginRight: APP_CONTAINER_MARGIN,
		padding: APP_CONTAINER_PADDING,
		backgroundColor: '#f9f9f9',
	},

	sideBarText:{
		fontFamily: 'Roboto-Light',
		fontSize: BASIC_FONT_SIZE,
	},

	sideBarButton:{
		height: BASIC_TEXT_VIEW_HEIGHT,
		backgroundColor: '#428bca',
		alignItems: 'center',
		justifyContent: 'center',
	},
})