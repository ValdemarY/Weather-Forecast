export function itemIsLoading(bool){
	return{
		type:'ITEM_IS_LOADING',
		isLoading:bool
	};
}

export function userLoginStatus(bool){
	return{
		type:'USER_LOGIN_STATUS',
		isLoggedIn:bool
	};
}

export function userData(data){
	return{
		type:'USER_DATA',
		data
	};
}

export function locationData(data){
	return{
		type:'LOCATION_DATA',
		data
	};
}

export function advancedWeatherFetchSuccess(data){
	return{
		type:'ADVANCED_WEATHER_DATA',
		data
	};
}

export function weatherFetchSuccess(data){
	return{
		type:'WEATHER_DATA',
		data
	};
}

export function errorHandler(error){
	return{
		type:'ERROR_MESSAGE',
		error
	};
}