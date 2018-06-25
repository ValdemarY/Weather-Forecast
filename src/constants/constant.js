import {StatusBar} from 'react-native';

export const APP_CONTAINER_MARGIN = 10;
export const APP_CONTAINER_PADDING = 10;

const windowSize = require('Dimensions').get('window');
export const WINDOW_HEIGHT = windowSize.height - StatusBar.currentHeight;
export const WINDOW_WIDTH = windowSize.width;
export const APP_WIDTH = 
	windowSize.width
	- APP_CONTAINER_MARGIN
	- APP_CONTAINER_PADDING
	- APP_CONTAINER_PADDING
	- APP_CONTAINER_PADDING
	- APP_CONTAINER_PADDING
	- APP_CONTAINER_MARGIN;

export const APP_HEIGHT = 
	windowSize.height
	- StatusBar.currentHeight 
	- APP_CONTAINER_MARGIN
	- APP_CONTAINER_PADDING
	- APP_CONTAINER_MARGIN
	- APP_CONTAINER_MARGIN
	- APP_CONTAINER_PADDING
	- APP_CONTAINER_MARGIN;

// - StatusBar - Top Margin - Middle Margin - Middle Margin - Bottom Margin

export const WEATHER_API_KEY = '574020de38f6a61ef87e0d8489c58ee0';
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = 0.0421;

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

