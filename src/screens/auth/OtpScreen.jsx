// import React, { useEffect, useRef, useState } from 'react';
// import {
//   StyleSheet,
//   TextInput,
//   Image,
//   Animated,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
//   Text,
//   TouchableOpacity,
// } from 'react-native';

// import AppSafeArea from '../../components/common/AppSafeArea';
// import AppText from '../../components/common/AppText';
// import AppButton from '../../components/common/AppButton';
// import AppView from '../../components/common/AppView';

// import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
// import { getConfirmation } from '../../utils/authStore';

// import LinearGradient from 'react-native-linear-gradient';
// import { colors } from '../../theme/colors';
// import { spacing } from '../../theme/spacing';

// export default function OtpScreen({ navigation, route }) {
//   const { mobile } = route.params;

//   const confirmation = getConfirmation();

//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [loading, setLoading] = useState(false);

//   const inputs = useRef([]);
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   const logo = require('../../assets/images/light-logo.png');

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1200,
//       useNativeDriver: true,
//     }).start();

//     const unsubscribe = onAuthStateChanged(getAuth(), user => {
//       if (user) {
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'App' }],
//         });
//       }
//     });

//     return unsubscribe;
//   }, []);

//   const handleChange = (value, index) => {
//     if (/^\d$/.test(value) || value === '') {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value && index < 5) {
//         inputs.current[index + 1].focus();
//       }

//       if (!value && index > 0) {
//         inputs.current[index - 1].focus();
//       }
//     }
//   };

//   const handleVerify = async () => {
//     const enteredOtp = otp.join('');

//     if (enteredOtp.length !== 6) return;

//     if (!confirmation) {
//       console.log('Confirmation object missing');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await confirmation.confirm(enteredOtp);

//       console.log('User Verified:', response.user);
//     } catch (error) {
//       console.log('OTP Verify Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AppSafeArea style={{ padding: spacing.lg }}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//           <Image source={logo} style={styles.logo} resizeMode="contain" />
//           <LinearGradient
//             colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
//             locations={[0, 0.25, 0.5, 1]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.divider}
//           />
//           <AppText style={styles.subtitle}>B2B Voice Ordering Platform</AppText>
//         </Animated.View>

//         <AppView
//           style={{
//             borderWidth: 1,
//             borderColor: colors.border,
//             borderRadius: 14,
//             padding: spacing.lg,
//           }}
//         >
//           <AppText style={styles.title}>Enter OTP</AppText>

//           <AppText style={styles.sentText}>Sent to {mobile}</AppText>

//           <AppView style={styles.otpRow}>
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={ref => (inputs.current[index] = ref)}
//                 value={digit}
//                 onChangeText={val => handleChange(val, index)}
//                 keyboardType="number-pad"
//                 maxLength={1}
//                 style={[
//                   styles.otpBox,
//                   {
//                     borderColor: colors.border,
//                     color: colors.textPrimary,
//                   },
//                 ]}
//               />
//             ))}
//           </AppView>

//           {/* <AppButton
//             title={loading ? 'Verifying...' : 'Verify & Login'}
//             onPress={handleVerify}
//             style={styles.button}
//           /> */}

//           <TouchableOpacity style={styles.OtpButton} onPress={handleVerify}>
//             <Text style={styles.OtpButtonTextSelected}>
//               {loading ? 'Verifying...' : 'Verify & Login'}
//             </Text>
//           </TouchableOpacity>

