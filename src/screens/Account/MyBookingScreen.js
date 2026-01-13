import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts, STATUS_CONFIG } from '../../utils/colors';
import Header from '../../components/Header';
import images from '../../assets/images';
import { getBookingList } from '../../api/settingApi';
import { store } from '../../redux/store';
import CustomLoader from '../../components/CustomLoader';



const MyBookingScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const userId = store?.getState()?.auth?.user;
  const [allRequests, setAllRequests] = useState([]);

  const TABS = [
    { label: 'All', value: 'ALL' },
    { label: 'Booked', value: 'BOOKED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' },
  ];


  useEffect(() => {
    getBrandList();
  }, []);
  useEffect(() => {
    console.log('ACTIVE TAB:', activeTab);
    console.log('ALL REQUESTS:', allRequests);
  }, [activeTab, allRequests]);

  console.log('gfdfgdhggh---', userId)

  const getBrandList = async () => {
    try {
      setLoading(true);

      const res = await getBookingList(userId._id);
      // ✅ FIX HERE
      if (res?.success) {
        const formattedData = res?.data.map(booking => ({
          id: booking?._id,
          bookingId: booking?.bookingId || '',
          status: booking?.status || '',
          slot: booking?.slot || '',
          date: booking?.date,

          amount: booking?.amount?.$numberDecimal
            ? Number(booking.amount.$numberDecimal)
            : 0,

          acTypes: booking?.acTypes || [],
          serviceType: booking?.serviceType || [],

          orderId: booking?.order_id || '',
          payment_status: booking?.payment_status || 'Pending',
          order_amount: booking?.order_amount || 0,

          technicianName: booking?.assigned_to?.name || 'Not Assigned',
          technicianPhone: booking?.assigned_to?.phone || '',
        }));

        setAllRequests(formattedData);
      } else {
        console.log('API SUCCESS FALSE --->', res);
      }
    } catch (error) {
      console.log('Booking Error:', error);
    } finally {
      setLoading(false);
    }
  };



  // Filter by Tab
  const filteredRequests =
    activeTab === 'ALL'
      ? allRequests
      : allRequests.filter(item => item.status === activeTab);


  const getStatusStyle = status => {
    return STATUS_CONFIG[status] || { bg: '#f8eccaff', text: '#f0980aff' };
  };

  const renderRequestCard = ({ item }) => {
    const { bg, text } = getStatusStyle(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.serviceBadge}>
            <Image source={images.splitAC} style={styles.icon} />
            <Text style={styles.serviceText} numberOfLines={1}>{item?.acTypes?.join(', ')}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: bg }]}>
            <Text style={[styles.statusText, { color: text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ width: wp(25) }}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value} numberOfLines={1}>{item?.acTypes?.join(', ')}</Text>
          </View>
          <View style={{ width: wp(35) }}>
            <Text style={styles.label}>Service Types</Text>
            <Text style={styles.value}>{item?.serviceType?.join(', ')}</Text>
          </View>
        </View>

        {/* Date & Time */}
        {item.status !== 'CANCELLED' && (
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Scheduled Date & Time</Text>
              <Text style={styles.value}>
                {item?.date?.split('T')[0]},{item?.slot}
              </Text>
            </View>
            <View style={{ width: wp(35) }}>
              <Text style={styles.label}>Technician Assigned</Text>
              <Text style={styles.value}>{item?.technicianName}</Text>
            </View>
          </View>
        )}

        {/* Total Amount */}
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Total Amount</Text>
            <Text style={styles.value}>₹ {item?.order_amount}</Text>
          </View>
          <View style={{ width: wp(35) }}>
            <Text style={styles.label}>Payment Status</Text>
            <Text style={styles.value}>{item?.payment_status}</Text>
          </View>
        </View>

        {/* AC Count */}
        {/* <View style={styles.row}>
            <View>
              <Text style={styles.label}>Payment Mode</Text>
              <Text style={styles.value}>NA</Text>
            </View>
        </View> */}

        {/* Final Offer & Payment (Completed) */}
        {item.finalOffer && (
          <>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Final Offer</Text>
                <Text style={styles.value}>{item.finalOffer}</Text>
              </View>
              <View style={{ width: wp(25) }}>
                <Text style={styles.label}>Payment Status</Text>
                <Text style={styles.value}>{item.paymentStatus}</Text>
              </View>
            </View>
          </>
        )}

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          {item.status === 'UPCOMING' ||
            (item.status === 'BOOKED' && (
              <TouchableOpacity>
                <Text style={styles.reinitiateText}>Cancel Request</Text>
              </TouchableOpacity>
            ))}
          {item.status === 'CANCELLED' && (
            <TouchableOpacity>
              <Text style={styles.reinitiateText}>Reinitiate Request</Text>
            </TouchableOpacity>
          )}
          {item.status === 'COMPLETED' && (
            <View style={styles.ratingRow}>
              <Text style={styles.label}>Rate us</Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Text
                    key={i}
                    style={
                      i < (item.rating || 0)
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                  >
                    ⭐
                  </Text>
                ))}
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.viewDetailsBtn}
            onPress={() =>
              navigation.navigate('BookingDetailsScreen', {
                bookingId: item,
              })
            }
          >
            <Text style={styles.viewDetailsText}>View details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="My Bookings" onBack={() => navigation.goBack()} />
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.value}
            onPress={() => setActiveTab(tab.value)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {loading ? (
        <CustomLoader size={40} />
      ) : (
        <FlatList
          data={filteredRequests}
          keyExtractor={item => item.id}
          renderItem={renderRequestCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No requests found in {activeTab.toLowerCase()}
            </Text>
          }
        />
      )}
    </View>
  );
};

