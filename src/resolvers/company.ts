const company = {
  developers: [
    {
      name: "Roland Fridemanis",
      roles: ["UI/UX Designer", "Frontend Developer"],
      image: "https://w.shx.is/58Sqak_pc.png",
    },
    {
      name: "geneva",
      roles: ["Backend Developer", "Database Engineer"],
      image: "https://w.shx.is/58Sr3wk0N.png",
    },
  ],
};

export default {
  Query: {
    company: () => company,
  },
};
