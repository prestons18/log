# @prestonarnold/log

A simple, OOP logger for Node.js and the browser.

## Installation

```bash
npm install @prestonarnold/log
```
OR
```bash
yarn add @prestonarnold/log
```

## Usage

```typescript
import { Logger, colour } from "@prestonarnold/log";

const logger = new Logger({
    prefix: "My Logger",
    showTimestamp: true,
    level: "debug",
    sinks: [console.log], // not required, defaults to console.log
});

// Log messages (with properity colouring)
logger.debug("This is a debug message");
logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");

// Log messages (with custom colouring)
logger.debug(colour.red("This is a debug message"));
logger.info(colour.green("This is an info message"));
logger.warn(colour.yellow("This is a warning message"));
logger.error(colour.red("This is an error message"));
```