// import React, { use, useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   Animated,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   addEventListener,
//   startListening,
//   stopListening,
// } from '@ascendtis/react-native-voice-to-text';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../components/common/Header';
// import { useNavigation } from '@react-navigation/native';

// const VoiceScreen = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [result, setResult] = useState('');
//   const [rawText, setRawText] = useState('');
//   const [items, setItems] = useState([]);
//   const navigation = useNavigation();

//   const pulseAnim = useRef(new Animated.Value(0)).current;
//   const parseItems = text => {
//     return text
//       .toLowerCase()
//       .replace(/[^a-z\s]/g, '') // remove symbols
//       .split(/\s+/) // split by space
//       .filter(
//         word =>
//           word.length > 2 && // remove "to", "of", etc
//           !['and', 'with', 'water', 'please'].includes(word),
//       );
//   };

//   useEffect(() => {
//     requestMicrophonePermission();

//     const startSub = addEventListener('onSpeechStart', () => {
//       setIsListening(true);
//       startPulse();
//     });

//     const endSub = addEventListener('onSpeechEnd', () => {
//       stopPulse();
//       setIsListening(false);
//     });

//     const resultSub = addEventListener('onSpeechResults', e => {
//       console.log('Speech result:', e);

//       if (!e?.value) return;

//       const text = Array.isArray(e.value) ? e.value.join(' ') : e.value;

//       setRawText(text);
//       setResult(text);
//       const parsedItems = parseItems(text);
//       setItems(parsedItems);
//     });

//     const errorSub = addEventListener('onSpeechError', () => {
//       stopPulse();
//       setIsListening(false);
//     });

//     return () => {
//       startSub.remove();
//       endSub.remove();
//       resultSub.remove();
//       errorSub.remove();
//     };
//   }, []);

//   const startPulse = () => {
//     pulseAnim.setValue(0);
//     Animated.loop(
//       Animated.timing(pulseAnim, {
//         toValue: 1,
//         duration: 1500,
//         useNativeDriver: true,
//       }),
//     ).start();
//   };

//   const stopPulse = () => {
//     pulseAnim.stopAnimation();
//   };

//   const requestMicrophonePermission = async () => {
//     if (Platform.OS !== 'android') return true;
//     await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//     );
//   };

//   const onMicPress = async () => {
//     try {
//       if (isListening) {
//         await stopListening();
//       } else {
//         setResult('');
//         await startListening();
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const scale = pulseAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 2.2],
//   });

//   const opacity = pulseAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.6, 0],
//   });

//   const onBrowseProducts = async () => {
//     const payload = {
//       items, // ['sugar', 'rice']
//     };

//     console.log('Sending to backend:', payload);
//     navigation.navigate('Products', { items });

//     // await api.post('/search-products', payload);
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.container}>
//         <Header />

//         {/* CENTER CONTENT ONLY */}
//         <View style={styles.centerContent}>
//           {/* MIC + PULSE */}
//           <View style={styles.micContainer}>
//             {isListening && (
//               <Animated.View
//                 style={[styles.pulse, { transform: [{ scale }], opacity }]}
//               />
//             )}

//             <Pressable style={styles.mic} onPress={onMicPress}>
//               <Icon name="microphone" size={42} color="#FFFFFF" />
//             </Pressable>
//           </View>

//           {/* TEXT */}
//           <Text style={styles.listening}>
//             {isListening ? 'Listening...' : 'Tap to speak'}
//           </Text>
//           <Text style={styles.sub}>Speak your order clearly</Text>

//           {/* RESULT */}
//           {!!result && (
//             <>
//               <Text style={styles.result}>{result}</Text>

//               <Pressable style={styles.cta} onPress={onBrowseProducts}>
//                 <Text style={styles.ctaText}>Browse Products</Text>
//               </Pressable>
//             </>
//           )}

//           {/* CANCEL */}
//           {isListening && (
//             <Pressable onPress={() => stopListening()}>
//               <Text style={styles.cancel}>Cancel</Text>
//             </Pressable>
//           )}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VoiceScreen;
// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#0D0D0D',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#0D0D0D',
//   },

