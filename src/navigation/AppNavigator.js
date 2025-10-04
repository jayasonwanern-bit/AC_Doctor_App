// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomBottomTab from './CustomBottomTab';
import LoginScreen from '../screens/authscreen/LoginScreen';
import SplashScreen from '../screens/authscreen/SplashScreen';
import VerificationScreen from '../screens/authscreen/VerificationScreen';
import MapScreen from '../screens/authscreen/MapScreen';
import ServiceScreen from '../screens/authscreen/ServiceScreen';
import AddAdress from '../screens/LocationAddress/AddAdress';
import Sterilization  from '../screens/Home/Sterilization';
import ViewCartScreen from '../screens/Home/ViewCartScreen';

import { COLORS } from '../utils/colors';
import { StatusBar,useColorScheme,View } from 'react-native';



const Stack = createStackNavigator();

const AppNavigator = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} 
          backgroundColor={scheme === 'dark' ? '#000000' : '#ffffff'} 
          translucent={true}
        />
      <Stack.Navigator initialRouteName="ServiceScreen">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ServiceScreen" component={ServiceScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddAdress" component={AddAdress} options={{ headerShown: false }} />
        <Stack.Screen name="Tab" component={CustomBottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="Sterilization" component={Sterilization} options={{ headerShown: false }} />
        <Stack.Screen name="ViewCart" component={ViewCartScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;