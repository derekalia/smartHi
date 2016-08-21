//
// Description: settingScene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {Animated, Dimensions, StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {SwitchSceneAction, GetProductAction} from '../actions';
import {LicenseeSceneId,} from '../common/const.js';
import {HerbyButton,HerbyHeader,HerbyInput,HerbyAlert} from '../common/controls.js';

class SettingsScene extends Component {
    constructor(props) {
        super(props);
        this._userName="Type user name here";
        this._email ="Type email here";
        this.state = {showAlert:false}
    }

    _goLicensee() {
        this.props.SwitchSceneAction(LicenseeSceneId);
    }

    _goResetPassword() {
        current = this.state.showAlert;
        this.setState({showAlert:!current});
    }

    render() {
        return (
            <View style={{flex:1}}>
                {/*Popup settings area*/}
             
                {/*Main settings area*/}
                <View style={{backgroundColor:'#EFEFF4',flex:1,}}>
                <HerbyHeader name="GENERAL"/>
                <HerbyInput  name="UserName" value={this._userName}/>
                <HerbyInput  name="Email" value={this._email}/>
                <HerbyButton name="Reset Password" onPress={()=> this._goResetPassword()}/>
                <HerbyHeader name="AUTHENTICATION"/>
                <HerbyButton name="Licensee Login" onPress={()=> this._goLicensee()}/>
                </View>
                 <HerbyAlert show={this.state.showAlert} height={136}>
                    <View style={{backgroundColor:'white',marginLeft:20,marginRight:20,}}>
                    <HerbyInput  value="Type password"/>
                    <HerbyInput  value="Type password again"/>
                    <HerbyButton name="Done" onPress={()=>this._goResetPassword()}/>
                    </View>
                </HerbyAlert>
 
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
