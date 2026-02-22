// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   Image,
//   Alert,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { getAuth, signOut } from '@react-native-firebase/auth';

// import AppSafeArea from '../../components/common/AppSafeArea';
// import AppView from '../../components/common/AppView';
// import AppText from '../../components/common/AppText';
// import Header from '../../components/common/Header';
// import { colors } from '../../theme/colors';
// import { spacing } from '../../theme/spacing';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASE_URL } from '../../api/apiClient';
// import RNRestart from 'react-native-restart';

// const ProfileScreen = () => {
//   const [retailer, setRetailer] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [expandedSections, setExpandedSections] = useState({
//     shop: false,
//     address: false,
//     documents: false,
//     shopImage: false,
//   });
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchRetailer();
//   }, []);

//   const isProfileIncomplete = retailerData => {
//     if (!retailerData) return true;

//     return !retailerData.storeName || !retailerData.address;
//   };

//   const fetchRetailer = async () => {
//     try {
//       setLoading(true);

//       const retailerId = await AsyncStorage.getItem('user_uuid');

//       console.log('📦 Retailer ID from storage:', retailerId);

//       if (!retailerId) {
//         setRetailer(null);
//         setLoading(false);
//         return;
//       }

//       const TAG = '[API:Profile]';
//       const url = `${BASE_URL}/retailers/${retailerId}`;
//       console.log(TAG, `▶ GET ${url}`);
//       const start = Date.now();
//       const response = await fetch(url);
//       console.log(
//         TAG,
//         `⏱ ${Date.now() - start}ms | status: ${response.status}`,
//       );
//       const data = await response.json();

//       if (data?.success && data?.data) {
//         const retailerData = data.data;

//         setRetailer(retailerData);

//         // 🔥 Check profile completion
//         if (isProfileIncomplete(retailerData)) {
//           console.log('⚠️ Profile Incomplete → Navigating to Register');
//           navigation.replace('Register');
//         }
//       } else {
//         console.warn(TAG, `⚠️ Retailer not found for id: ${retailerId}`);
//         setRetailer(null);
//       }
//     } catch (error) {
//       console.error(
//         '[API:Profile]',
//         `❌ Fetch Retailer Error: ${error.message}`,
//       );
//       setRetailer(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSection = section => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   // const handleLogout = async () => {
//   //   try {
//   //     await signOut(getAuth());

//   //     navigation.reset({
//   //       index: 0,
//   //       routes: [{ name: 'Auth' }],
//   //     });
//   //   } catch (error) {
//   //     console.log('Logout Error:', error);
//   //   }
//   // };
//   const handleLogout = async () => {
//     try {
//       // 1️⃣ Firebase logout
//       await signOut(getAuth());

//       // 2️⃣ Clear all AsyncStorage
//       await AsyncStorage.clear();

//       console.log('🗑️ AsyncStorage Cleared');

//       // 3️⃣ Restart app → Splash mounts again
//       RNRestart.restart();
//     } catch (error) {
//       console.log('Logout Error:', error);
//     }
//   };

//   // const handleSettings = () => {
//   //   console.log('⚙️ SETTINGS clicked');
//   // };
//   const handleSettings = () => {
//     console.log('⚙️ SETTINGS clicked');
//     navigation.openDrawer();
//   };

//   const handlePanGst = () => {
//     Alert.alert(
//       'PAN/GST Not Added',
//       'You have not added PAN or GST details yet.',
//       [{ text: 'OK' }],
//     );
//   };

//   const getFullAddress = () => {
//     const addr = retailer?.address;
//     if (!addr) return '';
//     return `${addr.line1}, ${addr.line2}, ${addr.area}, ${addr.city}, ${addr.state} ${addr.pincode}`;
//   };

//   const ExpandableSection = ({ title, icon, section, children }) => {
//     const isExpanded = expandedSections[section];

