//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

class ErrorMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={{flex:1,backgroundColor:'transparent',justifyContent:'center',alignItems:'center',}} onPress={()=>this.props.onPress()}>
                <View style={{height:100,width:this.props.width,alignItems:'center',backgroundColor:'blue'}}>
                    <Text style={{marginTop:30}}>
                        {this.props.messageData}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = ErrorMessage;
