export const generateFontSizesFromBase = (base: number) => {
  return {
    base,
    h1: base * 2.5,
    h2: base * 2,
    h3: base * 1.5,
    h4: base * 1.2,
  };
};