//   centerContent: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   micContainer: {
//     height: 140,
//     width: 140,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   pulse: {
//     position: 'absolute',
//     height: 120,
//     width: 120,
//     borderRadius: 60,
//     backgroundColor: 'rgba(255,255,255,0.12)',
//   },

//   mic: {
//     height: 88,
//     width: 88,
//     borderRadius: 44,
//     backgroundColor: '#1A1A1A', // deeper contrast
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 8,
//   },

//   listening: {
//     marginTop: 34,
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   sub: {
//     color: '#A0A0A0',
//     marginTop: 6,
//   },
//   result: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     marginTop: 20,
//     paddingHorizontal: 24,
//     textAlign: 'center',
//   },
//   cta: {
//     marginTop: 20,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 30,
//     paddingVertical: 12,
//     borderRadius: 30,
//   },
//   ctaText: {
//     color: '#000',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   cancel: {
//     marginTop: 40,
//     color: '#FFFFFF',
//     opacity: 0.7,
//   },
// });

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Alert,
//   ScrollView,
//   useColorScheme,
//   Animated,
//   Dimensions,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   Pressable,
// } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
// import { voiceService, VoiceServiceConfig } from '../services/voiceService';
// import aiAgentService from '../services/aiAgentService';
// import ttsService from '../services/ttsService';
// import productService from '../services/productService';
// import { NativeModules } from 'react-native';

// console.log('Voice Native Module:', NativeModules.Voice);

// const { width } = Dimensions.get('window');

// // Type definitions
// interface Product {
//   id: string;
//   name: string;
//   imageUrl?: string;
//   quantity?: number;
//   price?: number;
//   description?: string;
// }

// // Voice Wave Animated Component
// const VoiceWave = ({ isActive }: { isActive: boolean }) => {
//   const waves = useRef([
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//   ]).current;

//   useEffect(() => {
//     if (isActive) {
//       waves.forEach((wave, index) => {
//         Animated.loop(
//           Animated.sequence([
//             Animated.timing(wave, {
//               toValue: 1,
//               duration: 600,
//               useNativeDriver: false,
//             }),
//             Animated.timing(wave, {
//               toValue: 0,
//               duration: 600,
//               useNativeDriver: false,
//             }),
//           ]),
//         ).start();
//       });
//     }
//   }, [isActive, waves]);

//   return (
//     <View style={styles.waveContainer}>
//       {waves.map((wave, index) => (
//         <Animated.View
//           key={index}
//           style={[
//             styles.wave,
//             {
//               height: wave.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [20, 60],
//               }),
//             },
//           ]}
//         />
//       ))}
//     </View>
//   );
// };

// function VoiceScreen() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();
//   const isDarkMode = useColorScheme() === 'dark';

//   // State management
//   const [isListening, setIsListening_] = useState(false);
//   const setIsListening = (val: boolean) => {
//     isListeningRef.current = val;
//     setIsListening_(val);
//   };
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [status, setStatus] = useState('🎤 Hold to speak');
//   const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
//   const [conversationLog, setConversationLog] = useState<any[]>([]);
//   const [cartItems, setCartItems] = useState<Product[]>([]);
//   const [currentTranscript, setCurrentTranscript] = useState('');
//   const [lastSearchQuery, setLastSearchQuery] = useState<string>('');

//   // Refs to prevent duplicate API calls and implement debouncing
//   const recentSearchesRef = useRef<Map<string, number>>(new Map());
//   const processTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const lastProcessTimeRef = useRef<number>(0);
//   const currentTranscriptRef = useRef<string>(''); // Track latest transcript
//   const addedProductsRef = useRef<Set<string>>(new Set()); // Track added product IDs
//   const isListeningRef = useRef<boolean>(false); // Ref mirror of isListening (avoids stale closure in async handlers)
//   const DEBOUNCE_DELAY = 500; // ms - wait 500ms after final result before processing

//   // Initialize products and voice service
//   useEffect(() => {
//     const initializeApp = async () => {
//       try {
//         setStatus('Loading products...');
//         await productService.initialize();
//         setStatus('Ready');
//       } catch (error) {
//         console.error('Error initializing product service:', error);
//         setStatus('Error loading products');
//       }
//     };

//     initializeApp();
//   }, []);

//   // Initialize voice service
//   useEffect(() => {
//     const initVoiceService = () => {
//       try {
//         const voiceConfig: VoiceServiceConfig = {
//           onStart: () => {
//             console.log('🎤 [VOICE] User started speaking');
//             setIsListening(true);
//             setStatus('🎤 Listening... (speak now)');
//             setCurrentTranscript('');
//             currentTranscriptRef.current = '';

//             // Clear any pending auto-stop
//             if (processTimeoutRef.current) {
//               clearTimeout(processTimeoutRef.current);
//             }
//           },
//           onEnd: () => {
//             console.log('🎤 [VOICE] User stopped speaking');
//             setIsListening(false);
//             setStatus('⏳ Searching...');

//             const transcript = currentTranscriptRef.current.trim();
//             console.log(`🎤 [VOICE] Final transcript on END: "${transcript}"`);

//             if (transcript) {
//               console.log(
//                 `🎤 [VOICE] Processing on speech end: "${transcript}"`,
//               );
//               handleUserInput(transcript);
//             }
//           },
//           onPartialResults: (results: string[]) => {
//             if (results && results.length > 0) {
//               console.log(`🎤 [VOICE] Partial: "${results[0]}"`);
//               const transcript = results[0];
//               setCurrentTranscript(transcript);
//               currentTranscriptRef.current = transcript;
//             }
//           },
//           onResults: async (results: string[]) => {
//             if (results && results.length > 0) {
//               const transcript = results[0].trim();
//               if (!transcript) return;
//               console.log(`🎤 [VOICE] Final result received: "${transcript}"`);
//               setCurrentTranscript(transcript);
//               currentTranscriptRef.current = transcript;
//               // Process immediately — on Android, results arrive AFTER mic release
//               // so we can't rely on handleMicRelease to pick them up.
//               // The debounce in handleUserInput prevents double-processing.
//               await handleUserInput(transcript);
//             }
//           },
//           onError: error => {
//             console.error('🎤 [VOICE] Error:', error.error);

//             // Convert error to string for comparison
//             const errorStr =
//               typeof error.error === 'string'
//                 ? error.error
//                 : JSON.stringify(error.error);

//             // Handle "No speech detected" gracefully - this is expected when user doesn't speak
//             if (
//               errorStr.includes('1110') ||
//               errorStr.includes('recognition_fail') ||
//               errorStr.includes('No speech detected')
//             ) {
//               console.log(
//                 '🎤 [VOICE] No speech detected - waiting for next attempt',
//               );
//               setStatus('🎤 Hold to speak');
//               setIsListening(false);
//             } else {
//               // For other errors, show the error message
//               const errorMsg =
//                 typeof error.error === 'string' ? error.error : 'Unknown error';
//               setStatus('⚠️ ' + errorMsg);
//               setIsListening(false);
//             }
//           },
//         };

//         voiceService.setConfig(voiceConfig);
//       } catch (error) {
//         console.error('Error initializing voice service:', error);
//       }
//     };

//     initVoiceService();

//     return () => {
//       voiceService.destroy();
//     };
//   }, []);

//   const handleUserInput = async (userMessage: string) => {
//     if (!userMessage.trim()) {
//       setStatus('Ready to assist');
//       return;
//     }

//     // Prevent duplicate rapid calls
//     const now = Date.now();
//     if (now - lastProcessTimeRef.current < DEBOUNCE_DELAY) {
//       console.log('⏱️ Skipping duplicate request (debounce)');
//       return;
//     }
//     lastProcessTimeRef.current = now;

//     try {
//       console.log(`\n📱 [APP] User input received: "${userMessage}"`);
//       setStatus('⏳ Searching...');

//       // Search for product using speech input
//       const result = await aiAgentService.searchForProduct(userMessage);
//       console.log(
//         `📱 [APP] Search result:`,
//         result.productFound ? 'FOUND' : 'NOT FOUND',
//       );

//       if (
//         result.productFound &&
//         result.products &&
//         result.products.length > 0
//       ) {
//         console.log(`📱 [APP] Found ${result.products.length} product(s)`);

//         // Add all found products
//         let addedCount = 0;
//         const newProducts: Product[] = [];

//         for (const foundProduct of result.products) {
//           const productId = foundProduct.productId;
//           const productName = foundProduct.name;
//           console.log(
//             `📱 [APP] Processing product: ${productName} (ID: ${productId})`,
//           );

//           // Check if already added - using ref for reliability
//           const isDuplicate = addedProductsRef.current.has(productId);

//           if (isDuplicate) {
//             console.log(
//               `📱 [APP] ⚠️ Duplicate - product already in list: ${productName}`,
//             );
//           } else {
//             console.log(
//               `📱 [APP] ✅ Adding new product to display: ${productName}`,
//             );
//             // Track this product as added
//             addedProductsRef.current.add(productId);

//             // Create product object
//             const product: Product = {
//               id: foundProduct.productId,
//               name: productName,
//               imageUrl: foundProduct.image || '',
//               quantity: 1,
//               price: Number(foundProduct.pricing.sellingPrice),
//               description: foundProduct.description,
//             };

//             newProducts.push(product);
//             addedCount++;
//           }
//         }

//         if (addedCount > 0) {
//           setDisplayProducts(prev => [...prev, ...newProducts]);
//           setStatus(`✅ Added ${addedCount} product(s)`);
//           // Speak immediately without product name - faster feedback
//           ttsService.speakProductFound().catch(console.error);
//         } else {
//           setStatus(`⚠️ All products already added`);
//           ttsService.speak('Sab pehle se list mein hain').catch(console.error);
//         }
//       } else {
//         console.log(`📱 [APP] ❌ Product not found - speaking notification`);
//         setStatus('❌ Not found');
//         // Speak immediately - faster feedback
//         ttsService.speakProductNotFound().catch(console.error);
//       }

//       setCurrentTranscript('');
//       currentTranscriptRef.current = '';
//     } catch (error) {
//       console.error('📱 [APP] Error:', error);
//       setStatus('⚠️ Error');
//     }
//   };

//   const startListening = async () => {
//     try {
//       console.log('User tapped microphone');
//       if (isListening) {
//         console.log('Already listening, stopping...');
//         await stopListening();
//         return;
//       }

//       setCurrentTranscript('');
//       setStatus('🎤 Listening...');

//       await voiceService.startListening();
//     } catch (error) {
//       console.error('Failed to start listening:', error);
//       setIsListening(false);
//       setStatus('Error starting voice');
//       Alert.alert(
//         'Microphone Error',
//         error instanceof Error
//           ? error.message
//           : 'Failed to start voice listening. Please check microphone permissions.',
//       );
//     }
//   };

//   const stopListening = async () => {
//     try {
//       await voiceService.stopListening();
//       setIsListening(false);
//     } catch (error) {
//       console.error('Failed to stop listening:', error);
//     }
//   };

//   const handleMicPress = async () => {
//     try {
//       if (!isListeningRef.current) {
//         console.log('🎤 User pressed microphone (hold to listen)');
//         setIsListening(true);
//         setCurrentTranscript('');
//         currentTranscriptRef.current = '';
//         setStatus('🎤 Listening... (speak now)');

//         // Clear any pending auto-stop timer - we'll stop on release instead
//         if (processTimeoutRef.current) {
//           clearTimeout(processTimeoutRef.current);
//           processTimeoutRef.current = null;
//         }

//         await voiceService.startListening();
//       }
//     } catch (error) {
//       console.error('Failed to start listening:', error);
//       setIsListening(false);
//       setStatus('Error starting voice');
//     }
//   };

//   const handleMicRelease = async () => {
//     try {
//       console.log('🎤 User released microphone');
//       if (isListeningRef.current) {
//         setIsListening(false);
//         // Clear any pending auto-stop timer
//         if (processTimeoutRef.current) {
//           clearTimeout(processTimeoutRef.current);
//           processTimeoutRef.current = null;
//         }
//         await voiceService.stopListening();

//         // After stopping, process whatever transcript we captured (final or partial)
//         const transcript = currentTranscriptRef.current.trim();
//         if (transcript) {
//           console.log(
//             `🎤 [VOICE] Processing transcript on release: "${transcript}"`,
//           );
//           await handleUserInput(transcript);
//         } else {
//           console.log('🎤 [VOICE] No transcript captured on release');
//           setStatus('🎤 Hold to speak');
//         }
//       }
//     } catch (error) {
//       console.error('Failed to stop listening:', error);
//       setIsListening(false);
//     }
//   };

//   const bgColor = isDarkMode ? '#1a1a1a' : '#ffffff';
//   const textColor = isDarkMode ? '#ffffff' : '#000000';
//   const cardBg = isDarkMode ? '#2a2a2a' : '#f8f8f8';

//   return (
//     <View style={[styles.container, { backgroundColor: bgColor }]}>
//       {/* Products at Top */}
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         style={{ flex: 1 }}
//       >
//         {/* Header */}
//         <View style={[styles.header, { paddingTop: safeAreaInsets.top }]}>
//           <Text style={[styles.title, { color: textColor }]}>
//             🛍️ Grocery Assistant
//           </Text>
//           <Text
//             style={[styles.status, { color: isListening ? '#4CAF50' : '#999' }]}
//           >
//             {status}
//           </Text>
//         </View>

//         {/* Display Products - MOVED TO TOP */}
//         {displayProducts.length > 0 && (
//           <View
//             style={[styles.productDisplaySection, { backgroundColor: cardBg }]}
//           >
//             <Text style={[styles.productDisplayTitle, { color: textColor }]}>
//               🛍️ Products ({displayProducts.length})
//             </Text>

//             <FlatList
//               data={displayProducts}
//               keyExtractor={(item, idx) => item.id + idx}
//               scrollEnabled={false}
//               numColumns={2}
//               columnWrapperStyle={styles.productGridRow}
//               renderItem={({ item, index }) => (
//                 <View
//                   style={[styles.productGridCard, { backgroundColor: bgColor }]}
//                 >
//                   {/* Product Image */}
//                   {item.imageUrl && (
//                     <Image
//                       source={{ uri: item.imageUrl }}
//                       style={{
//                         width: '100%',
//                         height: 100,
//                         borderRadius: 6,
//                         marginBottom: 8,
//                       }}
//                       resizeMode="contain"
//                     />
//                   )}

//                   {/* Product Name */}
//                   <Text
//                     style={[styles.productGridName, { color: textColor }]}
//                     numberOfLines={2}
//                   >
//                     {item.name}
//                   </Text>

//                   {/* Product Price */}
//                   {item.price && (
//                     <Text
//                       style={[
//                         styles.productGridPrice,
//                         { color: '#4CAF50', marginBottom: 8 },
//                       ]}
//                     >
//                       ₹{item.price}
//                     </Text>
//                   )}

//                   {/* Add to Cart Button */}
//                   <TouchableOpacity
//                     style={styles.productGridAddBtn}
//                     onPress={() => {
//                       const cartItem: Product = {
//                         ...item,
//                         quantity: item.quantity || 1,
//                       };
//                       setCartItems([...cartItems, cartItem]);
//                       setDisplayProducts(
//                         displayProducts.filter((_, i) => i !== index),
//                       );
//                       console.log('✓ Item added to cart:', cartItem);
//                     }}
//                   >
//                     <Text style={styles.productGridAddText}>Add</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />
//           </View>
//         )}

//         {/* Cart Items Section */}
//         {cartItems.length > 0 && (
//           <View style={[styles.cartSection, { backgroundColor: cardBg }]}>
//             <Text style={[styles.cartTitle, { color: textColor }]}>
//               🛒 Cart ({cartItems.length})
//             </Text>
//             <FlatList
//               data={cartItems}
//               keyExtractor={(item, idx) => item.id + idx}
//               scrollEnabled={false}
//               numColumns={2}
//               columnWrapperStyle={styles.cartGridRow}
//               renderItem={({ item, index }) => (
//                 <View
//                   style={[styles.cartGridItem, { backgroundColor: bgColor }]}
//                 >
//                   <TouchableOpacity
//                     style={styles.cartItemDeleteBtn}
//                     onPress={() => {
//                       setCartItems(cartItems.filter((_, i) => i !== index));
//                     }}
//                   >
//                     <Text style={styles.cartItemDeleteIcon}>×</Text>
//                   </TouchableOpacity>

//                   <Text
//                     style={[styles.cartGridItemName, { color: textColor }]}
//                     numberOfLines={2}
//                   >
//                     {item.name}
//                   </Text>

//                   {item.price && (
//                     <Text
//                       style={[styles.cartGridItemPrice, { color: '#4CAF50' }]}
//                     >
//                       ₹{item.price}
//                     </Text>
//                   )}

//                   <Text style={[styles.cartGridItemQty, { color: '#999' }]}>
//                     Qty: {item.quantity || 1}
//                   </Text>

//                   <Text
//                     style={[
//                       styles.cartGridItemTotal,
//                       { color: '#2196F3', fontWeight: 'bold' },
//                     ]}
//                   >
//                     ₹{(item.price || 0) * (item.quantity || 1)}
//                   </Text>
//                 </View>
//               )}
//             />
//             <View
//               style={[
//                 styles.cartTotal,
//                 { borderTopColor: isDarkMode ? '#444' : '#ddd' },
//               ]}
//             >
//               <Text style={[styles.cartTotalLabel, { color: textColor }]}>
//                 Total:
//               </Text>
//               <Text style={[styles.cartTotalPrice, { color: '#4CAF50' }]}>
//                 ₹
//                 {cartItems.reduce(
//                   (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
//                   0,
//                 )}
//               </Text>
//             </View>
//           </View>
//         )}

//         <View style={styles.spacer} />
//       </ScrollView>

//       {/* Microphone Button - Fixed at Bottom */}
//       <View
//         style={[
//           styles.bottomMicContainer,
//           {
//             backgroundColor: bgColor,
//             borderTopColor: isDarkMode ? '#444' : '#ddd',
//           },
//         ]}
//       >
//         <Pressable
//           onPressIn={handleMicPress}
//           onPressOut={handleMicRelease}
//           style={({ pressed }) => [
//             styles.micButton,
//             {
//               backgroundColor: pressed
//                 ? isListening
//                   ? '#2196F3'
//                   : '#2196F3'
//                 : isListening
//                 ? '#4CAF50'
//                 : '#4CAF50',
//               opacity: pressed ? 0.8 : 1,
//             },
//           ]}
//         >
//           <Text style={styles.micIcon}>{isListening ? '🎤' : '🎤'}</Text>
//         </Pressable>
//         <Text style={[styles.micLabel, { color: textColor }]}>
//           {isListening ? 'Release to stop' : 'Hold to speak'}
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//   },
//   header: {
//     marginTop: 20,
//     marginBottom: 40,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   status: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   visualizerContainer: {
//     borderRadius: 16,
//     padding: 24,
//     marginBottom: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   waveContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 80,
//     marginBottom: 16,
//   },
//   wave: {
//     width: 8,
//     marginHorizontal: 6,
//     borderRadius: 4,
//     backgroundColor: '#4CAF50',
//   },
//   visualizerText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   transcriptText: {
//     fontSize: 12,
//     fontStyle: 'italic',
//   },
//   micContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   micButton: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   micIcon: {
//     fontSize: 48,
//   },
//   bottomMicContainer: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderTopWidth: 1,
//     gap: 8,
//   },
//   micLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   chatSection: {
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//   },
//   chatTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 12,
//   },
//   chatMessage: {
//     marginBottom: 12,
//   },
//   userMessage: {
//     alignItems: 'flex-end',
//   },
//   assistantMessage: {
//     alignItems: 'flex-start',
//   },
//   chatBubble: {
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     maxWidth: '80%',
//   },
//   chatContent: {
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   chatTime: {
//     fontSize: 10,
//   },
//   productDisplaySection: {
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//   },
//   productDisplayTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 12,
//   },
//   productCard: {
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 14,
//     marginBottom: 12,
//   },
//   productDisplayName: {
//     fontSize: 18,
//     fontWeight: '700',
//   },
//   productId: {
//     fontSize: 11,
//     color: '#999',
//   },
//   productQuantity: {
//     fontSize: 13,
//     color: '#666',
//   },
//   productDescription: {
//     fontSize: 12,
//   },
//   productPrice: {
//     fontSize: 18,
//     fontWeight: '700',
//   },
//   productGridRow: {
//     gap: 10,
//     justifyContent: 'space-between',
//   },
//   productGridCard: {
//     flex: 0.48,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     marginBottom: 10,
//   },
//   productGridName: {
//     fontSize: 12,
//     fontWeight: '600',
//     marginBottom: 6,
//   },
//   productGridPrice: {
//     fontSize: 14,
//     fontWeight: '700',
//   },
//   productGridAddBtn: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productGridAddText: {
//     color: '#ffffff',
//     fontSize: 12,
//     fontWeight: '700',
//   },
//   addToCartBtn: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addToCartText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   cartSection: {
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//   },
//   cartTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 12,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//   },
//   cartItemInfo: {
//     flex: 1,
//   },
//   cartItemName: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   cartItemPrice: {
//     fontSize: 12,
//   },
//   cartTotal: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     marginTop: 8,
//   },
//   cartTotalLabel: {
//     fontSize: 14,
//     fontWeight: '700',
//   },
//   cartTotalPrice: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   cartGridRow: {
//     gap: 10,
//     justifyContent: 'space-between',
//   },
//   cartGridItem: {
//     flex: 0.48,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   cartItemDeleteBtn: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: '#f44336',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cartItemDeleteIcon: {
//     fontSize: 16,
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
//   cartGridItemName: {
//     fontSize: 12,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginTop: 20,
//     marginBottom: 6,
//   },
//   cartGridItemPrice: {
//     fontSize: 13,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
//   cartGridItemQty: {
//     fontSize: 11,
//     marginBottom: 4,
//   },
//   cartGridItemTotal: {
//     fontSize: 12,
//   },
//   spacer: {
//     height: 20,
//   },
// });

// export default VoiceScreen;

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
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
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

  const handleUserInput = async (userMessage: string) => {
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
        setStatus('❌ Not found');
        ttsService.speakProductNotFound().catch(console.error);
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
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.header, { paddingTop: safeAreaInsets.top }]}>
          <Text style={[styles.title, { color: textColor }]}>
            🛍️ Grocery Assistant
          </Text>
          <Text style={{ color: isListening ? '#4CAF50' : '#999' }}>
            {status}
          </Text>
          <Text style={{ color: 'orange', marginTop: 6 }}>{debugMessage}</Text>
        </View>

        {displayProducts.length > 0 && (
          <View style={{ padding: 16 }}>
            <FlatList
              data={displayProducts}
              keyExtractor={(item, idx) => item.id + idx}
              scrollEnabled={false}
              numColumns={2}
              renderItem={({ item }) => (
                <View style={{ flex: 1, margin: 8 }}>
                  {item.imageUrl && (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{ height: 100 }}
                      resizeMode="contain"
                    />
                  )}
                  <Text style={{ color: textColor }}>{item.name}</Text>
                  {item.price && (
                    <Text style={{ color: '#4CAF50' }}>₹{item.price}</Text>
                  )}
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomMicContainer}>
        <Pressable
          onPressIn={handleMicPress}
          onPressOut={handleMicRelease}
          style={[
            styles.micButton,
            { backgroundColor: isListening ? '#4CAF50' : '#4CAF50' },
          ]}
        >
          <Text style={styles.micIcon}>🎤</Text>
        </Pressable>
        <Text style={{ color: textColor }}>
          {isListening ? 'Release to stop' : 'Hold to speak'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
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
  micIcon: {
    fontSize: 48,
  },
  bottomMicContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    gap: 8,
  },
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
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
  },
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
