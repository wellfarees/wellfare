export const transformFetchedConfig = (config: {
  darkMode: boolean;
  fontSize: number;
  reducedMotion: boolean;
}): {
  theme: "dark" | "light";
  fontSize: number;
  reducedMotion: boolean;
} => {
  return { ...config, theme: config.darkMode ? "dark" : "light" };
};
