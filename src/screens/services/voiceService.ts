// /**
//  * Voice-to-Text Service
//  * Handles speech recognition using react-native-voice
//  */

// import Voice, {
//   SpeechResultsEvent,
//   SpeechErrorEvent,
// } from '@react-native-voice/voice';
// import Tts from 'react-native-tts';
// import { PermissionsAndroid, Platform } from 'react-native';
// import logger from '../../utils/logger';
// import { CONSTANTS } from '../../utils/constants';

// const TAG = 'VOICE_SERVICE';

// export interface VoiceServiceConfig {
//   onStart?: () => void;
//   onEnd?: () => void;
//   onPartialResults?: (results: string[]) => void;
//   onResults?: (results: string[]) => void;
//   onError?: (error: SpeechErrorEvent) => void;
// }

// class VoiceService {
//   private isListening = false;
//   private isStopping = false;   // true while we're intentionally stopping (suppress Android's error 5)
//   private config: VoiceServiceConfig = {};
//   private initialized = false;

//   constructor() {
//     // Defer initialization — native module may not be ready at import time
//     setTimeout(() => this.initialize(), 500);
//   }

//   private initialize() {
//     if (this.initialized) return;

//     try {
//       if (!Voice || typeof Voice.start !== 'function') {
//         logger.warn(TAG, 'Voice native module not available yet, will retry on use');
//         return;
//       }
//       this.bindListeners();
//       this.initialized = true;
//       logger.success(TAG, 'Voice service initialized');
//     } catch (error) {
//       logger.error(TAG, 'Initialization failed', error);
//     }
//   }

//   private bindListeners() {
//     Voice.onSpeechStart = this.handleSpeechStart;
//     Voice.onSpeechEnd = this.handleSpeechEnd;
//     Voice.onSpeechResults = this.handleSpeechResults;
//     Voice.onSpeechPartialResults = this.handleSpeechPartialResults;
//     Voice.onSpeechError = this.handleSpeechError;
//   }

//   private handleSpeechStart = () => {
//     this.isListening = true;
//     logger.debug(TAG, 'Speech started');
//     this.config.onStart?.();
//   };

//   private handleSpeechEnd = () => {
//     this.isListening = false;
//     logger.debug(TAG, 'Speech ended');
//     this.config.onEnd?.();
//   };

//   private handleSpeechResults = (e: SpeechResultsEvent) => {
//     if (e.value && e.value.length > 0) {
//       logger.debug(TAG, `Results: ${e.value[0]}`);
//       this.config.onResults?.(e.value);
//     }
//   };

//   private handleSpeechPartialResults = (e: SpeechResultsEvent) => {
//     if (e.value && e.value.length > 0) {
//       logger.debug(TAG, `Partial: ${e.value[0]}`);
//       this.config.onPartialResults?.(e.value);
//     }
//   };

//   private handleSpeechError = (e: SpeechErrorEvent) => {
//     const errorCode = typeof e.error === 'object' ? (e.error as any)?.code : e.error;
//     const errorMsg = typeof e.error === 'object' ? (e.error as any)?.message : String(e.error);

//     // Error 5 (ERROR_CLIENT) is always fired by Android when we manually call Voice.stop().
//     // If we are in the middle of an intentional stop, suppress it entirely.
//     if (errorCode === '5' && this.isStopping) {
//       logger.debug(TAG, 'Suppressed error 5 from intentional stop');
//       this.isListening = false;
//       this.isStopping = false;
//       return;
//     }

//     // Transient errors — no speech detected or not understood, silently ignore
//     // Error 7 = ERROR_NO_MATCH, Error 11 = ERROR_LANGUAGE_NOT_SUPPORTED / didn't understand
//     // Error 5 = ERROR_CLIENT (unexpected), Error 6 = ERROR_SPEECH_TIMEOUT
//     // 'audio' = iOS AVAudioSession activation failed (TTS was still playing)
//     const transientErrors = ['5', '6', '7', '11', 'audio'];
//     if (transientErrors.includes(errorCode)) {
//       logger.warn(TAG, `Transient voice error (${errorCode}): ${errorMsg} — ignored`);
//       this.isListening = false;
//       return;
//     }

//     this.isListening = false;
//     logger.error(TAG, 'Voice error', e.error);
//     this.config.onError?.(e);
//   };

//   setConfig(config: VoiceServiceConfig): void {
//     this.config = { ...this.config, ...config };
//     logger.debug(TAG, 'Config updated');
//   }