//           <Pressable onPress={() => navigation.goBack()}>
//             <AppText style={styles.changeNumber}>Change number</AppText>
//           </Pressable>
//         </AppView>
//       </KeyboardAvoidingView>
//     </AppSafeArea>
//   );
// }
// const styles = StyleSheet.create({
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   logo: {
//     width: 300,
//     height: 90,
//     marginBottom: 12,
//   },

//   subtitle: {
//     fontSize: 14,
//     letterSpacing: 1,
//   },

//   title: {
//     fontSize: 20,
//     marginBottom: 6,
//   },

//   sentText: {
//     opacity: 0.6,
//     marginBottom: 20,
//     fontSize: 16,
//   },

//   otpRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },

//   otpBox: {
//     width: 40,
//     height: 50,
//     borderWidth: 1.5,
//     borderRadius: 10,
//     textAlign: 'center',
//     fontSize: 18,
//   },

//   button: {
//     fontSize: 16,
//   },

//   changeNumber: {
//     textAlign: 'center',
//     opacity: 0.8,
//     fontSize: 16,
//     marginVertical: 10,
//   },
//   divider: {
//     width: 160,
//     height: 1,
//     marginBottom: 12,
//     opacity: 0.9,
//     transform: [{ scaleX: 0.85 }],
//   },
//   OtpButton: {
//     paddingVertical: 16,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: colors.border,
//     backgroundColor: colors.white,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   OtpButtonTextSelected: {
//     color: '#000000',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import AppView from '../../components/common/AppView';

import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { getConfirmation } from '../../utils/authStore';

import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../api/apiClient';

export default function OtpScreen({ navigation, route }) {
  const { mobile } = route.params;

  const confirmation = getConfirmation();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'App' }],
        // });
        navigation.navigate('GetLocation');
      }
    });

    return unsubscribe;
  }, []);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }

      if (!value && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) return;

    if (!confirmation) {
      console.log('Confirmation object missing');
      return;
    }

    try {
      setLoading(true);

      const response = await confirmation.confirm(enteredOtp);

      console.log('User Verified:', response.user);

      const uuid = response?.user?._user?.uid;
      const mobileNumber = response?.user?.phoneNumber; // Firebase phone number
      await AsyncStorage.setItem('user_uuid', uuid);
      await AsyncStorage.setItem('user_mobile', mobileNumber);

      // console.log('Stored UUID:', uuid);
      // console.log('Stored Mobile:', mobileNumber);

      // 🔹 Log all AsyncStorage data
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      console.log('All AsyncStorage Data:', items);

      await ensureRetailerExists();
    } catch (error) {
      console.log('OTP Verify Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // async function ensureRetailerExists(id) {
  //   const baseUrl =
  //     `${BASE_URL}/retailers`;

  //   try {
  //     console.log('🔍 Checking retailer with ID:', id);

  //     // 1️⃣ Check if retailer exists
  //     const checkResponse = await fetch(`${baseUrl}/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const checkData = await checkResponse.json();
  //     console.log('📥 Check response:', checkData);

  //     // 2️⃣ If retailer not found → Create retailer
  //     if (!checkData.success && checkData.message === 'Retailer not found') {
  //       console.log('⚠️ Retailer not found. Creating retailer...');

  //       const createResponse = await fetch(baseUrl, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           retailerId: id,
  //           contact: {
  //             mobile: '9876543210',
  //           },
  //           status: 'ACTIVE',
  //         }),
  //       });

  //       const createData = await createResponse.json();
  //       console.log('✅ Create response:', createData);

  //       return createData;
  //     }

  //     console.log('✅ Retailer already exists.');
  //     return checkData;
  //   } catch (error) {
  //     console.error('❌ Error:', error);
  //     throw error;
  //   }
  // }

  async function ensureRetailerExists() {
    const TAG = '[API:OTP]';
    const baseUrl =
      `${BASE_URL}/retailers`;

    try {
      const uuid = await AsyncStorage.getItem('user_uuid');
      const mobileNumber = await AsyncStorage.getItem('user_mobile');

      console.log(TAG, '📦 UUID:', uuid);
      console.log(TAG, '📦 Mobile:', mobileNumber);

      if (!uuid) {
        console.warn(TAG, '❌ UUID not found in storage');
        return;
      }

      // 1️⃣ Check if retailer exists
      console.log(TAG, `▶ GET ${baseUrl}/${uuid}`);
      let start = Date.now();
      const checkResponse = await fetch(`${baseUrl}/${uuid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const checkData = await checkResponse.json();
      console.log(TAG, `⏱ Check — ${Date.now() - start}ms | status: ${checkResponse.status}`);
      console.log(TAG, '📩 Check response:', JSON.stringify(checkData, null, 2));

      // 2️⃣ If not found → Create retailer
      if (!checkData.success && checkData.message === 'Retailer not found') {
        console.log(TAG, '⚠️ Retailer not found — creating...');
        const body = {
          retailerId: uuid,
          contact: { mobile: mobileNumber },
          status: 'ACTIVE',
        };
        console.log(TAG, '▶ POST retailers:', JSON.stringify(body, null, 2));
        start = Date.now();

        const createResponse = await fetch(baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const createData = await createResponse.json();
        console.log(TAG, `⏱ Create — ${Date.now() - start}ms | status: ${createResponse.status}`);
        console.log(TAG, '📩 Create response:', JSON.stringify(createData, null, 2));
        return createData;
      }

      console.log(TAG, '✅ Retailer already exists');
      return checkData;
    } catch (error) {
      console.error(TAG, '❌ Error:', error.message);
      throw error;
    }
  }

  return (
    <AppSafeArea style={{ padding: spacing.lg }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <LinearGradient
            colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
            locations={[0, 0.25, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.divider}
          />
          <AppText style={styles.subtitle}>B2B Voice Ordering Platform</AppText>
        </Animated.View>

        <AppView
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: spacing.lg,
          }}
        >
          <AppText style={styles.title}>Enter OTP</AppText>

          <AppText style={styles.sentText}>Sent to {mobile}</AppText>

          <AppView style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref)}
                value={digit}
                onChangeText={val => handleChange(val, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={[
                  styles.otpBox,
                  {
                    borderColor: colors.border,
                    color: colors.textPrimary,
                  },
                ]}
              />
            ))}
          </AppView>

          <TouchableOpacity style={styles.OtpButton} onPress={handleVerify}>
            <Text style={styles.OtpButtonTextSelected}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </Text>
          </TouchableOpacity>

          <Pressable onPress={() => navigation.goBack()}>
            <AppText style={styles.changeNumber}>Change number</AppText>
          </Pressable>
        </AppView>
      </KeyboardAvoidingView>
    </AppSafeArea>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 90,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    letterSpacing: 1,
  },

  title: {
    fontSize: 20,
    marginBottom: 6,
  },

  sentText: {
    opacity: 0.6,
    marginBottom: 20,
    fontSize: 16,
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  otpBox: {
    width: 40,
    height: 48,
    borderWidth: 1.5,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
  },

  button: {
    fontSize: 16,
  },

  changeNumber: {
    textAlign: 'center',
    opacity: 0.8,
    fontSize: 16,
    marginVertical: 10,
  },
  divider: {
    width: 160,
    height: 1,
    marginBottom: 12,
    opacity: 0.9,
    transform: [{ scaleX: 0.85 }],
  },
  OtpButton: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    marginBottom: 10,
  },
  OtpButtonTextSelected: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});
