import React from 'react';
import { StyleSheet,  Dimensions, Image, Alert, FlatList, ScrollView, TouchableHighlight } from 'react-native';
import { Block, theme,Button, Text } from "galio-framework";
import { BarChart } from 'react-native-chart-kit'
import { prod, Images, nowTheme } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import BaseComponent from '../components/BaseComponent';
import { AccountCard } from '../components';
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width } = Dimensions.get("screen");
const chartConfigs = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  };
class Insight extends BaseComponent {
    
    state = {
        Marketers: [],
        renderAccountVisible: false,
        showFromDatePicker: false,
        showToDatePicker: false,
        FromDate: new Date(),
        ToDate: new Date(),
        currentNo: '',
        account: [],
        Data: {
            labels: ["Confirmed Order", "Unconfirmed Order"],
            datasets: [
              {
                data: [0, 0]
              }
            ]
          }
    }
    getChart =() => {
      AsyncStorage.getItem('userToken').then(token => {
          HttpService.GetAsync('api/order', token).then(resp => resp.json()
            .then(_value => {
              var chart = {
                  labels: ["Confirmed Order", "Unconfirmed Order"],
                  datasets: [
                    {
                      data: [_value.filter(c=>c.status == 1).length, _value.filter(c=>c.status == 0).length]
                    }
                  ]
                }
            this.setState({Data: chart});
            }))
          })
  }
  componentDidMount(){
      AsyncStorage.getItem('userToken').then(token => {
        HttpService.GetAsync('api/Account/LinkedAccount', value).then(response => {
          response.json().then(act => {
            var account = act.map((d, i) => {
                return { key: act.no, label: act.name, creaditLimit: act.creditLimitLcy, creditBalance: act.balanceLcy}
            })
            this.setState({ account: account, currenctNo: account[0].key })
            HttpService.GetAsync('api/order/history?No='+account[0].key, token).then(resp => {
              if(resp.status == 200){
              resp.json()
          .then(_value => {
          this.setState({Marketers: _value});
          })
        }
        })
          })
        });
            
        })
  }
    componentDidMount () {
        this.props.navigation.setParams({onChangeAccountMethod: this.setModalAccountVisible });
      }
      showFromDatePicker = () => {
        this.setState({ShowFromDatePicker: true});
      };
    
      hideFromDatePicker = () => {
        this.setState({ShowFromDatePicker: false});
      };
    
      handleFromConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        this.setState({ShowFromDatePicker: false, FromDate: date});
      };
      showToDatePicker = () => {
        this.setState({ShowToDatePicker: true});
      };
    
      hideToDatePicker = () => {
        this.setState({ShowToDatePicker: false});
      };
    
      handleToConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        this.setState({ShowToDatePicker: false, ToDate: date});
      };
    onAccountPressed = (item) => {
        console.log(item)
      }
    renderFeatures = () => {
        return (
          this.state.account.length > 0 ? 
      <Block>
        <Text size={16} style={{fontFamily: 'HKGrotesk-BoldLegacy', lineHeight: 16, color: '#919191', marginTop: 10, marginHorizontal: 10}}>Linked Accounts</Text>
      <ScrollView horizontal={true}>
        {this.renderFeature()}
      </ScrollView>
      </Block> : <Block />
        )
      }
    
      renderFeature = () => {
        return this.state.account.map((v,i) => {
          let index = i++
          return (<AccountCard item={v} total={prod.Accounts.length} index={index} onPress={this.changeAccount}/>)
        })
      }
    setModalAccountVisible = (value) => {
        this.setState({renderAccountVisible: value})
        console.log(this.state.renderAccountVisible)
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
            <Block row style={{paddingLeft: 10, paddingRight: 23, height: 36}}> 
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
        <Block row style={{paddingLeft: 10, paddingRight: 23, height: 36, borderTopWidth: 1, borderTopColor: '#97979780'}}> 
            <Block style={{width: 40, alignItems: 'center', justifyContent: 'center'}}>
                <Text size={10} style={{fontFamily: 'HKGrotesk-Regular', lineHeight: 14, color: '#919191'}}>{index}</Text>
            </Block>
            <Block row space='between' style={{ width: width-123, alignItems: 'center'}}>
                <Text size={12} style={{fontFamily: 'HKGrotesk-SemiBold', lineHeight: 16}}>{item.orderNo}</Text>
                <Text size={12} style={{fontFamily: 'HKGrotesk-SemiBold', lineHeight: 16}}>{item.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
            </Block>
        </Block>
        )
    }

    renderFilter = () => {
        return (
            <Block row style={{marginBottom: 10, paddingHorizontal: 10, borderRadius: 10, height: 48}}>
                <Block width={width * 0.35}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular', fontSize: 12 }}>From Date</Text>
                <TouchableHighlight onPress={() => this.showFromDatePicker()}>
                
                  <Block width={width * 0.3} middle style={styles.datepicker}>
                      <Text style={{ fontFamily: 'HKGrotesk-Regular', fontSize: 12 }}>{this.state.FromDate.toDateString()}</Text>
                  </Block>
                  </TouchableHighlight>
                  
                </Block>
                <Block width={width * 0.35}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular', fontSize: 12 }}>To Date</Text>
                <TouchableHighlight onPress={() => this.showToDatePicker()}>
                
                  <Block width={width * 0.3} middle style={styles.datepicker}>
                      <Text style={{ fontFamily: 'HKGrotesk-Regular', fontSize: 12 }}>{this.state.ToDate.toDateString()}</Text>
                  </Block>
                  </TouchableHighlight>
                  
                </Block>
                <Block width={width * 0.2} style={{paddingTop: 20}}>
                    <Button
                                  shadowless
                                  style={styles.searchbutton}
                                  color={nowTheme.COLORS.PRIMARY}
                              >
                                  <Text
                                      style={{ fontFamily: 'HKGrotesk-SemiBoldLegacy', fontSize: 16 }}
                                      color={theme.COLORS.WHITE}
                                  >
                                      Search
                                  </Text>
                              </Button>
                </Block>
                <DateTimePickerModal
                    isVisible={this.state.ShowFromDatePicker}
                    maximumDate={new Date()}
                    mode="date"
                    onConfirm={this.handleFromConfirm}
                    onCancel={this.hideFromDatePicker}
                />
                <DateTimePickerModal
                    isVisible={this.state.ShowToDatePicker}
                    maximumDate={new Date()}
                    mode="date"
                    onConfirm={this.handleToConfirm}
                    onCancel={this.hideToDatePicker}
                />
            </Block>
        )
    }
        
    renderTable = () => {
        let index = 0;
        console.log(this.state.Marketers)
        return (
            <Block style={{marginTop: 10, marginLeft: 10, padding: 4, backgroundColor: '#FFFFFF', borderRadius: 5, borderWidth: 1, borderColor: '#97979780', width: width-20}}>
                
                <Block>
                { this.renderTableHeader()

                }
                <FlatList data={this.state.Marketers} keyExtractor={(item, index )=> index.toString()} extraData={this.state} ListHeaderComponent={null} renderItem={({item}) => {
                            index++
                            return (this.renderTableCell(item, index))
                        }}/>
                </Block>
            </Block>
        )
    }
    changeAccount = (item, index) => {
        //this.setState({Marketers: prod.Orders.filter(c=>c.account == item.key)})
        AsyncStorage.setItem('currentNo', item.key)
    }
    render () {
        const graphStyle = {
            marginVertical: 8,
            ...chartConfigs.style
          }
        return (
            <ScrollView>
            <Block center>
            
                <Spinner
                  visible={this.state.spinner}
                  textContent={'Searching...'}
                  textStyle={styles.spinnerTextStyle}
                />
                    {/* {this.renderAccount(this.changeAccount)} */}
                    { this.state.account.length > 0 ? 
                    <Block flex space="between">
                        <Block flex={0.3}>
                        {this.renderFeatures()}
                        </Block>
                        <Block flex={0.7}>
                            {this.renderFilter()}
                            {this.renderTable()}
                        </Block>
                        <Block style={{marginHorizontal: 12, marginTop: 5, padding: 4}}>
                        <BarChart
                            width={width-40}
                            height={100}
                            data={this.state.Data}
                            fromZero={true}
                            chartConfig={chartConfigs}
                            style={graphStyle}
                        />
                        </Block>
                    </Block>
                    : <Block style={{alignItems: 'center', marginTop: 30}}>
                        <Text size={16} style={{fontFamily: 'HKGrotesk-BoldLegacy', lineHeight: 16, marginHorizontal: 10}}>Account have not approved yet</Text>
                    </Block> }
            </Block>
            </ScrollView>
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
      datepicker: {
        borderWidth: 1,
        borderColor: nowTheme.COLORS.PRIMARY,
        borderRadius: 10,
        height: nowTheme.SIZES.BASE * 2,
        marginVertical: 5
      },

      searchbutton: {
        width: 85,
        height: nowTheme.SIZES.BASE * 2,
        shadowRadius: 0,
        shadowOpacity: 0
      }
    
});

export default Insight