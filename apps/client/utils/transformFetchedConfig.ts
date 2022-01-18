export const transformFetchedConfig = (config: {
  darkMode: boolean;
  fontSize: number;
  reducedMotion: boolean;
  pfp: string | null;
}): {
  theme: "dark" | "light";
  fontSize: number;
  reducedMotion: boolean;
  pfp: string | null;
} => {
  return { ...config, theme: config.darkMode ? "dark" : "light" };
};
