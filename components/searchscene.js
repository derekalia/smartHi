//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, TouchableHighlight, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

import Accordion from 'react-native-collapsible/Accordion';
import StarRating from 'react-native-star-rating';

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {StartSearchAction, GetProductAction} from '../actions';

const searchIcon = {
    scale: 2.3,
    uri: 'data:image/png;base64,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'
}

class SearchScene extends Component {
    constructor(props) {
        super(props);
        // these should come from the app state.
        this._searchTerm = "";
        this.state = {
            act: this.props.act,
            eff: this.props.eff,
            type: this.props.type,
            category: this.props.category,
            symptoms: this.props.symptoms,
            attributes: [],
            starCount: 3.5,
            filtersVisible: true,
        }
    }

    componentWillReceiveProps(nextProps) {
        // BatsFix. for now assume all updates are related to
        // search success. Therefore hide somethings.

    }
 
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    _setKeyWord(event) {
        this._searchTerm = event.nativeEvent.text;
    }

    _plusActivity(activity) {
        // set activities to search

        var attributes = this.state.attributes;
        var index = attributes.indexOf(activity);
        if (index < 0) {
            attributes.push(activity);
            this.setState({ attributes: attributes });
        }
    }

    _plusEffect(effects) {
        // set effects to search
        var attributes = this.state.attributes;
        var index = attributes.indexOf(effects);
        if (index < 0) {
            attributes.push(effects);
            this.setState({ attributes: attributes });
        }
    }

    _startSearch() {
        //
        // BatsFix. call searchStartAction
        //
        this.props.StartSearchAction(this._searchTerm);
    }

    _switchFiltering() {
        var current = this.state.filtersVisible;
        console.log("filtering is called" + this.state.filtersVisible);
        this.setState({filtersVisible:!current});
    }



    _goProduct(rowData: string) {
        // BatsFix. should set a product state first.
        this.props.GetProductAction(rowData);
        // then go product scene
    }

