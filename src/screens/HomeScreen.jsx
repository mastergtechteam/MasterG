// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import DrawerButton from '../components/common/DrawerButton';

// import { useTheme } from '../hooks/useTheme';
// import { useTranslation } from '../hooks/useTranslation';
// import { useLanguageContext } from '../context/LanguageContext';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function HomeScreen({ navigation }) {
//   const { theme, isDark } = useTheme();
//   const { t } = useTranslation();
//   const { changeLanguage, language } = useLanguageContext();

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       {/* Drawer Button */}
//       <DrawerButton />

//       {/* Title */}
//       <Text
//         style={[
//           styles.title,
//           {
//             color: theme.colors.text,
//             fontSize: theme.typography.fontSize.lg,
//           },
//         ]}
//       >
//         {t('home.title')}
//       </Text>

//       {/* Navigation Button */}
//       <Button
//         title={t('home.goToDetails')}
//         color={theme.colors.primary}
//         onPress={() => navigation.navigate('Details')}
//       />

//       {/* Language Switch */}
//       <View style={styles.languageContainer}>
//         <Button
//           title="English"
//           onPress={() => changeLanguage('en')}
//           disabled={language === 'en'}
//         />

//         <Button
//           title="हिंदी"
//           onPress={() => changeLanguage('hi')}
//           disabled={language === 'hi'}
//         />
//       </View>

//       {/* Debug Info (optional, remove later) */}
//       <Text style={[styles.debugText, { color: theme.colors.text }]}>
//         Theme: {isDark ? 'Dark' : 'Light'} | Language: {language}
//       </Text>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },

//   title: {
//     marginVertical: 20,
//   },

//   languageContainer: {
//     marginTop: 30,
//     gap: 10,
//   },

//   debugText: {
//     marginTop: 40,
//     fontSize: 12,
//     opacity: 0.7,
//   },
// });
// import React from 'react';
// import { Image, ScrollView, StyleSheet, Pressable } from 'react-native';
// import { useTheme } from '../hooks/useTheme';

// import AppSafeArea from '../components/common/AppSafeArea';
// import AppText from '../components/common/AppText';
// import AppView from '../components/common/AppView';
// import AppButton from '../components/common/AppButton';

// export default function HomeScreen() {
//   const { theme } = useTheme();

//   return (
//     <AppSafeArea>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* HEADER */}
//         <AppView style={styles.header}>
//           <AppText variant="logo">MasterG</AppText>

//           <AppView style={styles.headerRight}>
//             <AppView style={styles.wallet}>
//               <AppText>₹12,500</AppText>
//             </AppView>

//             <AppView style={styles.avatar}>
//               <AppText>RK</AppText>
//             </AppView>
//           </AppView>
//         </AppView>

//         <AppText style={styles.welcome}>Welcome back, Retailer</AppText>

//         {/* HERO BANNER */}
//         <AppView style={styles.banner}>
//           <Image
//             source={require('../assets/images/store.jpg')}
//             style={styles.bannerImage}
//           />

//           <AppView style={styles.bannerOverlay}>
//             <AppText variant="title">Pre-Book Before Price Rise</AppText>
//             <AppText style={styles.bannerSub}>
//               Oil prices increasing soon
//             </AppText>
//           </AppView>
//         </AppView>

//         {/* ACTION CARDS */}
//         <AppView style={styles.row}>
//           <AppView style={styles.actionCard}>
//             <AppText variant="title">Speak & Order</AppText>
//             <AppText style={styles.muted}>Order in seconds using voice</AppText>
//           </AppView>

//           <AppView style={styles.actionCard}>
//             <AppText variant="title">Repeat Order</AppText>
//             <AppText style={styles.muted}>Same items, same quantity</AppText>
//           </AppView>
//         </AppView>

//         {/* ALERT STRIP */}
//         <AppView style={styles.alert}>
//           <AppText>⚠️ Cooking Oil prices may increase in 5 days</AppText>
//           <AppButton title="Pre-Book" small />
//         </AppView>

//         {/* SECTION */}
//         <Section title="🔥 Smart Deals for Retailers" />

//         <HorizontalCards
//           data={[
//             { title: 'Under ₹100', subtitle: 'Fast-selling items' },
//             { title: 'Bulk Packs', subtitle: 'Under ₹5000' },
//           ]}
//         />

