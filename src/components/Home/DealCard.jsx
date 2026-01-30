import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../common/AppText';
import AppView from '../common/AppView';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DealCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <AppView style={styles.card}>
        {/* Image */}
        {/* <AppView style={styles.imageWrapper}> */}
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        {/* </AppView> */}

        {/* Text */}
        <AppText style={styles.title}>{item.title}</AppText>
        <AppText style={styles.subtitle}>{item.subtitle}</AppText>

        {/* CTA */}
        <View style={styles.ctaRow}>
          <AppText style={styles.ctaText}>View Items</AppText>
          <Ionicons name="chevron-forward" size={14} color="#22c55e" />
        </View>
      </AppView>
    </TouchableOpacity>
  );
};

export default DealCard;
const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: '#0f0f0f',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#163a22',
  },
  image: {
    width: '100%',
    height: 110, // ⬅️ controls visual size
    marginBottom: 12,
    borderRadius: 14,
    alignSelf: 'center',
    borderRadius: 12,
  },

  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },

  subtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 10,
  },

  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ctaText: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
});
