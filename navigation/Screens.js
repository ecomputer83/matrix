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
import Insight from '../screens/Insight'
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


const TrackOrderStack = createStackNavigator(
  {
    TrackOrder: {
      screen: TrackOrder,
      navigationOptions: ({ navigation }) => ({
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title="Orders" navigation={navigation} />
      })
    },
    MakeOrder: {
      screen: MakeOrder,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        let title = `${navigation.state.params && state.params.title ? state.params.title : 'Make Order'}`;
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title={title} navigation={navigation} />
      }
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
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title="Program" navigation={navigation} />
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

const InsightsStack = createStackNavigator(
  {
    Insights: {
      screen: Insight,
      navigationOptions: ({ navigation }) => ({
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title="Insights" navigation={navigation} />
      })
    },
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const DispatchStack = createStackNavigator(
  {
    Dispatch: {
      screen: Programming,
      navigationOptions: ({ navigation }) => ({
        header: <Header bgColor={nowTheme.COLORS.PRIMARY} iconColor={nowTheme.COLORS.WHITE} title="Program" navigation={navigation} />
      })
    },
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
    Insights: { screen: InsightsStack },
    Orders: { screen: TrackOrderStack },
    Program: { screen: DispatchStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'Orders') {
          iconName = `ios-analytics`;
        }
        else if (routeName === 'Insights') {
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

const AppStack = createStackNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        header: null,
    },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
    },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
    },
    },
    Home: {
      screen: TabStack,
      navigationOptions: {
        header: null,
    },
    }
    
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
