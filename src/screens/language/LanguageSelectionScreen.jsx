import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const logo = require('../../assets/images/light-logo.png');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const languages = [
    { id: 'hinglish', label: 'Hinglish', code: 'hinglish' },
    { id: 'hindi', label: 'Hindi', code: 'hi' },
    { id: 'english', label: 'English', code: 'en' },
  ];

  const handleLanguageSelection = language => {
    setSelectedLanguage(language.id);
    console.log(`Language selected: ${language.label}`);
    console.log(`Language code: ${language.code}`);
  };

  const handleStartPress = () => {
    if (selectedLanguage) {
      console.log(`Proceeding with language: ${selectedLanguage}`);
      const timer = setTimeout(() => {
        navigation.navigate('Auth');
      }, 3000);
      // Navigate to Auth screen
      navigation.replace('Auth');
    } else {
      console.log('No language selected');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0B" />

      <View style={styles.background} />

      {/* Logo Section with Animation */}
      <Animated.View style={[styles.logoSection, { opacity: fadeAnim }]}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <LinearGradient
          colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
          locations={[0, 0.25, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.divider}
        />

        <Text style={styles.subtitle}>B2B Voice Ordering Platform</Text>
      </Animated.View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Apka Swaagat Jai,</Text>
          <Text style={styles.welcomeText}>Kripaya Apni Bhasa Chune</Text>
        </View>

        {/* Language Options */}
        <View style={styles.languageContainer}>
          {languages.map(language => (
            <TouchableOpacity
              key={language.id}
              style={[
                styles.languageButton,
                selectedLanguage === language.id &&
                  styles.languageButtonSelected,
              ]}
              onPress={() => handleLanguageSelection(language)}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  selectedLanguage === language.id &&
                    styles.languageButtonTextSelected,
                ]}
              >
                {language.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={[
            styles.startButton,
            !selectedLanguage && styles.startButtonDisabled,
          ]}
          onPress={handleStartPress}
          disabled={!selectedLanguage}
        >
          <Text style={styles.startButtonText}>Shuru Karein</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0B0B0B',
  },

  logoSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 320,
    height: 100,
    marginBottom: 10,
  },

  divider: {
    width: 160,
    height: 1,
    marginBottom: 12,
    opacity: 0.9,
    transform: [{ scaleX: 0.85 }],
  },

  subtitle: {
    fontSize: 14,
    color: '#747474',
    letterSpacing: 1,
  },

  contentSection: {
    flex: 0.6,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },

  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.white,
    marginBottom: 8,
  },

  languageContainer: {
    gap: 16,
    marginBottom: 30,
  },

  languageButton: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  languageButtonSelected: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },

  languageButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },

  languageButtonTextSelected: {
    color: '#000000',
  },

  startButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  startButtonDisabled: {
    backgroundColor: colors.textMuted,
    opacity: 0.5,
  },

  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
});

export default LanguageSelectionScreen;
