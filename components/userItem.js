//
// Description: userItem.js
// Used for user entry 
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'
import {HerbyButton2} from '../common/controls.js';

class UserItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <View style={{flexDirection:'row', marginTop:10,marginHorizontal:10}}>
          <TouchableOpacity style={{flex:.25}} onPress={()=>this.props.getUser(this.props.user.id)}>
            <Image style={{height:60,width:60}} source={require('../media/headshot1.png') }/>
          </TouchableOpacity>
          <View style={{flex:.8}}>
              <View style={{flexDirection:'row'}}>
                  <View style={{marginRight:8}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>{this.props.user.name}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Image style={{height:20,width:20}} source={require('../media/Oval129.png') }/>
                    <Text style={{marginLeft:8}}>{this.props.user.score}</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <HerbyButton2 name="relax"/>                
                <HerbyButton2 name="sleep"/>                
                <HerbyButton2 name="eat"/>                
              </View>
          </View>
          <View style={{flex:.15,justifyContent:'center'}}>
          <TouchableOpacity>
              <Image style={{height:31-2,width:34-2,alignItems:'flex-end',alignSelf:'center'}} source={require('../media/emptyHeart11.png') }/>
            </TouchableOpacity>
          </View>
        </View>
        );
    }
}
module.exports = UserItem;
