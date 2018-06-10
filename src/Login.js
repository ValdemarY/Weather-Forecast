import React from 'react';
import {
	Text, 
	View, 
	TouchableOpacity,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

const styles = require('./style/Styles');
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

export default class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn:true,
		};
	}

	/*
		достаем токен для FB и проверяем наличие, 
		если нет то оставляем на странице с Логином, 
		если есть то переводим на следующую страницу
	*/
	
	componentWillMount(){
		AccessToken.getCurrentAccessToken().then(  
            (data) => {
            	if(data!==null){
            		this.props.navigation.replace('Forecast');
            	}
            	else{
            		this.setState({
            			isLoggedIn:false,
            		});
            	}
            }
        );
	}

	loginUser(){
		LoginManager.logInWithReadPermissions(["email","public_profile"]).then(
			(result) =>{
				if (result.isCancelled) {
					console.log('Login cancelled');
				}else{
					console.log('Login success');
					this.props.navigation.replace('Forecast');
				}
			},
			(error) => {
				console.log('Login fail with error: ' + error);
			}
		);
	}

	render(){
		if(!this.state.isLoggedIn){
			return(
				<View style={styles.screenContainer}>
					<View style={[styles.componentContainer,styles.contentContainer]}>
						
						<View style={[styles.appName]}>
							<View style={styles.alignCentered}>
								<Text style={[styles.textFont,styles.appNameFont]}>Weather</Text>
								<Text style={[styles.textFont,styles.appNameFont]}>Forecast</Text>
							</View>
						</View>

						<View style={[styles.loginFacebookContainer]}>
							<View style={[styles.alignCentered,styles.loginFacebookTextMargin]}>
								<Text style={styles.textFont}>Welcome to Weather forecast App!</Text>
								<Text style={styles.textFont}>Login with your Facebook account.</Text>
							</View>
							
							<TouchableOpacity
								style = {[styles.button,styles.loginButton,styles.centered]}
								onPress = {() => {this.loginUser()}}
							>
							<Text style={styles.textFont}>Login with Facebook</Text>
							</TouchableOpacity>
						</View>

					</View>
				</View>
			);
		}
		else{
			return(
				<View style={[styles.screenContainer,styles.centered]}>
					<Text style={styles.textFont}>Loading...</Text>
				</View>
			);
		}
	}
}