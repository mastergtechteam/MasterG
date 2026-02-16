// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Image,
//   Animated,
//   Pressable,
//   KeyboardAvoidingView,
// } from 'react-native';

// import AppSafeArea from '../../components/common/AppSafeArea';
// import AppText from '../../components/common/AppText';
// import AppButton from '../../components/common/AppButton';
// import AppView from '../../components/common/AppView';

// import LinearGradient from 'react-native-linear-gradient';
// import { colors } from '../../theme/colors';
// import { spacing } from '../../theme/spacing';

// export default function OtpScreen({ navigation, route }) {
//   const { mobile } = route.params;

//   const [otp, setOtp] = useState(['', '', '', '']);
//   const inputs = useRef([]);
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   // Dark-only logo
//   const logo = require('../../assets/images/light-logo.png');

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1200,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const handleChange = (value, index) => {
//     if (/^\d$/.test(value) || value === '') {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value && index < 3) {
//         inputs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleVerify = () => {
//     const enteredOtp = otp.join('');

//     if (enteredOtp.length !== 4) {
//       return;
//     }

//     // navigation.reset({
//     //   index: 0,
//     //   routes: [{ name: 'Register' }],
//     // });
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'App' }],
//     });
//   };

//   return (
//     <AppSafeArea style={{ padding: spacing.lg }}>
//       {/* Logo Section */}
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

//         {/* OTP Card */}
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

//           {/* OTP Boxes */}
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

//           <AppButton
//             title="Verify & Login"
//             onPress={handleVerify}
//             style={styles.button}
//           />

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
//     width: 46,
//     height: 54,
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
// });

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Image,
//   Animated,
//   Pressable,
//   KeyboardAvoidingView,
// } from 'react-native';

// import AppSafeArea from '../../components/common/AppSafeArea';
// import AppText from '../../components/common/AppText';
// import AppButton from '../../components/common/AppButton';
// import AppView from '../../components/common/AppView';
// import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

// import LinearGradient from 'react-native-linear-gradient';
// import { colors } from '../../theme/colors';
// import { spacing } from '../../theme/spacing';

// export default function OtpScreen({ navigation, route }) {
//   const { mobile, confirmation } = route.params;

//   const [otp, setOtp] = useState(['', '', '', '', '', '']);

//   const [loading, setLoading] = useState(false);

//   const inputs = useRef([]);
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   // Dark-only logo
//   const logo = require('../../assets/images/light-logo.png');

//   useEffect(() => {
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

//       // Move forward
//       if (value && index < 5) {
//         inputs.current[index + 1].focus();
//       }

//       // Move backward on delete
//       if (!value && index > 0) {
//         inputs.current[index - 1].focus();
//       }
//     }
//   };

//   const handleVerify = async () => {
//     const enteredOtp = otp.join('');

//     if (enteredOtp.length !== 6) return;

//     try {
//       setLoading(true);

//       const response = await confirmation.confirm(enteredOtp);

//       console.log('User Verified:', response.user);

//       // Navigation handled by auth listener
//     } catch (error) {
//       console.log('OTP Verify Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AppSafeArea style={{ padding: spacing.lg }}>
//       {/* Logo Section */}
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

//         {/* OTP Card */}
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

//           {/* OTP Boxes */}
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

//           <AppButton
//             title={loading ? 'Verifying...' : 'Verify & Login'}
//             onPress={handleVerify}
//             style={styles.button}
//           />

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
//     width: 46,
//     height: 54,
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

export default function OtpScreen({ navigation, route }) {
  const { mobile } = route.params;

  const confirmation = getConfirmation();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }],
        });
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
    } catch (error) {
      console.log('OTP Verify Error:', error);
    } finally {
      setLoading(false);
    }
  };

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

          <AppButton
            title={loading ? 'Verifying...' : 'Verify & Login'}
            onPress={handleVerify}
            style={styles.button}
          />

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
    width: 46,
    height: 54,
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
});
