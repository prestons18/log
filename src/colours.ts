export const reset = '\x1b[0m';
export const fg = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};

export const colour = {
  black: (t: string) => `${fg.black}${t}${reset}`,
  red: (t: string) => `${fg.red}${t}${reset}`,
  green: (t: string) => `${fg.green}${t}${reset}`,
  yellow: (t: string) => `${fg.yellow}${t}${reset}`,
  blue: (t: string) => `${fg.blue}${t}${reset}`,
  magenta: (t: string) => `${fg.magenta}${t}${reset}`,
  cyan: (t: string) => `${fg.cyan}${t}${reset}`,
  white: (t: string) => `${fg.white}${t}${reset}`,
  gray: (t: string) => `${fg.gray}${t}${reset}`,
};