const company = {
  developers: [
    {
      name: "Roland Fridemanis",
      roles: ["UI/UX Designer", "Frontend Developer"],
    },
    {
      name: "geneva",
      roles: ["Backend Developer", "Database Engineer"],
    },
  ],
};

export default {
  Query: {
    company: () => company,
  },
};
