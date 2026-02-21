/**
 * Logger Utility - Production-ready logging with configurable levels
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  OFF = 4,
}

class Logger {
  private currentLevel: LogLevel = LogLevel.INFO;
  private enableConsole: boolean = true;

  constructor(level: LogLevel = LogLevel.INFO, enableConsole: boolean = true) {
    this.currentLevel = level;
    this.enableConsole = enableConsole;
  }

  setLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  setEnableConsole(enable: boolean): void {
    this.enableConsole = enable;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.currentLevel <= level && this.enableConsole;
  }

  debug(tag: string, message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(`🔍 [${tag}] ${message}`, data || '');
    }
  }

  info(tag: string, message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(`ℹ️ [${tag}] ${message}`, data || '');
    }
  }

  warn(tag: string, message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(`⚠️ [${tag}] ${message}`, data || '');
    }
  }

  error(tag: string, message: string, error?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(`❌ [${tag}] ${message}`, error || '');
    }
  }

  success(tag: string, message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(`✅ [${tag}] ${message}`, data || '');
    }
  }
}

export default new Logger(LogLevel.INFO, true);
