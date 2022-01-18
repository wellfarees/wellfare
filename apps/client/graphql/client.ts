import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { SERVER_URL } from "../endpoints";
import { createUploadLink } from "apollo-upload-client";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token: null | string = null;
  try {
    token = localStorage.getItem("jwt");
  } catch (e) {}
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    createUploadLink({
      uri: `${SERVER_URL}/graphql`,
    })
  ),
});

export default client;
