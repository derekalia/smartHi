//components/loginpage.js
import React, { Component } from 'react';
import {Dimensions,StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, TouchableHighlight, Navigator} from 'react-native';

//get internal components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';

//get internal components
import {GetProductAction} from '../actions';
import ReviewList         from './reviewList.js';
import ProductList        from './productList.js';
import {HerbyBar,HerbyFrameBar}    from '../common/controls.js';


class ProducerInfo extends Component {
    render() {
        return (
        <View>
                    <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
            <View style={{ justifyContent: "flex-end", marginTop: 10, marginHorizontal: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.props.producer.name} - Issaquah, WA</Text>
                <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        starSize={30}
                        starColor={'red'}
                        rating={this.props.producer.rating}
                        selectedStar={(rating) => this._onRating(rating) }
                        />
                    <Text style={{ fontSize: 19 }}> ({this.props.producer.ratingCount}) </Text>
                </View>
            </View>

            <View style={{ marginHorizontal: 10 }}>
                <View style={{ flex: 1, height: 85, justifyContent: 'center' }}>
                    <Text>{this.props.producer.description}</Text>
                </View>
            </View>
        </View>
        );
    }
    _onRating(rating) {
    }
}

class ProducerMenu extends Component {
    render() {
        return (
        <View>
                    <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
            <ProductList style={{ marginHorizontal: 10 }} productList={this.props.producer.products} goProduct={(id)=>this.props.goProduct(id)}/>
        </View>
        );
    };
}
class ProducerReview extends Component {
    render() {
        return (
          <View>
          <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
            <ReviewList/>
            </View>
        );
    }
}

const InfoFrameId    = 0;
const MenuFrameId    = 1;
const ReviewFrameId  = 2;

const ProducerFrames = [
    {title: "info",     component: ProducerInfo,     index: InfoFrameId},
    {title: "menu",     component: ProducerMenu,     index: MenuFrameId},
    {title: "review",   component: ProducerReview,   index: ReviewFrameId},
];


class ProducerScene extends Component {
    constructor(props) {
        super(props);
        var {width,height} = Dimensions.get('window');
        this._height = height;
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(ProducerFrames[frameId]);
        this.setState({frameId: frameId});
    }

    _onLike() {
        // BatsFix. Implement like action for this product.
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
                    producer={navigator.props.producer}
                    goProduct={navigator.props.goProduct}/>
        );
    }

    render() {
        return (
        <View style={{flex:1}}>
        <HerbyBar name={this.props.item.name} navigator={this.props.navigator} onLike={()=>this._onLike()}/>
        <ScrollView 
            style={{marginTop:0,height:this._height,backgroundColor:'white'}} 
            stickyHeaderIndices={[1]}>
            <Image source={require('../media/forged1.png') } style={{ height: 190, width: 380 }}/>
            <HerbyFrameBar entries={['INFO','PRODUCTS','REVIEWS',]} setFrame={(t)=>this._setFrame(t)}/>
            <Navigator
                style={{height:this._height,backgroundColor:'transparent',justifyContent: 'flex-start'}}
                ref="navigator"
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {ProducerFrames[InfoFrameId]}
                initialRouteStack = {ProducerFrames}
                producer={this.props.item}
                goProduct={(t)=>this.props.GetProductAction(t)}
            />
        </ScrollView>
        </View>
        );
    }
}

// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        producer: state.ProducerReducer.producer,
    }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetProductAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction, }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(ProducerScene);

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
        borderColor: 'black',
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
