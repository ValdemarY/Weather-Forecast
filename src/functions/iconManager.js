import {
	D01_COLOR,
	D02_COLOR,
	D03_COLOR,
	D04_COLOR,
	D09_COLOR,
	D10_COLOR,
	D11_COLOR,
	D50_COLOR,
	N01_COLOR,
	N03_COLOR,
	N04_COLOR,
	N09_COLOR,
	N11_COLOR,
	N13_COLOR
} from '../constants/constant';

export function requireImage(string){
	switch(string){
		case 'grass': return require('../images/grass.jpg');
		case 'map': return require('../images/world_map.png');

		case '01d': return require('../images/01d.png');
		case '02d': return require('../images/02d.png');
		case '03d': return require('../images/03d.png');
		case '04d': return require('../images/04d.png');
		case '09d': return require('../images/09d.png');
		case '10d': return require('../images/10d.png');
		case '11d': return require('../images/11d.png');
		case '13d': return require('../images/13d.png');
		case '50d': return require('../images/50d.png');

		case '01n': return require('../images/01n.png');
		case '02n': return require('../images/02n.png');
		case '03n': return require('../images/03n.png');
		case '04n': return require('../images/04n.png');
		case '09n': return require('../images/09n.png');
		case '10n': return require('../images/10n.png');
		case '11n': return require('../images/11n.png');
		case '13n': return require('../images/13n.png');
		case '50n': return require('../images/50n.png');

		default: return require('../images/50n.png');
	}
}

export function requireColor(string){
	switch(string){
		case '01d': return D01_COLOR;
		case '02d': return D02_COLOR;
		case '03d': return D03_COLOR;
		case '04d': return D04_COLOR;
		case '09d': return D09_COLOR;
		case '10d': return D10_COLOR;
		case '11d': return D11_COLOR;
		case '13d': return D09_COLOR;
		case '50d': return D50_COLOR;

		case '01n': return N01_COLOR;
		case '02n': return D04_COLOR;
		case '03n': return N03_COLOR;
		case '04n': return N04_COLOR;
		case '09n': return N09_COLOR;
		case '10n': return D09_COLOR;
		case '11n': return N11_COLOR;
		case '13n': return N13_COLOR;
		case '50n': return D50_COLOR;

		default: return D50_COLOR;
	}
}

export function requireIcon(string){
	switch(string){
		case 'thermometer': return require('../images/thermometer.png');
		case 'freezing': return require('../images/freezing.png');
		case 'humidity': return require('../images/humidity.png');
		case 'temperature': return require('../images/temperature.png');
		case 'barometer': return require('../images/barometer.png');

		case '01d': return require('../images/sun.png');
		case '02d': return require('../images/cloudy-day.png');
		case '03d': return require('../images/cloud.png');
		case '04d': return require('../images/cloudy.png');
		case '09d': return require('../images/rain_1.png');
		case '10d': return require('../images/rain_2.png');
		case '11d': return require('../images/storm.png');
		case '13d': return require('../images/snow.png');
		case '50d': return require('../images/fog.png');

		case '01n': return require('../images/night.png');
		case '02n': return require('../images/cloudy-night.png');
		case '03n': return require('../images/cloud.png');
		case '04n': return require('../images/cloudy.png');
		case '09n': return require('../images/rain_1.png');
		case '10n': return require('../images/rain_3.png');
		case '11n': return require('../images/storm.png');
		case '13n': return require('../images/snow.png');
		case '50n': return require('../images/fog.png');

		default: return require('../images/fog.png');
	}
}