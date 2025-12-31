import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Use smaller side to avoid landscape issue
const shortSide = Math.min(width, height);

export const isTablet = shortSide >= 600;
