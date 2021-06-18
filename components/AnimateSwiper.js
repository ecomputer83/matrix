import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { prod } from '../constants'
import Animated, {
  add,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  floor,
  not,
  set,
  useCode,
} from "react-native-reanimated";
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from "react-native-redash";

const { width, height } = Dimensions.get("window");


const snapPoints = prod.Accounts.map((_, i) => i * -width);

const styles = StyleSheet.create({
  container: {
    height: 50
  },
  pictures: {
    width: width * prod.Accounts.length,
    flexDirection: "row",
  },
});

const AnimatedSwiper = () => {
  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const {
    gestureHandler,
    state,
    velocity,
    translation,
  } = usePanGestureHandler();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
          debug("index", index),
        ]),
      ]),
    ],
    []
  );
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[styles.pictures, { transform: [{ translateX }] }]}
          >
            { prod.Accounts.map( i => {
              return (
        <Block row space="between" style={{backgroundColor: bgColor}}> 
          <Block>
            <Text size={18} style={{ fontFamily: 'HKGrotesk-Bold', lineHeight: 22,fontWeight: '600', color: Theme.COLORS.HEADER}}>
              Good Morning,
            </Text>
            <Text size={20} style={{ fontFamily: 'HKGrotesk-Light', lineHeight: 24,fontWeight: '300', color: Theme.COLORS.HEADER}}>
              {i.label}
            </Text>
            </Block>
        <Block>
          {(i.creditLimit != null)? 
        (<Text size={12} style={{ fontFamily: 'HKGrotesk-Light', lineHeight: 32,fontWeight: '300', color: Theme.COLORS.HEADER}}>
              Credit limit ₦{i.creditLimit.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>) :(<Block />)
          }
          {(i.creditBalance != null)? 
          (<Block><Text size={12} style={{ fontFamily: 'HKGrotesk-Light', lineHeight: 12,fontWeight: '300', color: Theme.COLORS.HEADER}}>
              Credit Balance 
            </Text>
            <Text size={20} style={{ fontFamily: 'HKGrotesk-Bold', lineHeight: 20,fontWeight: '300', color: Theme.COLORS.HEADER}}>
            ₦{i.creditBalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Text></Block>) : <Block /> }
        </Block>
        
            
        </Block>
      )
            })
        }
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default AnimatedSwiper;