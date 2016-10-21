import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableHighlight, Image } from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//get internal components
import {SwitchSceneAction} from '../../../actions';
import {HerbyBar}         from '../../../common/controls.js';

class onBordingTwo extends Component {
    render() {
        return (
            <View style={[{ flex: 1 }]}>
            {/* <HerbyBar name="Scene Test"  navigator={this.props.navigator}/> */}
                <View>
                    <TouchableOpacity onPress={()=>this._goToAnotherScene()}>
                    <Text>Go to another Scenem,m,m</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _goToAnotherScene() {
        this.props.SwitchSceneAction(LoginSceneId);
    }
}
//
// Connect SwitchSceneAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ SwitchSceneAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(onBordingTwo);