    _renderRow(rowData: string) {
        // BatsFix. styling for product row data needs to be added.
        return (

                <TouchableHighlight onPress={() => this._goProduct(rowData) }>
                        <View style={{  flexDirection: 'row',
                          backgroundColor: 'white',
                          borderColor: '#48BBEC',
                          borderWidth: 1,
                          borderRadius: 6,
                          margin: 6}}>
                            <Image style={{  width: 100,
                              height: 100,
                              marginRight: 8,
                              borderRadius: 5,}} source={require('../media/Rosin2.png') }/>
                            <View style={{
                              flex: 1,
                              flexDirection: 'column',padding:5,}}>
                                <View style={{  flexDirection: 'row',}}>
                                    <Text style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: 'black'}} numberOfLines={1}>{rowData}</Text>
                                      <View style={{
                                        flex:1,
                                      alignItems:
                                      'flex-end',}}>
                                    <Text style={{
                                    fontSize: 18,
                                    // fontWeight: 'bold',
                                    color: 'black'}}>$34.99</Text>
                                    </View>
                                </View>
                                <View style={{    flexDirection: 'row',
                                    marginTop: 6,
                                    }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starColor={'red'}
                                        starSize={17}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating) }
                                        />
                                        <Text style={{
                                        fontSize: 13,
                                        color: 'black'}}> (39)</Text>
                                        <View style={{
                                          flex:1,
                                        alignItems:'flex-end',}}>
                                      <Text style={{
                                      fontSize: 13,
                                      color: 'black'}}>Forged Cannabis</Text>
                                      </View>
                                </View>
                                <View style={{flexDirection: 'row',paddingTop:4}}>
                                    <TouchableHighlight style={{  height: 35,
                                      flex: 1,
                                      backgroundColor: 'white',
                                      borderColor: '#48BBEC',
                                      borderWidth: 1,
                                      borderRadius: 22,
                                      margin: 3,
                                      justifyContent: 'center',}}>
                                        <Text style={{fontSize: 14,
                                        color: '#48BBEC',
                                        alignSelf: 'center',}}>flower</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={{  height: 35,
                                      flex: 1,
                                      backgroundColor: 'white',
                                      borderColor: '#48BBEC',
                                      borderWidth: 1,
                                      borderRadius: 22,
                                      margin: 3,
                                      justifyContent: 'center',}}>
                                        <Text style={{fontSize: 14,
                                        color: '#48BBEC',
                                        alignSelf: 'center',}}>indica</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={{  height: 35,
                                      flex: 1,
                                      backgroundColor: 'white',
                                      borderColor: '#48BBEC',
                                      borderWidth: 1,
                                      borderRadius: 22,
                                      margin: 3,
                                      justifyContent: 'center',}}>
                                        <Text style={{fontSize: 14,
                                        color: '#48BBEC',
                                        alignSelf: 'center',}}>sleepy</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                </TouchableHighlight>

        )
    }
    _renderList() {
        if (this.props.products.size !== 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 != r2), });
            return (
                <ListView dataSource = {ds.cloneWithRows(this.props.products) }
                    enableEmptySections = {true}
                    renderRow  = {this._renderRow.bind(this) }
                    />

            );
        }
        else
            return null;
    }

    _removeAttribute(attribute) {
        //BatsFix. add code to remove attribute
        var attributes = this.state.attributes;
        var index = attributes.indexOf(attribute);
        attributes.splice(index, 1);
        this.setState({ attributes: attributes });
    }

    _renderAttribute(attribute: string) {
        // BatsFix. styling for product row data needs to be added.

        return (
            <TouchableOpacity style={Styles.tagActivity} onPress={() => this._removeAttribute(attribute) }>
                <Text style={Styles.tagTextActivity}>{attribute}</Text>
            </TouchableOpacity>

        )
    }

    _renderAttributes() {
        if (this.state.attributes.size !== 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 != r2), });
            return (
                <ListView dataSource = {ds.cloneWithRows(this.state.attributes) }
                    enableEmptySections = {true}
                    renderRow  = {this._renderAttribute.bind(this) }
                    contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                    />
            );
        }
        else
            return null;
    }

    // BatsFix. These should be broken into components later.
    render() {
        return (
            <View style={{ flex: 1, marginTop: 50 }}>
                <View style={{ flex: 1, flexDirection: "row", marginTop: 20, marginHorizontal: 10 }}>
                    <View style={[{ flex: 5 }]}>
                        <TextInput style={[Styles.input]}
                            autoCapitalize  = "none"
                            autoCorrect     = {false}
                            placeholder     = " Keyword"
                            returnKeyType   = "next"
                            onChange        = {this._setKeyWord.bind(this) }
                            />
                    </View>
                    <View style={[{ flex: 1, borderWidth: 1, borderColor: "#4A90E2", backgroundColor: "#4A90E2", height: 50 }]}>
                        <TouchableOpacity style={{}} onPress={this._startSearch.bind(this) }>
                            <Image style={{ height: 32, width: 32, marginLeft: 13, marginTop: 8 }} source={require("../media/SearchIcon0.png") }/>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={[{ flex: 8, marginHorizontal: 10 }]}>
                    <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }]}>
                        {this._renderAttributes() }
                    </View>

                    <View style={{borderWidth: 1, borderColor: "#dddddd", width: 360, alignItems: "center", justifyContent: "center", left: 0,marginTop:10,marginBottom:10 }}/>

                    <View style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: "center",
                      justifyContent: 'center'}}>
                    <TouchableHighlight style={{
                      height: 40,
                      width:340,
                      backgroundColor: 'white',
                      borderColor: 'black',
                      borderWidth: 1,
                      borderRadius: 22,
                      justifyContent: 'center',}}>
                        <Text style={{fontSize: 14,
                        color: 'black',
                        alignSelf: 'center',}}
                      onPress = {()=> this._switchFiltering()}
                      >
                        {this.state.filtersVisible? "Hide Filtering Options":"Show Filtering Options"}
                      </Text>
                    </TouchableHighlight>
                    </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <View style={{ height: 40, justifyContent: 'center', }}>
                                <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Activity </Text>
                            </View>
                            <View style={[{ flexDirection: 'row', flexWrap: 'wrap',width:370 }]}>
                                {/*BatsFix adding attributes similar. In ship code it will be done in a list */}
                                <TouchableOpacity style={Styles.tagActivity} onPress={() => this._plusActivity(this.state.act[0]) }>
                                    <Text style={Styles.tagTextActivity}>{this.state.act[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagActivity} onPress={() => this._plusActivity(this.state.act[1]) }>
                                    <Text style={Styles.tagTextActivity}>{this.state.act[1]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagActivity} onPress={() => this._plusActivity(this.state.act[2]) }>
                                    <Text style={Styles.tagTextActivity}>{this.state.act[2]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagActivity} onPress={() => this._plusActivity(this.state.act[3]) } >
                                    <Text style={Styles.tagTextActivity}>{this.state.act[3]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagActivity} onPress={() => this._plusActivity(this.state.act[4]) }>
                                    <Text style={Styles.tagTextActivity}>{this.state.act[4]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagActivity} onPress={() => this._plusActivity(this.state.act[5]) }>
                                    <Text style={Styles.tagTextActivity}>{this.state.act[5]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagActivity} onPress={() => this._plusActivity(this.state.act[6]) }>
                                    <Text style={Styles.tagTextActivity}>{this.state.act[6]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagActivity} onPress={() => this._plusActivity(this.state.act[7]) }>
                                    <Text style={Styles.tagTextActivity}>{this.state.act[7]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <View style={{ height: 40, justifyContent: 'center', }}>
                                <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Effects </Text>
                            </View>
                            <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }]}>
                                <TouchableOpacity style={Styles.tag} onPress={() => this._plusEffect(this.state.eff[0])} >
                                    <Text style={Styles.tagText}>{this.state.eff[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tag} onPress={() => this._plusEffect(this.state.eff[1])}>
                                    <Text style={Styles.tagText}>{this.state.eff[1]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tag} onPress={() => this._plusEffect(this.state.eff[2])}>
                                    <Text style={Styles.tagText}>{this.state.eff[2]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tag}onPress={() => this._plusEffect(this.state.eff[3])}>
                                    <Text style={Styles.tagText}>{this.state.eff[3]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tag}onPress={() => this._plusEffect(this.state.eff[4])}>
                                    <Text style={Styles.tagText}>{this.state.eff[4]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tag}onPress={() => this._plusEffect(this.state.eff[5])}>
                                    <Text style={Styles.tagText}>{this.state.eff[5]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tag}onPress={() => this._plusEffect(this.state.eff[6])}>
                                    <Text style={Styles.tagText}>{this.state.eff[6]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tag}onPress={() => this._plusEffect(this.state.eff[7])}>
                                    <Text style={Styles.tagText}>{this.state.eff[7]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <View style={{ height: 40, justifyContent: 'center', }}>
                                <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Type </Text>
                            </View>
                            <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }]}>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.type[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.type[1]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.type[2]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.type[3]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.type[4]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.type[5]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.type[6]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.type[7]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View>
                            <View style={{ height: 40, justifyContent: 'center', }}>
                                <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Symptoms </Text>
                            </View>
                            <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }]}>

                                <TouchableOpacity style={Styles.tagSymptoms}>
                                    <Text style={Styles.tagTextSymptoms}>{this.state.symptoms[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagSymptoms}>
                                    <Text style={Styles.tagTextSymptoms}>{this.state.symptoms[1]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagSymptoms}>
                                    <Text style={Styles.tagTextSymptoms}>{this.state.symptoms[2]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagSymptoms}>
                                    <Text style={Styles.tagTextSymptoms}>{this.state.symptoms[3]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagSymptoms}>
                                    <Text style={Styles.tagTextSymptoms}>{this.state.symptoms[4]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagSymptoms}>
                                    <Text style={Styles.tagTextSymptoms}>{this.state.symptoms[5]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagSymptoms}>
                                    <Text style={Styles.tagTextSymptoms}>{this.state.symptoms[6]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagSymptoms}>
                                    <Text style={Styles.tagTextSymptoms}>{this.state.symptoms[7]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <View style={{ height: 40, justifyContent: 'center', }}>
                                <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Category </Text>
                            </View>
                            <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }]}>
                                <TouchableOpacity style={Styles.tagCategory}>
                                    <Text style={Styles.tagTextCategory}>{this.state.category[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagCategory}>
                                    <Text style={Styles.tagTextCategory}>{this.state.category[1]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagCategory}>
                                    <Text style={Styles.tagTextCategory}>{this.state.category[2]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View>
                            <View style={{ height: 40, justifyContent: 'center', }}>
                                <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Price </Text>
                            </View>
                            <View>
                            <Slider
                                maximumValue={100}
                                minimumValue = {.2}
                                />
                                </View>
                        </View>

                        <View>
                            <View style={{ height: 40, justifyContent: 'center', }}>
                                <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Distance </Text>
                            </View>
                            <View>
                            <Slider
                                maximumValue={100}
                                minimumValue = {.2}
                                />
                              </View>
                        </View>

                    <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 380, alignItems: 'center', alignItems: "center", justifyContent: "center", left: 0,marginTop:10,marginBottom:10 }}/>


                    <View>
                        {this._renderList() }
                    </View>


                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ height: 40, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> </Text>
                        </View>
                        </View>

                </ScrollView>
            </View>


        );
    }
}

