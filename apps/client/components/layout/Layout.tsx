import { useRouter } from "next/router";
import { Navigation, Footer, TopMenu, Sidebar } from "../";
import { themes } from "../../styled/themes";
import { ThemeProvider, GlobalStyleComponent } from "styled-components";
import { SpringContext } from "react-spring";
import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useRef } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";
import Modal from "../../components/Modal/Modal";
import { withAuthRequired } from "../../components/HOC/withAuthRequired";
import { generateFontSizesFromBase } from "../../utils/generateFontSizesFromBase";
import Head from "next/dist/shared/lib/head";
import ClientOnly from "../ClientOnly";
import { store } from "../../redux/store";
import { toggleSidebar } from "../../redux/actions/unitStatesSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { initRecordModal, toggleModal } from "../../redux/actions/modalSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

interface LayoutProps {
  loggedIn: boolean;
  isLoaded: boolean;
  children: any;
}

const MainContainer = styled.main`
  min-height: calc(100vh - 9em);
  height: 100%;

  @media only screen and (max-width: 1024px) {
    aside {
      position: fixed;
      left: -100%;
    }
  }

  @media only screen and (max-height: 425px) and (max-width: 812px) {
    min-height: auto !important;
  }
`;

const ChildrenContainer = styled.div`
  padding-top: 8.5em;

  @media only screen and (max-width: 1024px) {
    padding-top: 3em;
  }
`;

const StaticLayoutWrapper = styled.div`
  width: 100vw;
  overflow-x: hidden;
`;

let UserStyles: React.FC | GlobalStyleComponent<any, any> = () => <></>;

const onStateChange = () => {
  const userInfo = store.getState().user.info!;
  const fontSizes = generateFontSizesFromBase(userInfo.config.fontSize);

  UserStyles = createGlobalStyle`
    body {
      background-color: ${(props: any) => props.theme.backgroundColor};
      color: ${(props: any) => props.theme.mainColor};
    }

    h1 {
      font-size: ${fontSizes.h1}px;
    }

    h2 {
      font-size: ${fontSizes.h2}px;
    }

    h3 {
      font-size: ${fontSizes.h3}px;
    }

    h4 {
      font-size: ${fontSizes.h4}px;
    }

    label {
      color: ${(props: any) => props.theme.label};
    }

    p, li, button, span, a, input {
      font-size: ${fontSizes.base}px !important;
    }
  `;
};

store.subscribe(onStateChange);

const PrivateRoute: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const newDay = router.pathname == "/app/entry";
  const { user } = useAppSelector((state) => state);
  const userInfo = user.info!;

  return (
    <ThemeProvider theme={themes[userInfo.config.theme]}>
      <UserStyles />
      <SpringContext immediate={userInfo.config.reducedMotion}>
        {newDay ? ( // Just plain children nodes without any layout at all
          children
        ) : (
          <>
            {/* The actual UI */}
            <TopMenu />
            <MainContainer>
              <Sidebar />
              <ClientOnly>
                <ChildrenContainer>{children}</ChildrenContainer>
              </ClientOnly>
            </MainContainer>
          </>
        )}
      </SpringContext>
    </ThemeProvider>
  );
};

const AuthRoute = withAuthRequired(PrivateRoute);

const Layout: React.FC<LayoutProps> = ({ loggedIn, children, isLoaded }) => {
  const router = useRouter();
  const size = useScreenSize();
  const isMobileOnly = /app\/records\/\[id\]+/.test(router.pathname);
  const { open } = useAppSelector((state) => state).modal;
  const { user } = useAppSelector((state) => state);
  const userInfo = user.info!;
  const dispatch = useAppDispatch();

  const history = useRef<string[]>([]);

  useEffect(() => {
    dispatch(toggleModal({ open: false }));
    if (history.current.length <= 1) {
      if (localStorage.getItem("lastRoute") !== "null") {
        history.current[0] = localStorage.getItem("lastRoute")!;
        history.current[1] = router.pathname;
      } else {
        history.current.push(router.pathname);
      }
    } else {
      history.current[0] = history.current[1];
      history.current[1] = router.pathname;
    }

    // setLocalStorage(
    //   "lastRoute",
    //   history.current.length === 1 ? "null" : history.current[0]
    // );

    // hide sidebar on mobile whenever change a path
    dispatch(toggleSidebar(false));
  }, [router.pathname, initRecordModal, dispatch]);

  return (
    <>
      {isMobileOnly &&
      size! > 425 &&
      !(size! <= 812 && window.innerHeight <= 425) ? (
        <>{children}</>
      ) : isLoaded ? (
        loggedIn ? (
          <>
            <Head>
              <title>Wellfare App</title>
            </Head>
            <AuthRoute>{children}</AuthRoute>
          </>
        ) : (
          <>
            <Head>
              <title>Wellfare</title>
            </Head>
            <StaticLayoutWrapper>
              {/* Static sided Layout */}
              <Navigation />
              {children}
              <Footer />
            </StaticLayoutWrapper>
          </>
        )
      ) : null}
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff"></meta>
        <title>
          {isLoaded ? (loggedIn ? "Wellfare App" : "Wellfare") : "Wellfare"}
        </title>
      </Head>
      <ThemeProvider theme={themes[userInfo.config.theme]}>
        <Modal state={open} />
      </ThemeProvider>
    </>
  );
};

export default Layout;
