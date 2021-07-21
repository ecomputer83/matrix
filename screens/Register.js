import React from 'react';
import { ScrollView, StyleSheet, StatusBar, Dimensions, Platform, TouchableWithoutFeedback, TouchableHighlight, Keyboard } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import PhoneInput from 'react-native-phone-input'
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import Spinner from 'react-native-loading-spinner-overlay';
import { validateAll } from 'indicative/validator';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from '../components/Input';
import Icon from '../components/Icon';
import HttpService from '../services/HttpService';

import { AuthContext } from '../helpers/authContext';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
export default class Register extends React.Component {
  state = {
    phoneNumber: '',
    ShowDatePicker: false,
    DPRExpiry: new Date(),
    isIPMAN: false,
    DPRLicenseNo: '',
    businessName: '',
    rcNumber: '',
    address: '',
    contactName: '',
    email: '',
    password: '',
    confirmPassword: '',
    viewstate: 1,
    SignUpErrors: {},
    spinner: false
  }
  handleLeftPress = () => {
    const { navigation } = this.props;
    return navigation.goBack(null);
  };
  showDatePicker = () => {
    this.setState({ShowDatePicker: true});
  };

  hideDatePicker = () => {
    this.setState({ShowDatePicker: false});
  };

  handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    this.setState({ShowDatePicker: false, DPRExpiry: date});
  };
  SetInput = (obj) => {
    var name = Object.keys(obj)[0];
    var error = this.state.SignUpErrors;

    if(error[name]){
      error[name] = undefined;
      this.setState({SignUpErrors: error})
    }

    this.setState(obj);
  }
  Register = () => {
    const { navigation } = this.props;
    try {
      const rules = {
        businessName: 'required|string',
        rcNumber: 'required|string',
        address: 'required|string',
        contactName: 'required|string',
        email: 'required|email',
        password: 'required|string|min:6|max:40|confirmed'
    };

    const data = { DPRExpiry: this.state.DPRExpiry,
       DPRLicenseNo: this.state.DPRLicenseNo,
        businessName: this.state.businessName,
        rcNumber: this.state.rcNumber,
        address: this.state.address, 
        contactName: this.state.contactName, 
        phoneNumber: this.state.phoneNumber, 
        email: this.state.email, 
        password: this.state.password,
        password_confirmation:  this.state.confirmPassword,
        confirmPassword: this.state.confirmPassword };
    console.log(data);
    const messages = {
        required: field => `${field} is required`,
        'UserName.alpha': 'Username contains unallowed characters',
        'email.email': 'Please enter a valid email address',
        'Password.min': 'Wrong Password?',
        'password.confirmed': 'Password does not match'
    };

    validateAll(data, rules, messages)
        .then(() => {
            this.setState({spinner: true})
            console.log(data)
            HttpService.PostAsync('api/account/register', data)
            .then(response => {
                if(response.status == 200){
                  this.setState({spinner: false})
              navigation.navigate('RegReview');
                }else{
                  this.setState({spinner: false})
                  alert("There is an issue with registration, kindly contact the system administrator");
                }
          })
        })
        .catch(err => {
            const formatError = {};
            err.forEach(err => {
                formatError[err.field] = err.message;
            });
            this.setState({SignUpErrors: formatError});
        });
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }
  render() {
    const { navigation } = this.props;
    const { phoneNumber } = this.state;

    return (
      <DismissKeyboard>
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <Block style={{marginLeft: 16, marginTop: 10}}>
          <Icon
              name={'chevron-left'}
              family="octicon"
              size={20}
              onPress={this.handleLeftPress}
              color={nowTheme.COLORS.ICON}
            />
          </Block>
          <Spinner
                  visible={this.state.spinner}
                  textContent={'Loading...'}
                  textStyle={styles.spinnerTextStyle}
                />
          <ScrollView>
          <Block space="between" style={styles.padded}>
            <Block>
            <Block>
            <Text size={20} style={{marginLeft: 21, marginBottom:5, fontFamily: 'HKGrotesk-Bold'}}>
            We are glad to take you on board!
            </Text>
            </Block>
              <Block style={{
                  marginTop: 5, marginLeft:20
                }}>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Business Name
                  </Text>
                <Input
                    left
                    color="black"
                    style={styles.input}
                    placeholder="Enter  business name here"
                    onChangeText={text => this.SetInput({businessName: text})}
                    noicon
                    errorMessage={this.state.SignUpErrors.businessName}
                />
                </Block>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  DPR License Number
                  </Text>
                <Input
                    left
                    color="black"
                    style={styles.input}
                    placeholder="Enter DPR License Number here"
                    onChangeText={text => this.SetInput({DPRLicenseNo: text})}
                    noicon
                    errorMessage={this.state.SignUpErrors.DPRLicenseNo}
                />
                </Block>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  DPR Expiry Date
                  </Text>
                <TouchableHighlight onPress={() => this.showDatePicker()}>
                  <Block width={width * 0.9} middle style={styles.datepicker}>
                      <Text style={{ fontFamily: 'HKGrotesk-Regular', fontSize: 16 }}>{this.state.DPRExpiry.toDateString()}</Text>
                  </Block>
                  </TouchableHighlight>
                  <DateTimePickerModal
            isVisible={this.state.ShowDatePicker}
            //maximumDate={new Date()}
            mode="date"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
          />
                              
                </Block>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  CAC RC Number
                  </Text>
                <Input
                    left
                    color="black"
                    style={styles.input}
                    placeholder="Enter cac number here"
                    onChangeText={text => this.SetInput({rcNumber: text})}
                    noicon
                    errorMessage={this.state.SignUpErrors.rcNumber}
                />
                </Block>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Business Address
                  </Text>
                <Input
                    left
                    color="black"
                    style={styles.input}
                    placeholder="Enter business address"
                    onChangeText={text => this.SetInput({address: text})}
                    noicon
                    errorMessage={this.state.SignUpErrors.address}
                />
                </Block>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Contact Person's Name
                  </Text>
                <Input
                    left
                    color="black"
                    style={styles.input}
                    placeholder="Enter name here"
                    onChangeText={text => this.SetInput({contactName: text})}
                    noicon
                    errorMessage={this.state.SignUpErrors.contactName}
                />
                </Block>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Contact Phone Number
                  </Text>
                  <PhoneInput
                      initialCountry="ng"
                      allowZeroAfterCountryCode={false}
                      autoFormat={true}
                      value={phoneNumber}
                      textProps={{placeholder: 'Telephone number'}}
                      style={styles.custominput}
                      onChangePhoneNumber={value => this.setState({phoneNumber: value})}/>
                </Block>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Email Address
                  </Text>
                <Input
                    left
                    color="black"
                    style={styles.input}
                    placeholder="Enter email here"
                    onChangeText={text => this.SetInput({email: text})}
                    noicon
                    errorMessage={this.state.SignUpErrors.email}
                />
                </Block>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Password
                  </Text>
                <Input
                    placeholder="Enter password here"
                    noicon
                    color="black"
                    style={styles.input}
                    onChangeText={text => this.SetInput({password: text})}
                    password
                    errorMessage={this.state.SignUpErrors.password}
                />
                </Block>
                <Block style={{marginVertical: 1}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Confirm Password
                  </Text>
                <Input
                    placeholder="Enter confim password here"
                    noicon
                    color="black"
                    style={styles.input}
                    onChangeText={text => this.SetInput({confirmPassword: text})}
                    password
                    errorMessage={this.state.SignUpErrors.confirmPassword}
                />
                </Block>
              </Block>
              

              <Block
              
                style={{
                  marginTop: 3.5,
                  marginBottom: theme.SIZES.BASE * 10
                }}
              >
                <Block>
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => this.Register()}
                >
                  <Text
                    style={{ fontFamily: 'HKGrotesk-BoldLegacy', fontSize: 16 }}
                    color={theme.COLORS.WHITE}
                  >
                    Register
                  </Text>
                </Button>
                </Block>
                </Block>
            </Block>
          </Block>
          </ScrollView>
        </Block>
      </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: nowTheme.COLORS.SCREEN,
    marginTop: Platform.OS === 'android' ? 0 : 0
  },
  padded: {
    marginTop: 9
  },
  button: {
    width: width - 40,
    height: 40,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5
  },
  custominput: {
    borderColor: nowTheme.COLORS.BORDER,
    borderWidth: 1,
    height: 38,
    width:  width - 42,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 0,
    paddingLeft: 10
  },
  loginbutton: {
    width: (width /2) - (theme.SIZES.BASE * 2 + 2.5),
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginRight: 5
  },

  registerbutton: {
    width: (width /2) - (theme.SIZES.BASE * 2 + 2.5),
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  datepicker: {
    borderWidth: 1,
    borderColor: '#1917181F',
    borderRadius: 0,
    height: 40,
    marginVertical: 10
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  },
  input: {
    height: 38,
    width:  width - 42,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 0,
    fontFamily: 'HKGrotesk-Regular',
    borderColor: nowTheme.COLORS.BORDER
  },
});
