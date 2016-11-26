//
// Description: settingScene.js
//
import React, { Component } from 'react';
import {Alert,StyleSheet, Text, View,ScrollView, Image,} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {SwitchSceneAction,LogoffAction} from '../../../actions';
import {LicenseeLoginSceneId} from '../../../common/const.js';
import {HerbyBar,HerbyButton,HerbyButton2,HerbyHeader,HerbyInput} from '../../../common/controls.js';

import ChangeNameModal          from './changeNameModal.js';
import ChangeEmailModal         from './changeEmailModal.js';
import ResetPasswordModal       from './resetPasswordModal.js';
import ChangeNotificationModal  from './changeNotificationModal.js';

class SettingsScene extends Component {
    constructor(props) {
        super(props);
        this.state = {showResetPassword:false,showChangeEmail:false,showChangeName:false,showChangeNotification:false}
    }

    // Reset password dialog
    _goResetPassword(value) {
        this.setState({showResetPassword:value});
    }

    // Licensee login scene dialog. Actually go to licensee login scene.
    _goLicensee() {
        this.props.SwitchSceneAction(LicenseeLoginSceneId);
    }

    // Change name dialog
    _goChangeName(value) {
        this.setState({showChangeName:value});
    }

    // Change email dialog
    _goChangeEmail(value) {
        this.setState({showChangeEmail:value});
    }

    // Change notification settings dialog
    _goChangeNotification(value) {
        this.setState({showChangeNotification:value});
    }

    // Signout
    _goSignout() {
        this.props.LogoffAction();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HerbyBar navigator={this.props.navigator} name="Settings"/>

                {/*Popup settings area*/}

                {/*Main settings area*/}
                <View style={{backgroundColor:'#EFEFF4',flex:1,}}>
                <ScrollView>

                {/*Separator Bar*/}
                <View>
                  <Text style={{paddingLeft:20,paddingTop:16,paddingBottom:16,color:'#666666'}}> </Text>
                </View>

                <HerbyButton name='Change Name'    value={this.props.user.name} onPress={()=>this._goChangeName(true)}/>
                <HerbyButton name='Change Email'   value='this@this.com'        onPress={()=>this._goChangeEmail(true)}/>
                <HerbyButton name='Reset Password' onPress={()=>this._goResetPassword(true)}/>

                {/*Separator Bar*/}
                <View>
                  <Text style={{paddingLeft:20,paddingTop:16,paddingBottom:16,color:'#666666'}}> </Text>
                </View>

                <HerbyButton name='Notification Settings' onPress={()=>this._goChangeNotification(true)}/>

                {/*Separator Bar*/}
                <View>
                    <Text style={{paddingLeft:20,paddingTop:16,paddingBottom:16,color:'#666666'}}></Text>
                </View>

                <HerbyButton name='Licensee Authentication' onPress={()=>this._goLicensee()}/>

                {/*Separator Bar*/}
                <View>
                    <Text style={{paddingLeft:20,paddingTop:16,paddingBottom:16,color:'#666666'}}></Text>
                </View>

                <HerbyButton name='Sign Out' onPress={()=>this._goSignout()}/>

                </ScrollView>
                </View>
                <ResetPasswordModal      visible={this.state.showResetPassword}       onClose={()=>this._goResetPassword(false)}      user={this.props.user}/>
                <ChangeNameModal         visible={this.state.showChangeName}          onClose={()=>this._goChangeName(false)}         user={this.props.user}/>
                <ChangeEmailModal        visible={this.state.showChangeEmail}         onClose={()=>this._goChangeEmail(false)}        user={this.props.user}/>
                <ChangeNotificationModal visible={this.state.showChangeNotification}  onClose={()=>this._goChangeNotification(false)} user={this.props.user}/>
            </View>
        );
    }
}

// This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        user:     state.UserReducer.profile,
        producer: state.ProducerReducer.producer,
        retailer: state.RetailerReducer.retailer,
    }
}
//  This function is used to convert action to props passed to this component.
//
function mapActionToProps(dispatch) { return bindActionCreators({SwitchSceneAction,LogoffAction}, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(SettingsScene);
