/**
 * Useless sink example.
 * 
 * This unchanged is a more complicated simple.ts
 * It's purpose is to show how you can hook into the logging process.
 */

import { Logger, LogSink } from "../src"

const sink: LogSink = (_level, line) => console.log(line)

const logger = new Logger({ sinks: [sink], prefix: "Sink Logging Example", showTimestamp: true, level: "info" })

logger.info("hello")
logger.warn("world")