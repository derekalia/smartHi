//
// Description: licenseeLoginScene.js
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableHighlight, Image } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {LicenseeLoginAction} from '../../../actions';
import {HerbyButton2,HerbyInput,HerbyBar,}         from '../../../common/controls.js';
import HerbyNotification from '../../util/herbyNotification.js';

class LicenseeLoginScene extends Component {
    constructor(props) {
        super(props);
    }

    _licenseeLogin() {
        //
        // Go to product page
        //
       this.props.LicenseeLoginAction();
    }

    render() {
        return (
            <View style={[{ flex: 1 }]}>
                <HerbyBar name="Retailer Login"  navigator={this.props.navigator}/>
                <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#DEDEDE',}}>
                    <HerbyInput name="State" value=''/>
                    <HerbyInput name="Email" value=''/>
                    <HerbyInput name="UBI" value=''/>
                    <HerbyInput name="Password"  value=''/>
                    <View style={{flexDirection:'row'}}>
                        <HerbyButton2 name="Continue" onPress={()=>this._licenseeLogin()}/>
                    </View>
                    <HerbyNotification/>
                </View>
            </View>
        );
    }
}


//
// Connect LoginLicenseeAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ LicenseeLoginAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(LicenseeLoginScene);
