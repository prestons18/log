/**
 * Simple OOP Logger
 */

import { fg, reset } from './colours.js';
import type { LogLevel, LoggerOptions, LogSink } from './types.js';

const LEVEL_RANK: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const COLOR_MAP: Record<LogLevel, string> = {
  debug: fg.magenta,
  info: fg.cyan,
  warn: fg.yellow,
  error: fg.red,
};
const DEFAULT_SINK: LogSink = (level, line) => {
  const method = (console as any)[level] ?? console.log;
  method.call(console, line);
};

export class Logger {
  private prefix: string;
  private showTimestamp: boolean;
  private minLevel: LogLevel;
  private enabled: boolean;
  private useColours: boolean;
  private sinks: LogSink[];

  constructor(options: LoggerOptions = {}) {
    this.prefix = options.prefix ?? '';
    this.showTimestamp = options.showTimestamp ?? true;
    this.minLevel = options.level ?? 'debug';
    this.enabled = options.enabled ?? true;
    // auto-detect TTY if not explicitly provided
    this.useColours = options.useColours ?? Boolean((globalThis as any).process?.stdout?.isTTY);
    this.sinks = (options.sinks && options.sinks.length ? options.sinks.slice() : [DEFAULT_SINK]);
  }

  private stringify(args: unknown[]): string {
    const safeStringify = (val: unknown): string => {
      if (typeof val === 'string') return val;
      if (val instanceof Error) return `${val.name}: ${val.message}\n${val.stack ?? ''}`.trim();
      try {
        return JSON.stringify(val, (_k, v) => (typeof v === 'bigint' ? v.toString() : v), 2) ?? String(val);
      } catch {
        return String(val);
      }
    };
    return args.map(safeStringify).join(' ');
  }

  private log(level: LogLevel, ...args: unknown[]): void {
    if (!this.enabled || LEVEL_RANK[level] < LEVEL_RANK[this.minLevel]) return;
    const ts = this.showTimestamp ? `[${new Date().toISOString()}] ` : '';
    const pf = this.prefix ? `[${this.prefix}] ` : '';
    const msg = this.stringify(args);
    const hasAnsi = /\x1b\[[0-9;]*m/.test(msg);
    const body = hasAnsi ? msg : (this.useColours ? `${COLOR_MAP[level]}${msg}${reset}` : msg);
    const line = `${ts}${pf}${body}`;
    for (const sink of this.sinks) sink(level, line, args as unknown[]);
  }

  debug(...args: unknown[]): void {
    this.log('debug', ...args);
  }

  info(...args: unknown[]): void {
    this.log('info', ...args);
  }

  warn(...args: unknown[]): void {
    this.log('warn', ...args);
  }

  error(...args: unknown[]): void {
    this.log('error', ...args);
  }

  addSink(sink: LogSink): void {
    this.sinks.push(sink);
  }
}