//   async startListening(config?: VoiceServiceConfig): Promise<void> {
//     try {
//       // Request RECORD_AUDIO permission on Android at runtime
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//           {
//             title: 'Microphone Permission',
//             message: 'This app needs access to your microphone to recognize your voice.',
//             buttonPositive: 'Allow',
//             buttonNegative: 'Deny',
//           }
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           throw new Error('Microphone permission denied. Please allow microphone access in app settings.');
//         }
//         logger.debug(TAG, 'RECORD_AUDIO permission granted');
//       }

//       // Guard: check native module is available
//       if (!Voice || typeof Voice.start !== 'function') {
//         throw new Error('Voice native module is not available.');
//       }

//       if (!this.initialized) {
//         this.initialize();
//       }

//       // Re-bind listeners every time to ensure they are attached (New Architecture)
//       this.bindListeners();

//       if (config) {
//         this.setConfig(config);
//       }

//       if (this.isListening) {
//         try { await Voice.stop(); } catch (_) {}
//         await new Promise(resolve => setTimeout(() => resolve(undefined), 300));
//       }

//       // On iOS, stop TTS first so it releases the AVAudioSession before we try to record.
//       // If TTS is still speaking when Voice.start() is called, iOS throws 'Session activation failed'.
//       if (Platform.OS === 'ios') {
//         try { await Tts.stop(); } catch (_) {}
//         // Small delay to let the audio session deactivate fully
//         await new Promise(resolve => setTimeout(() => resolve(undefined), 150));
//       }

//       await Voice.start(CONSTANTS.VOICE_LANGUAGE);
//       logger.debug(TAG, 'Listening started');
//     } catch (error) {
//       logger.error(TAG, 'Failed to start listening', error);
//       this.isListening = false;
//       throw error;
//     }
//   }

//   async stopListening(): Promise<void> {
//     try {
//       this.isStopping = true;   // suppress the error 5 Android fires on stop
//       await Voice.stop();
//       this.isListening = false;
//       this.isStopping = false;
//       logger.debug(TAG, 'Listening stopped');
//     } catch (error) {
//       this.isStopping = false;
//       logger.error(TAG, 'Failed to stop listening', error);
//       this.isListening = false;
//       throw error;
//     }
//   }

//   async cancelListening(): Promise<void> {
//     try {
//       await Voice.cancel();
//       this.isListening = false;
//       logger.debug(TAG, 'Listening cancelled');
//     } catch (error) {
//       logger.error(TAG, 'Failed to cancel listening', error);
//       this.isListening = false;
//     }
//   }

//   isCurrentlyListening(): boolean {
//     return this.isListening;
//   }

//   async destroy(): Promise<void> {
//     try {
//       if (this.isListening) {
//         await Voice.stop();
//       }
//       await Voice.destroy();
//       this.isListening = false;
//       this.initialized = false;
//       logger.debug(TAG, 'Service destroyed');
//     } catch (error) {
//       logger.error(TAG, 'Failed to destroy service', error);
//     }
//   }
// }

// export const voiceService = new VoiceService();


/**
 * Voice-to-Text Service
 * Handles speech recognition using react-native-voice
 */

import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { PermissionsAndroid, Platform } from 'react-native';
import logger from '../../utils/logger';
import { CONSTANTS } from '../../utils/constants';

const TAG = 'VOICE_SERVICE';

export interface VoiceServiceConfig {
  onStart?: () => void;
  onEnd?: () => void;
  onPartialResults?: (results: string[]) => void;
  onResults?: (results: string[]) => void;
  onError?: (error: SpeechErrorEvent) => void;
}

class VoiceService {
  private isListening = false;
  private isStopping = false;
  private config: VoiceServiceConfig = {};
  private initialized = false;

  constructor() {
    setTimeout(() => this.initialize(), 500);
  }

  private initialize() {
    if (this.initialized) return;

    try {
      if (!Voice || typeof Voice.start !== 'function') {
        logger.warn(TAG, 'Voice native module not available yet, will retry on use');
        return;
      }

      this.bindListeners();
      this.initialized = true;
      logger.success(TAG, 'Voice service initialized');
    } catch (error) {
      logger.error(TAG, 'Initialization failed', error);
    }
  }

  private bindListeners() {
    Voice.onSpeechStart = this.handleSpeechStart;
    Voice.onSpeechEnd = this.handleSpeechEnd;
    Voice.onSpeechResults = this.handleSpeechResults;
    Voice.onSpeechPartialResults = this.handleSpeechPartialResults;
    Voice.onSpeechError = this.handleSpeechError;
  }

