// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const { width } = Dimensions.get('window');
// import { colors } from '../../theme/colors';
// import LinearGradient from 'react-native-linear-gradient';
// import Loader from '../common/Loader';

// const BannerItem = ({ item, handleEnrollPress, handleDemo }) => {
//   return (
//     <ImageBackground
//       source={item.image}
//       style={styles.banner}
//       imageStyle={{ borderRadius: 5 }}
//     >
//       <LinearGradient
//         colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.48)', 'rgba(0,0,0,0.6)']}
//         locations={[0, 0.5243, 1]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//         style={StyleSheet.absoluteFill}
//       />
//       <View style={{ width: '55%', justifyContent: 'flex-end' }}>
//         <Text style={styles.title}>{item.heading}</Text>
//         <View style={{ flexDirection: 'row' }}>
//           <Text style={styles.subtitle}>{item.subtitle}</Text>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const BannerCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [deals, setDeals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const flatListRef = useRef(null);
//   const navigation = useNavigation();
//   useEffect(() => {
//     fetchBanners();
//   }, []);
//   const banners = [
//     {
//       id: '1',
//       heading: 'Pre-Book Before Price Rise',
//       subtitle: 'Oil prices increasing soon',
//       image: require('../../assets/images/store.jpg'),
//     },
//     {
//       id: '2',
//       heading: 'Smart Deals for Retailers',
//       subtitle: 'Best prices on bulk packs',
//       image: require('../../assets/images/store.jpg'),
//     },
//   ];

