import React, { use, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  addEventListener,
  startListening,
  stopListening,
} from '@ascendtis/react-native-voice-to-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/common/Header';
import { useNavigation } from '@react-navigation/native';

const VoiceScreen = () => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState('');
  const [rawText, setRawText] = useState('');
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const parseItems = text => {
    return text
      .toLowerCase()
      .replace(/[^a-z\s]/g, '') // remove symbols
      .split(/\s+/) // split by space
      .filter(
        word =>
          word.length > 2 && // remove "to", "of", etc
          !['and', 'with', 'water', 'please'].includes(word),
      );
  };

  useEffect(() => {
    requestMicrophonePermission();

    const startSub = addEventListener('onSpeechStart', () => {
      setIsListening(true);
      startPulse();
    });

    const endSub = addEventListener('onSpeechEnd', () => {
      stopPulse();
      setIsListening(false);
    });

    const resultSub = addEventListener('onSpeechResults', e => {
      console.log('Speech result:', e);

      if (!e?.value) return;

      const text = Array.isArray(e.value) ? e.value.join(' ') : e.value;

      setRawText(text);
      setResult(text);
      const parsedItems = parseItems(text);
      setItems(parsedItems);
    });

    const errorSub = addEventListener('onSpeechError', () => {
      stopPulse();
      setIsListening(false);
    });

    return () => {
      startSub.remove();
      endSub.remove();
      resultSub.remove();
      errorSub.remove();
    };
  }, []);

  const startPulse = () => {
    pulseAnim.setValue(0);
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopPulse = () => {
    pulseAnim.stopAnimation();
  };

  const requestMicrophonePermission = async () => {
    if (Platform.OS !== 'android') return true;
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
  };

  const onMicPress = async () => {
    try {
      if (isListening) {
        await stopListening();
      } else {
        setResult('');
        await startListening();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.2],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  const onBrowseProducts = async () => {
    const payload = {
      items, // ['sugar', 'rice']
    };

    console.log('Sending to backend:', payload);
    navigation.navigate('Products', { items });

    // await api.post('/search-products', payload);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Header />

        {/* CENTER CONTENT ONLY */}
        <View style={styles.centerContent}>
          {/* MIC + PULSE */}
          <View style={styles.micContainer}>
            {isListening && (
              <Animated.View
                style={[styles.pulse, { transform: [{ scale }], opacity }]}
              />
            )}

            <Pressable style={styles.mic} onPress={onMicPress}>
              <Icon name="microphone" size={42} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* TEXT */}
          <Text style={styles.listening}>
            {isListening ? 'Listening...' : 'Tap to speak'}
          </Text>
          <Text style={styles.sub}>Speak your order clearly</Text>

          {/* RESULT */}
          {!!result && (
            <>
              <Text style={styles.result}>{result}</Text>

              <Pressable style={styles.cta} onPress={onBrowseProducts}>
                <Text style={styles.ctaText}>Browse Products</Text>
              </Pressable>
            </>
          )}

          {/* CANCEL */}
          {isListening && (
            <Pressable onPress={() => stopListening()}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VoiceScreen;
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },

  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  micContainer: {
    height: 140,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pulse: {
    position: 'absolute',
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  mic: {
    height: 88,
    width: 88,
    borderRadius: 44,
    backgroundColor: '#1A1A1A', // deeper contrast
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },

  listening: {
    marginTop: 34,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sub: {
    color: '#A0A0A0',
    marginTop: 6,
  },
  result: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 20,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  cta: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  ctaText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  cancel: {
    marginTop: 40,
    color: '#FFFFFF',
    opacity: 0.7,
  },
});
