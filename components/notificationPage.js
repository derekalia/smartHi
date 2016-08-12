//
// Description: mainpage.js
// This contains the declaration for the main work area of the app
// which consists of several tabs. All of the tabs are declared separately
// It should only contain logic to manipulate tabs, specifically, it
// will change the selected tab based on SwitchTabAction result.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Image, Animated, Text, Dimensions, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

// Import internal modules

import ErrorMessage  from './errorMessage.js';
import InfoMessage   from './infoMessage.js';

const InfoMessageId      = 0;
const ErrorMessageId     = 1;

const ComponentList = [
    { component: InfoMessage,   index: InfoMessageId },
    { component: ErrorMessage,  index: ErrorMessageId },
];

//
// BatsFix. Todo. IOS and android notification should be handled here also.
//
class NotificationPage extends Component {
    constructor(props) {
        super(props);
        var {width,height} = Dimensions.get('window');
        this.state = {
            anim: new Animated.Value(0),
            width: width, // this is the full width of the screen
            height: height, // this is the full height of the screen
            messageId: InfoMessageId,
            messageData: "Welcome!",
        }
    }

    // BatsFix. This is a sample call
    componentDidMount() {
       //this._startSequence(); 
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

    componentWillReceiveProps(nextProps) {
    }

    _renderMessage() {
        // BatsFix. change this to correspond to the type of message being delivered.
        var component = ComponentList[this.state.messageId];
        return (<component.component onPress={()=>this._dismiss()} messageData={this.state.messageData} width={this.state.width}/>);
    }

    render() {
        const styleSlideDown = {
            transform: [
                {translateY: this.state.anim.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-this.state.height, 0],
                })},
            ],
            width:this.state.width,
            height:this.state.height,
        };
        //BatsFix. Notification elements should be included below 
        return (
            <Animated.View style={[{left:0,top:0,position:'absolute',backgroundColor:'transparent',},styleSlideDown]}>
                {this._renderMessage()}
            </Animated.View>
        );
    }
}

//
// Map notification to prop
//
//function mapStateToProps(state) { return { messageData: state.NotificationReducer.messageData, messageId: state.NotificationReducer.messageId } }
//
// Export this module
//
// module.exports = connect(mapStateToProps)(NotificationPage);
module.exports = NotificationPage;
