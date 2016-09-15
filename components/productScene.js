//
// productScene.js
//
import React, { Component } from 'react';
import {Dimensions,StyleSheet, Text, View, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';

//get internal components
import {GetProductAction,GetRetailerAction,GetProducerAction,} from '../actions';
import {HerbyPicker,HerbyBar,HerbyFrameBar} from '../common/controls.js';

import ReviewList     from './reviewList.js';
import RetailerList   from './retailerList.js';
import ProductList    from './productList.js';
import ProductInfo    from './productInfo.js';

class ProductReview extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
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
            <ScrollView style={{backgroundColor:'white'}}>
            <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
            <HerbyPicker style={{height:20,fontSize:20}} options={['Distance','Price','Rating']}/>
            <View style={{ marginHorizontal: 10, marginTop: 5,marginBottom:5 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Retail Locations</Text>
                </View>
            </View>
            <RetailerList retailers={this.props.product.retailers} goRetailer={(id) => this._goRetailer(id)}/>
            </ScrollView>
        );
    }
}

class ProductRelated extends Component {
    _goProduct(id) {
        this.props.goProduct(id);
    }
    render() {
        return (

            <ScrollView style={{backgroundColor:'white'}}>
              <View style={{backgroundColor:'#ECECEC',height:10,marginHorizontal:0}}/>
              <View style={{ marginHorizontal: 10, marginTop: 5,marginBottom:5 }}>
                  <View style={{ height: 40, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Related Products</Text>
                  </View>
              </View>
              <ScrollView>
                <ProductList productList={this.props.product.related} goProduct={(id)=>this._goProduct(id)}/>
                </ScrollView>
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

    componentWillReceiveProps(nextProps) {

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

    render() {
        var scrollerHeight = this._height;
        console.log("in productScene render item is " + this.props.item);
        return (
        <View>
        <HerbyBar name={this.props.item.name} navigator={this.props.navigator} onLike={()=>this._onLike()}/>
          <ScrollView
              style={{marginTop:0,height:this._height,backgroundColor:'white'}}
              stickyHeaderIndices={[1]}>
              <Image source={require('../media/RosinXJ.png') } style={{ height: 190, width: 380,justifyContent:'center',}}/>
              <HerbyFrameBar entries={['INFO','REVIEWS','RETAILERS','RELATED']} setFrame={(t)=>this._setFrame(t)}/>
              <Navigator
                  style={{height:this._height,backgroundColor:'transparent',justifyContent: 'flex-start'}}
                  ref="navigator"
                  configureScene={this.configureScene}
                  renderScene={this.renderScene}
                  initialRoute = {ProductFrames[ProductFrameId]}
                  initialRouteStack = {ProductFrames}
                  product={this.props.item}
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

module.exports = connect(null, mapActionToProps)(ProductScene);
