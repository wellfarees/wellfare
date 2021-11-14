// TODO: To be replaced with actual fetched user configuration
// These are default values btw
export interface UserConfig {
  fontSize: number;
  reducedMotion: boolean;
  theme: "dark" | "light";
}

export const userConfig: UserConfig = {
  fontSize: 14,
  reducedMotion: false,
  theme: "light",
};

// all dynamic font sizes, that derive from the base fontSize in userConfig
export const fontSizes = {
  base: userConfig.fontSize,
  h1: userConfig.fontSize * 2.5,
  h2: userConfig.fontSize * 2,
  h3: userConfig.fontSize * 1.5,
  h4: userConfig.fontSize * 1.2,
};
