import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../utils/colors';

const BookingSlotModal = ({ visible, onClose,onBookProcess ,setSelectedSlot }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentMonth = monthNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  // Generate days for the selected month and year
  const generateDays = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in month
    const firstDay = new Date(year, month, 1).getDay(); // First day index (0 = Sun, 1 = Mon, etc.)
    const daysArray = [];

    for (let date = 1; date <= daysInMonth; date++) {
      const day = new Date(year, month, date).toLocaleDateString('en-US', {
        weekday: 'short',
      });
      daysArray.push({ date, day: day.slice(0, 3) }); // Take first 3 letters (Mon, Tue, etc.)
    }
    return daysArray;
  };

  const [days, setDays] = useState(generateDays(selectedMonth, selectedYear));

  useEffect(() => {
    setDays(generateDays(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]);

  const timeSlots = [
    { label: 'First Half', time: '10:00 AM - 02:00 PM' },
    { label: 'Second Half', time: '02:00 PM - 08:00 PM' },
  ];


 const handleProceedPress = () => {
    if (selectedDay !== null && selectedTime !== null && setSelectedSlot && typeof setSelectedSlot === 'function') {
      const slot = {
        date: days[selectedDay].date,
        day: days[selectedDay].day,
        year: selectedYear,
        time: timeSlots[selectedTime].time,
      };
      setSelectedSlot(slot);
      onBookProcess(); // Use onProceed instead of onBookProcess
    }
  };
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Book a slot</Text>
          <Text style={styles.sectionLabel}>Date</Text>
          <View style={styles.monthYearSelector}>
            <TouchableOpacity
               style={styles.monthButton}
              onPress={() => {
                // Previous month
                const newMonth = selectedMonth - 1;
                if (newMonth < 0) {
                  setSelectedMonth(11); // Go to December
                  setSelectedYear(selectedYear - 1); // Decrease year
                } else {
                  setSelectedMonth(newMonth);
                }
              }}
            >
              <Text style={styles.navText}>{'<<'}</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{monthNames[selectedMonth]}</Text>
            <TouchableOpacity
              style={styles.monthButton}
              onPress={() => {
                const newMonth = (selectedMonth + 1) % 12;
                if (newMonth === 0) {
                  setSelectedYear(selectedYear + 1); // Increase year
                }
                setSelectedMonth(newMonth);
              }}
            >
                 <Text style={styles.navText}>{'>>'}</Text>
            </TouchableOpacity>


          {/*  year btton */}
            <TouchableOpacity
               style={[styles.yearButton,{marginLeft:wp(4)}]}
              onPress={() => {
                 if (selectedYear > 2025) {
                  // Minimum year limit
                  setSelectedYear(selectedYear - 1);
                }
              }}
            >
              <Text style={styles.navText}>{'<<'}</Text>
            </TouchableOpacity>

            <Text style={styles.yearText}> {selectedYear} </Text>
            
            <TouchableOpacity
              style={styles.yearButton}
              onPress={() => {
                // Next year
                setSelectedYear(selectedYear + 1);
              }}
            >
              <Text style={styles.navText}>{'>>'}</Text>
            </TouchableOpacity>
          </View>


          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.daysContainer}
          >
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayButton,
                  selectedDay === index && styles.selectedDay,
                ]}
                onPress={() => setSelectedDay(index)}
              >
                <Text style={styles.dateNumber}>{day.date}</Text>
                <Text style={styles.dayName}>{day.day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.sectionLabel}>Time</Text>
          <View style={styles.timeContainer}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeButton,
                  selectedTime === index && styles.selectedTime,
                ]}
                onPress={() => setSelectedTime(index)}
              >
                <Text style={styles.timeLabel}>{slot.label}</Text>
                <Text style={styles.timeText}>{slot.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceedPress}>
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: wp(5),
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    minHeight: hp(43),
  },
  title: {
    fontSize: hp(2),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  sectionLabel: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: '#0e0c0cff',
    marginBottom: hp(1),
  },
  monthYearSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center"
  },
  monthButton: {
    padding: wp(2),
  },
  monthText: {
    fontSize: hp(1.8),
    fontWeight: '500',
    color: '#656060ff',
  },
  yearButton: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: wp(1),
    padding: wp(2),
  },
  yearText: {
    fontSize: hp(1.8),
    fontWeight: '500',
    color: '#656060ff',
  },
  daysContainer: {
    marginBottom: hp(2),
    paddingVertical: hp(1),
  },
  dayButton: {
    alignItems: 'center',
    padding: wp(1),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(3),
    width: wp(13),
    marginRight: wp(2.5),
  },
  selectedDay: {
    borderColor: '#1DA1F2',
  },
  dateNumber: {
    fontSize: hp(1.6),
    fontWeight: '500',
  },
  dayName: {
    fontSize: hp(1.5),
    color: '#151414ff',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(3),
  },
  timeButton: {
    flex: 1,
    padding: wp(2),
    borderWidth: 1,
    borderColor: '#b5acacff',
    borderRadius: wp(3),
    marginHorizontal: wp(2),
    alignSelf: 'flex-start',
  },
  selectedTime: {
    borderColor: '#1DA1F2',
    borderWidth: 1,
    borderRadius: wp(3),
  },
  timeLabel: {
    fontSize: hp(1.5),
    fontWeight: '500',
    textAlign: 'left',
    color: '#666',
    marginBottom: wp(1),
  },
  timeText: {
    fontSize: hp(1.5),
    color: '#747070ff',
  },
  proceedButton: {
    backgroundColor: COLORS.themeColor,
    padding: hp(1.5),
    borderRadius: wp(8),
    alignItems: 'center',
  },
  proceedText: {
    color: COLORS.white,
    fontSize: hp(2),
    fontWeight: '500',
  },
  navText: {
    color: COLORS.themeColor,
    fontSize: hp(2),
    fontWeight: '500',
  },

});

export default BookingSlotModal;
