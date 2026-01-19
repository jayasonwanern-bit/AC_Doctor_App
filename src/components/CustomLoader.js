import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const CustomLoader = ({ size = 50, color = '#207cccff', style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomLoader;
