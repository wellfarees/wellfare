import "../styles/globals.css";
import "../styles/reset.css";
import { useRouter } from "next/router";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import type { AppProps } from "next/app";
import { ApolloProvider, useLazyQuery } from "react-apollo";
import client from "../graphql/client";
import Layout from "../components/layout/Layout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import { useActions } from "../hooks/useActions";
import { APPEARANCE_QUERY } from "../graphql/queries";

const navStateContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>(undefined!);

const ReduxMiddleComponent: React.FC = ({ children }) => {
  const [getConfig, { loading, error, data }] = useLazyQuery(APPEARANCE_QUERY);
  const { saveToken, saveConfig } = useActions();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setReady(true);
      return;
    }
    getConfig();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (data) {
      saveToken(jwt);
      saveConfig({
        fontSize: data.getUser.config.fontSize,
        reducedMotion: data.getUser.config.reducedMotion,
        theme: data.getUser.config.darkMode ? "dark" : "light",
      });
      setReady(true);
    }
  }, [loading, data, error]);
  return ready ? <>{children}</> : <></>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
    setIsLoaded(true);

    // TODO: Replace these state pieces with data fetched from getStaticProps in Layout.tsx itself
    if (router.pathname.includes("/app")) {
      setLoggedIn(true);
      return;
    }

    setLoggedIn(false);
  }, [router.pathname]);

  // if router.path includes /app dir -> render another type of layout
  // NOTE: Temporary solution with loggedIn variable -> to be replaced with secure implementation

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ReduxMiddleComponent>
          <navStateContext.Provider value={[isOpen, setIsOpen]}>
            <Layout loggedIn={loggedIn} isLoaded={isLoaded}>
              <Component {...pageProps} />
            </Layout>
          </navStateContext.Provider>
        </ReduxMiddleComponent>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
export { navStateContext };
