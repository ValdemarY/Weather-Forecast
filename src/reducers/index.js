import { combineReducers } from 'redux';
import { isLoading, isLoggedIn, user, location, advanced_weather, weather, error} from './reducer';

export default combineReducers({
	isLoading,
	isLoggedIn,
	user,
	location,
	advanced_weather,
	weather,
	error
});