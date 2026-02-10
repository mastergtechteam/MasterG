import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AppText from '../common/AppText';
import AppView from '../common/AppView';
import { colors } from '../../theme/colors';

const CategorieCard = ({ item }) => {
  const navigation = useNavigation();
  // console.log(item);

  return (
    <TouchableOpacity
      as={Pressable}
      style={styles.card}
      onPress={() => navigation.navigate('Products', { item })}
    >
      <ImageBackground
        source={item.image}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
          locations={[0.35, 1]}
          style={styles.gradient}
        />
        <AppText style={styles.title}>{item.title}</AppText>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategorieCard;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
  },

  card: {
    width: '48%',
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: colors.background,
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  imageRadius: {
    borderRadius: 18,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    padding: 12,
  },
});
