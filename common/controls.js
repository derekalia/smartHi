import React, { Component } from 'react';
import {Picker,Modal,ScrollView, Animated, Dimensions, StyleSheet, Text, View, Slider, Image, TextInput, TouchableHighlight, TouchableOpacity,} from 'react-native'

class HerbyMultiItem extends Component {
    render() {
        var borderColor = '#DEDEDE';
        var borderWidth = 1;
        if (this.props.selected == this.props.id) {
            borderColor = 'blue';
            borderWidth = 2;
        }
        return(
            <TouchableOpacity 
             onPress={() => this.props.onPress(this.props.id)} 
             style={{borderBottomWidth:borderWidth,borderBottomColor:borderColor,borderColor:'#DEDEDE',flex:1,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:16,margin:6}}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}

export class HerbyMulti extends Component {
    constructor(props) {
        super(props);
        this.state= {selected: 0 };
    }
    _onPress(value) {
        this.setState({selected:value});
    }
    _getItems() {
        var items = [];
        for (var i=0; i < this.props.items.length; i++) {
            value = this.props.items[i];
            items.push(
                <HerbyMultiItem id={i} name={value} selected={this.state.selected} onPress={(t)=>this._onPress(t)} key={i}/>
            );
        }
        return items;
    }
    render() {
        return (
            <View style={{flex:1,margin:10}}>
            <Text style={{justifyContent:'flex-start',fontSize:16, fontWeight:'bold',marginTop:10,marginBottom:10}}>{this.props.label}</Text>
            <View style={{right:0,justifyContent:'flex-start',flexDirection:'row',}}>
                {this._getItems()}
            </View>
            </View>
        );
    }
}

export class HerbySlider extends Component {
    constructor(props) {
        super(props);
        this.styles = StyleSheet.create({
            label: {
                fontSize:18,
                fontWeight:'bold',
                marginLeft:10,
            },
        });
    }
    _onValueChange(value) {
        if (this.props.onValueChange) {
            this.props.onValueChange(value)
        }
    }
    render() {
        return (
            <View style={{margin:10}}>
                <Text style={this.styles.label}>{this.props.label}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={this.styles.label}>{this.props.minLabel}</Text>
                    <Slider minimumValue={this.props.min} maximumValue={this.props.max} onSlidingComplete={(t)=>this._onValueChange(t)} style={{flex:1,marginLeft:10}}/>
                    <Text style={this.styles.label}>{this.props.maxLabel}</Text>
                </View>
            </View>
        )
    }
}
 
export class HerbyPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue:this.props.options[0],
            showPicker:false,
        }
    }
    _onValueChange(value) {
        this.setState({selectedValue:value});
        this._showPicker();
    }
    _showPicker() {
        var current = this.state.showPicker;
        if (!current) {
            this.setState({showPicker:true});
        }
        else {
            this.setState({showPicker:false});
        }
    }
    _getItems() {
        var items = [];
        for (var i=0; i < this.props.options.length; i++) {
            var value = this.props.options[i]; 
            items.push(
                <Picker.Item label={value} value={value} key={value}/>
            );
        }
        return items;
    }
    render() {
        return (
        <View style={{zIndex:999}}>
            <TouchableOpacity style={{height:this.props.style.height}} onPress={()=>this._showPicker()}>
                <Text style={{fontSize:this.props.fontSize}}>{this.state.selectedValue}</Text>
            </TouchableOpacity>
            <Picker selectedValue={this.state.selectedValue} onValueChange={(t)=>this._onValueChange(t)} 
                style={{
                    left:20,
                    top:0,
                    backgroundColor:'white',
                    borderWidth:1,
                    borderColor:'#CCCCCC',
                    position:'absolute',
                    width:100,
                    zIndex:this.state.showPicker?999:-999,
                    opacity:this.state.showPicker?100:0}}>
                {this._getItems()}
            </Picker>
        </View>
        );
    }
}
export class HerbyBar extends Component {
    constructor(props) {
        super(props);
        var showFullHeart = false;
        if (this.props.showFullHeart != null && this.props.showFullHeart == true) {
            showFullHeart = true;
        }
        this.state = {showFullHeart:showFullHeart};
    }
    _onLike() {
        if (this.state.showFullHeart == false) {
            this.setState({showFullHeart:true});
        }
        else {
            this.setState({showFullHeart:false});
        }
        this.props.onLike();
    }
    _getHeart() {
        if (this.props.onLike != null) {
            return (
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'flex-end' }}>
                <TouchableOpacity onPress={()=> this._onLike()}>
                    <Image  source={this.state.showFullHeart?require("../media/fullHeart.png"):require("../media/emptyHeart11.png") }
                    style={{ width: 21+3, height: 19+3 }} />
                </TouchableOpacity>
            </View>
            );
        }
        return (<View style={{flex:1}}/>);
    }
    render() {
        return (
        <View style={{height:60,backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2',alignItems:'center',justifyContent:'center'}}>
        <View style={{flexDirection:'row',marginTop:20,marginHorizontal:10}}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'flex-start' }}>
                <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{flexDirection: "row",alignItems:'center'}}>
                    <Image  source={require("../media/BackArrow.png") } style={{ width: 12, height: 19 }} />
                    <Text style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center' }}>
                    <Text style={{ fontSize: 18, fontWeight:'bold',alignSelf:'center' }}>{this.props.name}</Text>
            </View>
            {this._getHeart()}
        </View>
        </View>
        );
    }
}

