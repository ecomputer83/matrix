import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Register extends React.Component {
  render() {
    const { navigation } = this.props;
    
    return (
      <DismissKeyboard>
        <Block flex middle  style={styles.container}>
          <ImageBackground
            source={Images.Onboarding}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
            <Block middle>
                <Image source={Images.Logo} style={{ width: 194, height: 78, bottom: 10 }} />
              </Block>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5, marginTop: 5 }}>
                            <Input
                              placeholder="Phone Number"
                              color="black"
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="phone"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5, marginTop: 5 }}>
                            <Input
                              placeholder="Personal Name or Company Name"
                              color="black"
                              style={styles.inputs}
                              noicon
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Email"
                              color="black"
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Password"
                              noicon
                              color="black"
                              style={styles.inputs}
                              password 
                              viewPass
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Confirm Password"
                              noicon
                              color="black"
                              style={styles.inputs}
                              password 
                              viewPass
                            />
                          </Block>
                          <Block style={{marginBottom:  10}}>
                <Block>
                <GaButton
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.DEFAULT}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Register
                  </Text>
                </GaButton>
                </Block>
                <Block row>
                <GaButton
                  shadowless
                  style={styles.loginbutton}
                  color={nowTheme.COLORS.DEFAULT}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Login
                  </Text>
                </GaButton>
                <GaButton
                  shadowless
                  style={styles.registerbutton}
                  color={nowTheme.COLORS.DEFAULT}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    No Thanks
                  </Text>
                </GaButton>
                </Block>
              </Block>
                        </Block>
                        
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  container: {
    //backgroundColor: nowTheme.COLORS.BACKGROUND
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 15,
    width: width * 0.9,
    height: height < 812 ? height * 0.6 : height * 0.6,

  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 0
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  button: {
    width: (width * 0.8),
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginBottom: 5
  },

  loginbutton: {
    width: ((width * 0.8) /2),
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginRight: 5
  },

  registerbutton: {
    width: ((width * 0.8) /2),
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

export default Register;
