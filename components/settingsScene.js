//
// Description: settingScene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {SwitchSceneAction, GetProductAction} from '../actions';
import {LicenseeSceneId,} from '../common/const.js';
import HerbyButton from './herbyButton.js';

class HerbyHeader extends Component {
    render() {
        return(
        <Text style={{marginLeft:20,paddingTop:10,paddingBottom:10}}>{this.props.name}</Text>
        );
    }
}
class HerbyInput extends Component {
    _onChange(e) {
    }

    render() {
        return(
        <View style={{
            height:36,
            paddingLeft:20,
            paddingTop:10,
            paddingBottom:10,
            marginRight:20,
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'white',
            borderBottomWidth:1,
            borderBottomColor:'#C8C8CC'}}>
          <Text style={{flex:1,alignSelf:'flex-start'}}>{this.props.name}</Text>
          <TextInput style={{flex:1,alignSelf:'flex-end'}} placeholder = {this.props.value}/> 
        </View>
        );
    }
}

class SettingsScene extends Component {
    constructor(props) {
        super(props);
        this._userName="Type user name here";
        this._email ="Type email here";
    }

    _goLicensee() {
        this.props.SwitchSceneAction(LicenseeSceneId);
    }

    _goResetPassword() {
    }

    render() {
        return (
            <View style={{backgroundColor:'#EFEFF4',flex:1,}}>
            <HerbyHeader name="GENERAL"/>
            <HerbyInput  name="UserName" value={this._userName}/>
            <HerbyInput  name="Email" value={this._email}/>
            <HerbyButton name="Reset Password" onPress={()=> this._goResetPassword()}/>
            <HerbyHeader name="AUTHENTICATION"/>
            <HerbyButton name="Licensee Login" onPress={()=> this._goLicensee()}/>
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
