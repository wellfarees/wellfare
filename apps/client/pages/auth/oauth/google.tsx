import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { OAUTH_LOGIN } from "../../../graphql/mutations";
import { useEffect } from "react";
import styled from "styled-components";
import { Container } from "../../../styled/reusable";
import { useActions } from "../../../hooks/useActions";

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;

  h2 {
    font-size: 5rem;
    text-transform: uppercase;
    font-weight: 800;
  }

  p {
    font-size: 1.7rem;
    margin-top: 1em;
  }
`;

const GoogleOauth: React.FC = () => {
  const router = useRouter();

  const { setPfp, saveConfig, saveToken } = useActions();

  const [login, OAuthProps] = useMutation<{
    oAuthLogin: {
      user: {
        config: {
          darkMode: boolean;
          reducedMotion: boolean;
          fontSize: number;
        };
        information: {
          pfp: string;
        };
      };
      publicAlgoliaKey;
      oAuthRefresh: string;
    };
  }>(OAUTH_LOGIN);

  useEffect(() => {
    if (!router.query.code) return;
    login({
      variables: {
        service: "google",
        token: router.query.code,
        type: "code",
      },
    });
  }, [router.query]);

  useEffect(() => {
    if (OAuthProps.data) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("sync-type");
      console.log(OAuthProps.data);

      localStorage.setItem("jwt", OAuthProps.data.oAuthLogin.oAuthRefresh);
      localStorage.setItem("sync-type", "google");

      localStorage.setItem(
        "algolia-search",
        OAuthProps.data.oAuthLogin.publicAlgoliaKey
      );

      const user = OAuthProps.data.oAuthLogin.user;
      // saveToken(localStorage.getItem("jwt") as string);
      saveConfig({
        fontSize: user.config.fontSize,
        reducedMotion: user.config.reducedMotion,
        theme: user.config.darkMode ? "dark" : "light",
      });
      setPfp(user.information.pfp || "/img/mesh-gradient.png");
    }

    router.push("/app");

    if (OAuthProps.error) {
      console.log(JSON.stringify(OAuthProps.error, null, 2));
    }
  }, [OAuthProps.loading]);

  return (
    <Main>
      <Container>
        <h2>Redirecting...</h2>
        <p>This will only take a second or two</p>
      </Container>
    </Main>
  );
};

export default GoogleOauth;
