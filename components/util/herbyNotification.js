//
// Description: notification.js
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class HerbyNotification extends Component {
    constructor(props) {
        super(props);
    }
    _getBusy() {
        if (this.props.showBusy == false) {
            return null;
        }
        return(
            <Image style={{height:50,width:50,alignSelf:'center'}} source={require('../../media/busy.gif')}/>
        );
    }
    _getMessage() {
        if (this.props.showMessage == false) {
            return null;
        }
        return(
            <Text style={{alignSelf:'center'}}>{this.props.message}</Text>
        );
    }
    render() {
        return (
            <View style={{position:'absolute',left:0,bottom:0,right:0,height:this.props.showMessage || this.props.showBusy?50:0}}>
                {this._getBusy()}
                {this._getMessage()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        showMessage: state.NavigationReducer.showMessage,
        showBusy:    state.NavigationReducer.showBusy,
        message:     state.NavigationReducer.message,
    }
}
module.exports = connect(mapStateToProps)(HerbyNotification);
