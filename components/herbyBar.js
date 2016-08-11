//
// Description: herbyBar.js
// Generic navigation bar 
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Navigator} from 'react-native'

class HerbyBar extends Component {
    render() {
        return (
            <TouchableOpacity style={{height:60,paddingTop:20,backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2'}} 
               onPress={()=>this.props.navigator.jumpBack()}>
                <View style={{ flex: 1, marginTop: 11, flexDirection: "row", justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 13, }}>
                    <Image  source={require("../media/BackArrow.png") } style={{ width: 12, height: 19 }} />
                    <Text style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = HerbyBar;
