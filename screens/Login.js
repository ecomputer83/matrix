import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import Input from '../components/Input';
import Icon from '../components/Icon';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
export default class Login extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <DismissKeyboard>
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
        {/* <ImageBackground
            source={Images.Onboarding}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          /> */}
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                <Image source={Images.Logo} style={{ width: 194, height: 78, bottom: 40, position: 'absolute' }} />
              </Block>
              
              <Block style={{
                  marginTop: theme.SIZES.BASE * 1.5,
                }}>
                <Block style={{marginVertical: 2.5}}>
                <Input
                    left
                    color="black"
                    style={styles.input}
                    placeholder="UserName"
                    placeholderTextColor={'#8898AA'}
                    iconContent={
                      <Icon size={18} color={theme.COLORS.MUTED} name="photo" family="NowExtra" />
                    }
                />
                </Block>
                <Block style={{marginVertical: 2.5}}>
                <Input
                    noicon
                    color="black"
                    style={styles.input}
                    password 
                    viewPass
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
                  color={nowTheme.COLORS.DEFAULT}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Login
                  </Text>
                </Button>
                </Block>
                <Block row>
                <Button
                  shadowless
                  style={styles.loginbutton}
                  color={nowTheme.COLORS.DEFAULT}
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Create Account
                  </Text>
                </Button>
                <Button
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
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    marginTop: Platform.OS === 'android' ? 0 : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
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
    height: 50,
    width:  width - theme.SIZES.BASE * 4,
    marginHorizontal: 4
  },
});
