//
// Description: producerProfileScene.js
//
// Import modules
import React, { Component } from 'react';
import {Alert,TextInput, Modal,Dimensions,StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity , Platform, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


import StarRating from 'react-native-star-rating';

// Import internals
import {GoUpdateProductAction,GoRetailerAction,SwitchSceneAction,} from '../../../actions';
import {UpdateProductSceneId,UpdateProducerSceneId,SettingsSceneId,ProfileTabId,} from '../../../common/const.js';
import {HerbyLoading,HerbyFrameBar,HerbyBar,}   from '../../../common/controls.js';
import ProductList from '../../util/productList.js';
import RetailerList from '../../util/retailerList.js';
import UserList from '../../util/userList.js';
import {HerbyButton2,} from '../../../common/controls.js';

class ProducerProducts extends Component {
    //BatsFix. should there be a product categorization and breakdown here? what about
    //pricing?
    render() {
        var products = this.props.producer.products;
        return (
            <ScrollView style={{backgroundColor:'white',marginTop:6,borderRadius:3,marginHorizontal:6}}>
            <View style={{flexDirection:'row',marginTop:15, alignItems:'center',marginBottom:10}}>
              <View style={{marginLeft:8}}>
              <TouchableHighlight style={{backgroundColor:'#468EE5',borderRadius:8,height:30,alignItems:
            'center',justifyContent:'center'}} onPress={()=>this.props.goProduct(-1)}>
                <Text style={{color:'white',marginHorizontal:20,alignItems:
              'center',justifyContent:'center',alignSelf:'center',fontSize:16}}>Add New Product</Text>
              </TouchableHighlight>
              </View>
            </View>
                <ProductList productList={this.props.producer.products} goProduct={this.props.goProduct}/>
            </ScrollView>
        );
    }
}

class ProducerRetailers extends Component {
    //BatsFix. Is this even necessary???
    render() {
        return (
            <View></View>
        );
        return (
            <ScrollView style={{backgroundColor:'white',marginTop:6,borderRadius:3,marginHorizontal:6}}>
                <RetailerList retailerList={this.props.producer.retailers} goRetailer={this.props.goRetailer}/>
            </ScrollView>
        );
    }
}


class ProducerSocial extends Component {
    constructor(props) {
        super(props);
        this.state = {frameId:0};
    }
    _setFrame(frameId) {
        this.setState({frameId:frameId});
    }
    render() {
        // BatsFix. There is no list of users the producer follows currently
        return (
            <ScrollView style={{backgroundColor:'transparent'}}>
                <HerbyFrameBar entries={['FOLLOWER','FOLLOWING']} setFrame={(t)=>this._setFrame(t)}/>
                <UserList userList={this.state.frameId == 0?this.props.producer.users:null}/>
            </ScrollView>
        );
    }
}

class ProducerHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <View style={{paddingTop:20,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
        <TouchableOpacity   style={{backgroundColor:'white'}} onPress={()=>this.props.goUpdate()}>
        <View style={{flexDirection:'row',borderWidth: 1.7, borderColor:'#4A90E2',width:350,borderRadius:10}}>
          <View style={{marginLeft:10, marginTop:10,marginBottom:10,marginRight:20}}>
            <Image source={require('../../../media/bluePlus1.png')} style={{ height: 75, width: 75}}/>
          </View>
          <View style={{alignSelf:'center',justifyContent:'center'}}>
            <Text style={{color:'#4A90E2', fontSize:16,fontWeight:'bold'}}>Create Company Page</Text>
          </View>
        </View>
      </TouchableOpacity>
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

const ProducerFrames = [
    {title: "Products",  component: ProducerProducts,   index: ProductsFrameId},
    {title: "Retailers", component: ProducerRetailers,  index: RetailersFrameId},
    {title: "Social",    component: ProducerSocial,     index: SocialFrameId},
];


class ProducerScene extends Component {

    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = {frameId:ProductsFrameId};
        var {width,height} = Dimensions.get('window');
        this._height = height;
    }

    _goUpdate() {
        this.props.SwitchSceneAction(UpdateProducerSceneId);
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(ProducerFrames[frameId]);
        this.setState({frameId: frameId});
    }

    _goSettings() {
        this.props.SwitchSceneAction(SettingsSceneId);
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
        if (this.props.loading) {
            return (<HerbyLoading/>);
        }

        return (
        <View>
             <HerbyBar navigator={this.props.navigator} name="Producer" forward="Settings" forwardCallback={()=>this._goSettings()}/>
             <ScrollView
                  style={{marginTop:0,height:this._height,backgroundColor:'#ECECEC',}}
                  stickyHeaderIndices={[1]}>
                  <ProducerHeader producer={this.props.processor} goUpdate={(t)=>this._goUpdate(t)}/>
                  <HerbyFrameBar entries={['PRODUCTS','RETAILERS','SOCIAL']} setFrame={(t)=>this._setFrame(t)}/>
                  <Navigator
                      style={{height:this._height,backgroundColor:'#ECECEC',justifyContent: 'flex-start'}}
                      ref="navigator"
                      configureScene={this.configureScene}
                      renderScene={this.renderScene}
                      initialRoute = {ProducerFrames[ProductsFrameId]}
                      initialRouteStack = {ProducerFrames}
                      producer={this.props.processor}
                      goProduct={(t)=>this.props.GoUpdateProductAction(t)}
                      goRetailer={(t)=>this.props.GoRetailerAction(t)}
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
// Connect to GoUpdateProductAction,GoRetailerAction,SwitchSceneAction
//
function mapActionToProps(dispatch) {
    return bindActionCreators({
        GoUpdateProductAction,
        GoRetailerAction,
        SwitchSceneAction, },
        dispatch);
}

module.exports = connect(mapStateToProps,mapActionToProps)(ProducerScene);
