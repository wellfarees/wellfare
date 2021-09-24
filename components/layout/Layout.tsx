import { useRouter } from "next/router";
import { Navigation, Footer, TopMenu, Sidebar } from "../";
import { themes } from "../../styled/themes";
import { ThemeProvider } from "styled-components";
import { SpringContext } from "react-spring";
import styled, { createGlobalStyle } from "styled-components";
import { userConfig } from "../../config/userConfig";
import { fontSizes } from "../../config/userConfig";
import { GetStaticProps } from "next";

interface LayoutProps {
  loggedIn: boolean;
  isLoaded: boolean;
  pid: string | string[] | undefined;
}

const UserStyles = createGlobalStyle`
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
`;

const ChildrenContainer = styled.main`
  position: relative;
  z-index: 10 !important;
`;

const Layout: React.FC<LayoutProps> = ({
  loggedIn,
  children,
  isLoaded,
  pid,
}) => {
  // TODO: Replace with actual graphql / redux data
  // -> basically instead of showing full UI, inquires user to journal their day first (so there's no typical UI layout, just the bare minimum)
  // newDay determines whether or not we enter the REAL layout
  const newDay = true;
  const router = useRouter();
  console.log(pid);

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
                  <ChildrenContainer>
                    <Sidebar />
                    {children}
                  </ChildrenContainer>
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
