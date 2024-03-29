//
// Description: homescene.js
// This contains the declaration home scene, containing latest news,
// staff picks, trending topics etc. Included topics should have their
// own file and included here as a class only similar to Activities and
// ProductItem.
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableHighlight, Image } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import ProductList        from '../../util/productList.js';
import {GetActivityProducts,GoProductAction} from '../../../actions';
import {HerbyLoading,HerbyBar}         from '../../../common/controls.js';

class ActivityScene extends Component {
    constructor(props) {
        super(props);
        this.state = {loading:true,message:null,products:null};
        this._mounted = false;
    }

    componentDidMount() {
        this.setState({loading:true});
        this._mounted = true;
        GetActivityProducts(this.props.itemId,(products,error)=> {
           if (this._mounted) {
               if (error== null) {
                   this.setState({loading:false,products:products});
               }
               else {
                   this.setState({loading:false,message:error});
               }
           }
        });
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    _goProduct(productId) {
        //
        // Go to product page
        //
       this.props.GoProductAction(productId);
    }

    render() {
        if (this.state.loading || this.state.message != null) {
            return (<HerbyLoading showBusy={this.state.loading} message={this.state.message}/>);
        }
        var name = this.props.itemId;
        name = name[0].toUpperCase() + name.slice(1);

        return (
            <View style={[{ flex: 1 }]}>
            <HerbyBar name={name}  navigator={this.props.navigator}/>
            <ScrollView style={{flex:1}}>
            
                <View>
                <Image style={{ width: 377, 
                                height: 200, 
                                alignItems: 'flex-start', 
                                alignSelf: 'center',
                                justifyContent:'flex-end'  }} 
                                source={require('../../../media/ActivitySceneImages/adventure11.png')}>

                        <Text style={{ textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: "black", fontSize: 24, color: "white",backgroundColor:'transparent', margin: 8}}>
                            {this.props.itemId}
                        </Text>

                    </Image>
                </View>

                <ScrollView style={{flex:1}}>
                    <ProductList productList={this.state.products} goProduct={(t)=> this._goProduct(t)}/>
                </ScrollView>
            </ScrollView>
            </View>
        );
    }
}


//
// Connect GetProductAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ GoProductAction }, dispatch); }

module.exports = connect(null,mapActionToProps)(ActivityScene);

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    FindProductButton: {
        flex: 1,
        height: 30,
        marginHorizontal: 10,
        marginTop: 0,
        borderRadius: 3,
        backgroundColor: '#4A90E2',
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
    company: {
        flex: 1,
        textAlign: 'right',
        fontSize: 13,
        marginRight: 4,
        flexWrap: 'nowrap',
        height: 13
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

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
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
        // borderTopLeftRadius: 60,
        // borderTopRightRadius: 0,
    },
    separator: {
        // height: 1,
        // backgroundColor: '#dddddd'
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
    tagActivity: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#F5A623",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextActivity: {
        color: "#F5A623",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },
    tag: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#4A90E2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagText: {
        color: "#4A90E2",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },
});
