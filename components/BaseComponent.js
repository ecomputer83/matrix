import React, {Component} from 'react';
import { StyleSheet,  Dimensions, TouchableOpacity,  Modal, TouchableHighlight } from 'react-native';
import { Block, theme,Button as GaButton, Button, Text } from "galio-framework";
import ModalSelector from 'react-native-modal-selector';
import { prod} from '../constants';
import Icon from '../components/Icon'
const { width, height } = Dimensions.get("screen");
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
export default class BaseComponent extends React.Component{

    constructor(props){
        super(props)
        
    }

    renderAccount = (callback) => {
        console.log('called')
        return (<Modal
            animationType="slide"
            transparent={true}
            visible={this.state.renderAccountVisible}
            onRequestClose={() => {
              this.setModalAccountVisible(false) 
            }}>
                <Block  flex center style={{ paddingTop: iPhoneX() ? theme.SIZES.BASE * 5.5 : theme.SIZES.BASE, justifyContent: 'flex-end', opacity: 0.9,
    backgroundColor: 'black',}}>
                    <Block style={{backgroundColor: '#FAFAFA', padding: 20, width: width}}>
                        <Block  row space='between' style={{ width: width-40}}>
                            <Text style={{ fontFamily: 'HKGrotesk-Bold', fontSize: 20, paddingBottom: 20 }}> Select Location</Text>
                            <TouchableOpacity
                                style={{padding: 10}} onPress={()=>this.setModalAccountVisible(false) }>
                                <Icon name='close' family='AntDesign' size={16} />
                            </TouchableOpacity>
                        </Block>
                        <Block center>
                {prod.Locations.map((p, i)=>{
                        const productStyle = [styles.product]
                        return (<TouchableHighlight onPress={() => callback(p, i)}>
                                    <Block width={width * 0.9} middle style={productStyle}>
                                    <Text style={{ fontFamily: 'HKGrotesk-SemiBoldLegacy', fontSize: 16, }}>{p.Name}</Text>
                                    </Block>
                                </TouchableHighlight>)
                            }) 
                }
                    </Block>
                </Block>
                </Block>
            </Modal>)
    }
}

const styles = StyleSheet.create({
    product: {
        height: 40,
        marginBottom: 5, 
        paddingHorizontal: 20, 
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: '#E3E2E3', 
        backgroundColor: '#FFFFFF', 
        alignItems: 'center'
      }
})