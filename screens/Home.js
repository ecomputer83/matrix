import React from "react";
import { StyleSheet, PermissionsAndroid, Platform, Dimensions, ScrollView } from "react-native";
import { Block, theme,Image, Text } from "galio-framework";
import { white } from "color-name";

const { width, height } = Dimensions.get("screen");
const ratio = width / height;
class Home extends React.Component {
  
  constructor(props) {
    super(props);

    
  }

  componentDidMount(){
  }

  render() {
    return (<Block />);
  }
}

const styles = StyleSheet.create({
  
});

export default Home;
