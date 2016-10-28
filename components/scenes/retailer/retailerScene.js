//components/loginpage.js
import React, { Component } from 'react';
import {Dimensions,StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, TouchableHighlight, Navigator} from 'react-native';

//get internal components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


import StarRating from 'react-native-star-rating';
//get internal components
import {GetProductAction,ShowMapAction} from '../../../actions';
import {HerbyLoading,HerbyBar,HerbyFrameBar,HerbyPicker} from '../../../common/controls.js';
import HerbySearchBar from '../../util/herbySearchBar.js';


import ReviewList         from '../../util/reviewList.js';
import ProductList        from '../../util/productList.js';
import UserList           from '../../util/userList.js';
import RetailerInfo       from './retailerInfo.js';

class RetailerMenu extends Component {
    render() {
        return (

        <View style={{backgroundColor:'white',marginHorizontal:8,marginTop:8}}>
        <View style={{flexDirection:"row",alignSelf:'flex-start',justifyContent:'center',alignItems:'center',marginLeft:10,flex:1,height:25,marginTop:10}}>
          <Text style={{fontWeight:'bold',fontSize:16}}>Sort By: </Text>
          <View style={{backgroundColor:'#ECECEC',flexDirection:"row",alignItems:'center',justifyContent:'center',alignSelf:'center',height:20,width:80,borderRadius:4,height:25}}>
            <HerbyPicker options={['Price ','Distance ','Rating ']} style={{fontSize:16}} />
            <Image style={{width:14,height:8,marginRight:3,alignItems:'flex-end'}} source={require("../../../media/Triangle1.png")} />
          </View>
          </View>

            <ProductList style={{ marginHorizontal: 8,}} productList={this.props.retailer.products} goProduct={(id)=>this.props.goProduct(id)}/>
            <View style={{width:300,height:110}}></View>
        </View>

        );
    };
}
class RetailerReview extends Component {
    render() {
        return (
            <View style={{backgroundColor:'white',marginHorizontal:8,marginTop:8}}>
                <ReviewList/>
            </View>
        );
    }
}

class RetailerSocial extends Component {
    constructor(props) {
        super(props);
        this.state = {frameId:0};
    }
    _setFrame(frameId) {
        this.setState({frameId:frameId});
    }
    render() {
        return (
            <View>
                <HerbyFrameBar entries={['FOLLOWER','FOLLOWING']} setFrame={(t)=>this._setFrame(t)}/>
                <UserList userList={this.state.frameId == 0?this.props.retailer.following:this.props.retailer.follower} style={{marginTop:0}}/>
            </View>
        );
    }
}

const InfoFrameId    = 0;
const MenuFrameId    = 1;
const ReviewFrameId  = 2;
const SocialFrameId  = 3;

const RetailerFrames = [
    {title: "INFO",     component: RetailerInfo,     index: InfoFrameId},
    {title: "MENU",     component: RetailerMenu,     index: MenuFrameId},
    {title: "REVIEW",   component: RetailerReview,   index: ReviewFrameId},
    {title: "SOCIAL",   component: RetailerSocial,   index: SocialFrameId},
];

class RetailerScene extends Component {
    constructor(props) {
        super(props);
        var {width,height} = Dimensions.get('window');
        this._height = height;
        this.state={frameId:InfoFrameId};
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(RetailerFrames[frameId]);
        this.setState({frameId: frameId});
    }

    _goProduct(product: string) {
        this.props.GetProductAction(producerId);
    }

    _onLike() {
        // BatsFix. Implement like action for this product.
    }

    _showMap() {
        this.props.ShowMapAction();
    }

