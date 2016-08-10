//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

class InfoMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={{height:50,marginTop:63,width:390,justifyContent:'center',backgroundColor:'red',alignItems:'center'}} onPress={()=>this.props.onPress()}>
                <View style={{alignItems:'center','opacity':0.90,justifyContent:'center'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:16}}>
                        {this.props.messageData}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = InfoMessage;
