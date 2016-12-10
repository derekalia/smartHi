//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator, Dimensions,} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {HerbyLoading,HerbyBar,HerbyButton2,}         from '../../../common/controls.js';
import {GoRateRetailerAction,RateProduct,GetProduct} from '../../../actions';

import StarRating from 'react-native-star-rating';
import ReviewList   from '../../util/reviewList.js';
import FilterItem   from '../../util/filterItem.js';

import HerbyModal from '../../util/herbyModal.js';
import {FiltersActivity, FiltersEffect, FiltersType,FiltersCategory,FiltersSymptoms} from '../../../common/filters.js';


class RateProductScene extends Component {
    constructor(props) {
        super(props);
        // these should come from the app state.

        this._selectedFilterIndex = 0;
        this._effect   = FiltersEffect;
        this._symptom  = FiltersSymptoms;
        this._activity = FiltersActivity;
        //
        // BatsFix. Assuming that no filters were selected. Is that correct?
        //
        for (var i=0; i < this._effect.length; i++) { this._effect[i].selected = false };
        for (var i=0; i < this._symptom.length; i++) { this._symptom[i].selected = false };
        for (var i=0; i < this._activity.length; i++) { this._activity[i].selected = false };

        this.state = {loading:true,message:null,product: null,showSlider:false};
        this._mounted = false;
    }

