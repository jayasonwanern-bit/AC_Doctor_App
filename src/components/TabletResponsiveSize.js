import { Dimensions, Platform } from "react-native";

const { width } = Dimensions.get('window');

export const isTablet = Platform.OS === 'ios' && width >= 768;