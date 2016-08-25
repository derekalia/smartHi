//
// productScene.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';

//get internal components
// import Styles from './styles.js';
import {GetProductAction,GetRetailerAction,GetProducerAction,} from '../actions';
import {HerbyFrameBar} from '../common/controls.js';

import ReviewList     from './reviewList.js';
import RetailerList   from './retailerList.js';
import ProductList    from './productList.js';
import ProductInfo    from './productInfo.js';

class ProductReview extends Component {
    render() {
        return (
            <ScrollView>
                <ReviewList/>
            </ScrollView>
        );
    }
}

class ProductRetailer extends Component {
    _goRetailer(id) {
        this.props.goRetailer(id);
    }
    render() {
        return (
            <ScrollView>
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
            <ScrollView>
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
        this.state={showImage:true};
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(ProductFrames[frameId]);
        this.setState({frameId: frameId});
    }

    _goRetailer(retailerId: string) {
        this.props.GetRetailerAction(retailerId);
    }

    _goProducer(producerId: string) {
        this.props.GetProducerAction(producerId);
    }

    renderScene(route, navigator) {
        // BatsFix.
        // to pass a prop to the component, that prop
        // first needs to be passed to the navigator object.
        return (
                <route.component 
                    product={navigator.props.product} 
                    goProduct={navigator.props.goProduct} 
                    goRetailer={navigator.props.goRetailer}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    _handleScroll(offset) {
       if (offset > 4 && this.state.showImage== true) {
           this.setState({showImage:false});
       }
       else 
       if (offset < -1 && this.state.showImage == false) {
           this.setState({showImage:true});
       }
       
    }

    _getHeader() {
        // BatsFix. This should probably be a control...
        if (this.state.showImage) {
            return (
                <Image source={require('../media/RosinXJ.png') } style={{ height: 190, width: 380 }}/>
            );
        }
        return null;
    }

    // BatsFix. There should be no hardcode items in render!
    render() {
        return (
        <ScrollView style={{flex:1}} onScroll={(e) => this._handleScroll(e.nativeEvent.contentOffset.y)}>
            {this._getHeader()}
            <HerbyFrameBar entries={['Info','Reviews','Location','Related']} setFrame={(t)=>this._setFrame(t)}/>
            <Navigator
                style={{height:500,backgroundColor:'transparent',justifyContent: 'flex-start'}}
                ref="navigator"
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {ProductFrames[ProductFrameId]}
                initialRouteStack = {ProductFrames}
                product={this.props.product}
                goProduct={(t)=>this.props.GetProductAction(t)}
                goRetailer={(t)=>this.props.GetRetailerAction(t)}
            />
        </ScrollView>
        );
    }
}


// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        product: state.ProductReducer.product,
    }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetRetailerAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,GetRetailerAction,GetProducerAction,}, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(ProductScene);


const Styles = StyleSheet.create({
    tagType: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#F7A700",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextType: {
        color: "#F7A700",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    tagCategory: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#7BD500",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextCategory: {
        color: "#7BD500",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },


    tagEffect: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#4A90E2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextEffect: {
        color: "#4A90E2",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    tagActivity: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#BE00E3",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextActivity: {
        color: "#BE00E3",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    tagSymptom: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#D3000D",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextSymptom: {
        color: "#D3000D",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    storeItem: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        margin: 5,

    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    bg: {
        position: 'absolute',
        width: 355,
        height: 100,
        borderTopLeftRadius: 60,
        borderRadius: 6
    },
    storeName: {
        margin: 3,
        marginTop: 5,
        marginLeft: 7,
        color: 'white',
        fontSize: 26,
        textShadowOffset: { width: 1.2, height: 1.2 },
        textShadowColor: 'black',
        textShadowRadius: 2
    },
    rowContainerStars: {
      flexDirection: 'row',
      marginTop: 8,
      marginRight: 3,
    },
    storePrice1: {
        margin: 3,
        flex: 1,
        marginTop: 5,
        marginLeft: 7,
        color: 'white',
        fontSize: 26,
        textAlign: 'right',
        width: 210,
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowColor: 'black',
        textShadowRadius: 2

    }, storeLocation: {
        marginLeft: 7,
        color: 'white',
        fontSize: 15,
        textShadowOffset: { width: 1.2, height: 1.2 },
        textShadowColor: 'black',
        textShadowRadius: 2
    },
    input: {
        height: 40,
        marginLeft:7,
        fontSize: 20,
        backgroundColor: 'white',
    },
    category: {
        color:"#9B9B9B",
        backgroundColor: 'white',
        borderBottomWidth: 0,
    },
    category2: {
        color:"#468EE5",
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor:"#468EE5",
    },
})
