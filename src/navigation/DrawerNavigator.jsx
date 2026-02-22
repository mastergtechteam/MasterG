// import { createDrawerNavigator } from '@react-navigation/drawer';
// import TabNavigator from './TabNavigator';
// import SettingsScreen from '../screens/Settings/SettingsScreen';

// const Drawer = createDrawerNavigator();

// export default function SalesDrawerNavigator() {
//   return (
//     <Drawer.Navigator screenOptions={{ headerShown: false }}>
//       <Drawer.Screen name="Tab" component={TabNavigator} />
//       <Drawer.Screen name="Settings" component={SettingsScreen} />
//     </Drawer.Navigator>
//   );
// }
// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   Alert,
// } from 'react-native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import {
//   CommonActions,
//   DrawerActions,
//   useNavigation,
// } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useSelector } from 'react-redux';

// import TabNavigator from './TabNavigator';
// import SettingsScreen from '../screens/Settings/SettingsScreen';
// import { colors } from '../theme/colors';

// const Drawer = createDrawerNavigator();

// const DrawerContent = props => {
//   const navigation = useNavigation();
//   const isRegistered = useSelector(state => state.user?.isRegistered);
//   const user = useSelector(state => state.user?.data);

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.clear();

//       navigation.dispatch(DrawerActions.closeDrawer());
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{ name: 'IntroScreen' }],
//         }),
//       );
//     } catch (error) {
//       console.log('Logout Error:', error);
//     }
//   };

//   const handleDelete = () => {
//     Alert.alert(
//       'Delete Account',
//       'Are you sure you want to permanently delete your account?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               // Call your delete API here if needed
//               await AsyncStorage.clear();
//               handleLogout();
//             } catch (error) {
//               Alert.alert('Error', 'Something went wrong.');
//             }
//           },
//         },
//       ],
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <DrawerContentScrollView {...props}>
//         {/* Profile Section */}
//         <View style={styles.profileContainer}>
//           {isRegistered ? (
//             <View style={styles.profileWrapper}>
//               <Image
//                 source={{
//                   uri: 'https://i.pravatar.cc/150?img=3',
//                 }}
//                 style={styles.profileImage}
//               />
//               <View>
//                 <Text style={styles.profileName}>{user?.name}</Text>
//                 <Text style={styles.profileEmail}>{user?.email}</Text>
//               </View>
//             </View>
//           ) : (
//             <Text style={styles.profileName}>Welcome Guest</Text>
//           )}
//         </View>

//         {/* Drawer Items */}
//         <DrawerItem
//           icon={({ size }) => (
//             <Icon name="home" size={size} color={colors.white} />
//           )}
//           label="Home"
//           labelStyle={{ color: colors.white }}
//           onPress={() => navigation.navigate('Tab')}
//         />

//         <DrawerItem
//           icon={({ size }) => (
//             <Icon name="settings" size={size} color={colors.white} />
//           )}
//           label="Settings"
//           labelStyle={{ color: colors.white }}
//           onPress={() => navigation.navigate('Settings')}
//         />
//       </DrawerContentScrollView>

//       {/* Bottom Section */}
//       <View style={styles.bottomSection}>
//         {isRegistered && (
//           <DrawerItem
//             icon={({ size }) => (
//               <Icon name="delete" size={size} color="#ffffff" />
//             )}
//             label="Delete Account"
//             labelStyle={{ color: colors.white }}
//             onPress={handleDelete}
//           />
//         )}

//         <DrawerItem
//           icon={({ size }) => (
//             <Icon name="logout" size={size} color="#ffffff" />
//           )}
//           label="Sign Out"
//           labelStyle={{ color: colors.white }}
//           onPress={handleLogout}
//         />
//       </View>
//     </View>
//   );
// };

