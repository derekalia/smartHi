//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

class SettingsScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View>
            <View style={{backgroundColor:'#EFEFF4',height:600, marginTop:63}}>


            <View style={{marginTop:30}}>
              <Text style={{marginLeft:20,marginBottom:10}}>GENERAL</Text>
              <View style={{backgroundColor:'white',borderTopWidth:1,borderTopColor:'#C8C8CC',borderBottomWidth:1,borderBottomColor:'#C8C8CC'}}>

                <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                  <TouchableHighlight><Text>Username</Text></TouchableHighlight>
                  <View style={{flexDirection:'row', alignItems:'flex-end',flex:1,marginRight:20, justifyContent:'flex-end',alignSelf:'center'}}>
                    <Text style={{color:'#C8C8CC',}}>RandomUserName </Text>
                    {/* <Image source={require('../media/ForwardArrow2.png') } style={{ width: 8, height: 14,alignItems:'flex-end' }}/> */}
                  </View>
                </View>
                <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                  <TouchableHighlight><Text>Email</Text></TouchableHighlight>
                  <View style={{flexDirection:'row', alignItems:'flex-end',flex:1,marginRight:20, justifyContent:'flex-end',alignSelf:'center'}}>
                    <Text style={{color:'#C8C8CC',}}>derek@me.com </Text>
                  </View>
                </View>
                <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>


                <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                  <TouchableHighlight><Text>Reset Password</Text></TouchableHighlight>
                  <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                    <Image source={require('../media/ForwardArrow2.png') } style={{ width: 8, height: 14,alignItems:'flex-end' }}/>
                  </View>
                </View>
              </View>
            </View>

              <View style={{marginTop:30}}>
                <Text style={{marginLeft:20,marginBottom:10}}>AUTHENTICATION</Text>
                <View style={{backgroundColor:'white',borderTopWidth:1,borderTopColor:'#C8C8CC',borderBottomWidth:1,borderBottomColor:'#C8C8CC'}}>
                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>Licensee Login</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                      <Image source={require('../media/ForwardArrow2.png') } style={{ width: 8, height: 14,alignItems:'flex-end' }}/>
                    </View>
                  </View>
                </View>
              </View>


            </View>
            </View>
        );
    }
}

module.exports = SettingsScene;
