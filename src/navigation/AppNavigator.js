import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomBottomTab from './CustomBottomTab';
import LoginScreen from '../screens/authscreen/LoginScreen';
import SplashScreen from '../screens/authscreen/SplashScreen';
import VerificationScreen from '../screens/authscreen/VerificationScreen';
import MapScreen from '../screens/authscreen/MapScreen';
import ServiceScreen from '../screens/authscreen/ServiceScreen';
import NewAddressDemo from '../screens/LocationAddress/NewAddressDemo';
import AddAddress from '../screens/Home/AddAddress';
import Sterilization from '../screens/Home/Sterilization';
import ViewCartScreen from '../screens/Home/ViewCartScreen';
import PaymentScreen from '../screens/Profile/PaymentScreen';
import CommericalAc from '../screens/Home/CommericalAc';
import RepairScreen from '../screens/Home/RepairScreen';
import InstallationScreen from '../screens/Home/InstallationScreen';
import GasChargeScreen from '../screens/Home/GasChargeScreen';
import FreeConsultant from '../screens/Home/FreeConsultant';
import CopperPipeScreen from '../screens/Home/CopperScreen/CopperPipeScreen';
import RequestDetail from '../screens/Home/CopperScreen/RequestDetail';
import { COLORS } from '../utils/colors';
import {
  StatusBar,
  useColorScheme,
  View,
  Platform,
  StyleSheet,
} from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const scheme = useColorScheme();

  // Dynamic styles based on theme
  const dynamicStyles = {
    safeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 0 : 0, // Android ke liye dynamic padding, iOS pe SafeArea handle karega
      backgroundColor: scheme === 'dark' ? '#090909ff' : '#ffffffff',
    },
    headerStyle: {
      backgroundColor: scheme === 'dark' ? '#1a1a1a' : '#ffffff',
    },
    headerTitleStyle: {
      color: scheme === 'dark' ? COLORS.white : '#000000',
    },
    headerBackTitleStyle: {
      color: scheme === 'dark' ? COLORS.white : '#000000',
    },
    headerTintColor: {
      tintColor: scheme === 'dark' ? COLORS.white : '#000000',
    },
  };

  return (
    <SafeAreaProvider style={dynamicStyles.safeArea}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={scheme === 'dark' ? '#000000' : '#ffffff'}
        translucent={Platform.OS === 'android'}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ServiceScreen"
          screenOptions={{
            headerStyle: dynamicStyles.headerStyle,
            headerTitleStyle: dynamicStyles.headerTitleStyle,
            headerBackTitleStyle: dynamicStyles.headerBackTitleStyle,
            headerTintColor: dynamicStyles.headerTintColor.tintColor,
            headerShown: false, // Default header hide, individual screens can override
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="NewAddressDemo" component={NewAddressDemo} />
          <Stack.Screen name="Tab" component={CustomBottomTab} />
          <Stack.Screen name="Sterilization" component={Sterilization} />
          <Stack.Screen name="ViewCart" component={ViewCartScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="CommericalAc" component={CommericalAc} />
          <Stack.Screen name="RepairScreen" component={RepairScreen} />
          <Stack.Screen
            name="InstallationScreen"
            component={InstallationScreen}
          />
          <Stack.Screen name="GasChargeScreen" component={GasChargeScreen} />
          <Stack.Screen name="FreeConsultant" component={FreeConsultant} />
          <Stack.Screen name="CopperPipeScreen" component={CopperPipeScreen} />
          <Stack.Screen name="RequestDetail" component={RequestDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
