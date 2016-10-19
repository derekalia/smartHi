//
// Description: settingScene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {Animated, Dimensions, StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {SwitchSceneAction, GetProductAction, ResetPasswordAction,} from '../../../actions';
import {LicenseeSceneId,LicenseeLoginSceneId,ProcessorSceneId,ProcessorLoginSceneId,} from '../../../common/const.js';
import {HerbyBar,HerbyButton,HerbyButton2,HerbyHeader,HerbyInput,HerbyAlert} from '../../../common/controls.js';
import HerbyModal from '../../util/herbyModal.js';
import HerbyNotification from '../../util/herbyNotification.js';

class SettingsScene extends Component {
    constructor(props) {
        super(props);
        this._userName="Type user name here";
        this._email ="Type email here";
        this._password="";
        this.state = {showResetPassword:false,showProducerLogin:false,showLicenseeLogin:false}
    }
    //
    componentWillUpdate(nextProps) {
        if (nextProps.producer != null && this.state.showProducerLogin) {
            this.setState({showProducerLogin:false});
        }
        if (nextProps.retailer != null && this.state.showLicenseeLogin) {
            this.setState({showLicenseeLogin:false});
        }
    }

    // Reset password dialog
    _showResetPassword(value) {
        this.setState({showResetPassword:value});
    }
    _resetPassword() {
        this.props.ResetPasswordAction();
    }

    // Retailer settings dialog 
    _goLicensee() {
        if (this.props.retailer != null) {
            this.props.SwitchSceneAction(LicenseeSceneId);
        }
        else {
            this.props.SwitchSceneAction(LicenseeLoginSceneId);
        }
    }


    // Processor settings dialog 
    _goProducer() {
        if (this.props.producer != null) {
            this.props.SwitchSceneAction(ProcessorSceneId);
        }
        else {
            this.props.SwitchSceneAction(ProcessorLoginSceneId);
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HerbyBar navigator={this.props.navigator} name="Settings"/>

                {/*Popup settings area*/}
             
                {/*Main settings area*/}
                <View style={{backgroundColor:'#EFEFF4',flex:1,}}>
                <HerbyHeader name="GENERAL"/>
                <HerbyInput  name="UserName" value={this._userName}/>
                <HerbyInput  name="Email" value={this._email}/>
                <HerbyButton name="Reset Password" onPress={()=> this._showResetPassword(true)}/>
                <HerbyHeader name="AUTHENTICATION"/>
                <HerbyButton name="Licensee Settings" onPress={()=> this._goLicensee()}/>
                <HerbyButton name="Producer Settings" onPress={()=> this._goProducer()}/>
                </View>
                <HerbyModal show={this.state.showResetPassword} onClose={()=>this._showResetPassword(false)}>
                    <HerbyButton2 name="Continue" onPress={()=>this._resetPassword()}/>
                    <HerbyButton2 name="Cancel" onPress={()=>this._showResetPassword(false)}/>
                </HerbyModal>
            </View>
        );
    }
}

// This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
        producer: state.ProducerReducer.producer,
        retailer: state.RetailerReducer.retailer,
    }
}
//  This function is used to convert action to props passed to this component.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,SwitchSceneAction,ResetPasswordAction,}, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(SettingsScene);