    componentDidMount() {
        this.setState({loading:true});
        this._mounted = true;
        console.log("item id is now " + this.props.itemId);
        GetProduct(this.props.itemId,(product,error)=> {
           if (this._mounted) {
               if (error== null) {
                   this.setState({loading:false,product:product});
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


    render() {
        if (this.state.loading || this.state.message != null) {
            return (<HerbyLoading showBusy={this.state.loading} message={this.state.message}/>);
        }

        return (
        <View style={{flex:1}}>
            <HerbyBar navigator={this.props.navigator} name="RateProduct"/>
            <ScrollView style={{flex:1, backgroundColor:'white'}}>
                <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: "flex-start" }}>
                        <Image source={require('../../../media/RosinXJ.png') } style={{ height: 190, width: 380 }}/>
                    </View>

                    {this._renderRating()}

                    {this._renderDetailRating()}

                    {this._renderFilters()}

                    {this._renderCommentBox()}

                </View>
            </ScrollView>

                <View style={{marginTop:20}}>
                            <HerbyModal  show={this.state.showSlider}>
                                <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                                    <View style={{flex:1}}/>
                                    <View style={{flex:1.2,backgroundColor:'white',borderRadius:10,width:320}}>

                                        <View style={{flex:.8,marginTop:20}}>
                                          <View style={{flexDirection:'row',flex:1,justifyContent:'center'}}>
                                            <HerbyButton2 name={this._effect[this._selectedFilterIndex].name}/>
                                          </View>
                                        </View>
                                        <View style={{flex:1,width:300,marginTop:10,alignSelf:'center'}}>
                                        <View style={{flexDirection:'row',}}>
                                            <Text style={{color:'black',fontSize:12,fontWeight:'bold',position:'absolute',left:10,}} >Low</Text>
                                            <Text style={{color:'black',fontSize:12,fontWeight:'bold',position:'absolute',right:10,}}>High</Text>
                                        </View>
                                        <Slider maximumValue={100} minimumValue={10} value={50} style={{flex:1}} onSlidingComplete={(t)=> this._setEffectValue(t)}/>
                                          <Text style={{alignSelf:'center',fontSize:16,}}>Here is some info about the effect</Text>
                                        </View>

                                        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                                          <TouchableOpacity style={{width:100,alignSelf:'center',borderRadius:4,width:100,height:42,backgroundColor:'white',borderColor:'black',borderWidth:1,justifyContent:'center'}} onPress={()=>this._setEffectValue(-1)}>
                                            <Text style={{fontSize:16,justifyContent:'center',alignSelf:'center'}}>Cancel</Text>
                                          </TouchableOpacity>

                                        </View>
                                    </View>
                                    <View style={{flex:1}}/>
                                </View>
                             </HerbyModal>
                             </View>

        </View>
        );
    }

    _submitRating() {
        //BatsFix. What should go here?
        var rating = {};
        rating.id      = this.state.product.id;
        rating.rating  = this.state.rating;
        rating.quality = this.state.quality;
        rating.potency = this.state.potency;
        rating.flavor  = this.state.flavor;
        rating.comment = this._comment;

        RateProduct(rating,(error)=> {
           // BatsFix. Should we do something here?
           if (this._mounted) {
               if (error== null) {
                   this.props.GoRateRetailerAction(0);        
               }
           }
        });
    }

    _onRating(rating) {
        this.setState({
            rating: rating
        });
    }
    _onQuality(rating) {
        this.setState({
            quality: rating
        });
    }
    _onPotency(rating) {
        this.setState({
            potency: rating
        });
    }
    _onFlavor(rating) {
        this.setState({
            flavor: rating
        });
    }

    _onComment(text) {
        this._comment = text;
    }

    _renderRating() {
        return (
        <View>
            <View style={{flexDirection:'row', marginTop: 10, marginHorizontal: 10 }}>
              <View style={{justifyContent: "flex-start"}}>
                  <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.state.product.name}</Text>
              </View>
            </View>
            <View style={{ marginTop: 5, marginHorizontal: 10,flexDirection: "row" }}>
                <View style={{flex:1.2,alignItems: 'flex-start', flexDirection: "row",marginTop:8}}>
                    <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                        rating={this.state.product.rating}
                        selectedStar={(rating) => this._onRating(rating)}/>

                </View>
                <View style={{flex:1,flexDirection: "row",justifyContent:'flex-end' }}>
                  <TouchableOpacity style={Styles.tagCategory}>
                      <Text style={Styles.tagTextCategory}>rosin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.tagType}>
                      <Text style={Styles.tagTextType}>sativa</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
        );
    }
    _renderDescription() {
        return (
        <View style={{ marginHorizontal: 10 }}>
            <View style={{ flex: 1,justifyContent: 'center',marginTop:10,marginBottom:5 }}>
                  <Text style={{fontSize:16}}>
                  {this.state.product.description}
                 </Text>
            </View>
        </View>
        );
    }
    _renderDetailRating() {
        return(
        <View style={{ marginHorizontal: 10,marginTop: 15  }}>
            <View style={{ height: 40, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Rating</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, }}>
                    {/* <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                        <Text style={[{ color: 'black', margin: 5,fontSize:16 }]}>Quality</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                        <Text style={[{ color: 'black', margin: 5,fontSize:16 }]}>Flavor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                        <Text style={[{ color: 'black', margin: 5,fontSize:16 }]}>Potency</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3 }}>
                    {/* <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                        <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                            rating={this.state.product.quality}
                            selectedStar={(rating) => this._onQuality(rating)}/>
                    </View> */}
                    <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                        <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                            rating={this.state.product.flavor}
                            selectedStar={(rating) => this._onFlavor(rating)}/>
                   </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                        <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                            rating={this.state.product.potency}
                            selectedStar={(rating) => this._onPotency(rating)}/>
                   </View>
                </View>
            </View>
        </View>
        );
    }

    _renderTestResults() {
        return (
        <View style={{ marginHorizontal: 10, marginTop: 15 }}>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Test Results</Text>
                <View style={{flex:1,flexDirection:'row',justifyContent: 'space-between',height:20,marginTop:20,}}>
                  <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>THCA</Text>
                  <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>THC</Text>
                  <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>CBD</Text>
                  <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>TOTAL</Text>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent: 'space-between',height:30}}>
                  <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.state.product.thca}%</Text>
                  <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.state.product.thc}%</Text>
                  <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.state.product.cbd}%</Text>
                  <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.state.product.cbd}%</Text>
                </View>
            </View>
        </View>
        );
    }

    _renderCommentBox() {
        return (
        <View style={{ marginHorizontal: 10, marginTop: 15, marginBottom:200, }}>
            <View style={{ height: 40, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Comment</Text>
            </View>
            <View style={{ flexDirection: "row",borderColor: 'gray', borderWidth: 1, margin: 0, borderRadius: 4, }}>
                <TextInput
                    style={{ height: 60, flex:1, margin: 4, fontSize: 16, }}
                    onChangeText={(text) => this._onComment(text) }
                    placeholder={'Say something'}
                    numberOfLines = {4}
                    multiline = {true}
                />
            </View>
            <TouchableOpacity style={{  marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ED3C52",
                backgroundColor: '#ED3C52',
                justifyContent: 'center',
                alignItems: 'center',width:80}}
                onPress={(e)=>this._submitRating(e)}
                >
                <Text style={{color: "white",fontWeight:'bold',fontSize:16,
                    marginTop: 7,
                    marginBottom: 7,
                    marginHorizontal: 10,}}> Post </Text>
            </TouchableOpacity>
        </View>
        );
    }

    //
    // BatsFix. This is a lot of code for selecting filters should it be moved to a different file?
    //

    _renderEffectFilters() {
        {
            return (
            <View style={{flexDirection:'row',flexWrap:'wrap',width:360}}>
                  {this._renderFiltersArray(this._effect)}
                  <TouchableOpacity style={{borderColor: "#4A90E2",borderWidth:1,borderRadius:100,width:40,height:40,justifyContent:'center',margin:5}}>
                    <View style={{borderColor: "#4A90E2",width:1,height:20,borderWidth:.5,alignItems:'center',alignSelf:'center',justifyContent:'center'}}><View style={{borderColor: "#4A90E2",width:20,borderWidth:.5,alignItems:'center',alignSelf:'center',justifyContent:'center'}}></View></View>
                  </TouchableOpacity>
            </View>
            );
        }
    }

    _setEffectValue(value) {
        if (value != -1) {
            this._effect[this._selectedFilterIndex].strength = value;
        }
        this.setState({showSlider:false});
    }

    _onAddRemoveFilter(filter) {
        if (filter.type == 'effect') {
            var index = this._effect.indexOf(filter);
            this._effect[index].selected = filter.selected;
            if (filter.selected) {
                // keep in mind this filter.
                this._selectedFilterIndex = index;
                // get the effect strength
                this.setState({showSlider:true});
            }
        }
    }

    _renderFiltersArray(filterArray) {
        var filters = [];
        for (var i=0; i  < filterArray.length; i++) {
            filters.push(<FilterItem filter={filterArray[i]} key={i} onPress={(t) => this._onAddRemoveFilter(t)}/>);
        }
        return filters;
    }

    _renderFilters() {
        return (
        <View>
            <View style={{marginHorizontal: 10, marginTop: 15,}}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Effects</Text>
                </View>

                {this._renderEffectFilters()}

            </View>
            {/* Related activities */}
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Activities</Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap',width:357}}>
                {this._renderFiltersArray(this._activity)}
                <TouchableOpacity style={{borderColor: "#BE00E3",borderWidth:1,borderRadius:100,width:40,height:40,justifyContent:'center',margin:5}}>
                  <View style={{borderColor: "#BE00E3",width:1,height:20,borderWidth:.5,alignItems:'center',alignSelf:'center',justifyContent:'center'}}><View style={{borderColor: "#BE00E3",width:20,borderWidth:.5,alignItems:'center',alignSelf:'center',justifyContent:'center'}}></View></View>
                </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Symptoms</Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap',width:357}}>
                {this._renderFiltersArray(this._symptom)}
                <TouchableOpacity style={{borderColor: "#ED3C52",borderWidth:1,borderRadius:100,width:40,height:40,justifyContent:'center',margin:5}}>
                  <View style={{borderColor: "#ED3C52",width:1,height:20,borderWidth:.5,alignItems:'center',alignSelf:'center',justifyContent:'center'}}><View style={{borderColor: "#ED3C52",width:20,borderWidth:.5,alignItems:'center',alignSelf:'center',justifyContent:'center'}}></View></View>
                </TouchableOpacity>
                </View>
            </View>
        </View>
        );
    }

}

// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        product: state.ReviewReducer.product,
    }
}

//
// Connect GoRateRetailerAction
//
function mapActionToProps(dispatch) { return bindActionCreators({ GoRateRetailerAction, }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(RateProductScene);


const Styles = StyleSheet.create({
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
        borderColor: "#ED3C52",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextSymptom: {
        color: "#ED3C52",
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

})
