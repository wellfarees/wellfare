import { Navigation, Footer } from "..";

interface LayoutProps {
  loggedIn: boolean;
}

const Layout: React.FC<LayoutProps> = ({ loggedIn, children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
