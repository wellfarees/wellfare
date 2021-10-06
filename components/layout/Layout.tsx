import { useRouter } from "next/router";
import { Navigation, Footer, TopMenu, Sidebar } from "../";
import { themes } from "../../styled/themes";
import { ThemeProvider } from "styled-components";
import { SpringContext } from "react-spring";
import styled, { createGlobalStyle } from "styled-components";
import { userConfig } from "../../config/userConfig";
import { fontSizes } from "../../config/userConfig";
import { GetStaticProps } from "next";
import { ShrankContainer } from "../../styled/reusable";
import { useEffect, useRef } from "react";
import { useActions } from "../../hooks/useActions";

interface LayoutProps {
  loggedIn: boolean;
  isLoaded: boolean;
}

const UserStyles = createGlobalStyle`
  body {
    background-color: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.mainColor};
  }

  p {
    font-size: ${fontSizes.base}px;
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

  label {
    color: ${(props: any) => props.theme.label};
  }

  li {
    font-size: ${fontSizes.base}px;
  }
`;

const MainContainer = styled.main`
  min-height: 100vh;

  @media only screen and (max-width: 768px) {
    aside {
      display: none;
    }
  }
`;

const ChildrenContainer = styled.div`
  padding-top: 8.5em;

  @media only screen and (max-width: 768px) {
    padding-top: 3em;
  }
`;

const Layout: React.FC<LayoutProps> = ({ loggedIn, children, isLoaded }) => {
  // TODO: Replace with actual graphql / redux data
  // -> basically instead of showing full UI, inquires user to journal their day first (so there's no typical UI layout, just the bare minimum)
  // newDay determines whether or not we enter the REAL layout
  const newDay = false;
  const router = useRouter();
  const history = useRef<string[]>([]);
  const { setLocalStorage } = useActions();

  useEffect(() => {
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
  }, [router.pathname]);

  return (
    <>
      {isLoaded ? (
        loggedIn ? (
          <ThemeProvider theme={themes[userConfig.theme]}>
            <UserStyles />
            <SpringContext immediate={userConfig.reducedMotion}>
              {newDay ? ( // Just plain children nodes without any layout at all
                children
              ) : (
                <>
                  {/* The actual UI */}
                  <TopMenu />
                  <MainContainer>
                    <Sidebar />
                    <ChildrenContainer>
                      <ShrankContainer>{children}</ShrankContainer>
                    </ChildrenContainer>
                  </MainContainer>
                </>
              )}
            </SpringContext>
          </ThemeProvider>
        ) : (
          <>
            {/* Static sided Layout */}
            <Navigation />
            {children}
            <Footer />
          </>
        )
      ) : null}
    </>
  );
};

export default Layout;

export const getStaticProps: GetStaticProps = (context) => {
  const pid = context;

  return {
    props: {
      pid,
    },
  };
};
