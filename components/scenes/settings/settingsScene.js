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
        this.state = {showResetPassword:false,showChangeEmail:false,showChangeName:false}
    }

    // Reset password dialog
    _goResetPassword(value) {
        this.setState({showResetPassword:value});
    }

    _resetPassword() {
        //BatsFix. Call reset password here. 
    }

    // Licensee login scene dialog
    _goLicensee() {
        this.props.SwitchSceneAction(LicenseeLoginSceneId);
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

                <HerbyButton name='Change Name'/>
                <HerbyButton name='Change Email'/>
                <HerbyButton name='Reset Password' onPress={()=>this._goResetPassword(true)}/>

                {/*Separator Bar*/}
                <View>
                  <Text style={{paddingLeft:20,paddingTop:16,paddingBottom:16,color:'#666666'}}> </Text>
                </View>

                <HerbyButton name='Notification Settings'/>

                {/*Separator Bar*/}
                <View>
                    <Text style={{paddingLeft:20,paddingTop:16,paddingBottom:16,color:'#666666'}}></Text>
                </View>

                <HerbyButton name='Licensee Authentication' onPress={()=>this._goLicensee()}/>

                {/*Separator Bar*/}
                <View>
                    <Text style={{paddingLeft:20,paddingTop:16,paddingBottom:16,color:'#666666'}}></Text>
                </View>

                <HerbyButton name='Sign Out'/>

                </ScrollView>
                </View>

                <HerbyModal show={this.state.showResetPassword} onClose={()=>this._goResetPassword(false)}>
                    <View style={{backgroundColor:'white',alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                        <HerbyInput style={{marginLeft:20,marginRight:20}} value="Password"/>
                        <HerbyInput style={{marginLeft:20,marginRight:20}} value="Password"/>
                        <View style={{flexDirection:'row'}}>
                            <HerbyButton2 name="Continue" onPress={()=>this._resetPassword()}/>
                            <HerbyButton2 name="Cancel" onPress={()=>this._goResetPassword(false)}/>
                        </View>
                    </View>
                </HerbyModal>
            </View>
        );
    }
}

// This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        user:     state.UserReducer.user,
        producer: state.ProducerReducer.producer,
        retailer: state.RetailerReducer.retailer,
    }
}
//  This function is used to convert action to props passed to this component.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,SwitchSceneAction,ResetPasswordAction,}, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(SettingsScene);
