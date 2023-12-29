import Colors from '@/constants/Colors';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={[
            styles.titleText,
            {
              color: active === 0 ? '#000' : Colors.grey,
              textDecorationLine: active === 0 ? 'underline' : 'none',
            }
          ]}
        >Stays</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={[
            styles.titleText,
            {
              color: active === 1 ? '#000' : Colors.grey,
              textDecorationLine: active === 1 ? 'underline' : 'none',
            }
          ]}
        >Experiences</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginRight: 40,
  },
  titleText: {
    fontFamily: 'mon-sb',
    fontSize: 18,
  },
})

export default ModalHeaderText