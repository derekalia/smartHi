//
// Description: herbyButton.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity} from 'react-native'

class HerbyButton extends Component {
    constructor(props) {
        super(props);
    }
    _onPress() {
        if (this.props.onPress != null) {
            this.props.onPress();
        }
    }
    render() {
        return(
        <TouchableOpacity style={{paddingLeft:20,paddingTop:10,paddingBottom:10,backgroundColor:'white',}}
            onPress={()=>this._onPress()}>
            <View style={{marginLeft:0,flexDirection:'row',height:26,alignItems:'stretch'}}>
                <TouchableHighlight style={{marginLeft:0,alignItems:'flex-start'}}><Text>{this.props.name}</Text></TouchableHighlight>
                <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                    <Image source={require('../media/ForwardArrow2.png') } style={{ width: 8, height: 14,alignItems:'flex-end' }}/>
                </View>
            </View>
        </TouchableOpacity>
        );
    }
}
module.exports = HerbyButton