//
// BatsFix. All of these controls need to be styled correctly to fit different screen size/resolutions.
//
export class HerbyFrameBar extends Component {
    constructor(props) {
        super(props);
        this.state = {frameId: 0};
    }

    _setFrame(frameId) {
        this.setState({frameId:frameId});
        this.props.setFrame(frameId);
    }

    render() {
        var menuItems = [];
        for (var i=0; i < this.props.entries.length; i++) {
            menuItems.push(this._getMenu(i));
        }
        return (
          <View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:0,height:42,backgroundColor:'white',
                    shadowColor: "#000000",
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    shadowOffset: {
                      height: 2,
                      width: 0
                    }}}>
                {menuItems}
              </View>
          </View>
        );
    }

    _getMenu(index) {
        var styles={
            normal: {
                backgroundColor: 'white',
                borderBottomWidth: 0,
            },
            normalText: {
              marginBottom:16,
                color:"#9B9B9B",
            },
            selected: {
                backgroundColor: 'white',
                borderBottomWidth: 2,
                borderColor:"#468EE5",
            },
            selectedText: {
              marginBottom:16,
                color:"#468EE5",
            },
        }

        var entryStyle = this.state.frameId == index? styles.selected: styles.normal;
        var entryTextStyle  = this.state.frameId == index? styles.selectedText: styles.normalText;
        var entryText = this.props.entries[index];
        return (

            <TouchableOpacity
                key={index}
                style={[entryStyle ,{height: 23,flexDirection: "row",alignItems:'center',flex: 1,alignSelf: 'flex-end',justifyContent:'center'}]}
                onPress={()=>this._setFrame(index)}>
                <Text style={entryTextStyle}>{entryText}</Text>
           </TouchableOpacity>

        );
    }
}

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

const HerbyButton2Styles = StyleSheet.create({
    button: {
        margin: 5,
        borderRadius: 10,
        height:40,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#468EE5',
    },
    buttonText: {
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        color: 'white',
        backgroundColor:'#468EE5'
    },
});

export class HerbyButton2 extends Component {
    _onPress() {
        if (this.props.onPress != null) {
            this.props.onPress();
        }
    }
    render() {
        return(
            <TouchableOpacity style={HerbyButton2Styles.button} onPress={() => this._onPress()}>
                <Text style={HerbyButton2Styles.buttonText}>{this.props.name}</Text>
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
