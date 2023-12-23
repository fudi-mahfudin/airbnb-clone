import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  console.log("🚀 ~ file: [id].tsx:7 ~ Page ~ id:", id)

  return (
    <View>
      <Text>Listing 1337</Text>
    </View>
  )
}

export default Page