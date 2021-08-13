import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type status {
    current: String
    eta: String
  }

  type Developer {
    name: String
    about: String
  }

  type developerPositions {
    frontend: [Developer]
    backend: [Developer]
  }

  type positions {
    developers: developerPositions
  }

  type Query {
    status: status
    positions: positions
  }
`;

const status = {
  current: "Work in Progress",
  eta: "Unknown",
};

const developerPositions = {
  frontend: [
    {
      name: "Roland Fridmanis",
      about: "Front-end development enthusiast",
    },
  ],
  backend: [
    {
      name: "geneva",
      about: "Building backends...",
    },
  ],
};

const positions = {
  developers: developerPositions,
};

const resolvers = {
  Query: {
    status: () => status,
    positions: () => positions,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
