import React from 'react';
import {StyleSheet} from 'react-native';
import {
	WINDOW_WIDTH, 
	WINDOW_HEIGHT,
	SCREEN_CONTAINER_COLOR
} from '../constants/constant';

export default StyleSheet.create({
	screenContainer:{
		height: WINDOW_HEIGHT,
		width: WINDOW_WIDTH,
		backgroundColor: SCREEN_CONTAINER_COLOR,
	},
	centered:{
		alignItems: 'center',
		justifyContent: 'center',
	},
})