//     return (
//       <AppView style={styles.sectionContainer}>
//         <TouchableOpacity
//           style={styles.sectionHeader}
//           onPress={() => toggleSection(section)}
//           activeOpacity={0.7}
//         >
//           <AppView style={styles.sectionHeaderLeft}>
//             <View style={styles.sectionIconBox}>{icon}</View>
//             <AppText style={styles.sectionTitle}>{title}</AppText>
//           </AppView>
//           <MaterialIcons
//             name={isExpanded ? 'expand-less' : 'expand-more'}
//             size={24}
//             color={colors.primary}
//           />
//         </TouchableOpacity>

//         {isExpanded && (
//           <AppView style={styles.sectionContent}>{children}</AppView>
//         )}
//       </AppView>
//     );
//   };

//   const InfoItem = ({ label, value, icon }) => (
//     <AppView style={styles.infoItem}>
//       <AppView style={styles.infoItemLeft}>
//         {icon && <View style={styles.infoIconBox}>{icon}</View>}
//         <AppText style={styles.infoLabel}>{label}</AppText>
//       </AppView>
//       <AppText style={styles.infoValue}>{value}</AppText>
//     </AppView>
//   );

//   if (loading) {
//     return (
//       <AppSafeArea style={styles.container}>
//         <Header />
//         <AppView
//           style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//         >
//           <AppText>Loading profile...</AppText>
//         </AppView>
//       </AppSafeArea>
//     );
//   }

//   return (
//     <AppSafeArea style={styles.container}>
//       <Header />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Profile Header */}
//         <AppView style={styles.profileSection}>
//           <AppView style={styles.profileImageContainer}>
//             {retailer?.storeImage ? (
//               <Image
//                 source={{ uri: retailer.storeImage }}
//                 style={styles.profileImage}
//               />
//             ) : (
//               <View style={styles.profileImagePlaceholder}>
//                 <MaterialCommunityIcons
//                   name="store"
//                   size={48}
//                   color={colors.primary}
//                 />
//               </View>
//             )}
//           </AppView>

//           <AppView style={styles.profileInfo}>
//             <AppText style={styles.ownerName}>
//               {retailer?.ownerName || retailer?.retailerId}
//             </AppText>
//             <AppText style={styles.storeName}>
//               {retailer?.storeName || ''}
//             </AppText>
//             <AppView style={styles.mobileSection}>
//               <MaterialIcons
//                 name="phone"
//                 size={14}
//                 color={colors.textSecondary}
//               />
//               <AppText style={styles.mobileNumber}>
//                 {retailer?.contact?.mobile}
//               </AppText>
//             </AppView>
//             {retailer?.status && (
//               <AppView
//                 style={[
//                   styles.statusBadge,
//                   {
//                     backgroundColor:
//                       retailer.status === 'ACTIVE'
//                         ? colors.success + '20'
//                         : colors.warning + '20',
//                   },
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.statusDot,
//                     {
//                       backgroundColor:
//                         retailer.status === 'ACTIVE'
//                           ? colors.success
//                           : colors.warning,
//                     },
//                   ]}
//                 />
//                 <AppText
//                   style={[
//                     styles.statusText,
//                     {
//                       color:
//                         retailer.status === 'ACTIVE'
//                           ? colors.success
//                           : colors.warning,
//                     },
//                   ]}
//                 >
//                   {retailer.status}
//                 </AppText>
//               </AppView>
//             )}
//           </AppView>
//         </AppView>

//         {/* Shop Details Section */}
//         <ExpandableSection
//           title="Shop Details"
//           section="shop"
//           icon={<MaterialIcons name="store" size={20} color={colors.primary} />}
//         >
//           <InfoItem
//             label="Shop Name"
//             value={retailer?.storeName}
//             icon={
//               <MaterialIcons
//                 name="storefront"
//                 size={16}
//                 color={colors.primary}
//               />
//             }
//           />
//           <View style={styles.divider} />
//           <InfoItem
//             label="Owner Name"
//             value={retailer?.ownerName}
//             icon={
//               <MaterialIcons name="person" size={16} color={colors.primary} />
//             }
//           />
//           <View style={styles.divider} />
//           <InfoItem
//             label="Shop ID"
//             value={retailer?.retailerId}
//             icon={
//               <MaterialIcons name="badge" size={16} color={colors.primary} />
//             }
//           />
//         </ExpandableSection>

