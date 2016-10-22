import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableHighlight, Image } from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//get internal components
import {SwitchSceneAction} from '../../../actions';
import {HerbyBar}         from '../../../common/controls.js';

class onBoardingThree extends Component {
    render() {
        return (
          <View style={[{flex:1  }]}>
          {/* <HerbyBar name="Scene Test"  navigator={this.props.navigator}/> */}
              <View style={{flex:.5}}></View>
              <View style={{ justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../../media/21.png')} style={{width:250-10,height:240-10}}/>
              </View>

                <View style={{flex:.5, alignItems:'center',marginTop:50}}>
                  <View>
                    <Text style={{fontWeight:'bold',color:'#606060',fontSize:18}}>AGE RESTRICTED</Text>
                  </View>
                  <View>
                    <Text  style={{color:'#979797',fontSize:15,marginHorizontal:26,marginTop:10,textAlign:'center'}}>You must be 21 or over to use this application. Are you at least 21 years of age?</Text>
                  </View>
                </View>

                <View style={{flex:.2,flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:20,marginTop:20}}>
                  <View style={{height:15,width:15,backgroundColor:'#CFEFFB',borderRadius:10}}></View>
                  <View style={{height:15,width:15,backgroundColor:'#CFEFFB',borderRadius:10, marginLeft:10}}></View>
                  <View style={{height:15,width:15,backgroundColor:'#15B4F1',borderRadius:10, marginLeft:10}}></View>
                </View>

                <View style={{flex:1, alignItems:'center'}}>
                  <TouchableOpacity style={{width:200,height:50,backgroundColor:'#A4DC10',borderRadius:40,justifyContent:'center'}} onPress={()=>this._goToAnotherScene()}>
                    <Text style={{alignSelf:'center',color:'white',fontSize:18}}>YES</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{width:200,height:50,backgroundColor:'#FF6955',borderRadius:40,justifyContent:'center',marginTop:20}} onPress={()=>this._goToBackToStart()}>
                    <Text style={{alignSelf:'center',color:'white',fontSize:18}}>NO</Text>
                  </TouchableOpacity>
                </View>

          </View>
        );
    }
    _goToAnotherScene() {
        this.props.navigator.push(this.props.launchScene);
    }
    _goToBackToStart() {
        this.props.navigator.pop();
        this.props.navigator.pop();
    }
}
//
// Connect SwitchSceneAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ SwitchSceneAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(onBoardingThree);
