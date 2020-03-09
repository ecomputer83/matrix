import React from 'react';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { nowTheme } from '../constants';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');
export default class DetailCard extends React.Component {

    render(){
        const {
            item,
            bgColor,
            ...props
          } = this.props;
            const PrimaryColor = nowTheme.COLORS.PRIMARY;
            const BlackColor = nowTheme.COLORS.BLACK;
          return ( 
              <Block flex style={{width:(width - 20), padding:10, borderBottomWidth: 1,
                borderBottomColor: '#E3E3E3',
            }}>
                <Block row>
            <Block style={{width:(width - 10) * 0.7}}>
            <Text
                style={{
                  color: BlackColor,
                  fontSize: 16,
                  fontFamily: 'montserrat-bold',
                  marginTop: 5,
                  marginBottom: 5,
                  zIndex: 2
                }}
              >
                {item.TruckNo}
                  </Text>
            <Text
                style={{
                  color: PrimaryColor,
                  fontWeight: 'bold',
                  fontSize: 18,
                  fontFamily: 'montserrat-bold',
                  marginTop: 5,
                  marginBottom: 5,
                  zIndex: 2
                }}
              >
                {item.Quantity}
                  </Text>
            </Block>
            <Block style={{width: (width - 50) * 0.3}}>
            <Text
                style={{
                  color: BlackColor,
                  fontSize: 14,
                  fontFamily: 'montserrat-bold',
                  marginTop: 5,
                  marginBottom: 5,
                  zIndex: 2
                }}
              >
                {item.Status}
                  </Text>
            </Block>
            </Block>
            <Text
                style={{
                  color: BlackColor,
                  fontSize: 12,
                  fontFamily: 'montserrat-bold',
                  marginTop: 5,
                  marginBottom: 5,
                  zIndex: 2
                }}
              >
                {item.Destination}
                  </Text>
          </Block>)
    }
}