  private handleSpeechStart = () => {
    this.isListening = true;
    logger.debug(TAG, 'Speech started');
    this.config.onStart?.();
  };

  private handleSpeechEnd = () => {
    this.isListening = false;
    logger.debug(TAG, 'Speech ended');
    this.config.onEnd?.();
  };

  private handleSpeechResults = (e: SpeechResultsEvent) => {
    if (e?.value && e.value.length > 0) {
      logger.debug(TAG, `Results: ${e.value[0]}`);
      this.config.onResults?.(e.value);
    }
  };

  private handleSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e?.value && e.value.length > 0) {
      logger.debug(TAG, `Partial: ${e.value[0]}`);
      this.config.onPartialResults?.(e.value);
    }
  };

  private handleSpeechError = (e: SpeechErrorEvent | any) => {
    // HARDENED — Android sometimes sends undefined
    if (!e || !e.error) {
      logger.warn(TAG, 'Received empty speech error event — ignored');
      this.isListening = false;
      return;
    }

    const rawError = e.error;

    const errorCode =
      typeof rawError === 'object'
        ? String((rawError as any)?.code ?? '')
        : String(rawError ?? '');

    const errorMsg =
      typeof rawError === 'object'
        ? String((rawError as any)?.message ?? '')
        : String(rawError ?? '');

    // Suppress Android ERROR_CLIENT (5) when we intentionally stop
    if (errorCode === '5' && this.isStopping) {
      logger.debug(TAG, 'Suppressed error 5 from intentional stop');
      this.isListening = false;
      this.isStopping = false;
      return;
    }

    // Transient errors — ignore silently
    const transientErrors = ['5', '6', '7', '11', 'audio'];

    if (transientErrors.includes(errorCode)) {
      logger.warn(
        TAG,
        `Transient voice error (${errorCode}): ${errorMsg} — ignored`
      );
      this.isListening = false;
      return;
    }

    this.isListening = false;
    logger.error(TAG, 'Voice error', rawError);
    this.config.onError?.(e);
  };

  setConfig(config: VoiceServiceConfig): void {
    this.config = { ...this.config, ...config };
    logger.debug(TAG, 'Config updated');
  }

  async startListening(config?: VoiceServiceConfig): Promise<void> {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone to recognize your voice.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error(
            'Microphone permission denied. Please allow microphone access in app settings.'
          );
        }

        logger.debug(TAG, 'RECORD_AUDIO permission granted');
      }

      if (!Voice || typeof Voice.start !== 'function') {
        throw new Error('Voice native module is not available.');
      }

      if (!this.initialized) {
        this.initialize();
      }

      this.bindListeners();

      if (config) {
        this.setConfig(config);
      }

      if (this.isListening) {
        try {
          await Voice.stop();
        } catch (_) {}
        await new Promise<void>(resolve => {
  setTimeout(() => resolve(), 300);
});

      }

      if (Platform.OS === 'ios') {
        try {
          await Tts.stop();
        } catch (_) {}
       await new Promise<void>(resolve => {
  setTimeout(() => resolve(), 150);
});

      }

      await Voice.start(CONSTANTS.VOICE_LANGUAGE);

      logger.debug(TAG, 'Listening started');
    } catch (error) {
      logger.error(TAG, 'Failed to start listening', error);
      this.isListening = false;
      throw error;
    }
  }

  async stopListening(): Promise<void> {
    try {
      this.isStopping = true;
      await Voice.stop();
      this.isListening = false;
      this.isStopping = false;
      logger.debug(TAG, 'Listening stopped');
    } catch (error) {
      this.isStopping = false;
      logger.error(TAG, 'Failed to stop listening', error);
      this.isListening = false;
      throw error;
    }
  }

  async cancelListening(): Promise<void> {
    try {
      await Voice.cancel();
      this.isListening = false;
      logger.debug(TAG, 'Listening cancelled');
    } catch (error) {
      logger.error(TAG, 'Failed to cancel listening', error);
      this.isListening = false;
    }
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }

  async destroy(): Promise<void> {
    try {
      if (this.isListening) {
        await Voice.stop();
      }

      await Voice.destroy();

      this.isListening = false;
      this.initialized = false;

      logger.debug(TAG, 'Service destroyed');
    } catch (error) {
      logger.error(TAG, 'Failed to destroy service', error);
    }
  }
}

export const voiceService = new VoiceService();
