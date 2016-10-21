import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableHighlight, Image } from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//get internal components
import {SwitchSceneAction} from '../../../actions';
import {HerbyBar}         from '../../../common/controls.js';

class onBoardingTwo extends Component {
    render() {
        return (
          <View style={[{flex:1  }]}>
          {/* <HerbyBar name="Scene Test"  navigator={this.props.navigator}/> */}
              <View style={{flex:1}}></View>
              <View style={{ justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../../media/friends_onboarding1.png')} style={{width:340,height:240}}/>
              </View>

                <View style={{flex:.5, alignItems:'center',marginTop:60}}>
                  <View>
                    <Text style={{fontWeight:'bold',color:'#606060',fontSize:18}}>FIND PEOPLE LIKE YOU</Text>
                  </View>
                  <View>
                    <Text  style={{color:'#979797',fontSize:15,marginHorizontal:26,marginTop:10,textAlign:'center'}}>Find products from people with similar interests by following and...</Text>
                  </View>
                </View>

                <View style={{flex:.2,flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:20,marginTop:20}}>
                  <View style={{height:15,width:15,backgroundColor:'#CFEFFB',borderRadius:10}}></View>
                  <View style={{height:15,width:15,backgroundColor:'#15B4F1',borderRadius:10, marginLeft:10}}></View>
                  <View style={{height:15,width:15,backgroundColor:'#CFEFFB',borderRadius:10, marginLeft:10}}></View>
                </View>

                <View style={{flex:1, alignItems:'center'}}>
                  <TouchableOpacity style={{width:200,height:50,backgroundColor:'#15B4F1',borderRadius:40,justifyContent:'center'}} onPress={()=>this._goToAnotherScene()}>
                    <Text style={{alignSelf:'center',color:'white',fontSize:18}}>NEXT</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{width:200,height:70,borderRadius:40,justifyContent:'center'}} onPress={()=>this._goToAnotherScene()}>
                    <Text style={{alignSelf:'center',color:'#424242',fontSize:18}}>Skip</Text>
                  </TouchableOpacity>
                </View>

          </View>
        );
    }
    _goToAnotherScene() {
        this.props.navigator.push(this.props.onBoardingThree);
    }
}
//
// Connect SwitchSceneAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ SwitchSceneAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(onBoardingTwo);
