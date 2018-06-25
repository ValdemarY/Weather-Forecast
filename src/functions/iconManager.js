export function requireImage(string){
	switch(string){
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
		case '01d': return '#ffa700';
		case '02d': return '#999999';
		case '03d': return '#777777';
		case '04d': return '#555555';
		case '09d': return '#4f5b66';
		case '10d': return '#a7adba';
		case '11d': return '#3b444b';
		case '13d': return '#4f5b66';
		case '50d': return '#000000';

		case '01n': return '#151515';
		case '02n': return '#555555';
		case '03n': return '#333333';
		case '04n': return '#272727';
		case '09n': return '#343d46';
		case '10n': return '#4f5b66';
		case '11n': return '#353839';
		case '13n': return '#343d46';
		case '50n': return '#000000';

		default: return '#000000';
	}
}

export function requireIcon(string){
	switch(string){
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