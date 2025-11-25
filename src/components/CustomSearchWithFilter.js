// SearchWithFilter.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../assets/images';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/colors';

const CustomSearchWithFilter = ({ initialData,onProductPress }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);


  // Filters
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [freeDelivery, setFreeDelivery] = useState(false);

  // Last search
  const [lastSearch, setLastSearch] = useState('');

  // Apply Filters
  useEffect(() => {
     setLoading(true); // show loader
    let filtered = [...initialData];

    // Search by name
    if (searchText) {
      filtered = filtered
        .filter(item =>
          item.title.toLowerCase().includes(searchText.toLowerCase()),
        )
        .sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
        );
    }

    // Rating filter
    if (selectedRating) {
      filtered = filtered.filter(
        item => Math.floor(item.rating) === selectedRating,
      );
    }

    // Price range
    filtered = filtered.filter(
      item => item.price >= priceRange[0] && item.price <= priceRange[1],
    );

    // Free delivery
    if (freeDelivery) {
      filtered = filtered.filter(item => item.freeDelivery);
    }

    setFilteredData(filtered);
    setLastSearch(searchText);
    setLoading(false);
  }, [searchText, selectedRating, priceRange, freeDelivery, initialData]);

  const clearFilters = () => {
    setSearchText('');
    setSelectedRating(null);
    setPriceRange([0, 100000]);
    setFreeDelivery(false);
  };

  // Star Rating Component
  const StarRating = ({ rating }) => {
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <Text
            key={i}
            style={
              i < Math.floor(rating) ? styles.starFilled : styles.starEmpty
            }
          >
            {i < Math.floor(rating) ? '★' : '☆'}
          </Text>
        ))}
      </View>
    );
  };


  const FilterTag = ({ label, onRemove }) => (
    <View style={styles.filterTag}>
      <Text style={styles.filterTagText}>{label}</Text>
      <TouchableOpacity onPress={onRemove}>
        <Text style={styles.removeTag}>x</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <FastImage source={images.searchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={COLORS.textColor}
        />
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <FastImage source={images.filterImg} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {/* Active Filters */}
      {(searchText ||
        selectedRating ||
        freeDelivery ||
        priceRange[1] < 100000) && (
        <View style={styles.activeFilters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {searchText && (
              <FilterTag
                label={`"${searchText}"`}
                onRemove={() => setSearchText('')}
              />
            )}
            {selectedRating && (
              <FilterTag
                label={`${selectedRating} Star`}
                onRemove={() => setSelectedRating(null)}
              />
            )}
            {freeDelivery && (
              <FilterTag
                label="Free Delivery"
                onRemove={() => setFreeDelivery(false)}
              />
            )}
            {priceRange[1] < 100000 && (
              <FilterTag
                label={`₹${priceRange[0]} - ₹${priceRange[1]}`}
                onRemove={() => setPriceRange([0, 100000])}
              />
            )}
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearAll}>Clear All</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Filter Modal */}
      {showFilters && (
        <View style={styles.filterModal}>
          <Text style={styles.filterTitle}>Filters</Text>

          {/* Rating */}
          <Text style={styles.filterLabel}>Rating</Text>
          <View style={styles.ratingRow}>
            {[4, 3, 2, 1].map(rating => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.ratingBtn,
                  selectedRating === rating && styles.ratingBtnActive,
                ]}
                onPress={() =>
                  setSelectedRating(selectedRating === rating ? null : rating)
                }
              >
                <Text style={styles.ratingText}>{rating} Star</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Range */}
          <Text style={styles.filterLabel}>Price Range</Text>
          <View style={styles.priceRow}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min"
              keyboardType="numeric"
              value={priceRange[0].toString()}
              onChangeText={text => setPriceRange([+text || 0, priceRange[1]])}
            />
            <Text style={styles.toText}>to</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Max"
              keyboardType="numeric"
              value={priceRange[1].toString()}
              onChangeText={text =>
                setPriceRange([priceRange[0], +text || 100000])
              }
            />
          </View>

          {/* Free Delivery */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setFreeDelivery(!freeDelivery)}
          >
            <View
              style={[styles.checkbox, freeDelivery && styles.checkboxActive]}
            />
            <Text style={styles.checkboxLabel}>Free Delivery Only</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Last Search */}
      {lastSearch && !searchText && (
        <Text style={styles.lastSearch}>
          Last searched: "
          <Text style={{ fontWeight: 'bold' }}>{lastSearch}</Text>"
        </Text>
      )}

      {/* Product List */}
     {loading ? (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color={COLORS.themeColor} />
  </View>
) :(<FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 17 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => onProductPress(item)}>
            <FastImage source={{ uri: item.image }} style={styles.productImg} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.ratingRow}>
                <StarRating rating={item.rating} />
                <Text style={[styles.reviewCount, { marginTop:-5 }]}>({item.reviews})</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
                <Text
                  style={[
                    styles.reviewCount,
                    {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    },
                  ]}
                >
                  ({item.originalPrice})
                </Text>
                <Text style={[styles.freeDelivery, { marginTop: 0 }]}>
                  {'  '}
                  {item.discount}
                </Text>
              </View>
              {item.freeDelivery && (
                <Text style={styles.freeDelivery}>Free Delivery</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No products found</Text>}
      />)}
    </View>
  );
};
export default CustomSearchWithFilter;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 2,
  },
  searchIcon: { width: 20, height: 20, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 12 },
  filterIcon: { width: 24, height: 24 },

  activeFilters: { paddingHorizontal: 16, marginBottom: 8 },
  filterTag: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
  },
  filterTagText: { fontSize: 14, color: '#1976d2' },
  removeTag: { marginLeft: 8, fontWeight: 'bold', color: '#1976d2' },
  clearAll: { color: '#d32f2f', fontWeight: '600', marginLeft: 8 ,marginTop:6},

  filterModal: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 5,
  },
  filterTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  filterLabel: { fontSize: 16, marginBottom: 8, fontWeight: '600',color: '#666', },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starFilled: {
    color: '#FFD700',
    fontSize: 14,
  },
  starEmpty: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  ratingBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,marginBottom: 12 
  },
  ratingBtnActive: { borderWidth:1,  borderColor: '#1976d2' },
  ratingText: { color: '#666', fontSize: 14 },
  // active: white

  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    width: wp('30%'),
    textAlign: 'center',
  },
  toText: { marginHorizontal: 8, fontSize: 16 },

  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 8,
  },
  checkboxActive: {  borderWidth:3, borderColor: '#1976d2' },
  checkboxLabel: { fontSize: 16 },

  applyBtn: {
    backgroundColor: '#1976d2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: { color: '#fff', fontWeight: 'bold' },

  lastSearch: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  productImg: {
    width: 100,
    height: 108,
    marginLeft: 6,
    alignSelf: 'center',
    borderRadius: 8,
  },
  productInfo: { flex: 1, padding: 12 },
  productTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  star: { color: '#FFD700', fontSize: 14 },
  starEmpty: { color: '#E0E0E0', fontSize: 14 },
  reviewCount: { fontSize: 12, color: '#666', marginLeft: 4 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#000', marginTop: 4 },
  freeDelivery: { color: '#00A650', fontSize: 12, marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
});