//         <Section title="🔥 Smart Deals for Retailers" />

//         <GridCards
//           data={[
//             'Grocery Essentials',
//             'Snacks & Biscuits',
//             'Beverages',
//             'Dairy',
//             'Household',
//             'Personal Care',
//           ]}
//         />

//         {/* INSIGHTS */}
//         <AppView style={styles.insight}>
//           <AppText variant="title">Your Insights</AppText>
//           <AppText style={styles.muted}>
//             You usually reorder snacks every 5 days
//           </AppText>
//           <AppButton title="Reorder Now" />
//         </AppView>
//       </ScrollView>
//     </AppSafeArea>
//   );
// }

// /* ---------------------------------- */
// /* COMPONENTS */
// /* ---------------------------------- */

// function Section({ title }) {
//   return (
//     <AppView style={styles.section}>
//       <AppText variant="title">{title}</AppText>
//       <AppText style={styles.viewAll}>View All</AppText>
//     </AppView>
//   );
// }

// function HorizontalCards({ data }) {
//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//       {data.map((item, i) => (
//         <AppView key={i} style={styles.hCard}>
//           <AppText variant="title">{item.title}</AppText>
//           <AppText style={styles.muted}>{item.subtitle}</AppText>
//         </AppView>
//       ))}
//     </ScrollView>
//   );
// }

// function GridCards({ data }) {
//   return (
//     <AppView style={styles.grid}>
//       {data.map((title, i) => (
//         <AppView key={i} style={styles.gridCard}>
//           <AppText>{title}</AppText>
//         </AppView>
//       ))}
//     </AppView>
//   );
// }

