import { colour, Logger } from "../src"

const logger = new Logger({ prefix: "Simple Logging Example", showTimestamp: true, level: "debug" })

logger.info(colour.red("hello"))