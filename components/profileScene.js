//
// Description: profilescene.js
// This contains the declaration for the profile scene  of the app
//

// Import modules
import React, { Component } from 'react';
import {Dimensions,StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import StarRating from 'react-native-star-rating';


// Import internals
import {GetProductReviewAction,GetProductAction,GetRetailerAction,GetProducerAction,SwitchSceneAction,} from '../actions';
import {SettingsSceneId,ProfileTabId,} from '../common/const.js';
import {HerbyFrameBar,HerbyBar,}   from '../common/controls.js';
import ProducerItem from './producerItem.js';
import ProductItem from './productItem.js';
import ReviewList  from './reviewList.js';
import ProductList from './productList.js';
import RetailerList from './retailerList.js';
import UserList from './userList.js';
import {HerbyButton2,} from '../common/controls.js';

class UserReviews extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor:'transparent'}}>
                <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
                <ProductList productList={this.props.user.reviewProducts} goProduct={this.props.goReview}/>
            </ScrollView>
        );
    }
}
class ProducerList extends Component {
    render() {
        return (
            <View style={{marginTop:10}}>
                {this._renderProducers()}
            </View>
        );
    }

    _renderProducers() {
        var producers=[];
        for (var i=0; i < this.props.producerList.length; i++) {
             var producerId = this.props.producerList[i].id;
             var producer   = this.props.producerList[i];
             producers.push(
                <ProducerItem key={producerId} goProducer={(producerId) => this.props.goProducer(producerId)} producer={producer}/>
             );
        }
        return producers;
    }

}
class UserFavorites extends Component {
    constructor(props) {
        super(props);
        this.state = { frameId: 0 };
    }
    _setFrame(frameId) {
        this.setState({frameId:frameId});
    }

    _getFavorites() {
        if (this.state.frameId == 0) {
            return (
                <ProductList productList={this.props.user.products} goProduct={this.props.goProduct}/>
            )
        }
        else
        if (this.state.frameId == 1) {
            return (
                <RetailerList retailerList={this.props.user.retailers} goRetailer={this.props.goRetailer}/>
            )
        }
        else
        if (this.state.frameId == 2) {
            return (
                <ProducerList producerList={this.props.user.producers} goProducer={this.props.goProducer}/>
            )
        }
    }
    render() {
        return (
            <ScrollView style={{backgroundColor:'transparent',}}>
                <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
                <HerbyFrameBar entries={['PRODUCTS','STORES','PRODUCERS']} setFrame={(t)=>this._setFrame(t)}/>
                {this._getFavorites()}
            </ScrollView>
        );
    }
}

class UserSocial extends Component {
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
                <UserList userList={this.state.frameId == 0?this.props.user.following:this.props.user.follower}/>
            </ScrollView>
        );
    }
}
class UserHeader extends Component {
    render() {
        return(
        <View>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../media/headshot1.png') } style={{ width: 100, height: 100, alignSelf:'flex-start' }}/>
              <View style={{alignItems:'center',flex:1}}>
              <Text style={{ fontSize: 22, margin: 8, fontWeight: "bold" }}>{this.props.name}</Text>
              <Text style={{ fontSize: 16, marginTop: 1 }}>{this.props.address}</Text>
              <Text style={{ fontSize: 16, marginTop: 1 }}>{this.props.score}</Text>
              </View>
              </View>
        </View>
        );
    }
}

const FavoritesFrameId   = 0;
const ReviewsFrameId     = 1;
const SocialFrameId      = 2;

const ProfileFrames = [
    {title: "favorites", component: UserFavorites,   index: FavoritesFrameId},
    {title: "reviews",   component: UserReviews,     index: ReviewsFrameId},
    {title: "social",    component: UserSocial,      index: SocialFrameId},
];


class ProfileScene extends Component {

    constructor(props) {
        super(props);
        var {width,height} = Dimensions.get('window');
        this._height = height;
        // these should come from the app state.
        this.state = {user:this.props.user,frameId:FavoritesFrameId};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user:nextProps.user});
    }

    _goSettings() {
        this.props.SwitchSceneAction(SettingsSceneId);
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(ProfileFrames[frameId]);
        this.setState({frameId: frameId});
    }


    renderScene(route, navigator) {
        // BatsFix.
        // to pass a prop to the component, that prop
        // first needs to be passed to the navigator object.
        return (
                <route.component
                    user={navigator.props.user}
                    goReview={navigator.props.goReview}
                    goRetailer={navigator.props.goRetailer}
                    goProducer={navigator.props.goProducer}
                    goProduct={navigator.props.goProduct}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }
    _onLike() {
      //BatsFix. Should call like user action here.
    }

    _getNavBar() {
        if (this.props.tabId != ProfileTabId) {
            return (
              <HerbyBar name={this.props.item.name} navigator={this.props.navigator} onLike={()=>this._onLike()}/>
            );
        }
        return (
            <TouchableOpacity style={{height:60,marginTop:0,backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2',zIndex:200,}}
               onPress={()=>this._goSettings()}>
                <View style={{ flex: 1, marginTop: 11,marginBottom: 5, flexDirection: "row", justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 13, }}>
                    <Text style={{ fontSize: 18, color: "#007AFF" }}> Settings</Text>
                </View>
            </TouchableOpacity>
        );
    }
    _goReview(t) {
        console.log("Going to review by this user of product" + t);
        //This gets a review of product identified by 't' by user this.props.id.
        this.props.GetProductReviewAction(t,this.props.id);
    }
    render() {
        // BatsFix. nothing below should be hardcoded!
        return (
        <View>
             <ScrollView
                  style={{marginTop:0,height:this._height,backgroundColor:'transparent',}}
                  stickyHeaderIndices={[1]}>
                  {this._getNavBar()}
                  <UserHeader name={this.props.item.name} address={this.props.item.address} score={this.props.item.score}/>
                  <HerbyFrameBar entries={['FAVORITES','REVIEWS','SOCIAL']} setFrame={(t)=>this._setFrame(t)}/>
                  <Navigator
                      style={{height:this._height,backgroundColor:'transparent',justifyContent: 'flex-start'}}
                      ref="navigator"
                      configureScene={this.configureScene}
                      renderScene={this.renderScene}
                      initialRoute = {ProfileFrames[FavoritesFrameId]}
                      initialRouteStack = {ProfileFrames}
                      user={this.props.item}
                      goReview={(t)=> this._goReview(t)}
                      goProduct={(t)=>this.props.GetProductAction(t)}
                      goProducer={(t)=>this.props.GetProducerAction(t)}
                      goRetailer={(t)=>this.props.GetRetailerAction(t)}
                  />
             </ScrollView>
        </View>
        );
    }
}

//  This function is used to convert action to props passed to this component.
//
function mapActionToProps(dispatch) { 
    return bindActionCreators({ 
        GetProductReviewAction,
        GetProductAction,
        GetProducerAction,
        GetRetailerAction,
        SwitchSceneAction, }, 
        dispatch); 
}

module.exports = connect(null, mapActionToProps)(ProfileScene);
