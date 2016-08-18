//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

class LicenseeScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View>
            <View style={{backgroundColor:'#EFEFF4',height:600, marginTop:63}}>
              <View style={{marginTop:30}}>
                <Text style={{marginLeft:20,marginBottom:10}}>USER INFO</Text>
                <View style={{backgroundColor:'white',borderTopWidth:1,borderTopColor:'#C8C8CC',borderBottomWidth:1,borderBottomColor:'#C8C8CC'}}>
                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>State</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                    <Text style={{color:'#C8C8CC'}}>Washington</Text>
                    </View>
                  </View>

                  <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>Email</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                      <Text style={{color:'#C8C8CC'}}>derek@forged.io</Text>
                    </View>
                  </View>

                  <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>UBI</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                      <Text style={{color:'#C8C8CC'}}>481939</Text>
                    </View>
                  </View>
                  <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>Password</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                      <Text style={{color:'#C8C8CC'}}>*******</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>



                <View style={{marginTop:200}}>
                  <Text style={{marginLeft:20,marginBottom:10}}>Status</Text>
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
        );
    }
}

module.exports = LicenseeScene;
