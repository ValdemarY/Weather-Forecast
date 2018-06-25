import React from 'react';
import {
	ActivityIndicator,
	Text, 
	View, 
	TouchableOpacity,
	Alert
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {LoginManager} from 'react-native-fbsdk';

import ErrorScreen from './components/ErrorComponent';
import {itemIsLoading} from './actions/actionTransmitter';
import {loginQueryManager} from './actions/action';
import styles from './style/LoginStylesheet';

const mapStateToProps = (state) => {
    return {
    	isLoading:state.isLoading,
		isLoggedIn:state.isLoggedIn,
		error:state.error
    };
};

loginQueryManager: () => {
	dispatch(loginQueryManager())
}

itemIsLoading: (bool) => {
	dispatch(itemIsLoading(bool))
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loginQueryManager, itemIsLoading}, dispatch);
};

class Login extends React.Component{

	/*
		достаем токен для FB и проверяем наличие, 
		если нет то оставляем на странице с Логином, 
		если есть то переводим на следующую страницу
	*/
	
	componentWillMount(){
		this.props.loginQueryManager();
	}

	componentWillReceiveProps (prevProps){
		if(!prevProps.isLoading && prevProps.isLoggedIn){
			this.props.itemIsLoading(true);
			this.props.navigation.replace('Forecast');
		}
	}

	loginUser(){
		LoginManager.logInWithReadPermissions(["email","public_profile"]).then(
			(result) =>{
				if (result.isCancelled) {
					Alert.alert('Login cancelled: ' + result);
				}else{
					this.props.itemIsLoading(true);
					this.props.navigation.replace('Forecast');
				}
			},
			(error) => {
				Alert.alert('Login fail with error: ' + error);
			}
		);
	}

	render(){
		if(this.props.error){
			return(<ErrorScreen error={this.props.error}/>);
		}
		else if(this.props.isLoggedIn || this.props.isLoading){
			return(
				<View style={[styles.screenContainer,styles.centered]}></View>
			);
		}
		else{
			return(
				<View style={styles.screenContainer}>
					<View style={styles.componentContainer}>
						
						<View style={styles.appName}>
							<View style={styles.alignCentered}>
								<Text style={styles.appNameFont}>Weather</Text>
								<Text style={styles.appNameFont}>Forecast</Text>
							</View>
						</View>

						<View style={styles.loginFacebookContainer}>
							<View style={[styles.alignCentered,styles.loginFacebookTextMargin]}>
								<Text style={styles.textFont}>Welcome to Weather forecast App!</Text>
								<Text style={styles.textFont}>Login with your Facebook account.</Text>
							</View>
							<TouchableOpacity
								style={styles.loginButton}
								onPress={() => {
									this.loginUser()
								}}
							>
								<Text style={styles.loginButtonText}>Login with Facebook</Text>
							</TouchableOpacity>
						</View>

					</View>
				</View>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);