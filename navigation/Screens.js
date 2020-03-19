import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// screens
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Onboarding from '../screens/Onboarding';
import MakeOrder from '../screens/MakeOrder';
import CardPayment from '../screens/CardPayment';
import Programming from '../screens/Programming';
import TrackOrder from '../screens/TrackOrder';
// drawer
import Menu from './Menu';
import DrawerItem from '../components/DrawerItem';
import nowTheme from '../constants/Theme';

// header for screens
import Header from '../components/Header';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = 'Search';

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} message iconColor={nowTheme.COLORS.WHITE} title="" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const MakeOrderStack = createStackNavigator(
  {
    MakeOrder: {
      screen: MakeOrder,
      navigationOptions: ({ navigation }) => ({
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title="Make Order" navigation={navigation} />
      })
    },
    CardPayment: {
      screen: CardPayment,
      navigationOptions: ({ navigation }) => ({
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title="Card Payment" navigation={navigation} />
      })
    },
    Programming: {
      screen: Programming,
      navigationOptions: ({ navigation }) => ({
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title="Programming" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const TrackOrderStack = createStackNavigator(
  {
    TrackOrder: {
      screen: TrackOrder,
      navigationOptions: ({ navigation }) => ({
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title="Track Order" navigation={navigation} />
      })
    },
    Dispatch: {
      screen: Programming,
      navigationOptions: ({ navigation }) => ({
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title="Dispatch Info" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const TabStack = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    MakeOrder: { screen: MakeOrderStack },
    TrackOrder: { screen: TrackOrderStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: (navigation.state.routeName == 'MakeOrder') ? 'Make Order' : (navigation.state.routeName == 'TrackOrder') ? 'Track Order' : 'Home',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'TrackOrder') {
          iconName = `ios-analytics`;
        }
        else if (routeName === 'MakeOrder') {
          iconName = `ios-card`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: `${nowTheme.COLORS.PRIMARY}`,
      inactiveTintColor: `${nowTheme.COLORS.SECONDARY}`,
      style: {
        paddingTop:10,
        paddingBottom: 10,
        height: 65,
        
    }
    },
  }
)

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Home: {
      screen: TabStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => <DrawerItem focused={focused} title="Home" />
      })
    }
    
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
