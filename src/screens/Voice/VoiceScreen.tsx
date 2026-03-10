import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  useColorScheme,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  addEventListener,
  startListening,
  stopListening,
} from '@ascendtis/react-native-voice-to-text';

import aiAgentService from '../services/aiAgentService';
import ttsService from '../services/ttsService';
import productService from '../services/productService';
import ProductCard from '../../components/Product/ProductCard';
import CartBottomTab from '../../components/common/cartBottomTab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  quantity?: number;
  price?: number;
  description?: string;
}

const VoiceWave = ({ isActive }: { isActive: boolean }) => {
  const waves = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    if (isActive) {
      waves.forEach(wave => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(wave, {
              toValue: 1,
              duration: 600,
              useNativeDriver: false,
            }),
            Animated.timing(wave, {
              toValue: 0,
              duration: 600,
              useNativeDriver: false,
            }),
          ]),
        ).start();
      });
    }
  }, [isActive]);

  return (
    <View style={styles.waveContainer}>
      {waves.map((wave, index) => (
        <Animated.View
          key={index}
          style={[
            styles.wave,
            {
              height: wave.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 60],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
};

function VoiceScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <AppContent />
      <CartBottomTab />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [hasSearched, setHasSearched] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const [isListening, setIsListening_] = useState(false);
  const setIsListening = (val: boolean) => {
    isListeningRef.current = val;
    setIsListening_(val);
  };

  const [status, setStatus] = useState('🎤 Hold to speak');
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [debugMessage, setDebugMessage] = useState('');

  const currentTranscriptRef = useRef<string>('');
  const isListeningRef = useRef<boolean>(false);
  const addedProductsRef = useRef<Set<string>>(new Set());
  const lastProcessTimeRef = useRef<number>(0);
  const DEBOUNCE_DELAY = 500;

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setStatus('Loading products...');
        await productService.initialize();
        setStatus('Ready');
      } catch (error) {
        setStatus('Error loading products');
      }
    };
    initializeApp();
  }, []);

  useEffect(() => {
    const startSub = addEventListener('onSpeechStart', () => {
      setIsListening(true);
      setStatus('🎤 Listening...');
      setDebugMessage('EVENT: onSpeechStart fired');

      setCurrentTranscript('');
      currentTranscriptRef.current = '';
    });

    const resultSub = addEventListener('onSpeechResults', async e => {
      if (!e?.value) return;

      const text = Array.isArray(e.value) ? e.value.join(' ') : e.value;

      setDebugMessage(`EVENT: onSpeechResults → ${text}`);

      const finalText = text.trim();
      if (!finalText) return;

      currentTranscriptRef.current = finalText;
      setCurrentTranscript(finalText);

      await handleUserInput(finalText);
    });

    const endSub = addEventListener('onSpeechEnd', () => {
      setIsListening(false);
      setDebugMessage('EVENT: onSpeechEnd fired');
    });

    const errorSub = addEventListener('onSpeechError', e => {
      setIsListening(false);
      setDebugMessage(`EVENT: ERROR → ${JSON.stringify(e)}`);
      setStatus('⚠️ Voice error');
    });

    return () => {
      startSub.remove();
      resultSub.remove();
      endSub.remove();
      errorSub.remove();
    };
  }, []);

  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isListening) {
      pulseAnim.setValue(0);
      Animated.loop(
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      pulseAnim.stopAnimation();
    }
  }, [isListening]);

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.2],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  const handleUserInput = async (userMessage: string) => {
    setHasSearched(true);

    if (!userMessage.trim()) {
      setStatus('Ready');
      return;
    }

    const now = Date.now();
    if (now - lastProcessTimeRef.current < DEBOUNCE_DELAY) return;
    lastProcessTimeRef.current = now;

    try {
      setStatus('⏳ Searching...');
      const result = await aiAgentService.searchForProduct(userMessage);

      if (result.productFound && result.products?.length) {
        const newProducts: Product[] = [];

        for (const foundProduct of result.products) {
          if (!addedProductsRef.current.has(foundProduct.productId)) {
            addedProductsRef.current.add(foundProduct.productId);
            newProducts.push({
              id: foundProduct.productId,
              name: foundProduct.name,
              imageUrl: foundProduct.image || '',
              quantity: 1,
              price: Number(foundProduct.pricing.sellingPrice),
              description: foundProduct.description,
            });
          }
        }

        if (newProducts.length > 0) {
          setDisplayProducts(prev => [...prev, ...newProducts]);
          setStatus(`✅ Added ${newProducts.length} product(s)`);
          ttsService.speakProductFound().catch(console.error);
        } else {
          setStatus('⚠️ Already added');
        }
      } else {
        setStatus(`❌ "${userMessage}" not available`);

        ttsService
          .speak(`Sorry, ${userMessage} is currently not available`)
          .catch(console.error);
      }

      setCurrentTranscript('');
      currentTranscriptRef.current = '';
    } catch {
      setStatus('⚠️ Error');
    }
  };

  const handleMicPress = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setStatus('Mic permission denied');
          return;
        }
      }

      setStatus('🎤 Listening...');
      await startListening();
    } catch (error) {
      console.log('Start error:', error);
      setStatus('Start failed');
    }
  };

  const handleMicRelease = async () => {
    try {
      if (!isListeningRef.current) return;
      await stopListening();
    } catch {
      setIsListening(false);
    }
  };

  const bgColor = isDarkMode ? '#1a1a1a' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const cardBg = isDarkMode ? '#2a2a2a' : '#f8f8f8';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>MasterG Voice Assistant</Text>
        <Text style={styles.subtitle}>
          {isListening
            ? 'Listening... Speak clearly'
            : 'Hold the mic and say items like "Sugar 1kg"'}
        </Text>
      </View>

      {/* PRODUCTS */}
      {displayProducts.length > 0 && (
        <FlatList
          data={displayProducts}
          keyExtractor={(item, index) => item.id + index}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 140,
          }}
          renderItem={({ item }) => (
            <ProductCard
              item={{
                productId: item.id,
                name: item.name,
                image: item.imageUrl,
                description: item.description,
                pricing: {
                  sellingPrice: item.price,
                  mrp: item.price,
                },
                quantity: {
                  value: 1,
                  unit: '',
                },
              }}
            />
          )}
        />
      )}

      {/* CENTER MIC (Before Search) */}
      {!hasSearched && (
        <View style={styles.centerMicContainer}>
          <View style={styles.micWrapper}>
            {isListening && (
              <Animated.View
                style={[styles.pulse, { transform: [{ scale }], opacity }]}
              />
            )}

            <Pressable
              onPressIn={handleMicPress}
              onPressOut={handleMicRelease}
              style={styles.mic}
            >
              <Icon name="microphone" size={42} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      )}

      {/* BOTTOM MIC (After Search) */}
      {hasSearched && (
        <View style={styles.bottomMicContainer}>
          <View style={styles.micWrapperSmall}>
            {isListening && (
              <Animated.View
                style={[styles.pulseSmall, { transform: [{ scale }], opacity }]}
              />
            )}

            <Pressable
              onPressIn={handleMicPress}
              onPressOut={handleMicRelease}
              style={styles.micSmall}
            >
              <Icon name="microphone" size={42} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },

  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 13,
    color: '#A0A0A0',
    marginTop: 6,
    textAlign: 'center',
  },

  centerMicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  micWrapper: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pulse: {
    position: 'absolute',
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(76,175,80,0.15)',
  },

  mic: {
    height: 88,
    width: 88,
    borderRadius: 44,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },

  micIcon: {
    fontSize: 40,
  },

  bottomMicContainer: {
    position: 'absolute',
    bottom: 150,
    right: 20,
  },

  micWrapperSmall: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pulseSmall: {
    position: 'absolute',
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(76,175,80,0.15)',
  },

  micSmall: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },

  productCard: {
    flex: 0.48,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },

  productImage: {
    height: 90,
    marginBottom: 8,
  },

  productName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  productPrice: {
    marginTop: 6,
    color: '#4CAF50',
    fontWeight: '700',
  },
  visualizerContainer: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 16,
  },
  wave: {
    width: 8,
    marginHorizontal: 6,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  visualizerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  transcriptText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  micContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  // micIcon: {
  //   fontSize: 48,
  // },
  // bottomMicContainer: {
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingVertical: 16,
  //   paddingHorizontal: 20,
  //   borderTopWidth: 1,
  //   gap: 8,
  // },
  micLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  chatSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  chatMessage: {
    marginBottom: 12,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
  },
  chatBubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '80%',
  },
  chatContent: {
    fontSize: 14,
    marginBottom: 4,
  },
  chatTime: {
    fontSize: 10,
  },
  productDisplaySection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  productDisplayTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  productCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    marginBottom: 12,
  },
  productDisplayName: {
    fontSize: 18,
    fontWeight: '700',
  },
  productId: {
    fontSize: 11,
    color: '#999',
  },
  productQuantity: {
    fontSize: 13,
    color: '#666',
  },
  productDescription: {
    fontSize: 12,
  },
  // productPrice: {
  //   fontSize: 18,
  //   fontWeight: '700',
  // },
  productGridRow: {
    gap: 10,
    justifyContent: 'space-between',
  },
  productGridCard: {
    flex: 0.48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  productGridName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  productGridPrice: {
    fontSize: 14,
    fontWeight: '700',
  },
  productGridAddBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productGridAddText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  addToCartBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  cartSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 12,
  },
  cartTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    marginTop: 8,
  },
  cartTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  cartTotalPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  cartGridRow: {
    gap: 10,
    justifyContent: 'space-between',
  },
  cartGridItem: {
    flex: 0.48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemDeleteBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemDeleteIcon: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cartGridItemName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 6,
  },
  cartGridItemPrice: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  cartGridItemQty: {
    fontSize: 11,
    marginBottom: 4,
  },
  cartGridItemTotal: {
    fontSize: 12,
  },
  spacer: {
    height: 20,
  },
});

export default VoiceScreen;
