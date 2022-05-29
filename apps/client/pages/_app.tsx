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
import { ApolloProvider, useLazyQuery, useMutation } from "@apollo/client";
import client from "../graphql/client";
import Layout from "../components/layout/Layout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import { useActions } from "../hooks/useActions";
import { APPEARANCE_QUERY } from "../graphql/queries";
import { OAUTH_LOGIN } from "../graphql/mutations";

const navStateContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>(undefined!);

const ReduxMiddleComponent: React.FC = ({ children }) => {
  const [getConfig, { loading, error, data }] = useLazyQuery(APPEARANCE_QUERY);
  const [getOauthUser, oAuthUserProps] = useMutation(OAUTH_LOGIN);
  const { saveToken, saveConfig, setPfp } = useActions();
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("algolia-search") == null) {
      localStorage.setItem("algolia-search", undefined);
    }
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const serviceType = localStorage.getItem("sync-type");

    if (!jwt) {
      setReady(true);
      return;
    }

    if (serviceType != "native") {
      getOauthUser({
        variables: {
          service: serviceType,
          token: jwt,
          type: "token",
        },
      });
    } else {
      getConfig();
    }
  }, [router.pathname]);

  useEffect(() => {
    // const serviceType = localStorage.getItem("sync-type");
    // if (!router.pathname.includes("app") || serviceType == "native") return;

    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      setReady(true);
      return;
    }

    if (data) {
      saveToken(jwt);
      saveConfig({
        fontSize: data.getUser.config.fontSize,
        reducedMotion: data.getUser.config.reducedMotion,
        theme: data.getUser.config.darkMode ? "dark" : "light",
      });
      console.log(data.getUser.information.pfp);
      setPfp(data.getUser.information.pfp || "/img/mesh-gradient.png");
      setReady(true);
    }
    if (error) {
      console.error(error);
    }
  }, [loading, data, error, router.pathname]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const serviceType = localStorage.getItem("sync-type");

    if (!jwt || serviceType == "native") {
      setReady(true);
      return;
    }

    if (oAuthUserProps.data) {
      const user = oAuthUserProps.data.oAuthLogin.user;
      saveToken(localStorage.getItem("jwt") as string);
      saveConfig({
        fontSize: user.config.fontSize,
        reducedMotion: user.config.reducedMotion,
        theme: user.config.darkMode ? "dark" : "light",
      });
      setPfp(user.information.pfp || "/img/mesh-gradient.png");
      setReady(true);
    }

    if (oAuthUserProps.error) {
      console.log(JSON.stringify(oAuthUserProps.error, null, 2));
    }
  }, [oAuthUserProps.loading]);

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
    // FIXME: [UPDATE]: I no longer know what does this even do lol
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
