import React from 'react';
import { StyleSheet,  Dimensions, Image, Alert, FlatList  } from 'react-native';
import { Block, theme,Button, Text } from "galio-framework";
import {OrderCard, Input } from "../components";
import { prod, Images, nowTheme } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get("screen");
class TrackOrder extends React.Component {

    state = {
        Orders: prod.Orders
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
                        <Block flex={0.1}></Block>
                        <Block flex={0.9}>
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