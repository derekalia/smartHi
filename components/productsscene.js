//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,Slider,ListView,ListViewDataSource,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Accordion from 'react-native-accordion';


//get internal components
import {GetProductAction} from '../actions';
import Styles from './styles.js';


class ProductsScene extends Component {
  constructor(props) {
    super(props);
    // these should come from the app state.
    for (key in props.products) {
      console.log("my prop "+props.products[key]);
    }
  }

  _goProduct(rowData:string) {
    // BatsFix. should set a product state first.
    this.props.GetProductAction(rowData);
    // then go product scene
    this.props.navigator.push(this.props.productScene);
  }

  _renderRow(rowData:string) {
    console.log("rendering row " + rowData);
    return (
      <TouchableOpacity style={Styles.buttonLarge} onPress={()=>this._goProduct(rowData)}>
        <Text>{rowData}</Text>
      </TouchableOpacity>
    )
  }

  _renderList() {
    if (this.props.products.size !== 0)
    {
      console.log("props are not empty");
      var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => (r1 != r2),});
      return (
        <ListView dataSource = {ds.cloneWithRows(this.props.products)}
          enableEmptySections = {true}
          renderRow  = {this._renderRow.bind(this)}
          />

      );
    }
    else
    return null;
  }

  // BatsFix. These should be broken into components later.
  render() {
    return (
      <View style={[Styles.container,{flex:1,marginTop:70}]}>
        <View style={[{flex:8}]}>
          <ScrollView>
            {this._renderList()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
  return {
    products: state.SearchReducer.products,
  }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetProductAction.
//
function mapActionToProps(dispatch) {return bindActionCreators({GetProductAction}, dispatch);}

module.exports         = connect(mapStateToProps,mapActionToProps)(ProductsScene);