//   const fetchBanners = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${BASE_URL}/deals`,
//       );
//       const json = await response.json();
//       setDeals(json);
//       console.log(json, 'abc');
//     } catch {
//       console.error('Error fetching product:', error);
//     } finally {
//       setLoading(false);
//       // console.log('api request done');
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   const handleEnrollPress = () => {
//     navigation.navigate('EnrollScreen');
//   };
//   const handleDemo = () => {
//     navigation.navigate('DemoScreen');
//   };

//   const handleScroll = event => {
//     const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
//     setActiveIndex(slideIndex);
//   };

//   return (
//     <View style={{ alignItems: 'center' }}>
//       <FlatList
//         ref={flatListRef}
//         data={banners}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <BannerItem
//             item={item}
//             handleEnrollPress={handleEnrollPress}
//             handleDemo={handleDemo}
//           />
//         )}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//       />
//       <View style={styles.pagination}>
//         {banners.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.paginationDot,
//               {
//                 backgroundColor: index === activeIndex ? '#2D73F5' : '#E0E0E0',
//                 width: 20,
//               },
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// export default BannerCarousel;

// const styles = StyleSheet.create({
//   //   enrollButton: {
//   //     backgroundColor: colors.primary,
//   //     paddingVertical: 6,
//   //     paddingHorizontal: 12,
//   //     borderRadius: 8,
//   //     elevation: 2,
//   //     shadowColor: colors.primary,
//   //     shadowOffset: { width: 0, height: 1 },
//   //     shadowOpacity: 0.2,
//   //     shadowRadius: 1.5,
//   //     alignSelf: 'flex-start',
//   //     marginTop: 10,
//   //   },
//   //   demoButton: {
//   //     backgroundColor: colors.white,
//   //     paddingVertical: 6,
//   //     paddingHorizontal: 12,
//   //     borderRadius: 8,
//   //     elevation: 2,
//   //     shadowColor: colors.primary,
//   //     shadowOffset: { width: 0, height: 1 },
//   //     shadowOpacity: 0.2,
//   //     shadowRadius: 1.5,
//   //     alignSelf: 'flex-start',
//   //     marginTop: 10,
//   //     marginLeft: 10,
//   //   },
//   enrollText: {
//     color: colors.white,
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   demoText: {
//     color: colors.primary,
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   banner: {
//     height: 165,
//     alignSelf: 'flex-start',
//     flexDirection: 'row',
//     borderRadius: 5,
//     padding: 10,
//     overflow: 'hidden',
//     width: width * 0.9,
//     marginHorizontal: 8,
//     marginBottom: 10,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     color: '#fff',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   pagination: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   paginationDot: {
//     height: 6,
//     borderRadius: 4,
//     marginHorizontal: 2,
//   },
// });

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');
import { colors } from '../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../common/Loader';
import { BASE_URL } from '../../api/apiClient';

const BannerItem = ({ item, handleEnrollPress, handleDemo }) => {
  return (
    <ImageBackground
      source={item.image}
      style={styles.banner}
      imageStyle={{ borderRadius: 5 }}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.48)', 'rgba(0,0,0,0.6)']}
        locations={[0, 0.5243, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ width: '55%', justifyContent: 'flex-end' }}>
        <Text style={styles.title}>{item.heading}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const BannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  useEffect(() => {
    fetchBanners();
  }, []);
  // const banners = [
  //   {
  //     id: '1',
  //     heading: 'Pre-Book Before Price Rise',
  //     subtitle: 'Oil prices increasing soon',
  //     image: require('../../assets/images/store.jpg'),
  //   },
  //   {
  //     id: '2',
  //     heading: 'Smart Deals for Retailers',
  //     subtitle: 'Best prices on bulk packs',
  //     image: require('../../assets/images/store.jpg'),
  //   },
  // ];

  const fetchBanners = async () => {
    const TAG = '[API:Banner]';
    const url = `${BASE_URL}/deals`;
    console.log(TAG, `▶ GET ${url}`);
    const start = Date.now();
    try {
      setLoading(true);
      const response = await fetch(url);
      console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${response.status}`);
      const json = await response.json();
      console.log(TAG, `✅ ${json?.length ?? 0} deals fetched`);

      // ✅ Filter only isBanner true
      const bannerDeals = json
        .filter(item => item.isBanner === true)
        .map(item => ({
          id: item.dealId,
          heading: item.heading,
          subtitle: item.subheading,
          image: { uri: item.photo }, // ✅ Use API image
        }));
      console.log(TAG, `🖼 ${bannerDeals.length} banners after filter`);

      setBanner(bannerDeals);
    } catch (error) {
      console.error(TAG, `❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const handleEnrollPress = () => {
    navigation.navigate('EnrollScreen');
  };
  const handleDemo = () => {
    navigation.navigate('DemoScreen');
  };

  const handleScroll = event => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / (width - 32),
    );
    setActiveIndex(slideIndex);
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={banner}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BannerItem
            item={item}
            handleEnrollPress={handleEnrollPress}
            handleDemo={handleDemo}
          />
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {banner.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === activeIndex ? '#2D73F5' : '#E0E0E0',
                width: 20,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
  },
  //   enrollButton: {
  //     backgroundColor: colors.primary,
  //     paddingVertical: 6,
  //     paddingHorizontal: 12,
  //     borderRadius: 8,
  //     elevation: 2,
  //     shadowColor: colors.primary,
  //     shadowOffset: { width: 0, height: 1 },
  //     shadowOpacity: 0.2,
  //     shadowRadius: 1.5,
  //     alignSelf: 'flex-start',
  //     marginTop: 10,
  //   },
  //   demoButton: {
  //     backgroundColor: colors.white,
  //     paddingVertical: 6,
  //     paddingHorizontal: 12,
  //     borderRadius: 8,
  //     elevation: 2,
  //     shadowColor: colors.primary,
  //     shadowOffset: { width: 0, height: 1 },
  //     shadowOpacity: 0.2,
  //     shadowRadius: 1.5,
  //     alignSelf: 'flex-start',
  //     marginTop: 10,
  //     marginLeft: 10,
  //   },
  enrollText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  demoText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  banner: {
    height: 165,
    width: width - 32,
    borderRadius: 5,
    padding: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationDot: {
    height: 6,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});
