import React, { Component } from 'react';
import {ScrollView, Animated, Dimensions, StyleSheet, Text, View, Slider, Image, TextInput, TouchableHighlight, TouchableOpacity,} from 'react-native'

//
// Helper class for HerbySearchBar
//
class HerbySearchBarItem extends Component {
    _onPress() {
        this.props.onPress(this.props.name);
    }
    render () {
        var selected= (this.props.selected == this.props.name);
        return(
        <TouchableOpacity onPress={()=>this._onPress()} style={{marginLeft:10,marginRight:10,borderBottomWidth:selected?2:0,borderColor:'blue',}}>
           <Text style={{marginBottom:16,color:selected?'blue':'#ECECEC',}}>{this.props.name}</Text> 
        </TouchableOpacity>
        );
    }
}

export class HerbySearchBar extends Component {
    constructor(props) {
        super(props);
        this._searchText = "";
        if (this.props.entries.length > 0) {
            this.state = {selected:this.props.entries[0]};
        }
    }
    _onChange(event) {
        this._searchText = event.nativeEvent.text;
    }
    _onSearch() {
        if (this.props.startSearch != null) {
            this.props.startSearch(this._searchText);
        }
    }
    _selectMenu(entry) {
        console.log("selected entry" + entry);
        this.setState({selected:entry});
    }
    _getMenu() {
        var menuItems = [];
        for (var i=0; i < this.props.entries.length; i++) {
            var name = this.props.entries[i];
            menuItems.push(
                <HerbySearchBarItem key={i} name={name} onPress={(t)=>this._selectMenu(t)} selected={this.state.selected}/>
            );
        }
        return menuItems;
    }
    render() {
        return(
        <View>
         <View style={{flexDirection: "row",marginTop:20,marginLeft:10,marginRight:10,}}>
            <View style={[{ flex: 5,}]}>
              <View style={{height: 34,borderWidth:3,borderColor:'#ECECEC',borderRadius:8,backgroundColor: '#ECECEC',}}>
                <TextInput style={{marginHorizontal:10,
                  height:28,
                  fontSize: 20,
                  backgroundColor: '#ECECEC',}}
                    autoCapitalize  = "none"
                    autoCorrect     = {false}
                    placeholder     = "Search"
                    returnKeyType   = "next"
                    onChange        = {(e) => this._onChange(e)}
                    clearButtonMode = 'always'
                    />
                    </View>
            </View>
            <View style={{flex:.1}}></View>
            <TouchableOpacity style={{flex: .6,marginRight:10,}} onPress={this._startSearch}>
                <View style={[{  borderWidth: 1,justifyContent:'center',alignItems:'center',borderColor: "#4A90E2", backgroundColor: "#4A90E2", height: 34,borderRadius:8}]}>
                    <Text>+</Text>
                </View>
            </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} style={{height:42, marginTop:10,marginBottom:16,borderBottomWidth:3,borderColor:'#ECECEC'}}>
            {this._getMenu()}
        </ScrollView>
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
    }
        }}>
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
                borderBottomWidth: 1,
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
