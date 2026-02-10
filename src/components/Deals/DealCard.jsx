import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AppText from '../common/AppText';
import AppView from '../common/AppView';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const DealCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Products')}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.image}
          imageStyle={styles.imageRadius}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            locations={[0.5, 1]}
            style={styles.gradient}
          />

          {/* Discount Badge */}
          <View style={styles.discountBadge}>
            <AppText style={styles.discountText}>{item.discount}%</AppText>
            <AppText style={styles.discountLabel}>OFF</AppText>
          </View>

          {/* Deal Type Badge */}
          <View style={styles.dealBadge}>
            <AppText style={styles.dealBadgeText}>{item.badge}</AppText>
          </View>
        </ImageBackground>
      </View>

      {/* Card Content */}
      <AppView style={styles.content}>
        <AppText style={styles.title} numberOfLines={2}>
          {item.title}
        </AppText>

        {/* Prices */}
        <AppView style={styles.priceContainer}>
          <AppText style={styles.originalPrice}>₹{item.originalPrice}</AppText>
          <AppText style={styles.dealPrice}>
            ₹{item.dealPrice.toFixed(0)}
          </AppText>
        </AppView>

        {/* Save Amount */}
        <AppView style={styles.saveContainer}>
          <AppText style={styles.saveText}>
            Save ₹{(item.originalPrice - item.dealPrice).toFixed(0)}
          </AppText>
        </AppView>
      </AppView>
    </TouchableOpacity>
  );
};

export default DealCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: spacing.md,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: 160,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.error,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  discountLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#fff',
    marginTop: 1,
  },
  dealBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: colors.primary + 'DD',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  dealBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    height: 32,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  originalPrice: {
    fontSize: 11,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    textDecorationColor: colors.textMuted,
  },
  dealPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  saveContainer: {
    backgroundColor: colors.success + '20',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
  },
  saveText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.success,
  },
});
