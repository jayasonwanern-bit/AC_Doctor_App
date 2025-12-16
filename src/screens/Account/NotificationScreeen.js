import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  SectionList,
  Alert,
  Animated,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import Header from '../../components/Header';

const NotificationScreeen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [allNotifications, setAllNotifications] = useState([
    // Today
    {
      id: '1',
      title: "Today's special offer!",
      message: 'You can get a special promo today.',
      time: '10m ago',
      image: images.demoImgTwo,
      date: 'Today',
    },
    {
      id: '2',
      title: 'Mohan Verma is arrived at your location',
      message: 'Agent has reached your service address.',
      time: '10m ago',
      image: images.userProfile,
      date: 'Today',
    },
    // Yesterday
    {
      id: '3',
      title: "Today's special offer!",
      message: 'You can get a special promo today.',
      time: '10m ago',
      image: images.userphoto,
      date: 'Yesterday',
    },
    {
      id: '4',
      title: 'Mohan Verma is arrived at your location',
      message: 'Agent has reached your service address.',
      time: '10m ago',
      image: images.demoImgthree,
      date: 'Yesterday',
    },
    {
      id: '5',
      title: "Today's special offer!",
      message: 'You can get a special promo today.',
      time: '10m ago',
      image: images.demoImg,
      date: 'Yesterday',
    },
  ]);

  const [filteredNotifications, setFilteredNotifications] = useState([]);

  // Group by date
  useEffect(() => {
    const grouped = allNotifications.reduce((acc, notif) => {
      const key = notif.date;
      if (!acc[key]) acc[key] = [];
      acc[key].push(notif);
      return acc;
    }, {});

    const sections = Object.keys(grouped).map(date => ({
      title: date,
      data: grouped[date],
    }));

    setFilteredNotifications(sections);
  }, [allNotifications]);

  // Search Filter
  useEffect(() => {
    if (!searchText) {
      // Reset to all
      const grouped = allNotifications.reduce((acc, notif) => {
        const key = notif.date;
        if (!acc[key]) acc[key] = [];
        acc[key].push(notif);
        return acc;
      }, {});

      const sections = Object.keys(grouped).map(date => ({
        title: date,
        data: grouped[date],
      }));
      setFilteredNotifications(sections);
    } else {
      const filtered = allNotifications.filter(
        n =>
          n.title.toLowerCase().includes(searchText.toLowerCase()) ||
          n.message.toLowerCase().includes(searchText.toLowerCase()),
      );

      const grouped = filtered.reduce((acc, notif) => {
        const key = notif.date;
        if (!acc[key]) acc[key] = [];
        acc[key].push(notif);
        return acc;
      }, {});

      const sections = Object.keys(grouped).map(date => ({
        title: date,
        data: grouped[date],
      }));
      setFilteredNotifications(sections);
    }
  }, [searchText, allNotifications]);

  //   delete single notification
  const deleteNotification = id => {
    setAllNotifications(prev => prev.filter(n => n.id !== id));
  };

  //   delete all notifications
  const deleteAll = () => {
    Alert.alert('Clear All', 'Delete all notifications?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setAllNotifications([]),
      },
    ]);
  };

  //   render right action for swipeable
  const renderRightActions = (progress, dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [-90, 0],
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <RectButton
        style={styles.deleteBtn}
        onPress={() => deleteNotification(id)}
      >
        <Animated.Image
          source={images.Whitedelete}
          style={[styles.trashIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
    );
  };

  const renderNotification = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item.id)
        }
        overshootRight={false}
      >
        <View style={styles.notifCard}>
          <Image source={item.image} style={styles.notifImage} />
          <View style={styles.notifContent}>
            <Text style={styles.notifTitle}>{item.title}</Text>
            <Text style={styles.notifMessage}>{item.message}</Text>
          </View>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
      </Swipeable>
    );
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  // Empty State
  if (allNotifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.bellContainer}>
          <Image source={images.notify} style={styles.bellImage} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>0</Text>
          </View>
        </View>
        <Text style={styles.emptyTitle}>No Notification to show</Text>
        <Text style={styles.emptySubtitle}>
          You currently have no notifications. We will notify you when something
          new happens!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Notifications" onBack={() => navigation.goBack()} />
      <View style={{ marginHorizontal: wp(4) }}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={images.searchIcon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>

        {/* Clear All Button */}
        {allNotifications.length > 0 && (
          <TouchableOpacity style={styles.clearAllBtn} onPress={deleteAll}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}

        {/* Notifications List */}
        <SectionList
          sections={filteredNotifications}
          keyExtractor={item => item.id}
          renderItem={renderNotification}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

// ====================== STYLES ======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: wp(4),
    paddingHorizontal: wp(4),
    borderRadius: wp(10),
    elevation: 2,
    borderWidth: wp(0.1),
    borderColor: COLORS.textColor,
  },
  searchIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: '#aaa',
    marginRight: wp(2),
  },
  searchInput: {
    flex: 1,
    paddingVertical: hp(1.3),
    fontSize: hp(1.7),
    color: '#333',
    fontFamily: Fonts.medium,
  },
  clearAllBtn: {
    alignSelf: 'flex-end',
    marginBottom: hp(0),
  },
  clearAllText: {
    color: COLORS.red,
    fontSize: hp(1.5),
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: hp(1.5),
    fontFamily: Fonts.medium,
    color: COLORS.textColor,
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: wp(2),
    marginVertical: hp(0.5),
    marginBottom: hp(0.6),
    borderRadius: wp(3),
    elevation: 1,
  },
  notifImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(1),
    marginRight: wp(3),
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: hp(1.5),
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: hp(0.3),
  },
  notifMessage: {
    fontSize: hp(1.4),
    color: '#666',
  },
  notifTime: {
    fontSize: hp(1.4),
    color: '#999',
    alignSelf: 'flex-start',
  },
  deleteBtn: {
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(15),
    marginVertical: hp(0.5),
    borderTopRightRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
  trashIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: '#fff',
  },
  list: {
    paddingBottom: hp(2),
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  bellContainer: {
    position: 'relative',
    marginBottom: hp(3),
  },
  bellImage: {
    width: wp(30),
    height: wp(30),
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: hp(3.4),
    right: wp(3),
    backgroundColor: COLORS.red,
    width: wp(8),
    height: wp(8),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: hp(1.8),
    fontWeight: 'bold',
  },
  emptyTitle: {
    fontSize: hp(2),
    fontFamily: Fonts.semiBold,
    color: COLORS.red,
    marginBottom: hp(1),
  },
  emptySubtitle: {
    fontSize: hp(1.6),
    color: '#777',
    textAlign: 'center',
    lineHeight: hp(2.8),
  },
});

export default NotificationScreeen;
