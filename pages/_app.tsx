import "../styles/globals.css";
import "../styles/reset.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "react-apollo";
import client from "../graphql/client";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const loggedIn = false;
  const router = useRouter();

  // if router.path includes /app dir -> render another type of layout

  return (
    <ApolloProvider client={client}>
      <Layout loggedIn={loggedIn}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
export default MyApp;