// ====================== STYLES ======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: hp(1),
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    paddingHorizontal: wp(4),
    minWidth: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  activeTab: {
    borderBottomColor: COLORS.themeColor,
    borderBottomWidth: 2,
    minWidth: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  tabText: {
    fontSize: hp(1.6),
    color: COLORS.textColor,
    fontFamily: Fonts.medium,
    paddingVertical: hp(1),
  },
  activeTabText: {
    color: COLORS.black,
    fontSize: hp(1.6),
    fontFamily: Fonts.semiBold,
    paddingVertical: hp(1),
  },
  list: {
    padding: wp(4),
  },
  emptyText: {
    textAlign: 'center',
    marginTop: hp(5),
    fontSize: hp(2),
    color: '#999',
  },

  // Card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: wp(3),
    marginBottom: hp(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
    backgroundColor: COLORS.lightSky,
    borderTopLeftRadius: hp(1),
    borderTopRightRadius: hp(1),
    padding: wp(2),
  },
  serviceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceText: {
    fontSize: hp(1.6),
    color: '#666',
    fontWeight: '600',
    width: wp(25)
  },
  icon: {
    width: wp(6),
    height: hp(1.5),
    resizeMode: 'cover',
    marginRight: wp(2),
  },
  statusBadge: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: wp(3),
  },
  statusText: {
    fontSize: hp(1.5),
    fontFamily: Fonts.semiBold,
  },
  requestId: {
    fontSize: hp(1.6),
    fontFamily: Fonts.semiBold,
    color: COLORS.textHeading || '#333',
    marginBottom: hp(1),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
    alignItems: 'flex-start',
    paddingHorizontal: wp(4),
  },
  label: {
    fontSize: hp(1.8),
    color: '#666',
    flex: 1,
    textAlign: 'left',
    marginBottom: hp(0.3),
  },
  value: {
    fontSize: hp(1.6),
    color: COLORS.black,
    fontWeight: '500',
    textAlign: 'left',
  },
  ratingRow: {
    alignItems: 'flex-start',
    padding: wp(4),
  },
  stars: {
    flexDirection: 'row',
  },
  starFilled: {
    color: '#FFD700',
    fontSize: hp(1.5),
  },
  starEmpty: {
    color: '#ddd',
    fontSize: hp(1.5),
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    flexWrap: 'wrap',
    gap: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: wp(2.5),
  },
  reinitiateText: {
    color: COLORS.themeColor,
    fontSize: hp(1.6),
    fontFamily: Fonts.semiBold,
    borderBottomColor: COLORS.themeColor,
    borderBottomWidth: 1,
  },
  viewDetailsBtn: {
    backgroundColor: COLORS.themeColor,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    borderRadius: wp(10),
  },
  viewDetailsText: {
    color: COLORS.white,
    fontSize: hp(1.4),
    fontFamily: Fonts.medium,
  },
});

export default MyBookingScreen;
