import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tobaccoBanner from '../../assets/images/masterg lit.png';
import { spacing } from '../../theme/spacing';

const PanCornerBanner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image
        source={tobaccoBanner}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );
};

export default PanCornerBanner;

const styles = StyleSheet.create({
  bannerContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },

  bannerImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
});
