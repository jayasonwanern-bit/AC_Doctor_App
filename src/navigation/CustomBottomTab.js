import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import images from '../assets/images'; // Adjust path if needed
import HomeScreen from '../screens/Home/HomeScreen';
import ShopScreen from '../screens/Shop/ShopScreen'; // Dummy for now
import AMCScreen from '../screens/AMC/AMCScreen'; // Dummy for now
import SmartControlScreen from '../screens/SmartControl/SmartControlScreen'; // Dummy for now
import AccountScreen from '../screens/Account/AccountScreen'; // Dummy for now
import { COLORS, Fonts } from '../utils/colors';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {

  const getTabImage = (routeName, isFocused) => {
    const imageMap = {
      Home: isFocused ? images.active_home : images.inactive_home,
      Shop: isFocused ? images.active_shop : images.inactive_shop,
      AMC: isFocused ? images.active_AMC : images.inactive_AMC,
      SmartControl: isFocused ? images.active_cntrl : images.inactive_cntrl,
      Account: isFocused ? images.active_accnt : images.inactive_accnt,
    };
    return imageMap[routeName] || (isFocused ? images.active_home : images.inactive_home);
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <FastImage
              source={getTabImage(route.name, isFocused)}
              style={styles.tabIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={[styles.tabLabel, { color: isFocused ? COLORS.themeColor : '#666' }]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const CustomBottomTab = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="AMC" component={AMCScreen} />
      <Tab.Screen name="Smart Control" component={SmartControlScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: hp('9%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding:hp('1%'),
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  tabIcon: {
    width: wp('5.5%'),
    height: wp('5.5%'),
  },
  tabLabel: {
    fontSize: wp('3%'),
    fontFamily: Fonts.medium, // Adjust with your Fonts
    marginTop: hp('0.5%'),
    textAlign:'center'
  },
});

export default CustomBottomTab;