import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, TouchableOpacity, StyleSheet, Image, Platform, Dimensions, StatusBar } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-community/async-storage'
import fontelloConfig from '../config.json';
import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import { prod } from '../constants'
import Theme from '../constants/Theme';
import Images from '../constants/Images';
import Swiper from '../components/Swiper';

import { AuthContext } from '../helpers/authContext';
import HttpService from '../services/HttpService';

const Fontello = createIconSetFromFontello(fontelloConfig);
const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const AddButton = ({ isWhite, style, navigation, link, iconName }) => (
  <TouchableOpacity
    style={[styles.button, style]}
  >
   <Fontello name={iconName} size={16}
      color="#ffffff"
    />
  </TouchableOpacity>
);

const AddIconButton = ({ iconFamily, style, navigation, link, iconName }) => (
  <TouchableOpacity
    style={[styles.button, style]} onPress={()=>navigation.state.params.onChangeAccountMethod(true)}
  >
    <Icon name={iconName} family={iconFamily} size={16} color="#ffffff" />
  </TouchableOpacity>
);


class Header extends React.Component {
  state = {
    Name: 'Business Name',
    isfetched: false
  }

  static contextType = AuthContext;

  componentDidMount(){
    this.readData();
  }

  readData = async () => {
    const { signOut } = this.context
    var token = await AsyncStorage.getItem('userToken');
    var _user = await AsyncStorage.getItem('user');
    try {
        if(_user != null) {
          var user = JSON.parse(_user)
          this.setState({Name: user.businessName,
            isfetched: true
            })
          console.log(user)
        }else{
          signOut();
        }
        HttpService.GetAsync('api/account/user', token)
        .then(response => {
          if (!response.ok) {
            if(!response.statusText){
              if(response.headers.map.www-authenticate){
                signOut();
              }
            }else{
              throw Error(response.statusText);
            }
          }
        })
    } catch (error) {
      console.error(error);
      //signOut();
    }
  }
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;

    switch (routeName) {
      case 'TrackOrder':
        return [
          <AddButton key="sort" iconName="sort" navigation={navigation} isWhite={white} />,
          <AddButton key="filter" iconName="filter" navigation={navigation} isWhite={white} />,
        ];
      default:
        break;
    }
  };
  renderSearch = () => {
    const { navigation, bgColor } = this.props;
    return (
      bgColor ? (
      <Block style={{width: width, backgroundColor: Theme.COLORS.BODY}}> 
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        iconContent={
          <Icon size={16} color={theme.COLORS.MUTED} name="search" family="NowExtra" />
        }
      />
      </Block>)
      : (
        <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        iconContent={
          <Icon size={16} color={theme.COLORS.MUTED} name="search" family="NowExtra" />
        }
      />
      )
    );
  };
  renderMessage = () => {
    const { navigation, User, bgColor } = this.props;
    return (
      <Block style={styles.options}>
        <Block style={{alignItems: 'flex-end'}}>
        {/* <Image source={Images.Logo} style={{ width: 110, height: 26, marginBottom: 10, marginLeft: (width - 221)/2.5, marginTop: 10 }} /> */}
        <AddIconButton key="logout" iconName="logout" navigation={navigation} iconFamily="AntDesign" style={{ marginLeft: 15, marginTop: 10}} />
        </Block>
        <Block row space="between" >
          <Block>
            <Text size={24} style={{ fontFamily: 'HKGrotesk-Bold', lineHeight: 26,fontWeight: '600', color: Theme.COLORS.HEADER}}>
              Good Morning
            </Text>
            <Text size={20} style={{ fontFamily: 'HKGrotesk-Light', lineHeight: 22,fontWeight: '300', color: Theme.COLORS.HEADER}}>
            {this.state.Name}
            </Text>
          </Block>
          <Block>
            <Image source={Images.Profile} style={{ width: 56, height: 55, borderRadius: 50}} />
          </Block>
        </Block>
        </Block>
    );
  };

  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })}
      />
    );
  };
  renderHeader = () => {
    const { search, message, tabs } = this.props;
    if (search || tabs || message) {
      return (
        <Block center>
          {message ? this.renderMessage() : null}
          {search ? this.renderSearch() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  };
  render() {
    const {
      back,
      title,
      User,
      white,
      transparent,
      bgColor,
      noNav,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Search', 'Profile'].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
      bgColor ? { backgroundColor: bgColor } : null,
    ];
    console.log(iPhoneX());
    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (

      <Block style={headerStyles}>
        <StatusBar
                    backgroundColor={Theme.COLORS.PRIMARY}
                    barStyle="light-content"
                />
        {(noNav) ? 
        <Block />
        :
      
        (<NavBar
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          titleStyle={[
            styles.title,
            { color: Theme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />)
        }
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    position: 'relative'
  },
  title: {
    width: '100%',
    fontSize: 18,
    fontFamily: 'HKGrotesk-Bold',
    textAlign: 'center'
  },
  wrapper: {
    width: width * prod.Accounts.length,
    height: 50,
    flexDirection: 'row'
  },
  navbar: {
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX() ? theme.SIZES.BASE * 3.5 : theme.SIZES.BASE,
    zIndex: 5
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 0
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  notify: {
    backgroundColor: Theme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON
  },
  search: {
    height: 40,
    width: width - 10,
    marginHorizontal: 4,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Theme.COLORS.BORDER
  },
  options: {
    marginBottom: 16,
    elevation: 4,
    width:width - 30,
    marginLeft: 15,
    marginRight: 15
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: Theme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
  profileContainer: {
    width,
    height: 'auto',
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width,
    height: 'auto'
  },
  logo: {
    height: 80,
    width: 88,
    marginRight: 15
  },
  makebutton: {
    width: (width /2) - 7.5,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginRight: 5,
    marginLeft: 5
  },

  trackbutton: {
    width: (width /2) - 7.5,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  }
});

export default withNavigation(Header);
