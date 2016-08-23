//
// Description: userFrame.js
// Used for searching and listing users
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

class UserFrame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <ScrollView style={{marginTop: 0,}}>

            <View style={{flexDirection:'row', marginTop:10,marginHorizontal:20}}>
              <View style={{flex:.25}}>
                <Image style={{height:60,width:60}} source={require('../media/headshot1.png') }/>
              </View>
              <View style={{flex:.8}}>
                <View style={{flexDirection:'column'}}>
                  <View style={{flexDirection:'row'}}>
                      <View style={{marginRight:8}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>TommyChong</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image style={{height:20,width:20}} source={require('../media/Oval129.png') }/>
                        <Text style={{marginLeft:8}}>123</Text>
                      </View>
                  </View>
                  <View style={{flexDirection:'row'}}>
                  </View>
                </View>
              </View>
              <View style={{flex:.15,justifyContent:'center'}}>
              <TouchableHighlight>
                  <Image style={{height:31-2,width:34-2,alignItems:'flex-end',alignSelf:'center'}} source={require('../media/emptyHeart11.png') }/>
                </TouchableHighlight>
              </View>
            </View>

        </ScrollView>
        );
    }
}

module.exports = UserFrame;
