import React from 'react';
import {
	StyleSheet, 
	Text, 
	View, 
	TouchableOpacity,
	YellowBox,
	Image,
	Alert,
} from 'react-native';
import styles from '../style/SideBarStylesheet'
import {LoginManager} from 'react-native-fbsdk'

export default class SideBar extends React.Component{

	logoutUser(){
		LoginManager.logOut();
		this.props.navigation.replace('Login');
	};

	render(){
		return(
			<View style={styles.sideBarContainer}>
				<View style={styles.sideBarView}>
					<Text style={styles.sideBarText}>Welcome, {this.props.user}</Text>
					<TouchableOpacity
						style={styles.sideBarButton}
						onPress = {() => {
							this.logoutUser();
						}}
					>
						<Text style={styles.sideBarText}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}