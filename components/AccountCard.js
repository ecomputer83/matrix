import React from 'react';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { nowTheme, Images } from '../constants';
import { Dimensions, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';

const { width } = Dimensions.get('screen');
export default class FeatureCard extends React.Component {

    render(){
        const {
            onPress,
            item,
            total,
            index,
            bgColor,
            ...props
          } = this.props;
            const PrimaryColor = nowTheme.COLORS.PRIMARY;
            const BlackColor = nowTheme.COLORS.WHITE;
          return ( 
            <TouchableWithoutFeedback onPress={onPress(item)}>
            <ImageBackground source={Images.ProgramCard} style={{width: 315, height: 95, margin: 5,padding: 5}}>
                <Block>
                <Block row space='between' style={{width:260, marginTop: 5}}>
            <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14, color: '#C4F4FF'}}>Account No</Text>
            <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14, color: '#C4F4FF'}}>Ledger Balance</Text>
            </Block>
            <Block row space='between' style={{width:295}}>
            <Text
                style={{
                  color: BlackColor,
                  fontSize: 16,
                  fontFamily: 'HKGrotesk-SemiBoldLegacy'
                }}
              >
                {item.key} - (#{index} of {total})
                  </Text>
              
            <Text
                style={{
                  color: '#C4F4FF',
                  fontSize: 14,
                  fontFamily: 'HKGrotesk-SemiBoldLegacy'
                }}
              >
                {item.creditBalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
            </Block>
            <Block row space='between' style={{width:260, marginTop: 5}}>
            <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14, color: '#C4F4FF'}}>Account Name</Text>
            <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14, color: '#C4F4FF'}}>Credit Balance</Text>
            </Block>
            <Block row space='between' style={{width:295, paddingTop: 5}}>
            <Text
                style={{
                  color: BlackColor,
                  fontSize: 14,
                  fontFamily: 'HKGrotesk-SemiBoldLegacy',
                }}
              >
                {item.label.substring(0, 24)}
                  </Text>
            <Text
                style={{
                  color: BlackColor,
                  fontSize: 14,
                  fontFamily: 'HKGrotesk-SemiBoldLegacy',
                }}
              >
                {item.creditBalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
                </Block>
                {/* <Block row space='between' style={{width:295}}>
            <Text
                style={{
                  color: BlackColor,
                  fontSize: 11,
                  fontFamily: 'HKGrotesk-Regular',
                }}
              >
                Stock equivalent
                  </Text>
            <Text
                style={{
                  color: BlackColor,
                  fontSize: 11,
                  fontFamily: 'HKGrotesk-SemiBoldLegacy',
                }}
              >
                {item.stock.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
                </Block>      */} 
                  </Block>
          </ImageBackground>
          </TouchableWithoutFeedback>)
    }
}

const styles = StyleSheet.create({
shadow: {
  shadowColor: '#8898AA',
  shadowOffset: { width: 0, height: 1 },
  shadowRadius: 6,
  shadowOpacity: 0.1,
  elevation: 2
}
})