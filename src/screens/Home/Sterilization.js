import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import styles, {
  works,
  keyBenefitsData,
  serviceInclusionsData,
  termsConditionsData,
} from './HomeScreenStyles';
import ContentSection from '../../customScreen/ContentSection';

const Sterilization = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState('Key Benefits');
  const [acTypes, setAcTypes] = useState([
    { name: 'Split AC', count: 2, showButtons: false, acIcon: images.splitAC },
    { name: 'Window AC', count: 0, showButtons: false, acIcon: images.windowAc },
    { name: 'Cassette AC', count: 1, showButtons: false, acIcon: images.casseteAc },
    { name: 'VRV/VRF AC', count: 0, showButtons: false, acIcon: images.VRVac },
    { name: 'Ducted AC', count: 0, showButtons: false, acIcon: images.ductedAc },
    { name: 'Tower AC', count: 0, showButtons: false, acIcon: images.towerAc },
  ]);

  const handleAddClick = index => {
    const updatedAcTypes = [...acTypes];
    updatedAcTypes[index].showButtons = true;
    setAcTypes(updatedAcTypes);
    setTimeout(() => {
      const updatedAcTypes = [...acTypes];
      updatedAcTypes[index].showButtons = false;
      setAcTypes(updatedAcTypes);
    }, 6000);
  };

  const handleIncrement = index => {
    const updatedAcTypes = [...acTypes];
    updatedAcTypes[index].count += 1;
    setAcTypes(updatedAcTypes);
  };

  const handleDecrement = index => {
    const updatedAcTypes = [...acTypes];
    if (updatedAcTypes[index].count > 0) {
      updatedAcTypes[index].count -= 1;
    }
    setAcTypes(updatedAcTypes);
  };

  console.log('ContentSection:', ContentSection); // Debug log
  console.log('works:', works); // Debug log

  return (
    <View style={styles.workcontainer}>
      <Header
        title="Sterilization"
        onBack={() => navigation.goBack()}
        onHelp={() => alert('Help for Home')}
      />

      <ScrollView style={styles.workscrollstyle}>
        <View style={styles.worksliderview}>
          <Image source={images.bannerOne} style={styles.workimage} />
        </View>

        <Text style={styles.hworkheadText}>Select Type of AC</Text>

        {acTypes.map((ac, index) => (
          <View key={index} style={styles.workitem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FastImage
                source={ac.acIcon}
                style={styles.workacIconstyle}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.worktext}>{ac.name}</Text>
            </View>

            {ac.showButtons ? (
              <View style={styles.workbuttonContainer}>
                <TouchableOpacity
                  style={styles.workbutton}
                  onPress={() => handleDecrement(index)}
                >
                  <Text style={styles.workbuttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.workcount}>{ac.count}</Text>
                <TouchableOpacity
                  style={styles.workbutton}
                  onPress={() => handleIncrement(index)}
                >
                  <Text style={styles.workbuttonText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.workaddButton}
                onPress={() => handleAddClick(index)}
              >
                <Text style={styles.workaddButtonText}>+ Add</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View style={styles.workitem}>
          <Text style={styles.utititle}>How it works?</Text>
          <View style={styles.utiview}>
            <FlatList
              data={works}
              keyExtractor={(_, index) => `work-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.workoption}
                  onPress={item.action}
                >
                  <FastImage source={item.icon} style={styles.workicon} />
                  <Text style={[styles.utilabel, { color: COLORS.white }]}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <ContentSection
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          keyBenefits={keyBenefitsData}
          serviceInclusions={serviceInclusionsData}
          termsConditions={termsConditionsData}
        />

        <View style={{ height: hp('3%') }} />
      </ScrollView>
    </View>
  );
};

export default Sterilization;