//         {/* Delivery Address Section */}
//         <ExpandableSection
//           title="Delivery Address"
//           section="address"
//           icon={<Entypo name="location-pin" size={20} color={colors.primary} />}
//         >
//           <InfoItem
//             label="Address Line 1"
//             value={retailer?.address?.line1}
//             icon={
//               <MaterialIcons
//                 name="location-on"
//                 size={16}
//                 color={colors.primary}
//               />
//             }
//           />
//           <View style={styles.divider} />
//           <InfoItem label="Address Line 2" value={retailer?.address?.line2} />
//           <View style={styles.divider} />
//           <InfoItem label="Area" value={retailer?.address?.area} />
//           <View style={styles.divider} />
//           <InfoItem label="City" value={retailer?.address?.city} />
//           <View style={styles.divider} />
//           <InfoItem label="State" value={retailer?.address?.state} />
//           <View style={styles.divider} />
//           <InfoItem label="Pincode" value={retailer?.address?.pincode} />
//           <View style={styles.divider} />
//           <InfoItem
//             label="Email"
//             value={retailer?.contact?.email}
//             icon={
//               <MaterialIcons name="email" size={16} color={colors.primary} />
//             }
//           />
//           <View style={styles.divider} />
//           <InfoItem
//             label="Alternate Mobile"
//             value={retailer?.contact?.alternateMobile}
//             icon={
//               <MaterialIcons name="phone" size={16} color={colors.primary} />
//             }
//           />
//         </ExpandableSection>

//         {/* PAN/GST Section */}
//         <ExpandableSection
//           title="PAN / GST"
//           section="documents"
//           icon={
//             <MaterialIcons
//               name="description"
//               size={20}
//               color={colors.primary}
//             />
//           }
//         >
//           <TouchableOpacity
//             style={styles.emptyDocumentBox}
//             onPress={handlePanGst}
//             activeOpacity={0.7}
//           >
//             <MaterialIcons
//               name="info-outline"
//               size={32}
//               color={colors.warning}
//             />
//             <AppText style={styles.emptyDocumentText}>
//               PAN/GST details not added yet
//             </AppText>
//             <AppText style={styles.emptyDocumentSubText}>
//               Tap to add your documents
//             </AppText>
//           </TouchableOpacity>
//         </ExpandableSection>

//         {/* Shop Image Section */}
//         <ExpandableSection
//           title="Shop Image"
//           section="shopImage"
//           icon={<MaterialIcons name="image" size={20} color={colors.primary} />}
//         >
//           <AppView style={styles.shopImageContainer}>
//             {retailer?.storeImage ? (
//               <Image
//                 source={{ uri: retailer.storeImage }}
//                 style={styles.shopImageDisplay}
//               />
//             ) : (
//               <View style={styles.shopImagePlaceholder}>
//                 <MaterialCommunityIcons
//                   name="image-off"
//                   size={48}
//                   color={colors.textMuted}
//                 />
//                 <AppText style={styles.shopImagePlaceholderText}>
//                   No shop image available
//                 </AppText>
//               </View>
//             )}
//           </AppView>
//         </ExpandableSection>

