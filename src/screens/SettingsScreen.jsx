import { View, Text, StyleSheet } from 'react-native';
import DrawerButton from '../components/common/DrawerButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <DrawerButton />

      <Text style={styles.title}>Settings Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
  },
});
