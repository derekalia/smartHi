//components/loginpage.js
import React, { Component } from 'react';
import {Dimensions,StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, TouchableHighlight, Navigator} from 'react-native';

//get internal components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';

// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


//get internal components
import {GetProductAction} from '../../../actions';
import ReviewList         from '../../util/reviewList.js';
import ProductList        from '../../util/productList.js';
import UserList           from '../../util/userList.js';
import ProducerMenu       from './producerMenu.js';
import {HerbyLoading,HerbyBar,HerbyFrameBar}    from '../../../common/controls.js';
import HerbySearchBar from '../../util/herbySearchBar.js';

class ProducerSocial extends Component {
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
                <HerbyFrameBar entries={['FOLLOWER','FOLLOWING']} setFrame={(t)=>this._setFrame(t)}/>
                <UserList userList={this.state.frameId == 0?this.props.producer.following:this.props.producer.follower}/>
            </ScrollView>
        );
    }
}


class ProducerInfo extends Component {
    render() {
        //BatsFix. Parse this.props.producer.ratingCount later;
        var ratingCount = 300;
        return (
        <View style={{backgroundColor:'white',flex:1,marginHorizontal:6,marginTop:6,borderRadius:3}}>

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
                    <Text style={{ fontSize: 19 }}> ({ratingCount}) </Text>
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

class ProducerReview extends Component {
    render() {
        return (
          <View style={{backgroundColor:'white',flex:1,marginHorizontal:6,marginTop:6,borderRadius:3}}>
            <ReviewList/>
            </View>
        );
    }
}

const InfoFrameId    = 0;
const MenuFrameId    = 1;
const ReviewFrameId  = 2;
const SocialFrameId  = 3;

const ProducerFrames = [
    {title: "info",     component: ProducerInfo,     index: InfoFrameId},
    {title: "menu",     component: ProducerMenu,     index: MenuFrameId},
    {title: "review",   component: ProducerReview,   index: ReviewFrameId},
    {title: "social",   component: ProducerSocial,   index: SocialFrameId},
];


class ProducerScene extends Component {
    constructor(props) {
        super(props);
        var {width,height} = Dimensions.get('window');
        this._height = height;
        this.state={frameId:InfoFrameId};
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(ProducerFrames[frameId]);
        this.setState({frameId: frameId});
    }

    _onLike() {
        // BatsFix. Implement like action for this product.
    }

    _getSearchBar() {
        if (this.state.frameId == MenuFrameId) {
            return (
                <HerbySearchBar entries={['ALL','FLOWER','CONCENTRATE','INFUSED','EDIBLES']}/>
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
                    producer={navigator.props.producer}
                    goProduct={navigator.props.goProduct}/>
        );
    }

    render() {
        if (this.props.loading) {
            return (<HerbyLoading/>);
        }

        return (
        <View style={{flex:1,backgroundColor:'#ECECEC'}}>
        <HerbyBar name={this.props.producer.name} navigator={this.props.navigator} onLike={()=>this._onLike()}/>
        <ScrollView
            style={{marginTop:0,height:this._height,backgroundColor:'#ECECEC'}}
            stickyHeaderIndices={[1]}>
            <Image source={require('../../../media/forged1.png') } style={{ height: 190, width: 380 }}/>
            <View>
                <HerbyFrameBar entries={['INFO','PRODUCTS','REVIEWS','SOCIAL']} setFrame={(t)=>this._setFrame(t)}/>

                {this._getSearchBar()}
            </View>

            <Navigator
                style={{height:this._height,backgroundColor:'white',justifyContent: 'flex-start',marginTop:6,marginHorizontal:6}}
                ref="navigator"
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {ProducerFrames[InfoFrameId]}
                initialRouteStack = {ProducerFrames}
                producer={this.props.producer}
                goProduct={(t)=>this.props.GetProductAction(t)}
            />

        </ScrollView>
        </View>
        );
    }
}

// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetProductAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction, }, dispatch); }

//
// BatsFix. Attach apollo query to the component. This creates props loading and product on HomeScene
//
const apolloProducer = gql`query($itemId: ID!){
    Producer(id:$itemId)
    {
        id,
        name,
        image,
        description,
        rating,
        ratingCount,
        products {
           id,
           name,
           rating,
           ratingCount,
           thc,
           cbd,
           thca,
           activity,
        },
    }
}`;
 
//
// BatsFix. Maps data obtained from the query to props.
//
function mapDataToProps({props,data}) {
    return ({
        loading: data.loading,
        producer: data.Producer,
    });
}

module.exports = graphql(apolloProducer,{props:mapDataToProps})(connect(null,mapActionToProps)(ProducerScene));

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
