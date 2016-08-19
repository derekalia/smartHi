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
import HerbyButton from './herbyButton.js';

class HerbyHeader extends Component {
    render() {
        return(
        <Text style={{marginLeft:20,paddingTop:10,paddingBottom:10,}}>{this.props.name}</Text>
        );
    }
}
class HerbyInput extends Component {
    _onChange(e) {
    }
    _renderName() {
        if (this.props.name != null) {
            return (
            <Text style={{width:100}}>{this.props.name}</Text>
            );
        }
        return null;
    }

    render() {
        return(
        <View style={{
            height:36,
            paddingLeft:20,
            paddingTop:10,
            paddingBottom:10,
            marginLeft:0,
            flexDirection:'row',
            alignItems:'stretch',
            backgroundColor:'white',
            borderBottomWidth:1,
            borderBottomColor:'#C8C8CC'}}>
            {this._renderName()}
          <TextInput style={{width:320,alignItems:'stretch'}} placeholder = {this.props.value}/> 
        </View>
        );
    }
}
class HerbyAlert extends Component {
    constructor(props) {
        super(props);
        var {width,height} = Dimensions.get('window');
        this._width    = width;
        this._height   = this.props.height;
        // starts above screen
        this._topStart = -this.props.height;
        // ends up half way of the screen
        this._topEnd   = (height-this.props.height)/2;
        this._child    = this.props.children;
        this.state = {
            anim: new Animated.Value(0),
            show:this.props.show
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this._startSequence();
        }
        else {
            this._dismiss();
        }
    }

     _startSequence() {
        Animated.sequence([
            Animated.timing(this.state.anim,{toValue:200,duration:1600}),
            Animated.spring(this.state.anim,{toValue:100,duration:1600}),
        ]).start();
    }

     _dismiss() {
        Animated.timing(this.state.anim,{toValue:0,duration:1000}).start();
    }
  
    render() {
        const styleSlideDown = {
            transform: [
                {translateY: this.state.anim.interpolate({
                    inputRange: [0, 100],
                    outputRange: [this._topStart, this._topEnd],
                })},
            ],
            width:this._width,
            height:this._height,
        };
        //BatsFix. Notification elements should be included below 
        return (
            <Animated.View style={[{left:0,top:this._topStart,position:'absolute',backgroundColor:'white',borderRadius:20,borderWidth:1,},styleSlideDown]}>
                {this._child}
            </Animated.View>
        );
    }
}

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
            <View>
                {/*Popup settings area*/}
             
                {/*Main settings area*/}
                <View style={{backgroundColor:'#C8C8CC',flex:1,}}>
                <HerbyHeader name="GENERAL"/>
                <HerbyInput  name="UserName" value={this._userName}/>
                <HerbyInput  name="Email" value={this._email}/>
                <HerbyButton name="Reset Password" onPress={()=> this._goResetPassword()}/>
                <HerbyHeader name="AUTHENTICATION"/>
                <HerbyButton name="Licensee Login" onPress={()=> this._goLicensee()}/>
                </View>
                 <HerbyAlert show={this.state.showAlert} height={120}>
                    <View style={{backgroundColor:'white',marginLeft:20,marginRight:20,}}>
                    <HerbyInput  value="password"/>
                    <HerbyInput  value="password"/>
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
