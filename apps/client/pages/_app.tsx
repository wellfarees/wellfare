import "../styles/globals.css";
import "../styles/reset.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useRouter } from "next/router";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import TagManager from "react-gtm-module";

import { Layout } from "../components";

import { ApolloProvider, useLazyQuery, useMutation } from "@apollo/client";
import client from "../graphql/client";
import { OAUTH_LOGIN } from "../graphql/mutations";
import { APPEARANCE_QUERY } from "../graphql/queries";
import { useAppSelector } from "../hooks/useAppSelector";

import { store } from "../redux/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  saveToken,
  saveConfig,
  setPfp,
  setAffirmations,
} from "../redux/actions/userSlice";
import { setWebsiteLoaded } from "../redux/actions/unitStatesSlice";

const navStateContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>(undefined!);

const ReduxMiddleComponent: React.FC<any> = ({ children }) => {
  const [getConfig, { loading, error, data }] = useLazyQuery(APPEARANCE_QUERY);
  const [getOauthUser, oAuthUserProps] = useMutation(OAUTH_LOGIN);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { websiteLoaded } = useAppSelector((state) => state).unitStates;

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

    if (!websiteLoaded && serviceType != "native") {
      getOauthUser({
        variables: {
          service: serviceType,
          token: jwt,
          type: "token",
        },
      });
      console.log("ez???//");
      dispatch(setWebsiteLoaded(true));
      console.log("called to fetch oauth user");
    } else {
      getConfig();
    }
  }, [router.pathname, getConfig, getOauthUser]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      setReady(true);
      return;
    }

    if (data) {
      dispatch(saveToken(jwt));
      dispatch(
        saveConfig({
          fontSize: data.getUser.config.fontSize,
          reducedMotion: data.getUser.config.reducedMotion,
          theme: data.getUser.config.darkMode ? "dark" : "light",
        })
      );
      dispatch(
        setPfp(data.getUser.information.pfp || "/img/mesh-gradient.png")
      );
      dispatch(setAffirmations(data.getUser.affirmations));
      setReady(true);
      dispatch(setWebsiteLoaded(true));
    }
    if (error) {
      console.error(error);
    }
  }, [loading, data, error, router.pathname, dispatch]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const serviceType = localStorage.getItem("sync-type");

    if (!jwt || serviceType == "native") {
      setReady(true);
      return;
    }

    console.log("oauth user has been fetched");
    if (oAuthUserProps.data) {
      const user = oAuthUserProps.data.oAuthLogin.user;
      console.log(user);
      dispatch(saveToken(localStorage.getItem("jwt") as string));
      dispatch(
        saveConfig({
          fontSize: user.config.fontSize,
          reducedMotion: user.config.reducedMotion,
          theme: user.config.darkMode ? "dark" : "light",
        })
      );
      dispatch(setAffirmations(user.affirmations));
      dispatch(setPfp(user.information.pfp || "/img/mesh-gradient.png"));
      setReady(true);
    }

    if (oAuthUserProps.error) {
      console.log(JSON.stringify(oAuthUserProps.error, null, 2));
    }
  }, [oAuthUserProps.error, oAuthUserProps.data, dispatch]);

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

  useEffect(() => {
    const tagManagerArgs = {
      gtmId: "G-EQ9WB4FXH7",
    };

    TagManager.initialize(tagManagerArgs);
  }, []);

  // if router.path includes /app dir -> render another type of layout
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