const Styles = StyleSheet.create({
    loginButton: {
        flex: 1,
        height: 10,
        marginHorizontal: 30,
        marginTop: 50,
        marginBottom: 30,
        borderRadius: 3,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonText: {
        fontSize: 14,
        color: '#48BBEC',
        alignSelf: 'center',
    },
    button: {
        height: 35,
        flex: 1,
        backgroundColor: 'white',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 22,
        margin: 3,
        justifyContent: 'center',

    },

    signUpButton: {
        flex: 1,
        height: 52,
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 3,
        backgroundColor: '#50E3C2',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
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

        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 6,
        margin: 6,
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
    input: {
        height: 50,
        fontSize: 20,

        backgroundColor: 'white',
        borderRadius: 0,
        borderColor: "#4A90E2",

        borderWidth: 1,
    },
    company: {
        flex: 1,
        textAlign: 'right',
        fontSize: 13,
        marginRight: 4,
        flexWrap: 'nowrap',
        height: 13
    },
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'white',
    },
    tagEffects: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#4A90E2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumb: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 5,
        // borderTopLeftRadius: 60,
        // borderTopRightRadius: 0,
    },
    tagTextEffects: {
        color: "#4A90E2",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
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

    tagType: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#BD10E0",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextType: {
        color: "#BD10E0",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },

    tagSymptoms: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#50E3C2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextSymptoms: {
        color: "#50E3C2",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },

    tagCategory: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#70D600",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextCategory: {
        color: "#70D600",
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

// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        act: state.SearchReducer.act,
        eff: state.SearchReducer.eff,
        products: state.SearchReducer.products,
        type: state.SearchReducer.type,
        category: state.SearchReducer.category,
        symptoms: state.SearchReducer.symptoms,
    }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called StartSearchAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ StartSearchAction, GetProductAction }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(SearchScene);
