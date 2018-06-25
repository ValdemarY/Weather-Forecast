import React from 'react';
import {
	ActivityIndicator,
	View, 
} from 'react-native';
import styles from '../style/LoadingStylesheet'

export default class LoadingScreen extends React.Component{
	render(){
		return(
			<View style={[styles.screenContainer,styles.centered]}>
				<ActivityIndicator size="large" color="#FFFFFF" />
			</View>
		);
	}
}