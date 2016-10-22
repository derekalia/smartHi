import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableHighlight, Image } from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//get internal components
import {SwitchSceneAction} from '../../../actions';
import {HerbyBar}         from '../../../common/controls.js';

class onBoardingOne extends Component {
    render() {
        return (
            <View style={[{flex:1  }]}>
            {/* <HerbyBar name="Scene Test"  navigator={this.props.navigator}/> */}
                <View style={{flex:.5}}></View>
                <View style={{flex:1,width:400,height:200}}>
                  <Image source={require('../../../media/super1.png')} style={{width:400,height:300}}/>
                </View>

                  <View style={{flex:.8, alignItems:'center'}}>
                    <View>
                      <Text style={{fontWeight:'bold',color:'#606060',fontSize:18}}>FIND THE RIGHT CANNABIS</Text>
                    </View>
                    <View>
                      <Text  style={{color:'#979797',fontSize:15,marginHorizontal:26,marginTop:10,textAlign:'center'}}>SmartHi helps you choose products by understanding
                      how different products effect you on a personal level.</Text>
                    </View>
                  </View>

                  <View style={{flex:.2,flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:20}}>
                    <View style={{height:15,width:15,backgroundColor:'#15B4F1',borderRadius:10}}></View>
                    <View style={{height:15,width:15,backgroundColor:'#CFEFFB',borderRadius:10, marginLeft:10}}></View>
                    <View style={{height:15,width:15,backgroundColor:'#CFEFFB',borderRadius:10, marginLeft:10}}></View>
                  </View>

                  <View style={{flex:1, alignItems:'center'}}>
                    <TouchableOpacity style={{width:200,height:50,backgroundColor:'#15B4F1',borderRadius:40,justifyContent:'center'}} onPress={()=>this._goToAnotherScene()}>
                      <Text style={{alignSelf:'center',color:'white',fontSize:18}}>NEXT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:200,height:70,borderRadius:40,justifyContent:'center'}} onPress={()=>this._goToSkip()}>
                      <Text style={{alignSelf:'center',color:'#424242',fontSize:18}}>Skip</Text>
                    </TouchableOpacity>
                  </View>

            </View>
        );
    }


    _goToAnotherScene() {
        this.props.navigator.push(this.props.onBoardingTwo);
    }
    _goToSkip() {
        this.props.navigator.push(this.props.launchScene);
    }
}
//
// Connect SwitchSceneAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ SwitchSceneAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(onBoardingOne);
