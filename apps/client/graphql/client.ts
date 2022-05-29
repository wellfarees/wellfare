import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { SERVER_URL } from "../endpoints";
import { createUploadLink } from "apollo-upload-client";

const getSyncInfo = (): [string | null, string | null] => {
  if (typeof window !== "undefined") {
    return [localStorage.getItem("jwt"), localStorage.getItem("sync-type")];
  } else return [null, null];
};

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let [token, serviceType] = getSyncInfo();
  try {
    while (!serviceType && token) {
      [token, serviceType] = getSyncInfo();
    }
  } catch (e) {}
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `${serviceType} ${token}` || "",
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
