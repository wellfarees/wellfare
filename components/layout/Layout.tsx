import { Navigation, Footer, TopMenu, Sidebar } from "../";

interface LayoutProps {
  loggedIn: boolean;
  isLoaded: boolean;
}

const Layout: React.FC<LayoutProps> = ({ loggedIn, children, isLoaded }) => {
  // TODO: Replace with actual graphql / redux data
  // -> basically instead of showing full UI, inquires user to journal their day first (so there's no typical UI layout, just the bare minimum)
  const newDay = false;

  return (
    <>
      {isLoaded ? (
        loggedIn ? (
          newDay || (
            <>
              {/* The actual UI */}
              <TopMenu />
              <Sidebar />
              {children}
            </>
          )
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
