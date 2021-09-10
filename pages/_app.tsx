import "../styles/globals.css";
import "../styles/reset.css";
import { useRouter } from "next/router";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "react-apollo";
import client from "../graphql/client";
import Layout from "../components/layout/Layout";

const navStateContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>(undefined!);

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
    setIsLoaded(true);

    if (router.pathname.includes("/app")) {
      setLoggedIn(true);
      return;
    }

    setLoggedIn(false);
  }, [router.pathname]);

  // if router.path includes /app dir -> render another type of layout
  // NOTE: Temporary solution with loggedIn variable -> to be replaced with secure implementation

  return (
    <ApolloProvider client={client}>
      <navStateContext.Provider value={[isOpen, setIsOpen]}>
        <Layout loggedIn={loggedIn} isLoaded={isLoaded}>
          <Component {...pageProps} />
        </Layout>
      </navStateContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
export { navStateContext };
