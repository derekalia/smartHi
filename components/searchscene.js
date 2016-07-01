//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,ListView,ListViewDataSource,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Accordion from 'react-native-collapsible/Accordion';


//get internal components
import {StartSearchAction,GetProductAction} from '../actions';


const SECTIONS = [
  {
    title: 'Activity',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Effects',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Type',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Price',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Distance',
    content: 'Lorem ipsum...',
  },
];


class SearchScene extends Component {
  constructor(props) {
    super(props);
    // these should come from the app state.
    for (key in props.products) {
      console.log("my prop "+props.products[key]);
    }
    this.state = {
      act  :  this.props.act,
      eff  :  this.props.eff,
    }
  }

  _renderHeader(section) {
    return (
      <View style={Styles.header}>
        <Text style={Styles.headerText}>{section.title}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={Styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  }



  _enterKeyWord(event) {
    this._searchTerm = event.nativeEvent.text;
    this.props.StartSearchAction(this._searchTerm);
  }

  _plusActivity() {
    // set activities to search
  }

  _plusEffect() {
    // set effects to search
  }

  _startSearch() {
    //
    // BatsFix. call searchStartAction
    //
    console.log("search started");
    this.props.StartSearchAction(this._searchTerm);
  }

  _goProduct(rowData:string) {
    // BatsFix. should set a product state first.
    this.props.GetProductAction(rowData);
    // then go product scene
    this.props.navigator.push(this.props.productScene);
  }

  _renderRow(rowData:string) {
    return (
      <TouchableOpacity style={Styles.buttonLarge} onPress={()=>this._goProduct(rowData)}>
        <Text>{rowData}</Text>
      </TouchableOpacity>
    )
  }

  _renderList() {
    if (this.props.products.size !== 0)
    {
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
      <View style={[Styles.container,]}>
        <View style={[Styles.container,{marginTop:50}]}>
          <TextInput style={Styles.input}
            autoCapitalize  = "none"
            autoCorrect     = {false}
            placeholder     = "Keyword"
            returnKeyType   = "next"
            onEndEditing    = {this._enterKeyWord.bind(this)}
            />
        </View>



        <View style={[Styles.container,{flex:2}]}>
          <Accordion
            sections={SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            />
        </View>


        <View style={[Styles.container,{flex:1}]}>

          <View style={[Styles.container,{flex:1,alignItems:'flex-start',margin:6}]}>
            <Text style={{fontSize:18,marginBottom:10,fontFamily:"Avenir Next"}}> Activity </Text>
            <View style={[{flexDirection:'row'}]}>
              <TouchableOpacity style={Styles.tag}>
                <Text style={Styles.tagText}>{this.state.act[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.tag}>
                <Text style={Styles.tagText}>{this.state.act[1]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.tag}>
                <Text style={Styles.tagText}>{this.state.act[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this._plusActivity()} style={Styles.tag}>
                <Text style={Styles.tagText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/*<View style={[Styles.container,{flex:1}]}>
          <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
            <Text> Effects </Text>
            <View style={[Styles.container,{flex:3,flexDirection:'row'}]}>
              <TouchableOpacity style={Styles.buttonSmall}>
                <Text>{this.state.eff[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.buttonSmall}>
                <Text>{this.state.eff[1]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.buttonSmall}>
                <Text>{this.state.eff[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this._plusEffect()} style={Styles.buttonSmall}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>*/}
        <View style={Styles.container}>
          <ScrollView>
            {this._renderList()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  loginButton: {
    flex: 1,
    height:10,
    marginHorizontal: 30,
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 3,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },

  signUpButton: {
    flex: 1,
    height:52,
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    backgroundColor: '#50E3C2',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  tag: {
    margin:5,
    fontFamily:"Avenir Next",
    borderRadius: 20,
    borderWidth:1,
    borderColor:"#4A90E2",
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText:{
    fontFamily:"Avenir Next",
    color:"#4A90E2",
    marginTop:10,
    marginBottom:10,
    marginHorizontal: 15,
  },
  input: {
    height: 36,
    fontSize: 20,
    marginHorizontal: 10,

    backgroundColor: 'white',
    borderRadius: 3,
    borderBottomColor:"black",
    borderColor:"black",
    borderTopColor:"white",
    borderWidth:1,
  },
  container: {
    flex: 1,    
  },
  title: {
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
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
});

// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
  return {
    act:  state.SearchReducer.act,
    eff:  state.SearchReducer.eff,
    products: state.SearchReducer.products,
  }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called StartSearchAction.
//
function mapActionToProps(dispatch) {return bindActionCreators({StartSearchAction,GetProductAction}, dispatch);}

module.exports         = connect(mapStateToProps,mapActionToProps)(SearchScene);
