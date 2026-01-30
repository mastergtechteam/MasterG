import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DrawerButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.openDrawer()}
    >
      <Text style={styles.text}>☰</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
