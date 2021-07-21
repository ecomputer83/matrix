import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import Spinner from 'react-native-loading-spinner-overlay';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { validateAll } from 'indicative/validator';
import Input from '../components/Input';
import Icon from '../components/Icon';
import BaseComponent from '../components/BaseComponent';


import { AuthContext } from '../helpers/authContext';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
export default class Register extends BaseComponent {
  state = {
    renderAccountVisible: false,
    Location: 'Nigeria',
    email: '',
    password: '',
    spinner: false,
    biometryType: null,
    modalVisible: false,
    SignUpErrors: {}
  }

  static contextType = AuthContext;

  handleLeftPress = () => {
    const { navigation } = this.props;
    return navigation.goBack(null);
  };

  signin = async () => {
    const { signIn } = this.context
    try {
      const rules = {
        email: 'required|email',
        password: 'required|string|min:6|max:40'
    };
    this.setState({spinner: true})
    const data = { email: this.state.email, password: this.state.password };
    console.log(data);
    const messages = {
        required: field => `${field} is required`,
        'UserName.alpha': 'Username contains unallowed characters',
        'email.email': 'Please enter a valid email address',
        'Password.min': 'Wrong Password?'
    };

    validateAll(data, rules, messages)
        .then(() => {
            console.log('success sign in');
            
            signIn({ email: this.state.email, password: this.state.password });
            this.setState({spinner: false})
        })
        .catch(err => {
          if(Array.isArray(err)) {
            const formatError = {};
            err.forEach(err => {
                formatError[err.field] = err.message;
            });
            this.setState({SignUpErrors: formatError, spinner: false})
          }else{
            console.log(err)
            this.setState({spinner: false})
          }
           
        });
    } catch (error) {
      // Error saving data
    }
  }

  changeAccount = (item, index) => {
    this.setState({Location: item.Name, renderAccountVisible: false})
    //AsyncStorage.setItem('Account', JSON.stringify(item))
}
  setModalAccountVisible = (value) => {
    this.setState({renderAccountVisible: value})
    console.log(this.state.renderAccountVisible)
  }
  render() {
    const { navigation } = this.props;

    return (
      <DismissKeyboard>
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <Block row style={{marginLeft: 16, marginTop: 10}}>
            <Block width={width * 0.07}>
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
            <Block row space="between" width={width * 0.85}>
              <TouchableWithoutFeedback onPress={() => this.setModalAccountVisible(true)}>
                <Block row>
                  <Icon
                    name={'earth'}
                    family="AntDesign"
                    size={20}
                    color={nowTheme.COLORS.ICON}
                  />
                  <Text style={{ fontFamily: 'HKGrotesk-Regular', marginLeft: 5 }} size={14}>
                  {this.state.Location}
                  </Text>
                </Block>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Block row>
                  <Icon
                    name={'direction'}
                    family="Entypo"
                    size={20}
                    color={nowTheme.COLORS.ICON}
                  />
                  <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Quick Tour
                  </Text>
                </Block>
              </TouchableWithoutFeedback>
            </Block>

          </Block>
          <Block space="between" style={styles.padded}>
            <Block>
              {this.renderAccount(this.changeAccount)}
            <Block>
            <Text size={28} style={{marginLeft: 21, marginBottom:5, fontFamily: 'HKGrotesk-Bold'}}>
            Log In to continue
            </Text>
            </Block>
              <Block style={{
                  marginTop: theme.SIZES.BASE, marginLeft:20
                }}>
                <Block style={{marginVertical: 2.5}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Email Address
                  </Text>
                <Input
                    left
                    color="black"
                    style={styles.input}
                    placeholder="Enter email here"
                    onChangeText={(value) => this.setState({email: value})}
                    noicon
                    errorMessage={this.state.SignUpErrors.email}
                />
                </Block>
                <Block style={{marginVertical: 2.5}}>
                <Text style={{ fontFamily: 'HKGrotesk-Regular' }} size={14}>
                  Password
                  </Text>
                <Input
                    placeholder="Enter password here"
                    noicon
                    color="black"
                    onChangeText={(value) => this.setState({password: value})}
                    style={styles.input}
                    password
                    errorMessage={this.state.SignUpErrors.password}
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
                  onPress={() => this.signin()}
                >
                  <Text
                    style={{ fontFamily: 'HKGrotesk-BoldLegacy', fontSize: 16 }}
                    color={theme.COLORS.WHITE}
                  >
                    Log In
                  </Text>
                </Button>
                </Block>
                </Block>
            </Block>
          </Block>
        </Block>
      </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginTop: Platform.OS === 'android' ? 0 : 0
  },
  padded: {
    marginTop: 179
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
    fontFamily: 'HKGrotesk-Regular'
  },
});
