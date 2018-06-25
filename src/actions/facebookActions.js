import {AsyncStorage} from 'react-native';
import {itemIsLoading, errorHandler, userLoginStatus, userData} from './actionTransmitter'
const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
	AccessToken
} = FBSDK;

export function facebookTokenFetch(dispatch){
	return new Promise((resolve,reject) =>{
		AccessToken.getCurrentAccessToken()
		.then(data => {
			if(data==null){
				dispatch(userLoginStatus(false))
				dispatch(itemIsLoading(false))
				resolve(false)
			}
			else{
				dispatch(userLoginStatus(true))
				console.log('token: ',data.accessToken);
				resolve(data.accessToken)
			}
		})
		.catch(error => {
			if(error.message!=='Network request failed')
				reject(error.message);
		})
	});
}

export function facebookUserFetch(dispatch,token){
	return new Promise((resolve,reject) =>{
		fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token='+token)
		.then((response) => response.json())
		.then((userInfo) =>{
			AsyncStorage.setItem('userData', JSON.stringify(userInfo.name));

			dispatch(userData(userInfo.name))
			console.log('user: ',userInfo.name);
			resolve(userInfo.name)
		})
		.catch(error => {
			if(error.message!=='Network request failed')
				reject(error.message);
			else{
				AsyncStorage.getItem('userData')
				.then((value) => JSON.parse(value))
				.then(user =>{
					console.log('user: ',user);
					dispatch(userData(user))
					resolve(user)
				})
			}
		})
	});	
}