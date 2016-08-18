//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {SwitchSceneAction, GetProductAction} from '../actions';
import HerbyButton from './herbyButton.js';

class SettingsScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View>
            <View style={{backgroundColor:'#EFEFF4',height:600,}}>


            <View style={{marginTop:30}}>
              <Text style={{marginLeft:20,paddingBottom:10}}>GENERAL</Text>
              <View style={{backgroundColor:'white',borderTopWidth:1,borderTopColor:'#C8C8CC',borderBottomWidth:1,borderBottomColor:'#C8C8CC'}}>

                <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                  <TouchableHighlight><Text>Username</Text></TouchableHighlight>
                  <View style={{flexDirection:'row', alignItems:'flex-end',flex:1,marginRight:20, justifyContent:'flex-end',alignSelf:'center'}}>
                    <Text style={{color:'#C8C8CC',}}>{this.props.user.name}</Text>
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

                {/*
                <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                  <TouchableHighlight><Text>Reset Password</Text></TouchableHighlight>
                  <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                    <Image source={require('../media/ForwardArrow2.png') } style={{ width: 8, height: 14,alignItems:'flex-end' }}/>
                  </View>
                </View>
                */}
                <HerbyButton name="Reset Password"/>
              </View>
            </View>

              <View style={{marginTop:30}}>
                <Text style={{marginLeft:20,paddingBottom:10}}>AUTHENTICATION</Text>
                <HerbyButton name="Licensee Login"/>
              </View>
            </View>
            </View>
        );
    }
}

// This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
    }
}
//  This function is used to convert action to props passed to this component.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,SwitchSceneAction, }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(SettingsScene);
