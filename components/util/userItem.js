//
// Description: userItem.js
// Used for user entry
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'
import {HerbyButton2} from '../../common/controls.js';

class UserItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{flex:.25}} onPress={()=>this.props.getUser(this.props.user.id)}>
          <View style={{flexDirection:'row', marginTop:10,marginHorizontal:10}}>

            <View style={{marginRight:10}}>
              <Image style={{height:60,width:60}} source={require('../../media/headshot1.png') }/>
            </View>

            <View style={{flex:.8}}>
              <View style={{flexDirection:'row'}}>
                  <View style={{marginRight:8}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>{this.props.user.name}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Image style={{height:20,width:20}} source={require('../../media/Oval129.png') }/>
                    <Text style={{marginLeft:8}}>{this.props.user.score}</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <HerbyButton2 name="relax"/>
                <HerbyButton2 name="sleep"/>
                <HerbyButton2 name="eat"/>
              </View>
          </View>
          </View>
          </TouchableOpacity>

          <View style={{justifyContent:'center',alignItems:'flex-end',marginRight:20}}>
          <TouchableOpacity>
              <Image style={{height:31-2,width:34-2,alignItems:'flex-end',alignSelf:'center'}} source={require('../../media/emptyHeart11.png') }/>
            </TouchableOpacity>
          </View>

        </View>
        <View style={{borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:0,marginTop:8}}/>
        </View>


        );
    }
}
module.exports = UserItem;
