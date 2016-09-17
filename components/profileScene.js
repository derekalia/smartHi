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
import {GetProductAction,SwitchSceneAction,} from '../actions';
import {SettingsSceneId,} from '../common/const.js';
import {HerbyFrameBar,HerbyBar,}   from '../common/controls.js';
import ProductItem from './productItem.js';
import ReviewList  from './reviewList.js';

class UserReviews extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor:'transparent'}}>
                <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
                <ReviewList/>
            </ScrollView>
        );
    }
}
class UserFavorites extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor:'green',}}>
                <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
                <Text>Placeholder for user favorites</Text>
            </ScrollView>
        );
    }
}
class UserSocial extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor:'yellow'}}>
                <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
                <Text>Placeholder for user social</Text>
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

const ReviewsFrameId     = 0;
const FavoritesFrameId   = 1;
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
        this.state = {user:this.props.user};
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
                    goProduct={navigator.props.goProduct}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }


    render() {
        // BatsFix. nothing below should be hardcoded!
        return (
        <View>
            <TouchableOpacity style={{height:60,paddingTop:20,marginTop:0,backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2',zIndex:200,}}
               onPress={()=>this._goSettings()}>
                <View style={{ flex: 1, marginTop: 11,marginBottom: 5, flexDirection: "row", justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 13, }}>
                    <Text style={{ fontSize: 18, color: "#007AFF" }}> Settings</Text>
                </View>
            </TouchableOpacity>
             <ScrollView
                  style={{height:this._height,backgroundColor:'transparent'}}
                  contentContainerStyle={{margin:0,padding:0}}
                  stickyHeaderIndices={[1]}>
                  <UserHeader name={this.props.user.name} address={this.props.user.address} score={this.props.user.score}/>
                  <HerbyFrameBar entries={['FAVORITES','REVIEWS','SOCIAL']} setFrame={(t)=>this._setFrame(t)}/>
                  <Navigator
                      style={{height:this._height,backgroundColor:'transparent',justifyContent: 'flex-start'}}
                      ref="navigator"
                      configureScene={this.configureScene}
                      renderScene={this.renderScene}
                      initialRoute = {ProfileFrames[FavoritesFrameId]}
                      initialRouteStack = {ProfileFrames}
                      user={this.props.user}
                      goProduct={(t)=>this.props.GetProductAction(t)}
                  />
             </ScrollView>
        </View>
        );
    }
}

// This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
    }
}
//  This function is used to convert action to props passed to this component.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,SwitchSceneAction, }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(ProfileScene);
