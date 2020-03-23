import React from 'react';
import { StyleSheet,  Dimensions, Image, Alert, FlatList, StatusBar  } from 'react-native';
import { Block, theme,Button, Text } from "galio-framework";
import {OrderCard, Input } from "../components";
import { prod, Images, nowTheme } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get("screen");
class Insight extends React.Component {

    state = {
        Orders: prod.Orders
    }
    renderChildFilter = () => {
        return this.state.Filters.map((v,i) => {
            let Background = (v.Status == 1) ? '#FFFFFF': '';
            return(<Block style={{ backgroundColor: Background, width: 115, borderRadius: 10, height: 26, alignItems: 'center', justifyContent: 'center'}}>
                <Text size={12} style={{color: '#2C4453', lineHeight: 12, fontFamily: 'HKGrotesk-Medium'}}>
                    {v.Name}
                </Text>
            </Block>)
        })
    };
    renderTableHeader = () => {
        return(
            <Block row style={{paddingLeft: 20, paddingRight: 23, height: 36}}> 
                <Block style={{width: 40, alignItems: 'center', justifyContent: 'center'}}>
                    <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14, color: '#919191'}}>#</Text>
                </Block>
                <Block row space='between' style={{ width: width-123, alignItems: 'center'}}>
                    <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14, color: '#919191'}}>Order No</Text>
                    <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14, color: '#919191'}}>Order Qty</Text>
                </Block>
            </Block>
        )
    }

    renderTableCell = (item, index) => {
        return(
        <Block row style={{paddingLeft: 20, paddingRight: 23, height: 36, borderTopWidth: 1, borderTopColor: '#97979780'}}> 
            <Block style={{width: 40, alignItems: 'center', justifyContent: 'center'}}>
                <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14, color: '#919191'}}>{index}</Text>
            </Block>
            <Block row space='between' style={{ width: width-123, alignItems: 'center'}}>
                <Text size={12} style={{fontFamily: 'HKGrotesk-SemiBold', lineHeight: 16}}>{item.OrderId}</Text>
                <Text size={12} style={{fontFamily: 'HKGrotesk-SemiBold', lineHeight: 16}}>{item.Quantity}</Text>
            </Block>
        </Block>
        )
    }
        
    renderTable = () => {
        let index = 0;
        return (
            <Block style={{margin: 10, padding: 4, backgroundColor: '#FFFFFF', borderRadius: 5, borderWidth: 1, borderColor: '#97979780', width: width-20}}>
                <Block style={{paddingLeft: 10}}>
                    <Text size={12} style={{fontFamily: 'HKGrotesk-SemiBold', lineHeight: 16}}>Ongoing Orders</Text>
                    <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14}}>Current Order</Text>
                    <Text size={20} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 24}}>PO43532</Text>
                </Block>
                <Block>
                { this.renderTableHeader()

                }
                <FlatList data={this.state.Orders} keyExtractor={(item, index )=> index.toString()} extraData={this.state} ListHeaderComponent={null} renderItem={({item}) => {
                            index++
                            return (this.renderTableCell(item, index))
                        }}/>
                </Block>
            </Block>
        )
    }

    render () {
        return (
            <Block center>
                <StatusBar
                    backgroundColor={nowTheme.COLORS.PRIMARY}
                    barStyle="light-content"
                />
                <Spinner
                  visible={this.state.spinner}
                  textContent={'Searching...'}
                  textStyle={styles.spinnerTextStyle}
                />

                    <Block space="between">
                        <Block>
                            {this.renderTable()}
                        </Block>
                        <Block>
                        
                        </Block>
                    </Block>
            </Block>
        )
    }

}

const styles = StyleSheet.create({
    search: {
        height: nowTheme.SIZES.BASE * 3,
        width: width * 0.7,
        marginHorizontal: 4,
        borderWidth: 0.5,
        borderRadius: 0,
        borderColor: nowTheme.COLORS.BORDER,
        
      },

      searchbutton: {
        width: (width  * 0.2),
        height: nowTheme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
      }
    
});

export default Insight