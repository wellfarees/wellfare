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
  },
}; // ... TODO: Add more and more properties to each theme (so that css heavily depends on these properties depending on the current theme)

export { themes };
