import Tts from 'react-native-tts';
import { Platform } from 'react-native';
import logger from '../../utils/logger';
import { CONSTANTS } from '../../utils/constants';

const TAG = 'TTS_SERVICE';

class TTSService {
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initPromise = this.initialize();
  }

  private async initialize() {
    try {
      this.setupEventListeners();
      
      const languages = await Tts.getInitStatus();
      logger.debug(TAG, `Languages available: ${languages}`);
      
      try {
        await Tts.setDefaultLanguage(CONSTANTS.TTS_LANGUAGE);
        logger.success(TAG, `Language set to ${CONSTANTS.TTS_LANGUAGE}`);
      } catch (e) {
        logger.warn(TAG, 'Hindi language unavailable, using default', e);
      }

      // On Android, we can set default rate. On iOS, rate is passed per-speak call
      if (Platform.OS === 'android') {
        try {
          await Tts.setDefaultRate(CONSTANTS.TTS_RATE);
          logger.debug(TAG, `Speech rate set to ${CONSTANTS.TTS_RATE}`);
        } catch (e) {
          logger.warn(TAG, 'Could not set speech rate', e);
        }
      }

      try {
        const voices = await Tts.voices();
        const hindiVoice = voices.find((v: any) => 
          v.language === 'hi-IN' || v.language === 'hi'
        );
        if (hindiVoice) {
          await Tts.setDefaultVoice(hindiVoice.id);
          logger.debug(TAG, `Hindi voice set: ${hindiVoice.id}`);
        }
      } catch (e) {
        logger.warn(TAG, 'Could not set voice', e);
      }
      
      this.isInitialized = true;
      logger.success(TAG, 'TTS service initialized');
    } catch (error) {
      logger.error(TAG, 'Initialization failed', error);
      this.isInitialized = true;
    }
  }

  private setupEventListeners() {
    try {
      Tts.addEventListener('tts-start', (event: any) => {
        logger.debug(TAG, 'Speech started');
      });

      Tts.addEventListener('tts-finish', (event: any) => {
        logger.debug(TAG, 'Speech finished');
      });

      Tts.addEventListener('tts-progress', (event: any) => {
        logger.debug(TAG, `Progress: ${event.position}/${event.duration}`);
      });

      Tts.addEventListener('tts-cancel', (event: any) => {
        logger.debug(TAG, 'Speech cancelled');
      });

      logger.debug(TAG, 'Event listeners setup complete');
    } catch (error) {
      logger.error(TAG, 'Event listeners setup failed', error);
    }
  }

  async speak(text: string): Promise<void> {
    try {
      if (this.initPromise) {
        await this.initPromise;
      }
      
      try {
        await Tts.stop();
      } catch (e) {
        logger.debug(TAG, 'Stop before speak ignored');
      }
      
      // On iOS, pass rate as option. On Android, use default rate set during init
      const options = Platform.OS === 'ios' ? { rate: CONSTANTS.TTS_RATE } : {};
      const result = await Tts.speak(text, options);
      logger.debug(TAG, `Speaking: ${text}`);
    } catch (error) {
      logger.error(TAG, 'Speak failed', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      await Tts.stop();
      logger.debug(TAG, 'Speech stopped');
    } catch (error) {
      logger.error(TAG, 'Stop failed', error);
    }
  }

  async speakProductFound(productName?: string): Promise<void> {
    try {
      await this.speak(CONSTANTS.TTS_MESSAGE_FOUND);
    } catch (error) {
      logger.error(TAG, 'speakProductFound failed', error);
    }
  }

  async speakProductNotFound(): Promise<void> {
    try {
      await this.speak(CONSTANTS.TTS_MESSAGE_NOT_FOUND);
    } catch (error) {
      logger.error(TAG, 'speakProductNotFound failed', error);
    }
  }
}

export default new TTSService();
