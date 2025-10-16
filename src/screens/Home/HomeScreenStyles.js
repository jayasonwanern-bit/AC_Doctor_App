// src/screens/HomeScreenStyles.js
import { Platform, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, Fonts } from '../../utils/colors';
import images from '../../assets/images';

export default StyleSheet.create({
  safeArea: { flex: 1},
  container: { flex: 1 },
  content: {},
  header: {
    paddingBottom: hp('1%'),
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('1%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationtitle: {
    fontSize: hp('1.5%'),
    color: COLORS.gray,
    fontFamily: Fonts.semiBold,
    marginLeft: wp('1.5%'),
  },
  locationIcon: {
    width: wp('5%'),
    height: hp('3%'),
    marginRight: wp('2%'),
    alignSelf: 'flex-start',
  },
  locationText: {
    fontSize: hp('1.5%'),
    color: COLORS.black,
    fontFamily: Fonts.medium,
  },
  wheatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp('5%'),
    borderWidth: 0.5,
    borderColor: COLORS.errorRed,
    marginRight: wp('2%'),
    padding: hp('0.5%'),
  },
  reqcontainer: {
    marginVertical: hp('1%'),
    backgroundColor: COLORS.white,
    padding: wp('2%'),
    borderRadius: wp('3%'),
    marginHorizontal: hp('1.5%'),
  },
  reqtitle: {
    fontSize: wp('3.5%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    marginBottom: hp('1%'),
    marginLeft: wp('2%'),
  },
  reqgrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  reqoption: {
    padding: wp('0%'),
    alignItems: 'center',
    marginVertical: hp('1%'),
    marginBottom: hp('0.5%'),
  },
  reqicon: {
    width: wp('14%'),
    height: wp('14%'),
    resizeMode: 'contain',
  },
  reqlabel: {
    fontSize: wp('2.8%'),
    color: COLORS.black,
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  uticontainer: {
    margin: hp('1%'),
    borderRadius: wp('3%'),
    padding: wp('1%'),
  },
  utigrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: hp('1.5%'),
  },
  utititle: {
    fontSize: wp('3.5%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
    marginLeft: wp('2%'),
  },
  utioption: {
    paddingVertical: wp('2%'),
    width: wp('19%'),
    borderRadius: wp('2%'),
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    marginRight: hp('0.8%'),
  },
  utiicon: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  utilabel: {
    fontSize: wp('2.8%'),
    color: COLORS.black,
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  authoption: {
    width: wp('33%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: hp('1%'),
  },
  authgrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: wp('2%'),
  },
  authicon: {
    width: wp('20%'),
    height: wp('8.5%'),
    resizeMode: 'contain',
  },
  arrowIcon: { width: wp('4.5%'), height: hp('2.5%') },
  serviceButton: {
    paddingVertical: hp('2.5%'),
    backgroundColor: COLORS.accent,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  serviceText: { fontSize: hp('1.8%'), color: COLORS.black, fontWeight: '600' },
  requestCodeContainer: {
    marginVertical: hp('2%'),
    padding: wp('3%'),
    borderRadius: 12,
  },
  requestCodeTitle: {
    fontSize: hp('2%'),
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: hp('1%'),
  },

  bookcard: {
    width: wp('28%'),
    padding: wp('0%'),
    alignItems: 'center',
    marginVertical: hp('1%'),
  },

  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: wp('2%'),
    marginBottom: hp('0.5%'),
    width: wp('50%'), // Adjusted for two-column layout in FlatList
    shadowColor: '#080808ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginHorizontal: wp('2%'),
    marginLeft: wp('3%'),
  },
  boderinercard: {
    backgroundColor: COLORS.white,
    borderRadius: wp('3%'),
    borderColor: COLORS.borderColor,
    borderWidth: wp('0.2%'),
    height: wp('25%'),
    marginVertical: hp('0.5%'),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountBadge: {
    backgroundColor: '#ffebeb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopLeftRadius: hp('1%'),
    borderBottomRightRadius: hp('1%'),
    marginTop: hp('-2%'),
    marginRight: wp('0.8%'),
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e74c3c',
  },
  image: {
    width: '50%',
    height: hp('15%'), // Adjusted height
    marginBottom: 8,
    alignSelf: 'center',
    resizeMode: 'center',
    position: 'absolute',
    top: hp('-1.5%'),
  },
  dealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  dealTag: {
    backgroundColor: '#f2f5f8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  dealText: {
    fontSize: wp('2.5%'),
    color: '#6ca6d6ff',
    fontFamily: Fonts.regular,
  },
  rating: {
    fontSize: hp('1.3%'),
    fontFamily: Fonts.medium,
    color: COLORS.black,
  },
  name: {
    fontSize: hp('1.3%'),
    fontFamily: Fonts.semiBold,
    color: '#222',
    marginBottom: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: hp('1.6%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.black,
  },
  mrp: {
    fontSize: hp('1.2%'),
    color: '#888',
  },
  addButton: {
    backgroundColor: COLORS.themeColor,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    width: wp('15%'),
  },
  addButtonText: {
    color: '#fff',
    fontFamily: Fonts.medium,
    textAlign: 'center',
    fontSize: hp('1.3%'),
  },
  likeButton: {
    width: wp('5.5%'),
    height: hp('2.5%'),
    resizeMode: 'center',
    margin: wp('1.5%'),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    justifyContent: 'space-between',
  },

  testacard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: wp('2%'),
    width: wp('70%'), // Adjusted for two-column layout in FlatList
    shadowColor: '#080808ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginRight: wp('3%'),
    marginLeft: wp('1%'),
  },
  testaquoteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  testaquote: {
    fontSize: wp('6%'),
    color: COLORS.gray,
  },
  testimonialText: {
    fontSize: wp('2.8%'),
    color: COLORS.black,
    fontFamily: Fonts.regular,
    marginBottom: hp('1%'),
    textAlign: 'left',
  },
  testaratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testarating: {
    fontSize: wp('3%'),
    fontFamily: Fonts.medium,
    color: COLORS.black, // Gold color for stars
  },
  testalocation: {
    fontSize: wp('3%'),
    color: COLORS.red, // Red color as per image
    fontFamily: Fonts.semiBold,
    marginBottom: hp('0.5%'),
    textAlign: 'left',
    alignSelf: 'flex-end',
  },
  testauthor: {
    fontSize: wp('3%'),
    color: COLORS.black,
    fontFamily: Fonts.medium,
    alignSelf: 'flex-end',
  },

  impcard: {
    width: wp('90%'),
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: wp('3.3%'),
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imptitle: {
    fontSize: wp('3.5%'),
    color: COLORS.red,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  impgrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  impstatCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: wp('40%'),
    alignItems: 'center',
    marginBottom: hp('1%'),
    borderRadius: wp('2%'),
    borderColor: COLORS.red,
    borderWidth: wp('0.2%'),
    padding: wp('1%'),
  },
  impicon: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
    marginBottom: hp('1%'),
  },
  impstatTitle: {
    fontSize: wp('2.6%'),
    color: COLORS.black,
    fontFamily: Fonts.medium,
    textAlign: 'left',
    marginBottom: hp('0.3%'),
  },
  impstatValue: {
    fontSize: wp('3%'),
    color: COLORS.black,
    fontFamily: Fonts.bold,
    textAlign: 'left',
  },

  borderSmall: {
    borderColor: COLORS.black,
    borderWidth: wp('0.2%'),
    alignSelf: 'center',
    marginVertical: hp('1%'),
    width: wp('23%'),
  },

  bannerStyle: {
    width: wp('90%'),
    height: hp('15%'),
    borderRadius: 12,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginVertical: hp('2%'),
  },

  sercard: {
    width: wp('90%'),
    marginBottom: hp('5%'),
    alignSelf: 'center',
  },
  sertitle: {
    fontSize: wp('3.5%'),
    color: COLORS.red,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  sergrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serstatCard: {
    alignSelf: 'center',
    width: wp('20%'),
    alignItems: 'center',
    marginBottom: hp('1%'),
    padding: wp('1%'),
  },
  sericon: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
    // marginBottom: hp('1%'),
  },
  serstatTitle: {
    fontSize: wp('3%'),
    color: COLORS.black,
    fontFamily: Fonts.medium,
    textAlign: 'center',
    marginBottom: hp('0.3%'),
  },

  footer: {
    paddingVertical: hp('2%'),
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  footerText: { fontSize: hp('1.5%'), color: COLORS.black },

  // sterilization styles
  workContain:{
  alignSelf:'flex-start',height: hp('14%'),
  },
  workoption: {
    marginVertical: hp('1%'),
    paddingBottom: wp('1.5%'),
    width: wp('18%'),
    borderRadius: wp('2%'),
    backgroundColor: COLORS.black,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    marginRight: hp('1.8%'),
  },
  workicon: {
    width: wp('18%'),
    height: wp('19%'),
    resizeMode: 'contain',
    borderTopLeftRadius: wp('2%'),
    borderTopRightRadius: wp('2%'),
  },
  workcontainer: { flex: 1,backgroundColor:'#fafafaff' },
  worksliderview: {
    marginVertical: hp('0.5%'),
    width: wp('100%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workimage: {
    width: '94%',
    height: hp('18%'),
    resizeMode: 'contain',
    borderRadius: 15,
  },
  workscrollstyle: { flex: 1, paddingHorizontal: wp('3%') },
  workheadText: {
    fontSize: wp('3.5%'),
    fontFamily: Fonts.semiBold,
    marginBottom: hp('1%'),
  },
  workitem: {
    justifyContent: 'space-between',
    padding: hp('1%'),
    backgroundColor: '#fff',
    marginBottom: hp('1.5%'),
    borderRadius: 10,
  },
  worktext: {
    fontSize: hp('1.6%'),
    color: COLORS.black,
    fontFamily: Fonts.medium,
  },
  workacIconstyle: {
    width: wp('7%'),
    height: hp('5%'),
    marginRight: wp('3.5%'),
    resizeMode: 'contain',
  },
  workbuttonContainer: { flexDirection: 'row', alignItems: 'center' },
  workbutton: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: wp('7.3%'),
    height: hp('3.5%'),
    alignSelf:'center'
  },
  workbuttonText: {
    fontSize: wp('5%'),
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: Fonts.medium,
    marginBottom:hp('1%'),
  },
  workcount: {
    fontSize: wp('3.5%'),
    marginHorizontal: 4,
    color: COLORS.themeColor,
    textAlign: 'center',
  },
  workaddButton: {
    borderColor: COLORS.darkGray,
    borderWidth: wp('0.3%'),
    borderRadius: wp('7%'),
    width: wp('18%'),
    height: hp('3.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  workaddButtonText: {
    fontSize: wp('3%'),
    color: COLORS.black,
    fontFamily: Fonts.medium,
  },

  // FAQ STYLE
  faqItem: {
    marginTop: wp('1%'),
    backgroundColor: COLORS.white,
    borderRadius: wp('3%'),
    marginBottom: hp('0.6%'),
    overflow: 'hidden', // To clip content within border radius
  },
  faquestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  faquestionText: {
    fontSize: wp('3.3%'),
    color: COLORS.black,
    fontFamily: Fonts.semiBold,
    marginVertical: wp('2%'),
  },
  faqarrow: {
    alignSelf: 'center',
    fontSize: 16,
    color: COLORS.darkText,
  },
  faqanswerText: {
    fontSize: wp('3%'),
    color: COLORS.textHeading,
    fontFamily: Fonts.medium,
    paddingHorizontal: wp('3%'),
    paddingBottom: wp('3%'),
    lineHeight: 20,
  },
  brandimage: {
    width: wp('94%'),
    height: hp('7%'),
    resizeMode: 'contain',
  },
  smallimage: {
    width: wp('10%'),
    height: hp('6%'),
    resizeMode: 'contain',
  },
  brandcont: {
    backgroundColor: COLORS.white,
    borderRadius: wp('3%'),
    marginBottom: hp('15%'),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    justifyContent: 'space-between',
  },
  needHelp:{
    fontSize: wp('3.7%'),
    color: COLORS.textHeading,
    fontFamily: Fonts.semiBold,
    marginLeft:wp('4%')
  },
  chaticon:{
    width: wp('20%'),
    height: hp('4.5%'),
    resizeMode: 'contain',
  },
  servicesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:hp('2.5%'),
    paddingVertical:hp('2%'),
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  servicesCount: {
    fontSize: wp('3.5%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.darkText,
  },
  selectedText: {
    fontSize: wp('3%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.darkText,
    opacity: 0.7,
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('0%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: COLORS.themeColor,
    borderRadius: wp(10),
  },
  viewCartText: {
    fontSize: wp('3%'),
    fontFamily: Fonts.semiBold,
    color: COLORS.white,
    marginRight: 4,
  },

  carticon:{
    width: wp('5%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  // Btn View
    BtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: hp('2.5%'),
    paddingVertical: hp('2%'),
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export const productData = [
  {
    id: '1',
    name: 'Godrej 1.5 Ton 3 Star Inverter Split AC',
    price: '₹41,990',
    mrp: '₹65,990',
    discount: '36% off',
    rating: '4.3',
    reviews: 'Limited time deal',
    image: images.demoAc, // Adjust path
  },
  {
    id: '2',
    name: 'LG 1.5 Ton 5 Star AI Dual Inverter Split AC',
    price: '₹47,490',
    mrp: '₹72,990',
    discount: '35% off',
    rating: '4.5',
    reviews: 'Limited time deal',
    image: images.demoAc, // Adjust path
  },
  {
    id: '3',
    name: 'Daikin 1 Ton 3 Star Inverter Split AC',
    price: '₹32,999',
    mrp: '₹50,000',
    discount: '34% off',
    rating: '4.2',
    reviews: 'Limited time deal',
    image: images.demoAc, // Adjust path
  },
  {
    id: '4',
    name: 'Hitachi 1.5 Ton 5 Star Inverter Split AC',
    price: '₹48,499',
    mrp: '₹75,000',
    discount: '35% off',
    rating: '4.4',
    reviews: 'Limited time deal',
    image: images.demoAc, // Adjust path
  },
  {
    id: '5',
    name: 'Samsung 1 Ton 3 Star Inverter Split AC',
    price: '₹30,990',
    mrp: '₹46,990',
    discount: '34% off',
    rating: '4.1',
    reviews: 'Limited time deal',
    image: images.demoAc, // Adjust path
  },
];

export const testimonialData = [
  {
    id: '1',
    text: 'It has been a great pleasure working with AC Doctor. The know-how of their technical team is way beyond perfection and quality. We wish them all the very best for the future.',
    rating: '4.7',
    location: 'Mahidpurwala, Indore',
    author: 'Adnan Raja (Director)',
  },
  {
    id: '2',
    text: 'Excellent service by AC Doctor! Their team is highly skilled and professional. Highly recommend them!',
    rating: '4.6',
    location: 'Vijay Nagar, Indore',
    author: 'Priya Sharma (Manager)',
  },
  {
    id: '3',
    text: 'Amazing experience with AC Doctor. Quick response and top-notch quality work!',
    rating: '4.8',
    location: 'Scheme No. 54, Indore',
    author: 'Rakesh Patel (Owner)',
  },
  {
    id: '4',
    text: 'The best AC service I’ve ever had. Their team is knowledgeable and efficient.',
    rating: '4.5',
    location: 'South Tukoganj, Indore',
    author: 'Sunil Mehta (Engineer)',
  },
  {
    id: '5',
    text: 'AC Doctor exceeded my expectations with their service and expertise. Great job!',
    rating: '4.7',
    location: 'Bhawarkua, Indore',
    author: 'Anita Desai (Customer)',
  },
];

export const works = [
  {
    id: '1',
    text: 'Ac repair',
    icon: images.demoImgOne,
  },
  {
    id: '2',
    text: 'SplSplit AC',
    icon: images.demoImgTwo,
  },
  {
    id: '3',
    text: 'Window AC',
    icon: images.demoImgthree,
  },
  {
    id: '4',
    text: 'Ac repair',
    icon: images.demoImg,
  },
  {
    id: '5',
    text: 'Ducted AC',
    icon: images.demoImgOne,
  },
];

// Data arrays passed as props
export const keyBenefitsData = [
  {
    title: 'Enhanced Cooling Efficiency',
    desc: 'Ensures optimal performance, reducing cooling time and electricity consumption.',
  },
  {
    title: 'Extended AC Lifespan',
    desc: 'Regular maintenance prevents breakdowns and prolongs the life of your AC unit.',
  },
  {
    title: 'Improved Air Quality',
    desc: 'Removes dirt, dust, and bacteria buildup, ensuring cleaner and healthier air circulation.',
  },
  {
    title: 'Prevents Costly Repairs',
    desc: 'Early detection of issues helps avoid major repair costs in the future.',
  },
  {
    title: 'Consistent Performance',
    desc: 'Keeps the AC running smoothly, avoiding sudden failures during peak summer months.',
  },
];

export const serviceInclusionsData = [
  {
    title: 'Service Inclusions',
    items: [
      'Thorough inspection and diagnosis of the compressor.',
      'Refrigerant level check and top-up (additional cost if required).',
      'Lubrication of moving parts for smooth operation.',
      'Testing for gas leaks and fixing minor leaks if found.',
      'Cleaning of compressor components to remove dust and debris.',
    ],
  },
  {
    title: 'Service Exclusions',
    items: [
      'Major repairs or part replacements are not included in basic service.',
      'Gas refilling is chargeable if needed.',
    ],
  },
];

export const termsConditionsData = [
  {
    text: "Service time may vary based on the AC's condition and number of units.",
  },
  {
    text: 'If additional repairs are required, a separate quotation will be provided.',
  },
  { text: 'Warranty on service is valid for 15 days post-servicing.' },
  {
    text: 'Customers must ensure accessibility to the AC unit before service begins.',
  },
  {
    text: 'Service is canceled after booking, a nominal cancellation charge may apply.',
  },
];

export const faqData = [
  {
    question: 'Why is my AC not cooling properly?',
    answer:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'How often should I service my AC?',
    answer:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'How often should I service my AC?',
    answer:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

