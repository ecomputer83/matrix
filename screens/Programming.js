import React from 'react';
import { Modal, StyleSheet, TouchableHighlight, Dimensions, FlatList, Alert  } from 'react-native';
import { Block, theme,Button as GaButton, Text } from "galio-framework";
import { Input, Icon, DetailCard } from '../components';
import FloatingActionButton from "react-native-floating-action-button";
import {nowTheme} from "../constants"

import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("screen");
class Programming extends React.Component {

    state = {
        product : null,
        totalquantity: 0,
        remainQuantity: 0,
        programs: [],
        TruckNo: null,
        Quantity: "0",
        Destination: null,
        modalVisible: false,
        spinner: false
    }

    constructor(props) {
        super(props);
        const Params = props.navigation.state.params
        console.log(Params)
        this.state = {
            product : Params.product,
            totalquantity: parseInt(Params.quantity),
            remainQuantity: (Params.programs) ? 0 : parseInt(Params.quantity),
            programs: (Params.programs) ? Params.programs : []
        }
      }
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    
      AddProgram = () => {
        let obj = {
            TruckNo: this.state.TruckNo,
            Quantity: parseInt(this.state.Quantity),
            Destination: this.state.Destination,
            Status: 'New'
        };
        let programs = this.state.programs;
        let remainQuantity = this.state.remainQuantity;
        if(programs.length > 0){
        let existingIndex = programs.findIndex(c=>c.TruckNo == obj.TruckNo);
        if(existingIndex > -1){
                remainQuantity += programs[existingIndex].Quantity;
                programs[existingIndex].Quantity = obj.Quantity;
                programs[existingIndex].Destination = obj.Destination;
                remainQuantity -= obj.Quantity;
            
        }else{
            if(remainQuantity >= obj.Quantity){
                programs.push(obj)
            }else{
                Alert.alert("Oops!", "Input quantity is beyond the remain quantity, remain quantity is "+ remainQuantity)
                return;
            }
            remainQuantity -= obj.Quantity
            this.setState({programs: programs, remainQuantity: remainQuantity, TruckNo: null, Quantity: 0, Destination: null});
        }
        }else{
            console.log(remainQuantity)
            console.log(obj.Quantity)
            if(remainQuantity >= obj.Quantity){
                programs.push(obj)
            }else{
                Alert.alert("Oops!", "Input quantity is beyond the remain quantity, remain quantity is "+ remainQuantity)
                return;
            }
            remainQuantity -= obj.Quantity
            this.setState({programs: programs, remainQuantity: remainQuantity,TruckNo: null, Quantity: 0, Destination: null});
        }
        this.setModalVisible(false);
      }

      saveandnavigate = () => {
        if(this.state.programs.length != 0) {
            this.setState({
              spinner: true
            });
            setTimeout(() => {
              this.setState({ spinner: false });
              Alert.alert('Congratulation!', "Dispatch information has been programmed successfully.");
              this.props.navigation.navigate('Home')
            }, 3000);
          
      };
      }
    renderPrograms = () => {
        return (<Block style={{ zIndex: 1, margin: 10 }}>
        <FlatList data={this.state.programs} keyExtractor={(item, index )=> index.toString()} extraData={this.state} ListHeaderComponent={null} renderItem={({item}) => {
          return <DetailCard item={item} />
        }}/></Block>)
    }
    renderModal = () => {
        return (<Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <Block  flex center style={{marginTop: 100, marginBottom: 20, backgroundColor: nowTheme.COLORS.WHITE}}>
              <Block flex={1}  width={width * 0.9} space="between" style={{ padding: 10 }}>
                <Block flex={0.1}>
                <Text style={{ fontFamily: 'montserrat-bold', fontSize: 18 }}>Add New Programming</Text>
                </Block>
                <Block flex={0.6}>
                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Text>Truck No</Text>
                              <Input
                                  placeholder="TruckNo"
                                  color="black"
                                  style={styles.inputs}
                                  value={this.state.TruckNo}
                                  onChangeText={(text) => {
                                    if(text.length >= 7){
                                    var program = this.state.programs.find(c=>c.TruckNo == text)
                                    if(program != null){
                                        this.setState({TruckNo: text, Quantity: program.Quantity.toString(), Destination: program.Destination})
                                    }else{
                                    this.setState({TruckNo: text})
                                    }
                                  }
                                  }}
                                  noicon
                                />
                              </Block>
                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Text>Quantity</Text>
                              <Input
                                  placeholder="Quantity"
                                  color="black"
                                  style={styles.inputs}
                                  value={this.state.Quantity}
                                  onChangeText={(text) => {
                                    this.setState({Quantity: text})
                                  }}
                                  keyboardType="numeric"
                                  noicon
                                />
                              </Block>
                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Text>Destination</Text>
                              <Input
                                  placeholder="Destination"
                                  color="black"
                                  style={styles.inputs}
                                  value={this.state.Destination}
                                  onChangeText={(text) => {
                                    this.setState({Destination: text})
                                  }}
                                  multiline={true}
                                  numberOfLines={3}
                                  noicon
                                />
                              </Block>
                </Block>
                <Block flex={0.2}>
                <Block style={{marginBottom:  10}}></Block>
                              <Block row width={width * 0.7} center>
                              <GaButton
                                    shadowless
                                    style={styles.button}
                                    color={nowTheme.COLORS.PRIMARY}
                                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
                                >
                                    <Text
                                        style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                                        color={theme.COLORS.WHITE}
                                    >
                                        CLOSE
                                    </Text>
                                </GaButton>
                                <GaButton
                                    shadowless
                                    style={styles.button}
                                    color={nowTheme.COLORS.PRIMARY}
                                    onPress={() => this.AddProgram()}
                                >
                                    <Text
                                        style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                                        color={theme.COLORS.WHITE}
                                    >
                                        ADD
                                    </Text>
                                </GaButton>
                              </Block>
                </Block>
                
              </Block>
            </Block>
          </Modal>);
    }
    render () {
      const {remainQuantity} = this.state;
        return (<Block style={{width: width, height: height}}>
            <Spinner
                  visible={this.state.spinner}
                  textContent={'Saving...'}
                  textStyle={styles.spinnerTextStyle}
                />
            {this.renderPrograms()}
            {this.renderModal()}
            <Block row style={{zIndex: 3, position: 'absolute', top: 600}}>
          {remainQuantity != 0 ?
          <FloatingActionButton
            iconName="plus"
            iconType="AntDesign"
            textDisable
            shadowColor={nowTheme.COLORS.BACKGROUND}
            rippleColor={nowTheme.COLORS.BACKGROUND}
            onPress = {() => this.setModalVisible(true)}
          /> : <Block />}
          {props.navigation.state.params.programs == null ?
          <FloatingActionButton
            iconName="check"
            iconType="AntDesign"
            textDisable
            shadowColor={nowTheme.COLORS.BACKGROUND}
            rippleColor={nowTheme.COLORS.BACKGROUND}
            
            onPress = {() => this.saveandnavigate()}
          /> : <Block />} 
               </Block> 
        </Block>)
    }
}

const styles = StyleSheet.create({
    inputs: {
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 0
      },
      picker: {
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 0
      },
      button: {
        width: (width * 0.32),
        height: nowTheme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
        margin: 2
      }
})
export default Programming