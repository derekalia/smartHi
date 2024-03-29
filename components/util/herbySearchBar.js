import React, { Component } from 'react';
import {Modal,ScrollView, Animated, Dimensions, StyleSheet, Text, View, Slider, Image, TextInput, TouchableHighlight, TouchableOpacity,} from 'react-native'
import FilterList         from './filterList.js';
import {HerbyPicker,HerbyButton2}     from '../../common/controls.js';
//
// Helper class for HerbySearchBar
//
class HerbySearchBarItem extends Component {
    _onPress() {
        this.props.onPress(this.props.name);
    }
    render () {
        var selected = (this.props.selected == this.props.name);
        return(
        <TouchableOpacity onPress={()=>this._onPress()} style={{marginHorizontal:10,marginTop:7,borderBottomWidth:selected?2:0,borderColor:'#468EE5',}}>
           <Text style={{marginBottom:16,color:selected?'#468EE5':'#9B9B9B',}}>{this.props.name}</Text>
        </TouchableOpacity>
        );
    }
}

export class HerbySearchBar extends Component {
    constructor(props) {
        super(props);
        this._searchText = "";
        if (this.props.entries.length > 0) {
            this.state = {selected:this.props.entries[0],showFilters:false};
        }
        else {
            this.state = {showFilters:true};
        }
    }
    _onChange(event) {
        this._searchText = event.nativeEvent.text;
    }
    _onSearch() {
        if (this.props.startSearch != null) {
            this.props.startSearch(this._searchText);
        }
    }
    _showFilters(value) {
        this.setState({showFilters:value});
    }
    _selectMenu(entry) {
        this.setState({selected:entry});
    }
    _getMenu() {
        var menuItems = [];
        for (var i=0; i < this.props.entries.length; i++) {
            var name = this.props.entries[i];
            menuItems.push(
                <HerbySearchBarItem key={i} name={name} onPress={(t)=>this._selectMenu(t)} selected={this.state.selected}/>
            );
        }
        return menuItems;
    }

    _addRemoveFilter(filter) {
    }

    render() {
        var {width,height} = Dimensions.get('window');
        this.maxWidth = width;
        this.maxHeight = height;

        var modalHeight = this.maxHeight*0.8;
        var modalWidth  = this.maxWidth*0.95;
        return(
        <View style={{backgroundColor:'#ECECEC'}}>
        <View style={{backgroundColor:'white'}}>

        <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.showFilters}
            onRequestClose={() => {this._showFilters(false)}}>
            <View style={{flex:1,backgroundColor:'lightgray',opacity:1}}>
              <View style={{marginTop:66,
                          alignSelf:'center',
                          width:modalWidth,
                          height: modalHeight,
                          borderRadius:6,
                          backgroundColor:'white',
                          justifyContent:'center',
                          alignItems:'center'
                        }}>
                <View style={{width:300,alignItems:'center',height:50,borderBottomWidth:1, borderColor:'#DEDEDE',justifyContent:'center'}}>
                   <Text style={{fontSize:18,color:'black'}}>Select Tags</Text>
                </View>

                {/* <View style={{width:300,alignItems:'center',borderBottomWidth:1, borderColor:'#DEDEDE',height:1}}/> */}

                <View style={{marginTop:0,padding:0,marginBottom:0,flex:1,}}>
                    <FilterList style={{flex:1}} productCount={1} addRemoveFilter={(t)=>this._addRemoveFilter(t)} noButton={true}/>
                </View>
                <View style={{marginTop:0,height:60,
                              width:300,

                              alignItems:'center',flexDirection:'row',justifyContent:'space-around',borderTopWidth:1, borderColor:'#DEDEDE'}}>

                    <TouchableOpacity onPress={()=>this._showFilters(false)} style={{width:90,height:40,borderRadius:6,backgroundColor:'#DEDEDE',justifyContent:'center'}}>
                      <Text style={{alignSelf:'center',color:'white'}}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._showFilters(false)} style={{width:90,height:40,borderRadius:6,backgroundColor:'white',borderColor:'#DEDEDE',borderWidth:1,justifyContent:'center'}}>
                      <Text style={{alignSelf:'center',color:'#DEDEDE'}}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </View>
         </Modal>


         <View style={{flexDirection: "row",marginTop:10,marginLeft:10,marginRight:10,}}>
            <View style={[{ flex: 5,}]}>
              <View style={{height: 34,borderWidth:3,borderColor:'#ECECEC',borderRadius:8,backgroundColor: '#ECECEC',}}>
                <TextInput style={{marginHorizontal:10,
                  height:28,
                  fontSize: 16,
                  backgroundColor: '#ECECEC',}}
                    autoCapitalize  = "none"
                    autoCorrect     = {false}
                    placeholder     = "Search"
                    returnKeyType   = "search"
                    onChange        = {(e) => this._onChange(e)}
                    clearButtonMode = 'always'
                    />
                    </View>
            </View>
            <View style={{flex:.1}}></View>
            <TouchableOpacity style={{flex: .6,marginRight:0,}} onPress={()=>this._showFilters(true)}>
                <Image style={{width:34,height:34}} source={require("../../media/plusButton11.png")}/>
            </TouchableOpacity>
            </View>
        </View>


        <ScrollView horizontal={true} style={{height:50, marginTop:0,paddingTop:10,marginBottom:0,backgroundColor:'white',borderBottomWidth:.5,borderBottomColor:'#929292'}}>
            {this._getMenu()}
        </ScrollView>

        {/* <View style={{backgroundColor:'white',marginHorizontal:8}}>
        <View style={{flexDirection:"row",alignSelf:'flex-start',justifyContent:'center',alignItems:'center',marginLeft:10,flex:1,height:25,marginTop:10}}>
          <Text style={{fontWeight:'bold',fontSize:16}}>Sort By: </Text>
          <View style={{backgroundColor:'#ECECEC',flexDirection:"row",alignItems:'center',justifyContent:'center',alignSelf:'center',height:20,width:80,borderRadius:4,height:25}}>
            <HerbyPicker options={['Price ','Distance ','Rating ']} style={{fontSize:16}} />
            <Image style={{width:14,height:8,marginRight:3,alignItems:'flex-end'}} source={require("../../media/Triangle1.png")} />
          </View>
          </View>
        </View> */}
        </View>

        );
    }
}

module.exports = HerbySearchBar;
