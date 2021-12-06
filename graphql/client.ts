import ApolloClient, { InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem("jwt");
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
});

export default client;
