import React from 'react';
import {Text, View} from 'react-native';
import {APP_WIDTH,APP_HEIGHT} from '../constants/constant';
import {BASIC_TEXT_VIEW_HEIGHT, BASIC_FONT_SIZE} from '../constants/responsiveConstForecast';

//Длинну символа условно возьмем за половину от его высоты.

export default class ResponsiveText extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			width: APP_WIDTH,
			height: BASIC_FONT_SIZE,
		};
	}
	
	responsiveFontSize(width,height,textlength){
		let oneSymbol = 2*width/textlength;
		if(oneSymbol<height) return oneSymbol;
		else return height;
	}

	render(){
		return(
			<View>
				<Text
					numberOfLines={1}
					style={{
						color:this.props.color,
						fontFamily:'Roboto-Light',
						fontSize: this.props.fontSize == undefined 
							? this.responsiveFontSize(
								this.props.width == undefined ? this.state.width : this.props.width,
								this.props.height == undefined ? this.state.height : this.props.height,
								(this.props.text).length
							)
							: this.props.fontSize
					}}
				>
				{this.props.text}
				</Text>
			</View>
		);
	}
}


