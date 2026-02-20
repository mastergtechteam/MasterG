// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   FlatList,
//   View,
//   ActivityIndicator,
//   Text,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../components/common/Header';
// import AppView from '../../components/common/AppView';
// import DealCard from '../../components/Home/DealCard';
// import { colors } from '../../theme/colors';
// import { useNavigation } from '@react-navigation/native';
// import { spacing } from '../../theme/spacing';
// import { typography } from '../../theme/typography';
// import GoBackHeader from '../../components/common/GoBackHeader';
// const DealsScreen = () => {
//   const navigation = useNavigation();
//   const [deals, setDeals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${BASE_URL}/deals`,
//       );
//       const json = await response.json();
//       setDeals(json);
//       // console.log(json, 'abc');
//     } catch {
//       console.error('Error fetching product:', error);
//     } finally {
//       setLoading(false);
//       // console.log('api request done');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color={colors.primary} />
//         <Text style={styles.loaderText}>Loading product details...</Text>
//       </View>
//     );
//   }

//   const functionViewAll = () => {
//     navigation.navigate('Deals');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <AppView style={styles.headerContainer}>
//         <GoBackHeader title="Today's Deals" />
//       </AppView>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 80, alignItems: 'center' }}
//       >
//         <FlatList
//           data={deals}
//           numColumns={2}
//           keyExtractor={item => item.dealId}
//           columnWrapperStyle={{
//             justifyContent: 'space-between',
//             paddingHorizontal: 16,
//           }}
//           renderItem={({ item }) => <DealCard item={item} />}
//           contentContainerStyle={styles.listContainer}
//           scrollEnabled={false}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default DealsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   headerContainer: {
//     backgroundColor: colors.background,
//   },
//   listContainer: {
//     // paddingHorizontal: 16,
//     paddingVertical: 16,
//   },
//   loader: {
//     flex: 1,
//     backgroundColor: colors.background,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: spacing.lg,
//   },
//   loaderText: {
//     color: colors.textPrimary,
//     fontSize: typography.fontSize.md,
//     marginTop: spacing.lg,
//     textAlign: 'center',
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import AppView from '../../components/common/AppView';
import DealCard from '../../components/Home/DealCard';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import GoBackHeader from '../../components/common/GoBackHeader';
import { BASE_URL } from '../../api/apiClient';
const DealsScreen = () => {
  const navigation = useNavigation();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    const TAG = '[API:Deals]';
    const url = `${BASE_URL}/deals`;
    console.log(TAG, `▶ GET ${url}`);
    const start = Date.now();
    try {
      setLoading(true);
      const response = await fetch(url);
      console.log(TAG, `⏱ ${Date.now() - start}ms | status: ${response.status}`);
      const json = await response.json();
      console.log(TAG, `✅ ${json?.length ?? 0} deals fetched`);
      setDeals(json);
    } catch (error) {
      console.error(TAG, `❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loaderText}>Loading product details...</Text>
      </View>
    );
  }

  const functionViewAll = () => {
    navigation.navigate('Deals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppView style={styles.headerContainer}>
        <GoBackHeader title="Today's Deals" />
      </AppView>

      <FlatList
        data={deals}
        numColumns={2}
        keyExtractor={item => item.dealId}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <DealCard item={item} />}
      />
    </SafeAreaView>
  );
};

export default DealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 80,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  loader: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  loaderText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});
