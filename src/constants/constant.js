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

export const SCREEN_CONTAINER_COLOR = '#428bca';
export const SCREEN_BACKGROUND_COLOR = '#f9f9f9';
export const WHITE_COLOR = '#FFFFFF';
export const GRAY_BORDER_COLOR = '#c0c5ce';
export const WEATHER_BUTTON_COLOR = '#5cb85c';
export const LIGHT_CONTAINER_COLOR = '#5bc0de';
export const LOCATION_BUTTON_COLOR = '#3570a3';
export const ERROR_CONTAINER_COLOR = '#d9534f';
export const ERROR_BUTTON_COLOR = '#9f3c39';

export const D01_COLOR = '#ffa700';
export const D02_COLOR = '#999999';
export const D03_COLOR = '#777777';
export const D04_COLOR = '#555555';
export const D09_COLOR = '#4f5b66';
export const D10_COLOR = '#a7adba';
export const D11_COLOR = '#3b444b';
export const D50_COLOR = '#000000';

export const N01_COLOR = '#151515';
export const N03_COLOR = '#333333';
export const N04_COLOR = '#272727';
export const N09_COLOR = '#343d46';
export const N11_COLOR = '#353839';
export const N13_COLOR = '#343d46';
