import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

export const getSelectedAddress = () => {
  const selected = storage.getString('selectedAddress');
  return selected ? JSON.parse(selected) : null;
};

// Add more functions if needed, like saveAddress
export const setSelectedAddress = (address) => {
  storage.set('selectedAddress', JSON.stringify(address));
};