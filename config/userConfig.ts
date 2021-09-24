// TODO: To be replaced with actual fetched user configuration
// These are default values btw
export const userConfig: {
  baseFontSize: number;
  reducedMotion: boolean;
  theme: "dark" | "light";
} = {
  baseFontSize: 14,
  reducedMotion: false,
  theme: "light",
};

// all dynamic font sizes, that derive from the base fontSize in userConfig
export const fontSizes = {
  base: userConfig.baseFontSize,
  h1: userConfig.baseFontSize * 2.5,
  h2: userConfig.baseFontSize * 2,
  h3: userConfig.baseFontSize * 1.5,
};
