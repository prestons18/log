export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerOptions {
  prefix?: string;
  showTimestamp?: boolean;
  level?: LogLevel;
  enabled?: boolean;
  useColours?: boolean;
  sinks?: LogSink[];
}

export type LogSink = (level: LogLevel, line: string, args: unknown[]) => void;