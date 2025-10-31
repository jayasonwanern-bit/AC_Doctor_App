// screens/MyRequestsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import { STATUS_CONFIG } from '../../utils/colors';
import Header from '../../components/Header';
import images from '../../assets/images';

const TABS = ['All', 'Scheduled', 'Completed', 'Cancelled'];

const MyRequestsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');

  // Dummy Data (Colors nahi — sirf status)
  const allRequests = [
    {
      id: '1',
      service: 'Old AC',
      requestId: '#12345',
      date: '05/03/2025',
      time: '10/03/2025 - First half',
      location: 'LG, Dakin',
      acCount: 2,
      agent: '-',
      status: 'Under Review',
      actionText: 'Cancel request',
      showReschedule: false,
    },
    {
      id: '2',
      service: 'AMC',
      requestId: '#12345',
      time: '10/03/2025 - First half',
      location: 'LG, Dakin',
      acCount: 2,
      agent: 'Mohan Verma',
      status: 'Scheduled',
      actionText: 'Reschedule',
      showReschedule: true,
    },
    {
      id: '3',
      service: 'Old AC',
      requestId: '#12345',
      time: '10/03/2025 - First half',
      location: 'LG, Dakin',
      acCount: 2,
      agent: 'Mohan Verma',
      status: 'Completed',
      finalOffer: '₹65000/-',
      paymentStatus: 'Paid',
      rating: 4,
      showReinitiate: false,
    },
    {
      id: '4',
      service: 'AMC',
      requestId: '#12345',
      time: 'Placed by mistake',
      location: 'LG, Dakin',
      status: 'Cancelled',
      cancellationReason: 'Placed by mistake',
      showReinitiate: true,
    },
    {
      id: '5',
      service: 'Old AC',
      requestId: '#12345',
      time: '15/03/2025 - Second half',
      location: 'LG, Dakin',
      acCount: 2,
      agent: 'Mohan Verma',
      status: 'Re-scheduled',
      actionText: 'Cancel request',
    },
  ];

  // Filter by Tab
  const filteredRequests = allRequests.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Scheduled')
      return ['Scheduled', 'Re-scheduled'].includes(item.status);
    if (activeTab === 'Completed') return item.status === 'Completed';
    if (activeTab === 'Cancelled') return item.status === 'Cancelled';
    return false;
  });

  const getStatusStyle = status => {
    return STATUS_CONFIG[status] || { bg: '#f0f0f0', text: '#666' };
  };

  const renderRequestCard = ({ item }) => {
    const { bg, text } = getStatusStyle(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.serviceBadge}>
            <Image source={images.splitAC} style={styles.icon} />
            <Text style={styles.serviceText}>{item.service}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: bg }]}>
            <Text style={[styles.statusText, { color: text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* Request ID */}
        <Text style={styles.requestId}>Request ID {item.requestId}</Text>

        {/* Date & Time */}
        <View style={styles.row}>
          <View>
          <Text style={styles.label}>
            {item.status === 'Cancelled' 
              ? 'Cancellation Reason'
              : item.status === 'Completed' ? 'Completion Date':'Inspection Date & Time'}
          </Text>
          <Text style={styles.value}>{item.time}</Text>
          </View>
           <View style={{width:wp(25)}}>
          <Text style={styles.label}>Requested Service Details</Text>
          <Text style={styles.value}>{item.location}</Text>
          </View>
        </View>

          {/* AC Count */}
        <View style={styles.row}>
           {item.acCount !== null && (<View>
            <Text style={styles.label}>Number of AC</Text>
            <Text style={styles.value}>{item.acCount}</Text>
            </View>)}
        {item.agent && (
          <View style={{width:wp(25)}}>
            <Text style={styles.label}>Agent</Text>
            <Text style={styles.value}>{item.agent}</Text>
          </View>
          )}
        </View>

        

        {/* Final Offer & Payment (Completed) */}
        {item.finalOffer && (
          <>
            <View style={styles.row}>
              <View>
              <Text style={styles.label}>Final Offer</Text>
              <Text style={styles.value}>{item.finalOffer}</Text>
              </View>
             <View style={{width:wp(25)}}>
              <Text style={styles.label}>Payment Status</Text>
              <Text style={styles.value}>{item.paymentStatus}</Text>
              </View>
            </View>
            
          </>
        )}

        {/* Cancellation Reason */}
        {item.cancellationReason && (
          <View style={styles.row}>
            <Text style={styles.label}>Cancellation Reason</Text>
            <Text style={styles.value}>{item.cancellationReason}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          {item.showReinitiate && (
            <TouchableOpacity>
              <Text style={styles.reinitiateText}>Reinitiate Request</Text>
            </TouchableOpacity>
          )}
          {item.actionText && (
            <TouchableOpacity>
              <Text style={styles.reinitiateText}>{item.actionText}</Text>
            </TouchableOpacity>
          )}
           {item.status === 'Completed'&& (<View style={styles.ratingRow}>
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
            </View>)}
          <TouchableOpacity
            style={styles.viewDetailsBtn}
            onPress={() =>
              navigation.navigate('RequestDetails', { request: item })
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
      <Header title="My Requests" onBack={() => navigation.goBack()} />
      {/* Tabs */}
      <View
        style={styles.tabContainer}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
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
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'  
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
    backgroundColor:COLORS.white,
    padding: wp(4),
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
  },
  serviceBadge: {
   flexDirection:'row',
   alignItems:'center',
  },
  serviceText: {
    fontSize: hp(1.6),
    color: '#666',
    fontWeight: '600',
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
    borderRadius: wp(10),
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
    marginBottom: hp(1),
    alignItems:'flex-start'
  },
  label: {
    fontSize: hp(1.6),
    color: '#666',
    flex: 1,
    textAlign:'left',
     marginBottom: hp(0.3),
  },
  value: {
    fontSize: hp(1.4),
    color: COLORS.black,
    fontWeight: '500',
    textAlign:'left'
  },
  ratingRow: {
    alignItems: 'flex-start',
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
  },
  reinitiateText: {
    color: COLORS.themeColor,
    fontSize: hp(1.7),
    fontFamily: Fonts.semiBold,
    borderBottomColor:COLORS.themeColor,
    borderBottomWidth:1,
  },
  viewDetailsBtn: {
    backgroundColor: COLORS.red,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(10),
  },
  viewDetailsText: {
    color:COLORS.white,
    fontSize: hp(1.6),
    fontWeight: '600',
  },
});

export default MyRequestsScreen;
