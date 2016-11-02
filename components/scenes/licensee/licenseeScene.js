//
// Description: licenseeScene.js
//
// Import modules
import React, { Component } from 'react';
import {Alert,TextInput, Modal,Dimensions,StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity, Platform, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import StarRating from 'react-native-star-rating';

// Import internals
import {GetProductAction,SwitchSceneAction,} from '../../../actions';
import {UpdateRetailerSceneId,SettingsSceneId,ProfileTabId,} from '../../../common/const.js';
import {HerbyLoading,HerbyFrameBar,HerbyBar,}   from '../../../common/controls.js';
import ProductList from '../../util/productList.js';
import UserList from '../../util/userList.js';
import {HerbyButton2,} from '../../../common/controls.js';

class LicenseeProducts extends Component {
    //BatsFix. should there be a product categorization and breakdown here? what about
    //pricing?
    render() {
        var products = this.props.retailer.products;
        return (
            <ScrollView style={{flex:1}}>
            <View style={{flexDirection:'row',marginTop:15, alignItems:'center',marginBottom:10,backgroundColor:'#ECECEC'}}>              
            </View>
                <ProductList productList={this.props.retailer.products} goProduct={this.props.goProduct}/>
            </ScrollView>
        );
    }
}

class LicenseeSocial extends Component {
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
                {/* <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/> */}
                <HerbyFrameBar entries={['FOLLOWER','FOLLOWING']} setFrame={(t)=>this._setFrame(t)}/>
                <UserList userList={this.state.frameId == 0?this.props.retailer.following:this.props.retailer.follower}/>
            </ScrollView>
        );
    }
}

class LicenseeHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
          <TouchableHighlight style={{backgroundColor:'white'}} onPress={()=>this.props.goUpdate()}>
          <View style={{flexDirection:'row',borderWidth: 1.5, borderColor:'#4A90E2',width:350,borderRadius:10}}>
            <View style={{marginLeft:10, marginTop:10,marginBottom:10,marginRight:20}}>
              <Image source={require('../../../media/bluePlus1.png')} style={{ height: 75, width: 75}}/>
            </View>
            <View style={{alignSelf:'center',justifyContent:'center'}}>
              <Text style={{color:'#4A90E2', fontSize:16,fontWeight:'bold'}}>Create Store</Text>
            </View>
          </View>
        </TouchableHighlight>
            {/* <Image source={require('../../../media/RosinXJ.png') } style={{ height: 190, width: 380,justifyContent:'center',}}/>
            <Text style={{fontSize:18,fontWeight:'bold'}}>{this.props.retailer.name}</Text>
            <Text style={{fontSize:15}}>{this.props.retailer.description}</Text> */}
            {/* <View style={{flexDirection:'row'}}> */}
            {/* <HerbyButton2 name='Update Licensee Info' onPress={()=>this.props.goUpdate()}/> */}
            {/* </View> */}
        </View>
        );
    }
}

const ProductsFrameId  = 0;
const SocialFrameId    = 1;

const LicenseeFrames = [
    {title: "Products",  component: LicenseeProducts,   index: ProductsFrameId},
    {title: "Social",    component: LicenseeSocial,     index: SocialFrameId},
];


class LicenseeScene extends Component {

    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = {frameId:ProductsFrameId};
        var {width,height} = Dimensions.get('window');
        this._height = height;
    }

    _goUpdate() {
        this.props.SwitchSceneAction(UpdateRetailerSceneId);
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(LicenseeFrames[frameId]);
        this.setState({frameId: frameId});
    }

    _goSettings() {
        this.props.SwitchSceneAction(SettingsSceneId);
    }

    renderScene(route, navigator) {
        return (
                <route.component
                    retailer={navigator.props.retailer}
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
        console.log(this.props.licensee);
        return (
        <View>
             <HerbyBar navigator={this.props.navigator} name="Retailer" forward="Settings" forwardCallback={()=>this._goSettings()}/>
             <ScrollView
                  style={{marginTop:0,height:this._height,backgroundColor:'transparent',}}
                  stickyHeaderIndices={[1]}>
                  <LicenseeHeader retailer={this.props.licensee} goUpdate={(t)=>this._goUpdate(t)}/>
                  <HerbyFrameBar entries={['PRODUCTS','SOCIAL']} setFrame={(t)=>this._setFrame(t)}/>
                  <Navigator
                      style={{height:this._height,backgroundColor:'transparent',justifyContent: 'flex-start'}}
                      ref="navigator"
                      configureScene={this.configureScene}
                      renderScene={this.renderScene}
                      initialRoute = {LicenseeFrames[ProductsFrameId]}
                      initialRouteStack = {LicenseeFrames}
                      retailer={this.props.licensee}
                      goProduct={(t)=>this.props.GetProductAction(t)}
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
        retailer: state.RetailerReducer.retailer,
    }
}

//
// Connect to SwitchSceneAction
//
function mapActionToProps(dispatch) {
    return bindActionCreators({
        GetProductAction,
        SwitchSceneAction, },
        dispatch);
}

//
// BatsFix. Attach apollo query to the component. This creates props loading and products on HomeScene
//
const apolloLicensee = gql`query($itemId: ID!){
    Retailer(id:$itemId)
    {
        id,
        name,
        image,
        address,
        rating,
        ratingCount,
        products {
            price,
            product {id,name,image,rating,ratingCount},
        },
        users {
            id,
            name,
            image,
        }
    }
}`;


//
// BatsFix. Maps data obtained from the query to props.
//
function mapDataToProps({props,data}) {
    return ({
        loading: data.loading,
        licensee: data.Retailer,
    });
}

module.exports = graphql(apolloLicensee,{props:mapDataToProps})(connect(mapStateToProps,mapActionToProps)(LicenseeScene));
