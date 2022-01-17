import { useRouter } from "next/router";
import { Navigation, Footer, TopMenu, Sidebar } from "../";
import { themes } from "../../styled/themes";
import { ThemeProvider } from "styled-components";
import { SpringContext } from "react-spring";
import styled, { createGlobalStyle } from "styled-components";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useRef } from "react";
import { useActions } from "../../hooks/useActions";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Modal from "../../components/Modal/Modal";
import { withAuthRequired } from "../../components/HOC/withAuthRequired";
import { generateFontSizesFromBase } from "../../utils/generateFontSizesFromBase";
import ClientOnly from "../ClientOnly";

import { APPEARANCE_QUERY } from "../../graphql/queries";
import { useLazyQuery } from "react-apollo";

interface LayoutProps {
  loggedIn: boolean;
  isLoaded: boolean;
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

const PrivateRoute: React.FC = ({ children }) => {
  const router = useRouter();
  const newDay = router.pathname == "/app/entry";
  const { user } = useTypedSelector((state) => state);
  const userInfo = user.info!;

  const fontSizes = generateFontSizesFromBase(userInfo.config.fontSize);
  const UserStyles = createGlobalStyle`
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
  // TODO: Replace with actual graphql / redux data
  // -> basically instead of showing full UI, inquires user to journal their day first (so there's no typical UI layout, just the bare minimum)
  // newDay determines whether or not we enter the REAL layout
  const router = useRouter();
  const size = useScreenSize();
  const isMobileOnly = /app\/records\/\[id\]+/.test(router.pathname);
  const { content, open } = useTypedSelector((state) => state.modal);
  const { user } = useTypedSelector((state) => state);
  const userInfo = user.info!;
  const { initModal } = useActions();

  const history = useRef<string[]>([]);
  const { setLocalStorage, toggleSidebar } = useActions();

  useEffect(() => {
    initModal(false);
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

    setLocalStorage(
      "lastRoute",
      history.current.length === 1 ? "null" : history.current[0]
    );

    // hide sidebar on mobile whenever change a path
    toggleSidebar(false);
  }, [router.pathname]);

  return (
    <>
      {isMobileOnly &&
      size! > 425 &&
      !(size! <= 812 && window.innerHeight <= 425) ? (
        <>{children}</>
      ) : isLoaded ? (
        loggedIn ? (
          <AuthRoute>{children}</AuthRoute>
        ) : (
          <StaticLayoutWrapper>
            {/* Static sided Layout */}
            <Navigation />
            {children}
            <Footer />
          </StaticLayoutWrapper>
        )
      ) : null}
      <ThemeProvider theme={themes[userInfo.config.theme]}>
        <Modal state={open}>{content}</Modal>
      </ThemeProvider>
    </>
  );
};

export default Layout;
