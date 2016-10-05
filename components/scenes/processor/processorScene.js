//
// Description: processorScene.js
//
// Import modules
import React, { Component } from 'react';
import {Alert,TextInput, Modal,Dimensions,StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity, Platform, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import StarRating from 'react-native-star-rating';

// Import internals
import {GoUpdateProductAction,GetRetailerAction,SwitchSceneAction,} from '../../../actions';
import {UpdateProductSceneId,UpdateProcessorSceneId,SettingsSceneId,ProfileTabId,} from '../../../common/const.js';
import {HerbyFrameBar,HerbyBar,}   from '../../../common/controls.js';
import ProductList from '../../util/productList.js';
import RetailerList from '../../util/retailerList.js';
import UserList from '../../util/userList.js';
import {HerbyButton2,} from '../../../common/controls.js';

class ProcessorProducts extends Component {
    //BatsFix. should there be a product categorization and breakdown here? what about
    //pricing?
    render() {
        var products = this.props.producer.products;
        return (
            <ScrollView style={{flex:1}}>
            <View style={{flexDirection:'row',marginTop:15, alignItems:'center',marginBottom:10}}>
              <View style={{marginLeft:8}}>
              <TouchableHighlight style={{backgroundColor:'#468EE5',borderRadius:8,height:30,alignItems:
            'center',justifyContent:'center'}} onPress={()=>this.props.goProduct(-1)}>
                <Text style={{color:'white',marginHorizontal:10,alignItems:
              'center',justifyContent:'center',alignSelf:'center'}}>Add New Product</Text>
              </TouchableHighlight>
              </View>
            </View>
                <ProductList productList={this.props.producer.products} goProduct={this.props.goProduct}/>
            </ScrollView>
        );
    }
}

class ProcessorRetailers extends Component {
    //BatsFix. Is this even necessary???
    render() {
        return (
            <ScrollView style={{backgroundColor:'transparent',}}>
                <RetailerList retailerList={this.props.producer.retailers} goRetailer={this.props.goRetailer}/>
            </ScrollView>
        );
    }
}


class ProcessorSocial extends Component {
    constructor(props) {
        super(props);
        this.state = {frameId:0};
    }
    _setFrame(frameId) {
        this.setState({frameId:frameId});
    }
    render() {
        return (
            <ScrollView style={{backgroundColor:'transparent'}}>
                <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
                <HerbyFrameBar entries={['FOLLOWER','FOLLOWING']} setFrame={(t)=>this._setFrame(t)}/>
                <UserList userList={this.state.frameId == 0?this.props.producer.following:this.props.producer.follower}/>
            </ScrollView>
        );
    }
}

class ProcessorHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
        <TouchableHighlight style={{backgroundColor:'white'}} onPress={()=>this.props.goUpdate()}>
        <View style={{flexDirection:'row',borderWidth: 1.7, borderColor:'#4A90E2',width:350,borderRadius:10}}>
          <View style={{marginLeft:10, marginTop:10,marginBottom:10,marginRight:20}}>
            <Image source={require('../../../media/bluePlus1.png')} style={{ height: 75, width: 75}}/>
          </View>
          <View style={{alignSelf:'center',justifyContent:'center'}}>
            <Text style={{color:'#4A90E2', fontSize:16,fontWeight:'bold'}}>Create Company Page</Text>
          </View>
        </View>
      </TouchableHighlight>
            {/* <Text style={{fontSize:18,fontWeight:'bold'}}>{this.props.producer.name}</Text> */}
            {/* <Text style={{fontSize:15}}>{this.props.producer.description}</Text> */}
                {/* <View style={{flexDirection:'row'}}>
                <HerbyButton2 name='Update Producer Info'/>
                </View> */}
        </View>
        );
    }
}

const ProductsFrameId  = 0;
const RetailersFrameId = 1;
const SocialFrameId    = 2;

const ProcessorFrames = [
    {title: "Products",  component: ProcessorProducts,   index: ProductsFrameId},
    {title: "Retailers", component: ProcessorRetailers,  index: RetailersFrameId},
    {title: "Social",    component: ProcessorSocial,     index: SocialFrameId},
];


class ProcessorScene extends Component {

    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = {frameId:ProductsFrameId};
        var {width,height} = Dimensions.get('window');
        this._height = height;
    }

    _goUpdate() {
        this.props.SwitchSceneAction(UpdateProcessorSceneId);
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(ProcessorFrames[frameId]);
        this.setState({frameId: frameId});
    }

    renderScene(route, navigator) {
        return (
                <route.component
                    producer={navigator.props.producer}
                    goRetailer={navigator.props.goRetailer}
                    goProduct={navigator.props.goProduct}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        // BatsFix. nothing below should be hardcoded!
        // BatsFix. workaround weird margin issue.
        var hackMargin = 0;
        if (this.props.tabId == ProfileTabId) {
            hackMargin = -20;
        }

        return (
        <View>
             <ScrollView
                  style={{marginTop:0,height:this._height,backgroundColor:'transparent',}}
                  stickyHeaderIndices={[1]}>
                  <ProcessorHeader producer={this.props.producer} goUpdate={(t)=>this._goUpdate(t)}/>
                  <HerbyFrameBar entries={['PRODUCTS','RETAILERS','SOCIAL']} setFrame={(t)=>this._setFrame(t)}/>
                  <Navigator
                      style={{height:this._height,backgroundColor:'transparent',justifyContent: 'flex-start'}}
                      ref="navigator"
                      configureScene={this.configureScene}
                      renderScene={this.renderScene}
                      initialRoute = {ProcessorFrames[ProductsFrameId]}
                      initialRouteStack = {ProcessorFrames}
                      producer={this.props.producer}
                      goProduct={(t)=>this.props.GoUpdateProductAction(t)}
                      goRetailer={(t)=>this.props.GetRetailerAction(t)}
                  />
             </ScrollView>
        </View>
        );
    }
}


//
// Connect to producer state
//
function mapStateToProps(state) {
    return {
        producer: state.ProducerReducer.producer,
    }
}

//
// Connect to GoUpdateProductAction,GetRetailerAction,SwitchSceneAction
//
function mapActionToProps(dispatch) {
    return bindActionCreators({
        GoUpdateProductAction,
        GetRetailerAction,
        SwitchSceneAction, },
        dispatch);
}

module.exports = connect(mapStateToProps, mapActionToProps)(ProcessorScene);