import React from 'react';
import { withNavigation } from 'react-navigation';
import { ImageBackground, TouchableOpacity, StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import Theme from '../constants/Theme';
import Images from '../constants/Images';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const AddButton = ({ isWhite, style, navigation, link }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate(link)}
  >
    <Icon
      family="NowExtra"
      size={16}
      name="add"
      color={Theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);


class Header extends React.Component {

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;

    switch (routeName) {
      case 'MyVehicles':
        return [
          <AddButton key="add-vehicle" navigation={navigation} isWhite={white} link="AddVehicle" />
        ];
      case 'MyAppointments':
        return [
          <AddButton key="add-appointment" navigation={navigation} isWhite={white} link="BookOption"/>
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
    const { navigation, User } = this.props;

    return (
      <Block row style={styles.options}>
        <Block row middle>
            <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
              Welcome, {User || 'Customer Name'}
            </Text>
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

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (

      <Block style={headerStyles}>
        <NavBar
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'arrow-back' : 'menu'}
              family="NowExtra"
              size={16}
              onPress={this.handleLeftPress}
              color={iconColor || Theme.COLORS.ICON}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: Theme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative'
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular'
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 3 : theme.SIZES.BASE,
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
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
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
  }
});

export default withNavigation(Header);
