import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import images from '../../assets/images';
import Header from '../../components/Header';
import { COLORS,Fonts } from '../../utils/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const STATUS_COLORS = {
  "In Progress": { bg: "#F8DD72", text: "#8A6F00" },
  "On Hold": { bg: "#D3D3D3", text: "#555" },
  "Completed": { bg: "#C8FAD1", text: "#0F8A43" },
};

const TicketCard = ({ ticketId, status, onPress,icon }) => {
  const statusStyle = STATUS_COLORS[status] || STATUS_COLORS["In Progress"];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* LEFT ICON */}
      <View style={styles.leftIconBox}>
        <Image
          source={icon}
          style={{ width: 28, height: 28, }}
        />
      </View>

      {/* MIDDLE CONTENT */}
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>Ticket ID</Text>
        <Text style={styles.ticketId}>{ticketId}</Text>
      </View>

      {/* STATUS BADGE */}
      <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
        <Text style={[styles.statusText, { color: statusStyle.text }]}>
          {status}
        </Text>
      </View>

      {/* ARROW */}
      <Text style={styles.arrow}>{">"}</Text>
    </TouchableOpacity>
  );
};

const ListOfBill = ({navigation}) => {
  const data = [
    { id: 1, ticket: "8998598540", status: "In Progress" ,icon:images.BillsAMS},
    { id: 2, ticket: "8998598540", status: "On Hold",icon:images.BillsAMS },
    { id: 3, ticket: "8998598540", status: "Completed" ,icon:images.BillsAMS},
    { id: 4, ticket: "8998598540", status: "In Progress" ,icon:images.BillsAMS},
    { id: 5, ticket: "8998598540", status: "On Hold" ,icon:images.BillsAMS},
    { id: 6, ticket: "8998598540", status: "In Progress" ,icon:images.BillsAMS},
  ];

  return (
    <View style={styles.screen}>
         <Header title="List Of Bills" onBack={() => navigation.goBack()} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TicketCard
            ticketId={item.ticket}
            status={item.status}
            icon={item.icon}
            onPress={() => console.log("Clicked", item.ticket)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.lightBackground, // optional
  },

  card: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    padding: hp('2%'),
    borderRadius: hp('2%'),
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: hp('1%'),
    shadowOffset: { width: 0, height: hp('0.5%') },
  },

  leftIconBox: {
    width: hp('6%'),
    height: hp('6%'),
    backgroundColor: COLORS.lightPnk,
    borderRadius: hp('3%'),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp('3%'),
  },

  label: {
    fontSize: hp('1.4%'),
    fontFamily: Fonts.medium,
    color: "#8C8C8C",
  },

  ticketId: {
    fontSize: hp('1.8%'),
    fontFamily: Fonts.semiBold,
    color: "#333",
    marginTop: hp('0.2%'),
  },

  statusBadge: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.8%'),
    borderRadius: hp('2%'),
    marginRight: wp('3%'),
  },

  statusText: {
    fontSize: hp('1.3%'),
    fontFamily: Fonts.medium,
  },

  arrow: {
    fontSize: hp('3%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.darkGray,
  },
});

export default ListOfBill
