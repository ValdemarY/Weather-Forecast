import React from 'react';
import {
	Text, 
	View, 
	TouchableOpacity,
	Alert
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Button} from 'react-native-elements'

const styles = require('./style/Styles');
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

/*
	!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Важно!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	Это не окончательная версия программы, у меня осталось очень
	много идей по поводу реализации, повышения эффективности
	и уменьшения массива кода за счет наследований и т. д., 
	В коде будут попадатся аналогичные методы, особенно связанные с StyleSheet,
	Facebook и SideBar и я в течении ближайшего времени 
	займусь оптимизацией и структурированием, но в виду того что сроки
	уже на носу я скидываю рабочую реализацию в таком виде, какая она есть сейчас.
	В ближайшее время я планирую добавить:
	- Навигация с помощью navigate а не replace,
	- Плавные переходы между страницами,
	- Лого приложения на титульной странице, 
	- Поправить шрифты и их размеры на всех страницах, 
	- Оптимизировать код,
	- Добавить обновление погоды,
	- Больше элементов материал дизайна, и т. д.
	Надеюсь что данная версия будет хорошим результатом с вашей стороны.
	Спасибо.
*/

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
					Alert.alert('Login cancelled: ' + result);
				}else{
					this.props.navigation.replace('Forecast');
				}
			},
			(error) => {
				Alert.alert('Login fail with error: ' + error);
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
							<Button
								containerViewStyle={{
									marginLeft: 0,
									width: '100%',
								}}
								buttonStyle={{
									height: 40,
									backgroundColor: '#428bca',
								}}
								title='Login with Facebook'
								onPress = {() => {
									this.loginUser()
								}}
							/>

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