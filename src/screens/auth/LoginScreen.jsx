// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import AppSafeArea from '../../components/common/AppSafeArea';
// import AppView from '../../components/common/AppView';
// import AppText from '../../components/common/AppText';
// import AppButton from '../../components/common/AppButton';

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <AppSafeArea>
//       <AppView
//         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//       >
//         <AppText style={{ fontSize: 24, marginBottom: 20 }}>
//           Login Screen
//         </AppText>
//         <AppButton
//           title="Go to Home"
//           onPress={() => navigation.navigate('Home')}
//         >
//           <AppText style={{ color: '#fff' }}>Go to Home</AppText>
//         </AppButton>
//       </AppView>
//     </AppSafeArea>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({});
import React, { useRef, useState, useEffect } from 'react';
import {
  TextInput,
  Alert,
  View,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

import AppSafeArea from '../../components/common/AppSafeArea';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import AppView from '../../components/common/AppView';
import { useTheme } from '../../hooks/useTheme';

import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const [mobile, setMobile] = useState('');
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

  const isValidIndianNumber = number => /^[6-9]\d{9}$/.test(number);

  const handleGetOtp = () => {
    if (!isValidIndianNumber(mobile)) {
      Alert.alert('Invalid Number', 'Enter a valid Indian mobile number');
      return;
    }

    navigation.navigate('Otp', {
      mobile: `+91${mobile}`,
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

        <AppText style={[styles.subtitle]}>B2B Voice Ordering Platform</AppText>
      </Animated.View>

      {/* Login Card */}
      <AppView
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 14,
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
        }}
      >
        <AppText variant="title" style={styles.title}>
          Login With Mobile
        </AppText>

        <AppView
          style={[styles.inputRow, { borderColor: theme.colors.border }]}
        >
          <AppText style={styles.countryCode}>+91</AppText>

          <TextInput
            placeholder="Enter mobile number"
            placeholderTextColor={theme.colors.gray500}
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
            style={[styles.input, { color: theme.colors.text }]}
          />
        </AppView>

        <AppButton
          title="Get OTP "
          onPress={handleGetOtp}
          style={styles.button}
        />
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
    // marginBottom: 12,
  },

  divider: {
    width: 160,
    height: 1,
    marginBottom: 12,
    opacity: 0.9,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 14,
    letterSpacing: 1,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 8,
  },

  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  button: {
    // marginTop: 8,
    fontSize: 20,
  },
});
