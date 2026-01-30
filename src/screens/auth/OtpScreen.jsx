// import React, { useState } from 'react';
// import { View, TextInput } from 'react-native';
// import AppSafeArea from '../../components/common/AppSafeArea';
// import AppView from '../../components/common/AppView';
// import AppText from '../../components/common/AppText';
// import { useTheme } from '../../hooks/useTheme';
// import AppButton from '../../components/common/AppButton';

// export default function OtpScreen({ route, navigation }) {
//   const { theme } = useTheme();
//   const { mobile } = route.params;
//   const [otp, setOtp] = useState('');

//   const handleVerify = () => {
//     // TEMP: no API
//     navigation.replace('Home');
//   };

//   return (
//     <AppSafeArea style={{ padding: theme.spacing.lg }}>
//       <AppText variant="title" style={{ marginBottom: 8 }}>
//         Enter OTP
//       </AppText>

//       <AppText style={{ opacity: 0.7, marginBottom: 20 }}>
//         Sent to {mobile}
//       </AppText>

//       <AppView style={{ flexDirection: 'row', gap: 10, marginBottom: 30 }}>
//         {[...Array(6)].map((_, i) => (
//           <View
//             key={i}
//             style={{
//               width: 45,
//               height: 50,
//               borderRadius: 8,
//               borderWidth: 1,
//               borderColor: theme.colors.border,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <AppText>{otp[i] || ''}</AppText>
//           </View>
//         ))}
//       </AppView>

//       <TextInput
//         keyboardType="number-pad"
//         maxLength={6}
//         value={otp}
//         onChangeText={setOtp}
//         style={{ height: 0 }} // hidden input
//       />

//       <AppButton title="Verify & Login →" onPress={handleVerify} />

//       <AppText
//         style={{ marginTop: 20, textAlign: 'center', opacity: 0.7 }}
//         onPress={() => navigation.goBack()}
//       >
//         Change number
//       </AppText>
//     </AppSafeArea>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Animated,
  Pressable,
} from 'react-native';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import AppView from '../../components/common/AppView';
import { useTheme } from '../../hooks/useTheme';

import LinearGradient from 'react-native-linear-gradient';

export default function OtpScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { mobile } = route.params;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logo =
    theme.mode === 'dark'
      ? require('../../assets/images/light-logo.png')
      : require('../../assets/images/dark-logo.png');
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = () => {
    // dummy success
    navigation.reset({
      index: 0,
      routes: [{ name: 'Drawer' }],
    });
  };

  return (
    <AppSafeArea style={{ padding: theme.spacing.lg }}>
      {/* Logo Section */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        {/* <LinearGradient
          colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
          locations={[0, 0.25, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.divider}
        /> */}

        <AppText style={styles.subtitle}>B2B Voice Ordering Platform</AppText>
      </Animated.View>

      {/* OTP Card */}
      <AppView
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 14,
          padding: theme.spacing.lg,
        }}
      >
        <AppText variant="title" style={styles.title}>
          Enter OTP
        </AppText>

        <AppText style={styles.sentText}>Sent to {mobile}</AppText>

        {/* OTP Boxes */}
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
                { borderColor: theme.colors.border, color: theme.colors.text },
              ]}
            />
          ))}
        </AppView>

        <AppButton
          title="Verify & Login"
          onPress={handleVerify}
          style={styles.button}
        />

        <Pressable onPress={() => navigation.goBack()}>
          <AppText style={styles.changeNumber}>Change number</AppText>
        </Pressable>
      </AppView>
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

  divider: {
    width: 160,
    height: 1,
    marginBottom: 12,
    opacity: 0.9,
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
    // marginBottom: 12,
    fontSize: 16,
  },

  changeNumber: {
    textAlign: 'center',
    opacity: 0.8,
    fontSize: 16,
    marginVertical: 10,
  },
});
