const company = {
  developers: [
    {
      name: "Roland Fridemanis",
      roles: ["UI/UX Designer", "Lead Developer"],
      image: "https://avatars.githubusercontent.com/u/35779160?v=4",
      url: "https://github.com/rolandsfr",
    },
    {
      name: "geneva",
      roles: ["Ex Backend Developer", "Database Engineer"],
      image: "https://avatars.githubusercontent.com/u/34730060?v=4",
      url: "https://github.com/geenva",
    },
  ],
};

export default {
  Query: {
    company: () => company,
  },
};
