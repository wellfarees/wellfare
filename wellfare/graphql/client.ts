import ApolloClient, { InMemoryCache } from "apollo-boost";
import { SERVER_URL } from "../endpoints";

const client = new ApolloClient({
  uri: `${SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
  request: (operation) => {
    let token: null | string = null;
    try {
      token = localStorage.getItem("jwt");
    } catch (e) {}

    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
});

export default client;