// /* ---------------------------------- */
// /* STYLES */
// /* ---------------------------------- */

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     alignItems: 'center',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   wallet: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: '#111',
//   },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#222',
//   },
//   welcome: {
//     paddingHorizontal: 16,
//     opacity: 0.7,
//     marginBottom: 12,
//   },
//   banner: {
//     marginHorizontal: 16,
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 16,
//   },
//   bannerImage: {
//     width: '100%',
//     height: 180,
//   },
//   bannerOverlay: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//   },
//   bannerSub: {
//     opacity: 0.7,
//   },
//   row: {
//     flexDirection: 'row',
//     gap: 12,
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   actionCard: {
//     flex: 1,
//     padding: 16,
//     borderRadius: 14,
//     backgroundColor: '#111',
//   },
//   muted: {
//     opacity: 0.6,
//     marginTop: 4,
//   },
//   alert: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 12,
//     margin: 16,
//     borderRadius: 12,
//     backgroundColor: '#1A1A1A',
//     alignItems: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     marginBottom: 12,
//   },
//   viewAll: {
//     color: '#22C55E',
//   },
//   hCard: {
//     width: 160,
//     height: 120,
//     borderRadius: 16,
//     padding: 12,
//     marginLeft: 16,
//     backgroundColor: '#111',
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 16,
//     gap: 12,
//   },
//   gridCard: {
//     width: '48%',
//     height: 120,
//     borderRadius: 16,
//     padding: 12,
//     backgroundColor: '#111',
//   },
//   insight: {
//     margin: 16,
//     padding: 16,
//     borderRadius: 16,
//     backgroundColor: '#1F1B0A',
//   },
// });
// import React from 'react';
// import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
// import AppSafeArea from '../components/common/AppSafeArea';
// import AppText from '../components/common/AppText';
// import AppButton from '../components/common/AppButton';
// import BannerCrousel from '../components/Home/BannerCrousel';
// import Header from '../components/common/Header';
// import ActionCard from '../components/Home/ActionCard';
// import AlertStrip from '../components/Home/AlertStrip';
// import DealsList from '../components/Home/DealsList';
// import SmartDealsSection from '../components/Home/SmartDealsSection';
// import InsightCard from '../components/Home/InsightCard';
// const HomeScreen = () => {
//   return (
//     <AppSafeArea>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 24 }}
//       >
//         <Header />
//         <BannerCrousel />
//         <View
//           style={{
//             flexDirection: 'row',
//             gap: 12,
//             paddingHorizontal: 16,
//             marginBottom: 16,
//           }}
//         >
//           <ActionCard
//             icon="mic"
//             title="Speak & Order"
//             subtitle="Order in seconds using voice"
//             onPress={() => console.log('Voice pressed')}
//           />

//           <ActionCard
//             icon="cart"
//             title="Quick Buy"
//             subtitle="Buy frequently ordered items"
//             iconBgColor="#143620"
//           />
//         </View>
//         <AlertStrip />
//         <DealsList />
//         <SmartDealsSection />
//         <InsightCard />
//       </ScrollView>
//     </AppSafeArea>
//   );
// };

// export default HomeScreen;
// import React from 'react';
// import { View, FlatList } from 'react-native';
// import AppSafeArea from '../components/common/AppSafeArea';
// import Header from '../components/common/Header';
// import BannerCrousel from '../components/Home/BannerCrousel';
// import ActionCard from '../components/Home/ActionCard';
// import AlertStrip from '../components/Home/AlertStrip';
// import DealsList from '../components/Home/DealsList';
// import SmartDealsSection from '../components/Home/SmartDealsSection';
// import InsightCard from '../components/Home/InsightCard';

// const HomeScreen = () => {
//   // Prepare the sections as list data
//   const data = [
//     { key: 'header' },
//     { key: 'banner' },
//     { key: 'actionCards' },
//     { key: 'alertStrip' },
//     { key: 'dealsList' },
//     { key: 'smartDeals' },
//     { key: 'insightCard' },
//   ];

//   const renderItem = ({ item }) => {
//     switch (item.key) {
//       case 'header':
//         return <Header />;
//       case 'banner':
//         return <BannerCrousel />;
//       case 'actionCards':
//         return (
//           <View
//             style={{
//               flexDirection: 'row',
//               gap: 12,
//               paddingHorizontal: 16,
//               marginBottom: 16,
//             }}
//           >
//             <ActionCard
//               icon="mic"
//               title="Speak & Order"
//               subtitle="Order in seconds using voice"
//               onPress={() => console.log('Voice pressed')}
//             />
//             <ActionCard
//               icon="cart"
//               title="Quick Buy"
//               subtitle="Buy frequently ordered items"
//               iconBgColor="#143620"
//             />
//           </View>
//         );
//       case 'alertStrip':
//         return <AlertStrip />;
//       case 'dealsList':
//         return <DealsList />;
//       case 'smartDeals':
//         return <SmartDealsSection />;
//       case 'insightCard':
//         return <InsightCard />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <AppSafeArea>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.key}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 94, marginBottom: 50 }}
//       />
//     </AppSafeArea>
//   );
// };

// export default HomeScreen;
import React from 'react';
import { View, FlatList } from 'react-native';
import AppSafeArea from '../components/common/AppSafeArea';
import AppText from '../components/common/AppText';
import AppButton from '../components/common/AppButton';
import BannerCrousel from '../components/Home/BannerCrousel';
import Header from '../components/common/Header';
import ActionCard from '../components/Home/ActionCard';
import AlertStrip from '../components/Home/AlertStrip';
import DealsList from '../components/Home/DealsList';
import InsightCard from '../components/Home/InsightCard';
import CategoriesSection from '../components/Home/CategoriesSection';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleSpeakOrder = () => {
    navigation.navigate('Mic');
  };
  const handleQuickBuy = () => {
    navigation.navigate('Mic');
  };
  return (
    <AppSafeArea>
      <FlatList
        data={[]} // dummy data
        keyExtractor={() => 'key'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        ListHeaderComponent={
          <>
            <Header />
            <BannerCrousel />

            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                paddingHorizontal: 16,
                marginBottom: 16,
              }}
            >
              <ActionCard
                icon="mic"
                title="Speak & Order"
                subtitle="Order in seconds using voice"
                onPress={handleSpeakOrder}
              />

              <ActionCard
                icon="cart"
                title="Quick Buy"
                subtitle="Buy frequently ordered items"
                iconBgColor="#143620"
                onPress={handleSpeakOrder}
              />
            </View>

            <AlertStrip />
            <DealsList />
            <CategoriesSection />
            <InsightCard />
          </>
        }
      />
    </AppSafeArea>
  );
};

export default HomeScreen;
