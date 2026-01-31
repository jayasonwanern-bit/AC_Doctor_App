import AsyncStorage from '@react-native-async-storage/async-storage';

const SELECTED_ADDRESS_KEY = 'selectedAddress';

export const getSelectedAddress = async () => {
  try {
    const selected = await AsyncStorage.getItem(SELECTED_ADDRESS_KEY);
    return selected ? JSON.parse(selected) : null;
  } catch (error) {
    console.log('Error getting selected address:', error);
    return null;
  }
};

export const setSelectedAddress = async (address) => {
  try {
    await AsyncStorage.setItem(
      SELECTED_ADDRESS_KEY,
      JSON.stringify(address)
    );
  } catch (error) {
    console.log('Error saving selected address:', error);
  }
};