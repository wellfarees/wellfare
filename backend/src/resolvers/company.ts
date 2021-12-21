const company = {
  developers: [
    {
      name: "Roland Fridemanis",
      roles: ["UI/UX Designer", "Frontend Developer"],
      image: "https://avatars.githubusercontent.com/u/35779160?v=4",
    },
    {
      name: "geneva",
      roles: ["Backend Developer", "Database Engineer"],
      image: "https://avatars.githubusercontent.com/u/34730060?v=4",
    },
  ],
};

export default {
  Query: {
    company: () => company,
  },
};
