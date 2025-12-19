import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar as RNStatusBar,
  StyleSheet,
  Alert,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Homestyles, { menuData } from '../Home/HomeScreenStyles';
import { SafeAreaView } from 'react-native-safe-area-context'; // Use SafeAreaView instead of SafeAreaProvider
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import { COLORS } from '../../utils/colors';
import { useDispatch } from 'react-redux';
import { store } from '../../redux/store';
import { getUserProfile, logoutUser } from '../../api/profileApi';
import Toast from 'react-native-simple-toast';
import { logout } from '../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreenComponent = ({ navigation }) => {
  const scheme = useColorScheme();
  // Dynamic styles based on scheme
  const dynamicStyles = {
    safeArea: {
      backgroundColor: scheme === 'dark' ? '#1a1a1a' : '#ffffff',
    },
    backText: {
      color: scheme === 'dark' ? '#ffffff' : '#000000',
    },
    title: {
      color: scheme === 'dark' ? '#ffffff' : '#000000',
    },
    helpIcon: {
      tintColor: scheme === 'dark' ? '#ffffff' : '#000000',
    },
    extraIcon: {
      tintColor: scheme === 'dark' ? '#ffffff' : '#000000',
    },
  };
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState(null);
  const dispatch = useDispatch();
  const userId = store?.getState()?.auth?.user;
  const addressText = store?.getState()?.auth?.address;
  const weatherData = store?.getState()?.auth?.celcius;
  console.log('addressText --->', weatherData);

  const handleMenuPress = async screen => {
    if (screen === 'Logout') {
      Alert.alert('Logout', 'Are you sure?', [
        { text: 'Cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const res = await logoutUser(userId?._id);
              if (res?.status) {
                try {
                  await AsyncStorage.removeItem('authToken');
                  Toast.show(res?.message);
                  dispatch(logout());
                  // navigation.replace('Login');
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                } catch (e) {
                  console.log('Error removing token', e);
                }
              }
            } catch (error) {
              Toast.show(error);
            }
          },
        },
      ]);
    } else {
      navigation.navigate(screen);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getUserProfile(userId?._id);
      if (res?.status) {
        const data = res.data;
        setStoreData(data);
      }
    } catch (error) {
      console.log('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        Homestyles.safeArea,
        { backgroundColor: dynamicStyles.safeArea.backgroundColor },
      ]}
    >
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      {/* Header with Location Icon and Add Location Text */}
      <View style={Homestyles.header}>
        <Text style={Homestyles.locationtitle}>Location</Text>
        <View style={Homestyles.addressRow}>
          <TouchableOpacity
            style={Homestyles.locationContainer}
            // onPress={() =>
            //   navigation.navigate('SelectLocation', { onUpdate: loadAddress })
            // }
          >
            <FastImage
              source={images.homeLocation}
              style={Homestyles.locationIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={Homestyles.locationText}>
              {`${addressText.house}  ${addressText.road}, ${addressText.city}` ||
                'Select Location'}
            </Text>
          </TouchableOpacity>
          <View style={Homestyles.wheatherContainer}>
            <FastImage
              source={images.wheatherIcon}
              style={Homestyles.locationIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text
              style={Homestyles.locationText}
            >{`${weatherData?.current_weather?.temperature} ${weatherData?.current_weather_units?.temperature}`}</Text>
          </View>
        </View>
      </View>

      {/* profile */}
      <TouchableOpacity
        style={Homestyles.accountMaincontainer}
        onPress={() => navigation.navigate('ProfileDetail')}
      >
        <View style={Homestyles.accountcontainer}>
          <FastImage
            source={images.userProfile}
            style={Homestyles.accountbg}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={Homestyles.accountcontainer}>
          <Text style={Homestyles.accounttitle}>{storeData?.name}</Text>
          <View style={Homestyles.accountline}>
            <Image
              source={images.Call}
              style={Homestyles.callIcon}
              resizeMode="contain"
            />
            <Text style={Homestyles.accountNumber}>
              {storeData?.countryCode} {storeData?.phoneNumber}
            </Text>
          </View>
          <Text
            style={[Homestyles.accountNumber, { color: COLORS.themeColor }]}
          >
            {'Complete your profile >'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* service booked */}
      <View
        style={[
          Homestyles.accountMaincontainer,
          { justifyContent: 'space-evenly' },
        ]}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={Homestyles.accountBlueText}>0</Text>
          <Text style={Homestyles.accountNumber}>Services Booked</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            borderLeftWidth: wp('0.2%'),
            borderLeftColor: COLORS.themeColor,
          }}
        >
          <Text style={Homestyles.accountBlueText}> ₹ 0</Text>
          <Text style={[Homestyles.accountNumber, { marginLeft: wp(6) }]}>
            Earned through refer
          </Text>
        </View>
      </View>
      {/* Menu List */}
      <View style={styles.container}>
        <FlatList
          data={menuData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={Homestyles.acccontainer}
              onPress={() => handleMenuPress(item.screen)}
            >
              <View>
                <Image source={item.icon} style={Homestyles.accicon} />
              </View>
              <Text style={Homestyles.acctitle}>{item.title}</Text>
              <Image source={images.rightArrow} style={Homestyles.accarrow} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: wp(3),
    paddingBottom: hp(15),
  },
});
