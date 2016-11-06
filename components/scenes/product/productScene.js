//
// productScene.js
//
import React, { Component } from 'react';
import {Dimensions,StyleSheet, Text, View, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';
// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

//get internal components
import {GetProductAction,GetRetailerAction,GetProducerAction,} from '../../../actions';
import {HerbyLoading,HerbyPicker,HerbyBar,HerbyFrameBar} from '../../../common/controls.js';

import ReviewList     from '../../util/reviewList.js';
import RetailerList   from '../../util/retailerList.js';
import ProductList    from '../../util/productList.js';
import ProductInfo    from './productInfo.js';

class ProductReview extends Component {
    render() {
        return (
            <ScrollView style={{flex:1,backgroundColor:'white', marginHorizontal:8,borderRadius:2}}>
                <View style={{backgroundColor:'#ECECEC',flex:1,height:6,marginHorizontal:0}}/>
                <ReviewList/>
            </ScrollView>
        );
    }
}

class ProductRetailer extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedValue:'Distance',showPicker:false,pickerHeight:20};
    }

    _goRetailer(id) {
        this.props.goRetailer(id);
    }

    render() {
        return (
            <ScrollView style={{flex:1,backgroundColor:'white', marginHorizontal:8,borderRadius:4}}>
            <View style={{backgroundColor:'#ECECEC',flex:1,height:6}}/>

            <View style={{ marginHorizontal: 10, marginTop: 5,marginBottom:5 }}>
                <View style={{ height: 40}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Retail Locations</Text>

                <View style={{flexDirection:"row",alignSelf:'flex-start',justifyContent:'center',alignItems:'center',marginLeft:0,zIndex:999,flex:1,height:25,marginTop:0}}>
                  <Text style={{fontWeight:'bold',fontSize:16}}>Sort By: </Text>
                  <View style={{backgroundColor:'#ECECEC',flexDirection:"row",alignItems:'center',justifyContent:'center',alignSelf:'center',height:20,width:80,borderRadius:4,height:25}}>
                    <HerbyPicker options={['Price ','Distance ','Rating ']} style={{fontSize:16}} />
                    <Image style={{width:14,height:8,marginRight:3,alignItems:'flex-end'}} source={require("../../../media/Triangle1.png")} />
                  </View>
                </View>
                </View>
            </View>
            <RetailerList retailerList={this.props.product.prices} goRetailer={(id) => this._goRetailer(id)}/>
            </ScrollView>
        );
    }
}

class ProductRelated extends Component {
    _goProduct(id) {
        this.props.goProduct(id);
    }
    render() {
        // BatsFix. For now return empty if related is null
        if (this.props.product.related == null) {
            return null;
        }
        return (

            <ScrollView style={{flex:1,backgroundColor:'white', marginHorizontal:8,borderRadius:4}}>
              <View style={{backgroundColor:'#ECECEC',height:10,marginHorizontal:0}}/>
              <View style={{ marginHorizontal: 10, marginTop: 5,marginBottom:5 }}>
                  <View style={{ height: 40, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Related Products</Text>
                  </View>
              </View>

                <ProductList productList={this.props.product.related} goProduct={(id)=>this._goProduct(id)}/>

            </ScrollView>
        );
    }
}

const ProductFrameId   = 0;
const ReviewFrameId    = 1;
const RetailerFrameId  = 2;
const RelatedFrameId   = 3;

const ProductFrames = [
    {title: "product info",     component: ProductInfo,       index: ProductFrameId},
    {title: "product review",   component: ProductReview,     index: ReviewFrameId},
    {title: "product retailer", component: ProductRetailer,   index: RetailerFrameId},
    {title: "product related",  component: ProductRelated,    index: RelatedFrameId},
];

class ProductScene extends Component {
    constructor(props) {
        super(props);
        var {width,height} = Dimensions.get('window');
        this._height = height;
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(ProductFrames[frameId]);
        this.setState({frameId: frameId});
    }

    renderScene(route, navigator) {
        // BatsFix.
        // to pass a prop to the component, that prop
        // first needs to be passed to the navigator object.
        return (
                <route.component
                    product={navigator.props.product}
                    goProduct={navigator.props.goProduct}
                    goRetailer={navigator.props.goRetailer}
                    goProducer={navigator.props.goProducer}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    _onLike() {
        // BatsFix. Implement like action for this product.
    }
    _isProductUser() {
        var users = this.props.product.users;
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
    render() {
        var scrollerHeight = this._height;
        if (this.props.loading) {
            return (<HerbyLoading/>);
        }
        return (
        <View>
          <HerbyBar name={this.props.product.name} navigator={this.props.navigator} onLike={()=>this._onLike()} showFullHeart = {this._isProductUser()} />
          <ScrollView
              style={{marginTop:0,height:this._height,backgroundColor:'#ECECEC'}}
              stickyHeaderIndices={[1]}>
              <Image source={require('../../../media/RosinXJ.png') } style={{ height: 190, width: 380,justifyContent:'center',}}/>
              <HerbyFrameBar entries={['INFO','REVIEWS','RETAILERS','RELATED']} setFrame={(t)=>this._setFrame(t)}/>
              {/* <HerbyFrameBar entries={['Info','Reviews','Retailers','Related']} setFrame={(t)=>this._setFrame(t)}/> */}
              <Navigator
                  style={{height:this._height,backgroundColor:'transparent',justifyContent: 'flex-start'}}
                  ref="navigator"
                  configureScene={this.configureScene}
                  renderScene={this.renderScene}
                  initialRoute = {ProductFrames[ProductFrameId]}
                  initialRouteStack = {ProductFrames}
                  product={this.props.product}
                  goProduct={(t)=>this.props.GetProductAction(t)}
                  goRetailer={(t)=>this.props.GetRetailerAction(t)}
                  goProducer={(t)=>this.props.GetProducerAction(t)}
              />
          </ScrollView>
        </View>
        );
    }
}


// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetRetailerAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,GetRetailerAction,GetProducerAction,}, dispatch); }

//
// BatsFix. Attach apollo query to the component. This creates props loading and product on HomeScene
//
const apolloProduct = gql`query($itemId: ID!){
    Product(id:$itemId)
    {
        id,
        name,
        image,
        description,
        rating,
        ratingCount,
        thc,
        cbd,
        thca,
        quality,
        flavor,
        potency,
        prices {
            price,
            retailer {id,name,rating,address,},
        },
        producer {
            id,
            name,
            rating,
            ratingCount,
        }, 
        productReviews {
            id,
            name,
            comment,
            user {id,name},
            rating
        },
        users {
            id,
            name,
        }
    }
}`;
 

//
// BatsFix. Maps data obtained from the query to props.
//
function mapDataToProps({props,data}) {
    return ({
        loading: data.loading,
        product: data.Product,
    });
}

module.exports = graphql(apolloProduct,{props:mapDataToProps})(connect(null,mapActionToProps)(ProductScene));
