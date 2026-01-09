import React, {
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { COLORS, Fonts } from '../utils/colors';
import { rf } from '../components/Resposive';
import { isTablet } from '../components/TabletResponsiveSize';

const AcList = forwardRef(({ data, onChange }, ref) => {
  const [acList, setAcList] = useState(data);

  // ✅ Increment / Decrement
  const updateCount = (id, type) => {
    const updated = acList.map(item =>
      item.id === id
        ? {
          ...item,
          count:
            type === 'inc' ? item.count + 1 : Math.max(item.count - 1, 0),
        }
        : item,
    );

    setAcList(updated);

    // 🔥 parent ko notify karo
    onChange && onChange(updated);
  };

  // ✅ selected ACs
  const selectedACs = useMemo(
    () => acList.filter(item => item.count > 0),
    [acList],
  );

  // ✅ total count
  const totalCount = useMemo(
    () => selectedACs.reduce((sum, item) => sum + item.count, 0),
    [selectedACs],
  );

  // ✅ expose data to parent via ref
  useImperativeHandle(ref, () => ({
    getSelectedACs: () => selectedACs,
    getTotalCount: () => totalCount,
  }));

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.leftRow}>
        <FastImage source={item.icon} style={styles.icon} />
        <Text style={styles.name}>{item.name}</Text>
      </View>

      {item.count === 0 ? (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => updateCount(item.id, 'inc')}
        >
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.mainCounterView}>
          <TouchableOpacity onPress={() => updateCount(item.id, 'dec')}>
            <Text style={styles.counterBtn}>-</Text>
          </TouchableOpacity>

          <Text style={styles.count}>{item.count}</Text>

          <TouchableOpacity onPress={() => updateCount(item.id, 'inc')}>
            <Text style={styles.counterBtn}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={acList}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      extraData={acList} // 🔥 ensure re-render
    />
  );
});

export default AcList;
/* styles yahin ya common styles file me */
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  leftRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 42, height: 42, marginRight: 12 },
  name: { fontSize: isTablet ? rf(9) : rf(13), fontFamily: Fonts.semiBold },
  addBtn: {
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  addText: { fontWeight: '400', color: 'black' },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  counterBtn: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 8 },
  count: {
    fontSize: 16,
    color: COLORS.themeColor,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  counterBorder: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    padding: 2,
    height: 32.5,
  },
  mainCounterView: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
});