//         {/* Action Buttons */}
//         <AppView style={styles.actionsContainer}>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.settingsBtn]}
//             onPress={handleSettings}
//             activeOpacity={0.7}
//           >
//             <MaterialIcons name="settings" size={20} color={colors.primary} />
//             <AppText style={styles.settingsBtnText}>Settings</AppText>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.actionButton, styles.logoutBtn]}
//             onPress={handleLogout}
//             activeOpacity={0.7}
//           >
//             <MaterialCommunityIcons
//               name="logout"
//               size={20}
//               color={colors.error}
//             />
//             <AppText style={styles.logoutBtnText}>Logout</AppText>
//           </TouchableOpacity>
//         </AppView>
//       </ScrollView>
//     </AppSafeArea>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//     paddingBottom: 80,
//   },
//   scrollContent: {
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.md,
//     paddingBottom: spacing.xl,
//   },
//   profileSection: {
//     flexDirection: 'row',
//     backgroundColor: colors.surface,
//     borderRadius: 16,
//     padding: spacing.lg,
//     marginBottom: spacing.xl,
//     alignItems: 'center',
//   },
//   profileImageContainer: {
//     marginRight: spacing.lg,
//     backgroundColor: colors.surface,
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   profileImagePlaceholder: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: colors.surfaceElevated,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   profileInfo: {
//     flex: 1,
//     backgroundColor: colors.surface,
//   },
//   ownerName: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: colors.textPrimary,
//     marginBottom: spacing.xs,
//   },
//   storeName: {
//     fontSize: 13,
//     color: colors.textSecondary,
//     marginBottom: spacing.sm,
//   },
//   mobileSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: spacing.sm,
//     backgroundColor: colors.surface,
//   },
//   mobileNumber: {
//     fontSize: 12,
//     color: colors.textSecondary,
//     marginLeft: spacing.xs,
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//     paddingHorizontal: spacing.sm,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   statusDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     marginRight: spacing.xs,
//   },
//   statusText: {
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   sectionContainer: {
//     marginBottom: spacing.lg,
//     backgroundColor: colors.surface,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: spacing.md,
//     paddingHorizontal: spacing.md,
//   },
//   sectionHeaderLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     backgroundColor: colors.surface,
//   },
//   sectionIconBox: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     backgroundColor: colors.surfaceElevated,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.md,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: colors.textPrimary,
//   },
//   sectionContent: {
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//     paddingVertical: spacing.md,
//     paddingHorizontal: spacing.md,
//   },
//   infoItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: spacing.md,
//   },
//   infoItemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   infoIconBox: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     backgroundColor: colors.surfaceElevated,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.sm,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: colors.textMuted,
//     flex: 1,
//   },
//   infoValue: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: colors.textPrimary,
//     textAlign: 'right',
//     flex: 1,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: colors.border,
//     marginVertical: spacing.md,
//   },
//   emptyDocumentBox: {
//     alignItems: 'center',
//     paddingVertical: spacing.lg,
//     backgroundColor: colors.surfaceElevated + '40',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: colors.warning + '30',
//   },
//   emptyDocumentText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: colors.textPrimary,
//     marginTop: spacing.sm,
//   },
//   emptyDocumentSubText: {
//     fontSize: 11,
//     color: colors.textMuted,
//     marginTop: spacing.xs,
//   },
//   shopImageContainer: {
//     alignItems: 'center',
//     paddingVertical: spacing.lg,
//   },
//   shopImageDisplay: {
//     width: '100%',
//     height: 250,
//     borderRadius: 12,
//     backgroundColor: colors.surfaceElevated,
//   },
//   shopImagePlaceholder: {
//     width: '100%',
//     height: 250,
//     borderRadius: 12,
//     backgroundColor: colors.surfaceElevated,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   shopImagePlaceholderText: {
//     fontSize: 12,
//     color: colors.textMuted,
//     marginTop: spacing.sm,
//   },
//   actionsContainer: {
//     gap: spacing.md,
//     marginTop: spacing.lg,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: spacing.md,
//     borderRadius: 12,
//     gap: spacing.md,
//   },
//   settingsBtn: {
//     backgroundColor: colors.primary + '15',
//     borderWidth: 1.5,
//     borderColor: colors.primary,
//   },
//   settingsBtnText: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: colors.primary,
//   },
//   logoutBtn: {
//     backgroundColor: colors.error + '15',
//     borderWidth: 1.5,
//     borderColor: colors.error,
//   },
//   logoutBtnText: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: colors.error,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { getAuth, signOut } from '@react-native-firebase/auth';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppView from '../../components/common/AppView';
import AppText from '../../components/common/AppText';
import Header from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../api/apiClient';
import RNRestart from 'react-native-restart';
import GoBackHeader from '../../components/common/GoBackHeader';

const ProfileScreen = () => {
  const [retailer, setRetailer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [expandedSections, setExpandedSections] = useState({
    shop: false,
    address: false,
    documents: false,
    shopImage: false,
  });
  const navigation = useNavigation();

  useEffect(() => {
    fetchRetailer();
  }, []);

  const isProfileIncomplete = retailerData => {
    if (!retailerData) return true;

    return !retailerData.storeName || !retailerData.address;
  };

  const fetchRetailer = async () => {
    try {
      setLoading(true);

      const retailerId = await AsyncStorage.getItem('user_uuid');

      console.log('📦 Retailer ID from storage:', retailerId);

      if (!retailerId) {
        setRetailer(null);
        setLoading(false);
        return;
      }

      const TAG = '[API:Profile]';
      const url = `${BASE_URL}/retailers/${retailerId}`;
      console.log(TAG, `▶ GET ${url}`);
      const start = Date.now();
      const response = await fetch(url);
      console.log(
        TAG,
        `⏱ ${Date.now() - start}ms | status: ${response.status}`,
      );
      const data = await response.json();

      if (data?.success && data?.data) {
        const retailerData = data.data;

        setRetailer(retailerData);
      } else {
        console.warn(TAG, `⚠️ Retailer not found for id: ${retailerId}`);
        setRetailer(null);
      }
    } catch (error) {
      console.error(
        '[API:Profile]',
        `❌ Fetch Retailer Error: ${error.message}`,
      );
      setRetailer(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // const handleLogout = async () => {
  //   try {
  //     await signOut(getAuth());

  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'Auth' }],
  //     });
  //   } catch (error) {
  //     console.log('Logout Error:', error);
  //   }
  // };
  const handleLogout = async () => {
    try {
      // 1️⃣ Firebase logout
      await signOut(getAuth());

      // 2️⃣ Clear all AsyncStorage
      await AsyncStorage.clear();

      console.log('🗑️ AsyncStorage Cleared');
      navigation.replace('Auth');
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  // const handleSettings = () => {
  //   console.log('⚙️ SETTINGS clicked');
  // };
  const handleSettings = () => {
    console.log('⚙️ SETTINGS clicked');
    navigation.openDrawer();
  };

  const handlePanGst = () => {
    Alert.alert(
      'PAN/GST Not Added',
      'You have not added PAN or GST details yet.',
      [{ text: 'OK' }],
    );
  };

  const getFullAddress = () => {
    const addr = retailer?.address;
    if (!addr) return '';
    return `${addr.line1}, ${addr.line2}, ${addr.area}, ${addr.city}, ${addr.state} ${addr.pincode}`;
  };

  const ExpandableSection = ({ title, icon, section, children }) => {
    const isExpanded = expandedSections[section];

    return (
      <AppView style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section)}
          activeOpacity={0.7}
        >
          <AppView style={styles.sectionHeaderLeft}>
            <View style={styles.sectionIconBox}>{icon}</View>
            <AppText style={styles.sectionTitle}>{title}</AppText>
          </AppView>
          <MaterialIcons
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        {isExpanded && (
          <AppView style={styles.sectionContent}>{children}</AppView>
        )}
      </AppView>
    );
  };

  const InfoItem = ({ label, value, icon }) => (
    <AppView style={styles.infoItem}>
      <AppView style={styles.infoItemLeft}>
        {icon && <View style={styles.infoIconBox}>{icon}</View>}
        <AppText style={styles.infoLabel}>{label}</AppText>
      </AppView>
      <AppText style={styles.infoValue}>{value}</AppText>
    </AppView>
  );

  if (loading) {
    return (
      <AppSafeArea style={styles.container}>
        <GoBackHeader title="Profile Details" showSearch={false} />
        <AppView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <AppText>Loading profile...</AppText>
        </AppView>
      </AppSafeArea>
    );
  }

  const shouldShowCreateProfile = !retailer || !retailer?.contact?.mobile;

  return (
    <AppSafeArea style={styles.container}>
      <GoBackHeader title="Profile Details" showSearch={false} />

      {shouldShowCreateProfile ? (
        <AppView style={styles.incompleteBox}>
          <MaterialIcons
            name="person-add-alt-1"
            size={26}
            color={colors.warning}
          />

          <AppText style={styles.incompleteTitle}>Create Your Profile</AppText>

          <AppText style={styles.incompleteSub}>
            Complete your profile to start managing your shop, track orders, and
            unlock all features.
          </AppText>

          <TouchableOpacity
            style={styles.completeBtn}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.8}
          >
            <AppText style={styles.completeBtnText}>Create Profile</AppText>
          </TouchableOpacity>
        </AppView>
      ) : (
        <>
          {retailer && isProfileIncomplete(retailer) && (
            <AppView style={styles.incompleteBox}>
              <MaterialIcons
                name="error-outline"
                size={26}
                color={colors.warning}
              />

              <AppText style={styles.incompleteTitle}>
                Your profile is not complete
              </AppText>

              <AppText style={styles.incompleteSub}>
                Please complete your shop details to continue using all
                features.
              </AppText>

              <TouchableOpacity
                style={styles.completeBtn}
                onPress={() => navigation.navigate('Register')}
                activeOpacity={0.8}
              >
                <AppText style={styles.completeBtnText}>
                  Complete Profile
                </AppText>
              </TouchableOpacity>
            </AppView>
          )}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Profile Header */}
            <AppView style={styles.profileSection}>
              <AppView style={styles.profileImageContainer}>
                {retailer?.storeImage ? (
                  <Image
                    source={{ uri: retailer.storeImage }}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.profileImagePlaceholder}>
                    <MaterialCommunityIcons
                      name="store"
                      size={48}
                      color={colors.primary}
                    />
                  </View>
                )}
              </AppView>

              <AppView style={styles.profileInfo}>
                <AppText style={styles.ownerName}>
                  {retailer?.ownerName || retailer?.retailerId}
                </AppText>
                <AppText style={styles.storeName}>
                  {retailer?.storeName || ''}
                </AppText>
                <AppView style={styles.mobileSection}>
                  <MaterialIcons
                    name="phone"
                    size={14}
                    color={colors.textSecondary}
                  />
                  <AppText style={styles.mobileNumber}>
                    {retailer?.contact?.mobile}
                  </AppText>
                </AppView>
                {retailer?.status && (
                  <AppView
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          retailer.status === 'ACTIVE'
                            ? colors.success + '20'
                            : colors.warning + '20',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor:
                            retailer.status === 'ACTIVE'
                              ? colors.success
                              : colors.warning,
                        },
                      ]}
                    />
                    <AppText
                      style={[
                        styles.statusText,
                        {
                          color:
                            retailer.status === 'ACTIVE'
                              ? colors.success
                              : colors.warning,
                        },
                      ]}
                    >
                      {retailer.status}
                    </AppText>
                  </AppView>
                )}
              </AppView>
            </AppView>

            {/* Shop Details Section */}
            <ExpandableSection
              title="Shop Details"
              section="shop"
              icon={
                <MaterialIcons name="store" size={20} color={colors.primary} />
              }
            >
              <InfoItem
                label="Shop Name"
                value={retailer?.storeName}
                icon={
                  <MaterialIcons
                    name="storefront"
                    size={16}
                    color={colors.primary}
                  />
                }
              />
              <View style={styles.divider} />
              <InfoItem
                label="Owner Name"
                value={retailer?.ownerName}
                icon={
                  <MaterialIcons
                    name="person"
                    size={16}
                    color={colors.primary}
                  />
                }
              />
              <View style={styles.divider} />
              <InfoItem
                label="Shop ID"
                value={retailer?.retailerId}
                icon={
                  <MaterialIcons
                    name="badge"
                    size={16}
                    color={colors.primary}
                  />
                }
              />
            </ExpandableSection>

            {/* Delivery Address Section */}
            <ExpandableSection
              title="Delivery Address"
              section="address"
              icon={
                <Entypo name="location-pin" size={20} color={colors.primary} />
              }
            >
              <InfoItem
                label="Address Line 1"
                value={retailer?.address?.line1}
                icon={
                  <MaterialIcons
                    name="location-on"
                    size={16}
                    color={colors.primary}
                  />
                }
              />
              <View style={styles.divider} />
              <InfoItem
                label="Address Line 2"
                value={retailer?.address?.line2}
              />
              <View style={styles.divider} />
              <InfoItem label="Area" value={retailer?.address?.area} />
              <View style={styles.divider} />
              <InfoItem label="City" value={retailer?.address?.city} />
              <View style={styles.divider} />
              <InfoItem label="State" value={retailer?.address?.state} />
              <View style={styles.divider} />
              <InfoItem label="Pincode" value={retailer?.address?.pincode} />
              <View style={styles.divider} />
              <InfoItem
                label="Email"
                value={retailer?.contact?.email}
                icon={
                  <MaterialIcons
                    name="email"
                    size={16}
                    color={colors.primary}
                  />
                }
              />
              <View style={styles.divider} />
              <InfoItem
                label="Alternate Mobile"
                value={retailer?.contact?.alternateMobile}
                icon={
                  <MaterialIcons
                    name="phone"
                    size={16}
                    color={colors.primary}
                  />
                }
              />
            </ExpandableSection>

            {/* PAN/GST Section */}
            <ExpandableSection
              title="PAN / GST"
              section="documents"
              icon={
                <MaterialIcons
                  name="description"
                  size={20}
                  color={colors.primary}
                />
              }
            >
              <TouchableOpacity
                style={styles.emptyDocumentBox}
                onPress={handlePanGst}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="info-outline"
                  size={32}
                  color={colors.warning}
                />
                <AppText style={styles.emptyDocumentText}>
                  PAN/GST details not added yet
                </AppText>
                <AppText style={styles.emptyDocumentSubText}>
                  Tap to add your documents
                </AppText>
              </TouchableOpacity>
            </ExpandableSection>

            {/* Shop Image Section */}
            <ExpandableSection
              title="Shop Image"
              section="shopImage"
              icon={
                <MaterialIcons name="image" size={20} color={colors.primary} />
              }
            >
              <AppView style={styles.shopImageContainer}>
                {retailer?.storeImage ? (
                  <Image
                    source={{ uri: retailer.storeImage }}
                    style={styles.shopImageDisplay}
                  />
                ) : (
                  <View style={styles.shopImagePlaceholder}>
                    <MaterialCommunityIcons
                      name="image-off"
                      size={48}
                      color={colors.textMuted}
                    />
                    <AppText style={styles.shopImagePlaceholderText}>
                      No shop image available
                    </AppText>
                  </View>
                )}
              </AppView>
            </ExpandableSection>

            {/* Action Buttons */}
            <AppView style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.settingsBtn]}
                onPress={handleSettings}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="settings"
                  size={20}
                  color={colors.primary}
                />
                <AppText style={styles.settingsBtnText}>Settings</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.logoutBtn]}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={20}
                  color={colors.error}
                />
                <AppText style={styles.logoutBtnText}>Logout</AppText>
              </TouchableOpacity>
            </AppView>
          </ScrollView>
        </>
      )}
    </AppSafeArea>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 60,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  profileSection: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: spacing.lg,
    backgroundColor: colors.surface,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  storeName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  mobileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  mobileNumber: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.surface,
  },
  sectionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sectionContent: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    flex: 1,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'right',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  emptyDocumentBox: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.surfaceElevated + '40',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.warning + '30',
  },
  emptyDocumentText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  emptyDocumentSubText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  shopImageContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  shopImageDisplay: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
  },
  shopImagePlaceholder: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopImagePlaceholderText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  actionsContainer: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.md,
  },
  settingsBtn: {
    backgroundColor: colors.primary + '15',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  settingsBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  logoutBtn: {
    backgroundColor: colors.error + '15',
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.error,
  },
  incompleteBox: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: 14,
    backgroundColor: colors.warning + '15',
    borderWidth: 1,
    borderColor: colors.warning + '40',
    alignItems: 'center',
  },

  incompleteTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },

  incompleteSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  completeBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 10,
  },

  completeBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 13,
  },
});
