import React, { Component } from 'react';
import {Animated, Dimensions, StyleSheet, Text, View, Slider, Image, TextInput, TouchableHighlight, TouchableOpacity,} from 'react-native'

//
// BatsFix. All of these controls need to be styled correctly to fit different screen size/resolutions.
//

export class HerbyButton extends Component {
    constructor(props) {
        super(props);
    }
    _onPress() {
        if (this.props.onPress != null) {
            this.props.onPress();
        }
    }
    render() {
        return(
        <TouchableOpacity style={{paddingLeft:20,paddingTop:16,paddingBottom:16,backgroundColor:'white',}}
            onPress={()=>this._onPress()}>
            <View style={{marginLeft:0,flexDirection:'row',height:26,alignItems:'stretch'}}>
                <TouchableHighlight style={{marginLeft:0,alignItems:'flex-start'}}><Text>{this.props.name}</Text></TouchableHighlight>
                <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                    <Image source={require('../media/ForwardArrow2.png') } style={{ width: 8, height: 14,alignItems:'flex-end' }}/>
                </View>
            </View>
        </TouchableOpacity>
        );
    }
}

export class HerbyHeader extends Component {
    render() {
        return(
        <Text style={{paddingLeft:20,paddingTop:16,paddingBottom:16,}}>{this.props.name}</Text>
        );
    }
}

export class HerbyInput extends Component {
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

export class HerbyAlert extends Component {
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
        return (
            <Animated.View style={[{left:0,top:this._topStart,position:'absolute',backgroundColor:'white',borderRadius:20,borderWidth:1,},styleSlideDown]}>
                {this._child}
            </Animated.View>
        );
    }
}
