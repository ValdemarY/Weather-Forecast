import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';

import Forecast from './Forecast'
import Location from './Location'
import AdvancedForecast from './AdvancedForecast'
import Login from './Login'

const styles = require('./style/Styles'); //стили для приложения

export default ApplicationNavigator = createStackNavigator(
{
	Login : {
		screen:Login,
	},
	Forecast : {
		screen:Forecast,
	},
	Location : {
		screen:Location,
	},
	AdvancedForecast : {
		screen:AdvancedForecast,
	},
},
{
	headerMode: 'none',
	initialRouteName: 'Login',
}
);