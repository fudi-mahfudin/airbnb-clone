import { View } from 'react-native';
import { Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import ExploreHeader from '@/components/ExploreHeader';
import listingsData from '@/assets/data/airbnb-listings.json';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import { Listing } from '@/interfaces/listing';
import { ListingGeo } from '@/interfaces/listingGeo';

const Page = () => {
  const [category, setCategory] = useState('House');
  const items = useMemo(() => listingsData as any, []);
  const geoItems = useMemo(() => listingsDataGeo as any, []);
  const [filteredItems, setFilteredItems] = useState(items);
  const [filteredGeoItems, setFilteredGeoItems] = useState(geoItems);

  useEffect(() => {
    const newItems = items.filter((item: Listing) => item.property_type == category)
    setFilteredItems(newItems);
    const newGeoItems = {
      ...geoItems,
      features: geoItems.features.filter((item: ListingGeo) => item.properties.property_type == category)
    }
    setFilteredGeoItems(newGeoItems);

  }, [category])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View style={{ flex: 1, marginTop: 120 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
        }}
      />
      <ListingsMap listings={filteredGeoItems} />
      <ListingsBottomSheet listings={filteredItems} category={category} />
    </View>
  )
}

export default Page