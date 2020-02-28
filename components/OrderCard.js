import React from 'react';
import { Block, Text, theme, Button } from 'galio-framework';
import { nowTheme } from '../constants';
import { Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('screen');
export default class OrderCard extends React.Component {

    render(){
        const {
            item,
            bgColor,
            Navigation,
            ...props
          } = this.props;
            const PrimaryColor = nowTheme.COLORS.PRIMARY;
            const BlackColor = nowTheme.COLORS.BLACK;
          return ( 
              <Block flex style={{width: (width -20)}}>
                <Block row>
            <Block style={{width:(width - 20) * 0.5}}>
            <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'montserrat-bold',
                  marginTop: 5,
                  marginBottom: 5,
                  zIndex: 2
                }}
              >
                {item.DepotName}
                  </Text>
            <Text
                style={{
                  color: PrimaryColor,
                  fontWeight: 'bold',
                  fontSize: 16,
                  fontFamily: 'montserrat-bold',
                  marginTop: 5,
                  marginBottom: 5,
                  zIndex: 2
                }}
              >
                {item.ProductName}
                  </Text>
                  <Text
                style={{
                  color: nowTheme.COLORS.BACKGROUND,
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
            <Block style={{width: (width - 20) * 0.5}}>
            
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
            {item.Status != "Closed" ?
            <Button
            shadowless
            style={{height: 30,width: (width - 20) * 0.5,
              shadowRadius: 0,
              shadowOpacity: 0}}
            color={nowTheme.COLORS.PRIMARY}
            onPress={() => Navigation.navigate('Programming', { product: null, quantity: item.Quantity, programs: item.Programing})}
          >
            <Text
              style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
              color={theme.COLORS.WHITE}
            >
              View Dispatch
            </Text>
          </Button>
            
            : <Block />}
            </Block>
            </Block>
            
          </Block>)
    }
}