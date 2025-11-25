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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import Header from '../../components/Header';
import ContentSection from '../../customScreen/ContentSection';
import HomeScreenStyles, {
  works,
  keyBenefitsData,
  serviceInclusionsData,
  termsConditionsData,
  faqData,
} from './HomeScreenStyles';
import CustomButton from '../../components/CustomButton';

const CommericalAc = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('Key Benefits');
  const [isExpanded, setIsExpanded] = useState({});
  const [acTypes, setAcTypes] = useState([
    {
      name: 'Ducted AC',
      count: { repair: 0, installation: 0, service: 0 },
      showButtons: false,
      acIcon: images.ducted,
      totalCount: 0,
    },
    {
      name: 'VRV/VRF AC',
      count: { repair: 0, installation: 0, service: 0 },
      showButtons: false,
      acIcon: images.VRVac,
      totalCount: 0,
    },
    {
      name: 'Tower AC',
      count: { repair: 0, installation: 0, service: 0 },
      showButtons: false,
      acIcon: images.towerAc,
      totalCount: 0,
    },
  ]);

  const toggleExpandAC = index => {
    setIsExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleIncrement = (index, type) => {
    setAcTypes(prevAcTypes =>
      prevAcTypes.map((ac, i) => {
        if (i !== index) return ac;

        const newCount = { ...ac.count, [type]: ac.count[type] + 1 };
        const newTotal =
          newCount.repair + newCount.installation + newCount.service;

        return {
          ...ac,
          count: newCount,
          totalCount: newTotal,
          showButtons: newTotal > 0,
        };
      }),
    );
  };

  const handleDecrement = (index, type) => {
    setAcTypes(prevAcTypes =>
      prevAcTypes.map((ac, i) => {
        if (i !== index) return ac;

        const newCount = {
          ...ac.count,
          [type]: Math.max(0, ac.count[type] - 1),
        };
        const newTotal =
          newCount.repair + newCount.installation + newCount.service;

        return {
          ...ac,
          count: newCount,
          totalCount: newTotal,
          showButtons: newTotal > 0,
        };
      }),
    );
  };
  // FAQ'S Toggle
  const toggleExpandFaq = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderCounter = (value, onIncrement, onDecrement) => {
    return value > 0 ? (
      <View style={styles.counter}>
        <TouchableOpacity style={styles.counterButton} onPress={onDecrement}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value}</Text>{' '}
        {/* ← Fixed: was `count` */}
        <TouchableOpacity style={styles.counterButton} onPress={onIncrement}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity onPress={onIncrement}>
        <Text style={styles.addText}>+ Add</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={HomeScreenStyles.workcontainer}>
      <Header
        title="Commerical Ac"
        onBack={() => navigation.goBack()}
        // onHelp={() => alert('Help for Home')}
      />

      <ScrollView
        style={HomeScreenStyles.workscrollstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={HomeScreenStyles.worksliderview}>
          <Image source={images.bannerOne} style={HomeScreenStyles.workimage} />
        </View>

        <Text style={HomeScreenStyles.workheadText}>Select Type of AC</Text>

        {acTypes.map((ac, index) => (
          <View key={index} style={HomeScreenStyles.card}>
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggleExpandAC(index)}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => toggleExpandAC(index)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FastImage
                    source={ac.acIcon}
                    style={styles.workacIconstyle}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={[styles.title, { marginLeft: wp(3) }]}>
                    {ac.name}
                  </Text>

                  {ac.showButtons ? (
                    <View style={HomeScreenStyles.workbuttonContainer}>
                      <TouchableOpacity
                        style={HomeScreenStyles.workbutton}
                        onPress={() => {
                          const activeType =
                            ac.count.repair > 0
                              ? 'repair'
                              : ac.count.installation > 0
                              ? 'installation'
                              : ac.count.service > 0
                              ? 'service'
                              : 'repair';
                          handleDecrement(index, activeType);
                        }}
                      >
                        <Text style={HomeScreenStyles.workbuttonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={HomeScreenStyles.workcount}>{ac.totalCount}</Text>
                      <TouchableOpacity
                        style={HomeScreenStyles.workbutton}
                        onPress={() => handleIncrement(index, 'repair')}
                      >
                        <Text style={styles.workbuttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => handleIncrement(index, 'repair')}
                    >
                      <Text style={styles.addText}>+ Add</Text>
                    </TouchableOpacity>
                  )}
                </View>

              </TouchableOpacity>
              {isExpanded[index] && (
                <View style={styles.subOptions}>
                  <View style={styles.subOption}>
                    <Text style={styles.subText}>Repair</Text>
                    {renderCounter(
                      ac.count.repair,
                      () => handleIncrement(index, 'repair'),
                      () => handleDecrement(index, 'repair'),
                    )}
                  </View>
                  <View style={styles.subOption}>
                    <Text style={styles.subText}>Installation</Text>
                    {renderCounter(
                      ac.count.installation,
                      () => handleIncrement(index, 'installation'),
                      () => handleDecrement(index, 'installation'),
                    )}
                  </View>
                  <View style={styles.subOption}>
                    <Text style={styles.subText}>Service</Text>
                    {renderCounter(
                      ac.count.service,
                      () => handleIncrement(index, 'service'),
                      () => handleDecrement(index, 'service'),
                    )}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}

        {/* How it works? */}
        <View style={HomeScreenStyles.workitem}>
          <Text style={HomeScreenStyles.utititle}>How it works?</Text>
          <View style={HomeScreenStyles.workContain}>
            <FlatList
              data={works}
              keyExtractor={(_, index) => `work-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={HomeScreenStyles.workoption}
                  onPress={item.action}
                >
                  <FastImage
                    source={item.icon}
                    style={HomeScreenStyles.workicon}
                  />
                  <Text
                    style={[HomeScreenStyles.utilabel, { color: COLORS.white }]}
                  >
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

        <View style={HomeScreenStyles.worksliderview}>
          <Image source={images.bannerTwo} style={HomeScreenStyles.workimage} />
        </View>

        <Text style={[HomeScreenStyles.workheadText, { marginTop: hp('1%') }]}>
          FAQs
        </Text>

        {/* FAQ Items */}
        <>
          {faqData.map((item, index) => (
            <View key={index} style={HomeScreenStyles.faqItem}>
              <TouchableOpacity
                onPress={() => toggleExpandFaq(index)}
                style={HomeScreenStyles.faquestionContainer}
              >
                <Text style={HomeScreenStyles.faquestionText}>
                  {item.question}
                </Text>
                <Text style={HomeScreenStyles.faqarrow}>
                  {expandedIndex === index ? '︿' : '﹀'}
                </Text>
              </TouchableOpacity>

              {expandedIndex === index && (
                <Text style={HomeScreenStyles.faqanswerText}>
                  {item.answer}
                </Text>
              )}
            </View>
          ))}
        </>

        <TouchableOpacity
          style={HomeScreenStyles.worksliderview}
          activeOpacity={6}
        >
          <Image source={images.brands} style={HomeScreenStyles.brandimage} />
        </TouchableOpacity>

        <View style={[HomeScreenStyles.brandcont]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={images.helpdesk}
              style={HomeScreenStyles.smallimage}
            />
            <Text style={HomeScreenStyles.needHelp}> Need Help?</Text>
          </View>
          <Image source={images.chatIcon} style={HomeScreenStyles.chaticon} />
        </View>
      </ScrollView>

      {/* Services and View Cart Section */}
      <View style={HomeScreenStyles.servicesSection}>
        <CustomButton
          buttonName="View Cart"
          margingTOP={hp('0%')}
          btnTextColor={COLORS.white}
          btnColor={COLORS.themeColor}
          onPress={() =>
            navigation.navigate('ViewCart', { screenName: 'Commerical AC' })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#751a1aff',
    borderRadius: 8,
    marginBottom: hp('1%'),
    elevation: 2,
  },
  header: {
    paddingVertical: wp('2%'),
    paddingHorizontal: hp(1),
    backgroundColor: COLORS.white,
    borderRadius: hp(1),
    marginBottom: hp(1),
  },
  icon: {
    width: wp('10%'),
    height: wp('10%'),
    marginRight: wp('3%'),
    alignItems: 'center',
    resizeMode: 'contain',
  },
  workacIconstyle: { width: wp('10%'), height: wp('10%') },
  title: {
    flex: 1,
    fontSize: wp('3.5%'),
    color: COLORS.black,
    fontFamily: Fonts.semiBold,
  },
  addButton: {
    borderColor: '#bcc4c6ff',
    borderWidth: wp(0.3),
    padding: wp('2%'),
    paddingHorizontal: hp('2%'),
    borderRadius: hp(2),
  },
  addText: { color: '#34495E', fontSize: wp('3%') },
  subOptions: { padding: wp('1%') },
  subOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
  },
  subText: { fontSize: wp('3%'), color: '#34495E' },
  counter: { flexDirection: 'row', alignItems: 'center' },
  counterButton: {
    width: wp('7%'),
    height: wp('7%'),
    backgroundColor: '#ECF0F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  counterText: { fontSize: wp('4%'), color: '#34495E' },
  counterValue: {
    fontSize: wp('4%'),
    color: '#34495E',
    marginHorizontal: wp('2%'),
  },
  // Add other styles as needed from HomeScreenStyles.js
});

export default CommericalAc;
