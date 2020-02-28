import React from 'react';
import { StyleSheet,  Dimensions, Image, Alert  } from 'react-native';
import { Block, theme,Button, Text } from "galio-framework";
import {OrderCard, Input } from "../components";
import { prod, Images, nowTheme } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get("screen");
class TrackOrder extends React.Component {

    state = {
        OrderId: null,
        Order: null,
        spinner: false
    }

    SearchByID = () => {
        if(this.state.OrderId != null){
            this.setState({
                spinner: true
              });
              setTimeout(() => {
                this.setState({ spinner: false });
            var Order = prod.Orders.find(o=>o.OrderId == this.state.OrderId);
            this.setState({Order: Order});
            }, 2000);
        }
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
                        <Block row center flex={0.2} style={{ marginBottom: 5 }}>
                            <Block width={width * 0.7} style={{ marginBottom: 5 }}>
                              <Input
                                  placeholder="Search by Order ID"
                                  color="black"
                                  style={styles.search}
                                  value={this.state.OrderId}
                                  onChangeText={(text) => this.setState({OrderId: text})}
                                  noicon
                                />
                            </Block>
                            <Block width={width * 0.2} style={{ marginBottom: 5 }}>
                            <Button
        shadowless
        style={styles.searchbutton}
        color={nowTheme.COLORS.PRIMARY}
        onPress={() => this.SearchByID()}
      >
        <Text
          style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
          color={theme.COLORS.WHITE}
        >
          Search
        </Text>
      </Button>
                                
                            </Block>
                        </Block>
                        <Block flex={0.7} style={{ margin: 10 }}>
                            {this.state.Order ?
                            <OrderCard item={this.state.Order} Navigation={this.props.navigation} />
                            : <Block />}
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