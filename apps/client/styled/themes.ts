interface Themes {
  [key: string]: {
    backgroundColor: string;
    mainColor: string;
    watermark: string;
    shadedColor: string;
    label: string;
    maximum: string;
    sidebar: string;
    error: string;
    banner: string;
    input: string;
    secondaryButton: string;
    lighterHover: string;
    minimum: string;
    recapHover: string;
    warningBackground: string;
    warningColor: string;
    searchBackground: string;
    solidSearchBackground: string;
    searchBorder: string;
    searchHover: string;
    searchShadow: string;
  };
}

const themes: Themes = {
  light: {
    backgroundColor: "#fafafa",
    mainColor: "#000",
    watermark: "#C8C8C8",
    shadedColor: "#313131",
    label: "#5f5f5f",
    maximum: "#FFFFFF",
    minimum: "#ECECEC",
    sidebar: "#F4F4F4",
    error: "#ff2b2b",
    banner: "#F6F6F6",
    input: "#ECECEC",
    secondaryButton: "F0F0F0",
    lighterHover: "#E1E1E1",
    recapHover: "#F9F9F9",
    warningBackground: "#fff4e5",
    warningColor: "#663c33",
    searchBackground: "rgba(230, 230, 230, 0.3)",
    solidSearchBackground: "rgba(230, 230, 230, 1)",
    searchBorder: "rgba(235, 235, 235, 0.3)",
    searchHover: "#f9f9f9",
    searchShadow: "rgba(0, 0, 0, 0.15)",
  },
  dark: {
    backgroundColor: "#202020",
    mainColor: "#fff",
    watermark: "#868686",
    shadedColor: "#CDCDCD",
    label: "#c5c5c5",
    maximum: "#000",
    minimum: "#262626",
    sidebar: "#1C1C1C",
    error: "#ff2b2b",
    banner: "#1E1E1E",
    input: "#2D2D2D",
    secondaryButton: "#333333",
    lighterHover: "#4F4F4F",
    recapHover: "#1C1C1C",
    warningBackground: "#1a1a1a",
    warningColor: "#b79e67",
    searchBackground: "rgba(30, 30, 30, 0.3)",
    solidSearchBackground: "rgba(30, 30, 30, 1)",
    searchBorder: "rgba(35, 35, 35, 0.3)",
    searchHover: "#191919",
    searchShadow: "rgba(230, 230, 230, 0.09)",
  },
}; // ... TODO: Add more and more properties to each theme (so that css heavily depends on these properties depending on the current theme)

export { themes };
