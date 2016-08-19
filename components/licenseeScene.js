//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import {StyleSheet, Text, View, } from 'react-native'

import {SwitchSceneAction,} from '../actions';
import {LicenseeStoreSceneId,} from '../common/const.js';

import {HerbyButton,HerbyHeader,HerbyInput,HerbyAlert} from '../common/controls.js';


class LicenseeScene extends Component {
    constructor(props) {
        super(props);
    }
    _onDone() {
        //BatsFix. for now just switch to upload store scene        
        this.props.SwitchSceneAction(LicenseeStoreSceneId);
    }
    render() {
        return (
            <View style={{backgroundColor:'#EFEFF4',flex:1,}}>
                <HerbyHeader name="User Info"/>
                <HerbyInput  name="State"    value="Type state here"/>
                <HerbyInput  name="Email"    value="Type email here"/>
                <HerbyInput  name="UBI"      value="Type UBI here"/>
                <HerbyInput  name="Password" value="Type password here"/>
                <HerbyButton name="Done" onPress={()=> this._onDone()}/>
            </View>
        );
    }
}

//
// Connect SwitchSceneAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ SwitchSceneAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(LicenseeScene);
