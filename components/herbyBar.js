//
// Description: herbyBar.js
// Generic navigation bar
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Navigator} from 'react-native'

class HerbyBar extends Component {
    render() {
        return (
            <View style={{height:60,backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:12,marginTop:30}}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'flex-start' }}>
                    <TouchableOpacity onPress={()=>this.props.navigator.jumpBack()} style={{flexDirection: "row",alignItems:'center'}}>
                        <Image  source={require("../media/BackArrow.png") } style={{ width: 12, height: 19 }} />
                        <Text style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center' }}>
                    <TouchableOpacity style={{alignItems:'center'}}>
                        <Text style={{ fontSize: 18, fontWeight:'bold' }}>ITEM</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'flex-end' }}>
                    <TouchableOpacity >
                        <Image  source={require("../media/emptyHeart11.png") } style={{ width: 21+3, height: 19+3 }} />
                    </TouchableOpacity>
                </View>
              </View>
            </View>
        );
    }
}

module.exports = HerbyBar;
