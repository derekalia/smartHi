//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

class LicenseeAuthScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View>
            <View style={{backgroundColor:'#EFEFF4',height:600, marginTop:66}}>
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




                <View style={{marginTop:40}}>
                  <Text style={{marginLeft:20,marginBottom:10}}>STATUS</Text>
                  <View style={{backgroundColor:'white',borderTopWidth:1,borderTopColor:'#C8C8CC',borderBottomWidth:1,borderBottomColor:'#C8C8CC'}}>
                    <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                      <TouchableHighlight><Text>Connection</Text></TouchableHighlight>
                      <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                        <Text style={{color:'#C8C8CC'}}>Synced</Text>
                      </View>
                    </View>
                  </View>
                </View>


</View>
            </View>
        );
    }
}

module.exports = LicenseeAuthScene;