    _getSearchBar() {
        if (this.state.frameId == MenuFrameId) {
            return (
                <HerbySearchBar entries={['ALL','FLOWER','CONCENTRATE','INFUSED',]}/>
            );
        }
        return null;
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    renderScene(route, navigator) {
        // BatsFix.
        // to pass a prop to the component, that prop
        // first needs to be passed to the navigator object.
        return (
                <route.component
                    retailer={navigator.props.retailer}
                    showMap={navigator.props.showMap}
                    goProduct={navigator.props.goProduct}/>
        );
    }

    //
    // BatsFix. Nothing should be hardcoded in this function. All retailer info should come
    // from state or props
    //
    render() {
        if (this.props.loading) {
            return (<HerbyLoading/>);
        }
        console.log(this.props.retailer);
        return (
        <View style={{backgroundColor:'#ECECEC'}}>
        <HerbyBar name={this.props.retailer.name} navigator={this.props.navigator} onLike={()=>this._onLike()}/>
        <ScrollView
            style={{flex:1,marginTop:0,height:this._height,backgroundColor:'#ECECEC'}}
            stickyHeaderIndices={[1]}>
            <Image source={require('../../../media/ikes1.png') } style={{ height: 190, width: 380 }}/>
            <View>
                <HerbyFrameBar entries={['INFO','MENU','REVIEWS','SOCIAL']} setFrame={(t)=>this._setFrame(t)}/>
                {this._getSearchBar()}
            </View>
            <Navigator
                style={{height:this._height,backgroundColor:'transparent',justifyContent: 'flex-start'}}
                ref="navigator"
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {RetailerFrames[InfoFrameId]}
                initialRouteStack = {RetailerFrames}
                retailer={this.props.retailer}
                goProduct={(t)=>this.props.GetProductAction(t)}
                showMap = {()=>this._showMap()}
            />
        </ScrollView>
        </View>
        );
    }
}

// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetProductAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,ShowMapAction }, dispatch); }

//
// BatsFix. Attach apollo query to the component. This creates props loading and products on HomeScene
//
const apolloRetailer = gql`query($itemId: ID!){
    Retailer(id:$itemId)
    {
        id,
        name,
        description,
        image,
        address,
        rating,
        ratingCount,
        products {
            price,
            product {id,name,image,rating,ratingCount,activity,thc,cbd,thca},
        },
        retailerReviews {
            id,
            name,
            comment,
            user {id,name},
            rating
        },
    }
}`;
/*
const apolloProducts = gql`query($itemId: String!) {
    allProducts(first:20,filter:{activity_contains:$itemId}){
      id,
      name,
      activity,
      rating,
      ratingCount,
      thc,
      cbd,
    }
}`;
*/
//
// BatsFix. Maps data obtained from the query to props.
//
function mapDataToProps({props,data}) {
    return ({
        loading: data.loading,
        retailer: data.Retailer,
    });
}

module.exports = graphql(apolloRetailer,{props:mapDataToProps})(connect(null,mapActionToProps)(RetailerScene));

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonLarge: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#8888ff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonSmall: {
        flex: 1,
        marginHorizontal: 3,
        borderRadius: 20,
        backgroundColor: '#8888ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#48BBEC',
        alignSelf: 'center',
    },
    button: {
        height: 33,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 22,
        margin: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',

    },
    input: {
        flex: 1,
        fontSize: 10,
        textAlign: 'center',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#999999',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    tagType: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#BD10E0",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextType: {
        color: "#BD10E0",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
    },
    storeItem: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    bg: {
        position: 'absolute',
        width: 352,
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
    price: {
        marginTop: 3,
        marginRight: 4,
        flex: 1,
        textAlign: 'right',
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black'
    },
    title: {
        marginTop: 3,
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    rowContainer: {
        flexDirection: 'row',
        marginRight: 3,
    },
    outside: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 6,
        margin: 8,
    },
    rowContainerStars: {
        flexDirection: 'row',
        marginTop: 8,
        marginRight: 3,
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    flexContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    root: {
        backgroundColor: '#F5FCFF',
    },
    thumb: {
        width: 100,
        height: 100,
        marginRight: 7,
        borderRadius: 5,
    },
});
