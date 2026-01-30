import { View, Text, StyleSheet } from 'react-native';
import DrawerButton from '../components/common/DrawerButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';
import AppText from '../components/common/AppText';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DrawerButton />
      {/* 
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {t('profile.title')}
      </Text> */}
      <AppText style={styles.title}>{t('profile.title')}</AppText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 40,
    color: 'blue',
  },
});
