//
// Description: profilescene.js
// This contains the declaration for the profile scene  of the app
//

// Import modules
import React, { Component } from 'react';
import {Dimensions,StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


import StarRating from 'react-native-star-rating';


// Import internals
import {AddToFollowUser,GetProductReviewAction,GetProductAction,GetRetailerAction,GetProducerAction,SwitchSceneAction,} from '../../../actions';
import {SettingsSceneId,ProfileTabId,} from '../../../common/const.js';
import {HerbyFrameBar,HerbyBar,}   from '../../../common/controls.js';
import ProducerItem from '../../util/producerItem.js';
import ProductItem from '../../util/productItem.js';
import ReviewList  from '../../util/reviewList.js';
import ProductList from '../../util/productList.js';
import RetailerList from '../../util/retailerList.js';
import UserList from '../../util/userList.js';
import ProducerList from '../../util/producerList.js';
import {HerbyLoading,HerbyButton2,} from '../../../common/controls.js';

class UserReviews extends Component {
    render() {
        return (
          <View>
            <ScrollView style={{backgroundColor:'#ECECEC',marginTop:0}}>
                {/* <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/> */}
                <ProductList productList={this.props.user.reviewProducts} goProduct={this.props.goReview}/>
            </ScrollView>
            </View>
        );
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
              <View style={{marginLeft:18,marginTop:-10}}>
                <ProducerList producerList={this.props.user.producers} goProducer={this.props.goProducer}/>
              </View>
            )
        }
    }
    render() {
        return (
          <View>
            <HerbyFrameBar entries={['PRODUCTS','STORES','PRODUCERS']} setFrame={(t)=>this._setFrame(t)}/>
                  <ScrollView >

                  {this._getFavorites()}

              </ScrollView>
          </View>

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
                {/* <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/> */}
                <HerbyFrameBar entries={['FOLLOWER','FOLLOWING']} setFrame={(t)=>this._setFrame(t)}/>
                <UserList userList={this.state.frameId == 0?this.props.user.following:this.props.user.follower}/>
            </ScrollView>
        );
    }
}
class UserHeader extends Component {
    render() {
        return(
        <View style={{marginTop:20}}>
          <View style={{justifyContent:'center',alignSelf:'center'}}>
            <Image source={require('../../../media/headshot1.png') } style={{ width: 100, height: 100, alignSelf:'flex-start' }}/>
          </View>

          <View style={{flexDirection:'row',marginBottom:10}}>
              <View style={{alignItems:'center',flex:1}}>
                <Text style={{ fontSize: 22, margin: 8,marginBottom: 2, fontWeight: "bold" }}>{this.props.name}</Text>
                <Text style={{ fontSize: 16 }}>{this.props.address}</Text>
                <View style={{flexDirection:'row',marginBottom:20,justifyContent:'center',alignItems:'center',marginTop:5}}>
                  <Text style={{ fontSize: 16, marginTop: 2 }}> {this.props.score} </Text>
                  <Image style={{height:20,width:20}} source={require('../../../media/Oval129.png')}/>
                  <Text style={{fontWeight:'bold'}}> Karma</Text>
                </View>
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
      console.log("users are" + this.props.profile.id + " and current " + this.props.currentUserId);
      this.props.AddToFollowUser(this.props.profile.id,this.props.currentUserId);
    }
     _isUserUser() {
        var users = this.props.profile.follower;
        if (users == null ) {
            return false;
        }
        for (var i=0; i < users.length; i++) {
            if (users[i].id == this.props.currentUserId) {
                return true;
            }
        }
        return false;
    }
  
    _getNavBar() {
        if (this.props.tabId != ProfileTabId || this.props.isCurrentUser == false) {
            // Allow heart action if the profile scene is not in the profile tab. BatsFix. Is that correct?
            return (
              <HerbyBar name={this.props.profile.name} navigator={this.props.navigator} onLike={()=>this._onLike()} showFullHeart={this._isUserUser()}/>
            );
        }
        return (
            <HerbyBar name={this.props.profile.name} navigator={this.props.navigator} forwardCallback={()=>this._goSettings()} forward='Settings'/>
        );
    }

    _goReview(t) {
        console.log("Going to review by this user of product" + t);
        //This gets a review of product identified by 't' by user this.props.id.
        this.props.GetProductReviewAction(t,this.props.id);
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
             {this._getNavBar()}
             <ScrollView
                  style={{marginTop:hackMargin,height:this._height,backgroundColor:'transparent',}}
                  stickyHeaderIndices={[1]}>
                  <UserHeader name={this.props.profile.name} address={this.props.profile.address} score={this.props.profile.score}/>
                  <HerbyFrameBar entries={['FAVORITES','REVIEWS','SOCIAL']} setFrame={(t)=>this._setFrame(t)}/>
                  <Navigator
                      style={{height:this._height,backgroundColor:'#ECECEC',justifyContent: 'flex-start'}}
                      ref="navigator"
                      configureScene={this.configureScene}
                      renderScene={this.renderScene}
                      initialRoute = {ProfileFrames[FavoritesFrameId]}
                      initialRouteStack = {ProfileFrames}
                      user={this.props.profile}
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
        AddToFollowUser,
        GetProductReviewAction,
        GetProductAction,
        GetProducerAction,
        GetRetailerAction,
        SwitchSceneAction, },
        dispatch);
}

//
// BatsFix. Attach apollo query to the component. This creates props loading and products on HomeScene
//
const apolloProfile = gql`query($itemId: ID!) {
    User(id:$itemId) { 
        id,
        name,
        image,
        score,
        follower  {id, name, score, image},
        following {id, name, score, image},
        retailers {id, name, image, rating, ratingCount, address},
        producers {id, name, image, rating, ratingCount},
        products  {id, name, image, rating, ratingCount, image, activity,},
    }
}`;
//
// BatsFix. Maps data obtained from the query to props.
//
function mapDataToProps({props,data}) {
    return ({
        loading: data.loading,
        profile: data.User,
    });
}

module.exports = graphql(apolloProfile,{props:mapDataToProps})(connect(null,mapActionToProps)(ProfileScene));
