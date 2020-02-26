import React from 'react';
import { StyleSheet,  Dimensions, Picker  } from 'react-native';
import { Block, theme,Button as GaButton, Text } from "galio-framework";
import { Input, Icon } from '../components';
import { DailyPrices, nowTheme } from '../constants';

const { width } = Dimensions.get("screen");
class CardPayment extends React.Component {
    state = {
        product : null,
        quantity: 0,
        unitPrice: null,
        TotalAmount: 0
    }

    constructor(props) {
        super(props);
        
        state = {
            product : null,
            quantity: 0,
            unitPrice: null,
            TotalAmount: 0
        }
      }
    pickerChange(index){
        DailyPrices.map( (v,i)=>{
         if( index === i ){
           this.setState({
           product: DailyPrices[index]
          })
         }
        })
    }
    saveandnavigate = () => {
        if(this.state.TotalAmount != 0) {
        this.props.navigation.navigate('Services', { vehicle: JSON.stringify(this.state.vehicle), jobType: this.state.jobType, service: null, scheduledate: null})
    };
}
    render () {
        const {product, quantity, unitPrice, TotalAmount} = this.state
        return (
            <Block flex center>
                <Block flex={1} space="between">
                        <Block center flex={0.9}>
                          <Block flex space="between">
                            <Block>
                              <Block width={width * 0.8} style={{ marginBottom: 5, marginTop: 25 }}>
                                <Text>Products</Text>
                                <Block  style={styles.picker}>
                                <Picker
                                    selectedValue={product }
                                    onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>
                                        <Picker.Item label='-- Select Product --' value={null} />
                                        {
                                        DailyPrices.map( (v)=>{
                                        return <Picker.Item label={v.Product} value={v} />
                                        })
                                    }
                                </Picker>
                                </Block>
                              </Block>
                              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Text>Quantity</Text>
                              <Input
                                  placeholder="Quantity"
                                  color="black"
                                  style={styles.inputs}
                                  value={quantity}
                                  noicon
                                />
                              </Block>
                              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Text>Unit Price</Text>
                              <Input
                                  placeholder="unit price"
                                  color="black"
                                  style={styles.inputs}
                                  value={unitPrice}
                                  editable={false}
                                  noicon
                                />
                              </Block>
                              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Text>Unit Price</Text>
                              <Input
                                  placeholder="Total Amount"
                                  color="black"
                                  style={styles.inputs}
                                  value={TotalAmount}
                                  editable={false}
                                  noicon
                                />
                              </Block>
                              <Block style={{marginBottom:  10}}></Block>
                              { (product != null) ?  (
                              <Block width={width * 0.8} center>
                                <GaButton
                                    shadowless
                                    style={styles.loginbutton}
                                    color={nowTheme.COLORS.PRIMARY}
                                    onPress={() => this.saveandnavigate()}
                                >
                                    <Text
                                        style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                                        color={theme.COLORS.WHITE}
                                    >
                                        MAKE PAYMENT
                                    </Text>
                                </GaButton>
                              </Block>)
                               : (<Block />)}
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
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
      loginbutton: {
        width: ((width * 0.8) /2),
        height: nowTheme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
      }
})
export default CardPayment