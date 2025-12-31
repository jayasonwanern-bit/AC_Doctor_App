import { useFocusEffect } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';

const OnTopScreen = ({ children, ...props }) => {
  const userefresence = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      userefresence.current?.scrollTo({ y: 0 });
    }, []),
  );
  // render
  return (
    <ScrollView
      ref={userefresence}
      {...props}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

export default OnTopScreen;

const styles = StyleSheet.create({});
