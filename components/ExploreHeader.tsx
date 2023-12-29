import { useRef, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'

const categories = [
  {
    name: 'House',
    icon: 'home',
  },
  {
    name: 'Condominium',
    icon: 'foundation',
  },
  {
    name: 'Bed & Breakfast',
    icon: 'hotel',
  },
  {
    name: 'Apartment',
    icon: 'apartment',
  },
  {
    name: 'Loft',
    icon: 'location-city',
  },
  {
    name: 'Townhouse',
    icon: 'house',
  },
  {
    name: 'Cabin',
    icon: 'house-siding',
  },
  {
    name: 'Bungalow',
    icon: 'landscape',
  },
  {
    name: 'Vacation home',
    icon: 'deck',
  },
];

interface Props {
  onCategoryChanged: (category: string) => void
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x -16, y: 0, animated: true });
    })

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name)
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 40}}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name='search' size={24} />
              <View>
                <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                <Text style={{ fontFamily: 'mon', color: Colors.grey }}>Anywhere · Any week</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 30,
            paddingHorizontal: 16,
          }}
        >
          { categories.map((item, index) => {
            const isActiveItem = activeIndex === index;
            return (
              <TouchableOpacity
                onPress={() => selectCategory(index)}
                key={index}
                ref={(el) => itemsRef.current[index] = el}
                style={isActiveItem ? styles.categoriesBtnActive : styles.categoriesBtn}
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={24}
                  color={isActiveItem ? '#000' : Colors.grey}
                />
                <Text style={isActiveItem ? styles.categoryTextActive : styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 130,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: '#c2c2c2',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    padding: 14,
    borderRadius: 30,
    backgroundColor: '#FFF',

    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
})

export default ExploreHeader