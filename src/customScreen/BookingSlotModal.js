import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../utils/colors';

const BookingSlotModal = ({
  visible,
  onClose,
  onBookProcess,
  setSelectedSlot,
  isReschedule = false,
}) => {
  const scrollRef = useRef(null);

  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [days, setDays] = useState([]);

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

  const timeSlots = [
    { label: 'First Half', time: '10:00 AM - 02:00 PM' },
    { label: 'Second Half', time: '02:00 PM - 07:00 PM' },
  ];

  const generateDays = (month, year) => {
    const totalDays = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: totalDays }, (_, i) => {
      const date = i + 1;
      const day = new Date(year, month, date)
        .toLocaleDateString('en-US', { weekday: 'short' })
        .slice(0, 3);
      return { date, day };
    });
  };

  const isPastDate = date => {
    const check = new Date(selectedYear, selectedMonth, date);
    check.setHours(0, 0, 0, 0);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    return check < todayDate;
  };

  useEffect(() => {
    const updatedDays = generateDays(selectedMonth, selectedYear);
    setDays(updatedDays);

    if (selectedMonth === currentMonth && selectedYear === currentYear) {
      const todayIndex = updatedDays.findIndex(d => d.date === currentDate);

      if (todayIndex !== -1) {
        setSelectedDay(todayIndex);

        setTimeout(() => {
          scrollRef.current?.scrollTo({
            x: todayIndex * wp(15),
            animated: true,
          });
        }, 300);
      }
    } else {
      setSelectedDay(null);
    }
  }, [selectedMonth, selectedYear, visible]);

  const handleProceedPress = () => {
    if (selectedDay === null || selectedTime === null) return;

    const dayObj = days[selectedDay];

    setSelectedSlot({
      date: dayObj.date,
      day: dayObj.day,
      month: monthNames[selectedMonth],
      monthNumber: selectedMonth + 1,
      year: selectedYear,
      time: timeSlots[selectedTime].time,
      Timeslot: timeSlots[selectedTime].label,
      reason: isReschedule ? rescheduleReason : undefined,
    });

    onBookProcess();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.modalContent}>
          <Text style={styles.title}>Book a Slot</Text>

          <Text style={styles.sectionLabel}>Date</Text>

          <View style={styles.monthYearSelector}>
            <TouchableOpacity
              onPress={() => {
                if (selectedMonth === 0) {
                  setSelectedMonth(11);
                  setSelectedYear(y => y - 1);
                } else {
                  setSelectedMonth(m => m - 1);
                }
              }}
            >
              <Text style={styles.navText}>{'<<'}</Text>
            </TouchableOpacity>

            <Text style={styles.monthText}>
              {monthNames[selectedMonth]} {selectedYear}
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (selectedMonth === 11) {
                  setSelectedMonth(0);
                  setSelectedYear(y => y + 1);
                } else {
                  setSelectedMonth(m => m + 1);
                }
              }}
            >
              <Text style={styles.navText}>{'>>'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daysContainer}
          >
            {days.map((day, index) => {
              const disabled = isPastDate(day.date);
              return (
                <TouchableOpacity
                  key={index}
                  disabled={disabled}
                  style={[
                    styles.dayButton,
                    selectedDay === index && !disabled && styles.selectedDay,
                    disabled && styles.disabledDay,
                  ]}
                  onPress={() => setSelectedDay(index)}
                >
                  <Text
                    style={[selectedDay === index && styles.dateNumber, disabled && styles.disabledText]}
                  >
                    {day.date}
                  </Text>
                  <Text
                    style={[selectedDay === index && styles.dayName, disabled && styles.disabledText]}
                  >
                    {day.day}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
                <Text style={selectedTime === index ? styles.selectedtimeLabel : styles.timeLabel}>{slot.label}</Text>
                <Text style={selectedTime === index ? styles.selectedtimeLabel : styles.timeText}>{slot.time}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {isReschedule && (
            <>
              <Text style={styles.sectionLabel}>Reason of Rescheduling</Text>
              <TextInput
                style={styles.reasonInput}
                placeholder="Type here..."
                multiline
                value={rescheduleReason}
                onChangeText={setRescheduleReason}
              />
            </>
          )}
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceedPress}
          >
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// export default BookingSlotModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.transparent,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    width: '100%',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    paddingBottom: Platform.OS === 'ios' ? hp(3) : hp(3),
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
    alignItems: 'center',
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
    backgroundColor: COLORS.themeColor,
  },
  dateNumber: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: 'white'
  },
  dayName: {
    fontSize: hp(1.5),
    color: '#151414ff',
    color: 'white'
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#333',
    height: hp(10),
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
    backgroundColor: COLORS.themeColor,
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
  selectedtimeLabel: {
    fontSize: hp(1.5),
    fontWeight: '500',
    textAlign: 'left',
    color: '#f7f4f4',
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
  disabledDay: {
    backgroundColor: 'lightgrey',
    borderColor: 'grey',
  },
  disabledText: {
    color: '#757272',
    fontSize: hp(1.6),
    fontWeight: '500',
  },
});

export default BookingSlotModal;
