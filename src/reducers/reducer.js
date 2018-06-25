export function isLoading(state = true,action){
	switch(action.type){
		case 'ITEM_IS_LOADING': 
			return action.isLoading;
		default:
			return state;
	}
}

export function isLoggedIn(state = true,action){
	switch(action.type){
		case 'USER_LOGIN_STATUS': 
			return action.isLoggedIn;
		default:
			return state;
	}
}

export function user(state = 'User',action){
	switch(action.type){
		case 'USER_DATA': 
			return action.data;
		default:
			return state;
	}
}

export function location(state = {},action){
	switch(action.type){
		case 'LOCATION_DATA': 
			return action.data;
		default:
			return state;
	}
}

export function advanced_weather(state = [],action){
	switch(action.type){
		case 'ADVANCED_WEATHER_DATA': 
			return action.data;
		default:
			return state;
	}
}

export function weather(state = {},action){
	switch(action.type){
		case 'WEATHER_DATA': 
			return action.data;
		default:
			return state;
	}
}

export function error(state = '',action){
	switch(action.type){
		case 'ERROR_MESSAGE': 
			return action.error;
		default:
			return state;
	}
}
