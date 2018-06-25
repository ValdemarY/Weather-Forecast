import React from 'react';
import {
	ActivityIndicator,
	View, 
	Text,
} from 'react-native';
import styles from '../style/ErrorStylesheet'

export default class ErrorScreen extends React.Component{
	render(){
		return(
			<View style={styles.connectionErrorContainer}>
				<View style={styles.connectionErrorView}>
					<Text style={styles.errorText}>Error has happened with a message:</Text>
					<Text style={styles.errorText}>{this.props.error}</Text>
				</View>
			</View>
		);
	}
}