// export default function SalesDrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       drawerContent={props => <DrawerContent {...props} />}
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: {
//           backgroundColor: colors.background,
//           drawerActiveTintColor: '#fff',
//           drawerInactiveTintColor: '#fff',
//         },
//       }}
//     >
//       <Drawer.Screen name="Tab" component={TabNavigator} />
//       <Drawer.Screen name="Settings" component={SettingsScreen} />
//     </Drawer.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   profileContainer: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#571717',
//   },
//   profileWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 15,
//   },
//   profileName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: colors.white,
//   },
//   profileEmail: {
//     fontSize: 13,
//     color: 'gray',
//   },
//   bottomSection: {
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     paddingBottom: 10,
//   },
// });
import React from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import TermsAndConditionsScreen from '../screens/Legal/TermsAndConditionsScreen';
import PrivacyPolicyScreen from '../screens/Legal/PrivacyPolicyScreen';
import RefundPolicyScreen from '../screens/Legal/RefundPolicyScreen';
import { colors } from '../theme/colors';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const { navigation } = props; // ✅ FIXED (no useNavigation)
  const isRegistered = useSelector(state => state.user?.isRegistered);
  const user = useSelector(state => state.user?.data);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();

      navigation.dispatch(DrawerActions.closeDrawer());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'IntroScreen' }],
        }),
      );
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              handleLogout();
            } catch (error) {
              Alert.alert('Error', 'Something went wrong.');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          {isRegistered ? (
            <View style={styles.profileWrapper}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.profileName}>Welcome Guest</Text>
          )}
        </View>

        {/* Drawer Items */}
        <DrawerItem
          icon={({ size }) => <Icon name="home" size={size} color="#fff" />}
          label="Home"
          labelStyle={styles.labelStyle}
          onPress={() => {
            navigation.navigate('Tab');
            navigation.closeDrawer();
          }}
        />

        <DrawerItem
          icon={({ size }) => <Icon name="settings" size={size} color="#fff" />}
          label="Settings"
          labelStyle={styles.labelStyle}
          onPress={() => {
            navigation.navigate('Settings');
            navigation.closeDrawer();
          }}
        />

        <DrawerItem
          icon={({ size }) => (
            <Icon name="description" size={size} color="#fff" />
          )}
          label="Terms & Conditions"
          labelStyle={styles.labelStyle}
          onPress={() => {
            navigation.navigate('Terms And Conditions');
            navigation.closeDrawer();
          }}
        />

        <DrawerItem
          icon={({ size }) => (
            <Icon name="privacy-tip" size={size} color="#fff" />
          )}
          label="Privacy Policy"
          labelStyle={styles.labelStyle}
          onPress={() => {
            navigation.navigate('Privacy Policy');
            navigation.closeDrawer();
          }}
        />

        <DrawerItem
          icon={({ size }) => (
            <Icon name="assignment-return" size={size} color="#fff" />
          )}
          label="Return Policy"
          labelStyle={styles.labelStyle}
          onPress={() => {
            navigation.navigate('Return Policy');
            navigation.closeDrawer();
          }}
        />
      </DrawerContentScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {isRegistered && (
          <DrawerItem
            icon={({ size }) => (
              <Icon name="delete" size={size} color="#ff4d4d" />
            )}
            label="Delete Account"
            labelStyle={styles.labelStyle}
            onPress={handleDelete}
          />
        )}

        <DrawerItem
          icon={({ size }) => (
            <Icon name="logout" size={size} color="#ff4d4d" />
          )}
          label="Logout"
          labelStyle={styles.labelStyle}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

export default function SalesDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#000', // ✅ Black Background
        },
        drawerActiveBackgroundColor: '#222',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#aaa',
      }}
    >
      <Drawer.Screen name="Tab" component={TabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen
        name="Terms And Conditions"
        component={TermsAndConditionsScreen}
      />
      <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
      <Drawer.Screen name="Return Policy" component={RefundPolicyScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // ✅ Black background
  },
  profileContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 13,
    color: '#aaa',
  },
  labelStyle: {
    color: '#fff',
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingBottom: 10,
  },
});
