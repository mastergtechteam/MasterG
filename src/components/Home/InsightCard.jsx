import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../common/AppText';
import AppView from '../common/AppView';
import AppButton from '../common/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InsightCard = () => {
  return (
    <LinearGradient
      colors={['#3a2f00', '#0f0f0f']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="trending-up" size={18} color="#facc15" />
        </View>

        <View>
          <Text style={styles.label}>Your Insights</Text>
          <Text style={styles.title}>Smart Suggestion</Text>
        </View>
      </View>

      <Text style={styles.description}>
        You usually reorder snacks every 5 days
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>🛒 8 Items</Text>
        <Text style={styles.meta}>⏱ Last order: 4 days ago</Text>
      </View>

      <AppButton title="Reorder Now" style={styles.button} onPress={() => {}} />
    </LinearGradient>
  );
};

export default InsightCard;
const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 18,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(250,204,21,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  label: {
    color: '#facc15',
    fontSize: 12,
    fontWeight: '600',
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  description: {
    color: '#d1d5db',
    fontSize: 13,
    marginBottom: 8,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  meta: {
    fontSize: 12,
    color: '#9ca3af',
  },

  button: {
    backgroundColor: '#c2410c',
    borderRadius: 12,
  },
});
