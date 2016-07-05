import React, { Component } from 'react';
import {StyleSheet,Text,View,ListView,ListViewDataSource,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native'

//get internal components 
import Styles from './styles.js';

class AboutScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                   <View style={[Styles.container,{flex:2}]}>
                   </View>
                   <View style={[Styles.container,{alignItems: 'center',flex:1}]}>
                        <Text> This is where text about the app should go </Text>
                  </View>
                   <View style={[Styles.container,{flex:2}]}>
                   </View>
                </View>
            );
    }
}

module.exports=AboutScene

