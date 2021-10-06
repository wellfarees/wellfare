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
    sidebar: "#F4F4F4",
    error: "#ff2b2b",
  },
  dark: {
    backgroundColor: "#202020",
    mainColor: "#fff",
    watermark: "#868686",
    shadedColor: "#CDCDCD",
    label: "#c5c5c5",
    maximum: "#000",
    sidebar: "#1C1C1C",
    error: "#ff2b2b",
  },
}; // ... TODO: Add more and more properties to each theme (so that css heavily depends on these properties depending on the current theme)

export { themes };
