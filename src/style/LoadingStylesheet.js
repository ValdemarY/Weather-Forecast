import React from 'react';
import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../constants/constant';

export default StyleSheet.create({
	screenContainer:{
		height: WINDOW_HEIGHT,
		width: WINDOW_WIDTH,
		backgroundColor: '#428bca',
	},
	centered:{
		alignItems: 'center',
		justifyContent: 'center',
	},
})