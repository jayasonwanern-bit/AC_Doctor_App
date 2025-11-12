import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import styles, {
  works,
  keyBenefitsData,
  serviceInclusionsData,
  termsConditionsData,
  faqData,
} from './HomeScreenStyles';
import ContentSection from '../../customScreen/ContentSection';

const InstallationScreen = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('Key Benefits');

  const [acTypes, setAcTypes] = useState([
    { name: 'Split AC', count: 2, showButtons: false, acIcon: images.splitAC },
    {
      name: 'Window AC',
      count: 0,
      showButtons: false,
      acIcon: images.windowAc,
    },
    {
      name: 'Cassette AC',
      count: 1,
      showButtons: false,
      acIcon: images.casseteAc,
    },
    { name: 'VRV/VRF AC', count: 0, showButtons: false, acIcon: images.VRVac },
    {
      name: 'Ducted AC',
      count: 0,
      showButtons: false,
      acIcon: images.ductedAc,
    },
    { name: 'Tower AC', count: 0, showButtons: false, acIcon: images.towerAc },
  ]);

  const handleAddClick = index => {
    const updatedAcTypes = [...acTypes];
    updatedAcTypes[index].showButtons = true;
    setAcTypes(updatedAcTypes);
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

  // FAQ'S Toggle
  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.workcontainer}>
      <Header
        title="Installation"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.workscrollstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.worksliderview}>
          <Image source={images.bannerOne} style={styles.workimage} />
        </View>

        <Text style={styles.workheadText}>Select Type of AC</Text>

        {acTypes.map((ac, index) => (
          <View key={index} style={[styles.workitem,{flexDirection: 'row'}]}>
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
                  style={styles.workbutton} activeOpacity={2}
                  onPress={() => handleDecrement(index)}
                >
                  <Text style={styles.workbuttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.workcount}>{ac.count}</Text>
                <TouchableOpacity
                  style={styles.workbutton} activeOpacity={2}
                  onPress={() => handleIncrement(index)}
                >
                  <Text style={styles.workbuttonText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.workaddButton} activeOpacity={2}
                onPress={() => handleAddClick(index)}
              >
                <Text style={styles.workaddButtonText}>+ Add</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

{/* How it works? */}
        <View style={styles.workitem}>
          <Text style={styles.utititle}>How it works?</Text>
          <View style={styles.workContain}>
            <FlatList
              data={works}
              keyExtractor={(_, index) => `work-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.workoption}
                  onPress={item.action} activeOpacity={2}
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

        <View style={styles.worksliderview}>
          <Image source={images.bannerTwo} style={styles.workimage} />
        </View>

        <Text
          style={[
            styles.workheadText,
            { marginTop: heightPercentageToDP('1%') },
          ]}
        >
          FAQs
        </Text>

        {/* FAQ Items */}
        <>
          {faqData.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                onPress={() => toggleExpand(index)}
                style={styles.faquestionContainer} activeOpacity={2}
              >
                <Text style={styles.faquestionText}>{item.question}</Text>
                <Text style={styles.faqarrow}>
                  {expandedIndex === index ? '︿' : '﹀'}
                </Text>
              </TouchableOpacity>

              {expandedIndex === index && (
                <Text style={styles.faqanswerText}>{item.answer}</Text>
              )}
            </View>
          ))}
        </>

        <TouchableOpacity style={styles.worksliderview} activeOpacity={6}>
          <Image source={images.brands} style={styles.brandimage} />
        </TouchableOpacity>

        <View style={[styles.brandcont]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={images.helpdesk} style={styles.smallimage} />
            <Text style={styles.needHelp}> Need Help?</Text>
          </View>
          <Image source={images.chatIcon} style={styles.chaticon} />
        </View>
      </ScrollView>

      {/* Services and View Cart Section */}
      <View style={styles.servicesSection}>
        <View>
          <Text style={styles.servicesCount}>3 services</Text>
          <Text style={styles.selectedText}>Selected</Text>
        </View>
        <TouchableOpacity style={styles.viewCartButton}  activeOpacity={2} onPress={()=>navigation.navigate('ViewCart', { screenName: 'Sterilization AC' })}>
          <Text style={styles.viewCartText}>View Cart</Text>
          <Image source={images.cart} style={styles.carticon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InstallationScreen;
