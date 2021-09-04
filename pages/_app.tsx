import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "react-apollo";
import client from "../graphql/client";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const loggedIn = false;

  return (
    <ApolloProvider client={client}>
      <Layout loggedIn={loggedIn}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
export default MyApp;
