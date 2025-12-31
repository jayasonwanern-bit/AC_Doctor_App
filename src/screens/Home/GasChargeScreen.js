import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import images from '../../assets/images';
import styles from './HomeScreenStyles';
import WorkInfo from '../../customScreen/WorkInfo';
import AcList from '../../customScreen/AcList';

const GasChargeScreen = ({ navigation, route }) => {
  const { screenName } = route?.params;
  const acRef = useRef();
  const [acData, setAcData] = useState([
    { id: 1, name: 'Split AC', icon: images.splitAC, count: 0 },
    { id: 2, name: 'Window AC', icon: images.windowAc, count: 0 },
    { id: 3, name: 'Cassette AC', icon: images.casseteAc, count: 0 },
    { id: 4, name: 'VRV/VRF AC', icon: images.VRVac, count: 0 },
    { id: 5, name: 'Ducted AC', icon: images.ductedAc, count: 0 },
    { id: 5, name: 'Chiller AC', icon: images.chilarIcon, count: 0 },
    { id: 6, name: 'Tower AC', icon: images.towerAc, count: 0 },
  ]);
  const [selectedACs, setSelectedACs] = useState([]);

  const totalSelected = selectedACs.reduce((sum, item) => sum + item.count, 0);

  const handleAdd = index => {
    setAcData(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  return (
    <View style={styles.workcontainer}>
      <Header title={screenName} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.workscrollstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.worksliderview}>
          <Image source={images.bannerOne} style={styles.workimage} />
        </View>

        <Text style={styles.workheadText}>Select Type of AC</Text>

        <AcList ref={acRef} data={acData} onChange={setSelectedACs} />

        <View style={{ marginTop: '2%' }}>
          <WorkInfo />
        </View>
      </ScrollView>

      {/* Services and View Cart Section */}
      {totalSelected > 0 && (
        <View
          style={[
            styles.servicesSection,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
          key={'viewCart'}
        >
          <View>
            <Text style={styles.servicesCount}>{totalSelected} services</Text>
            <Text style={styles.servicesCount}>Selected</Text>
          </View>
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() =>
              navigation.navigate('ViewCart', {
                screenName: 'Sterilization AC',
              })
            }
          >
            <Text style={styles.viewCartText}>View Cart</Text>
            <Image source={images.cart} style={styles.carticon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GasChargeScreen;
