import "../styles/globals.css";
import "../styles/reset.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
  // if router.path includes /app dir -> render another type of layout
  return <Component {...pageProps} />;
}

export default MyApp;
