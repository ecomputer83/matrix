import React from 'react';
import { StyleSheet,  Dimensions, Image, Alert, FlatList  } from 'react-native';
import { Block, theme,Button, Text } from "galio-framework";
import {OrderCard, Input } from "../components";
import { prod, Images, nowTheme } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get("screen");
class TrackOrder extends React.Component {

    state = {
        Filters: prod.Filters,
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
    }
    renderFilter = () => {
        return (
            <Block row style={{margin: 10, padding: 1, backgroundColor: '#EDEDED', borderRadius: 10, height: 28}}>
                { this.renderChildFilter()
                }
            </Block>
        )
    }

    render () {
        return (
            <Block flex center>
                <Spinner
                  visible={this.state.spinner}
                  textContent={'Searching...'}
                  textStyle={styles.spinnerTextStyle}
                />

                    <Block flex={1} space="between">
                        <Block flex={0.08}>
                            {this.renderFilter()}
                        </Block>
                        <Block flex={0.92}>
                        <FlatList data={this.state.Orders} keyExtractor={(item, index )=> index.toString()} extraData={this.state} ListHeaderComponent={null} renderItem={({item}) => {
                            return <OrderCard item={item} />
                        }}/>
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
        borderColor: nowTheme.COLORS.BORDER
      },

      searchbutton: {
        width: (width  * 0.2),
        height: nowTheme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
      }
    
});

export default TrackOrder