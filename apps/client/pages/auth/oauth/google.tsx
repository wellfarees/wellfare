import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
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
    font-size: 1.6rem;
    margin-top: 0.7em;
  }

  @media only screen and (max-width: 600px) {
    h2 {
      font-size: 8vw;
    }
  }
`;

const GoogleOauth: React.FC = () => {
  const router = useRouter();

  const { setPfp, saveConfig } = useActions();

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
    (async () => {
      try {
        await login({
          variables: {
            service: "google",
            token: router.query.code,
            type: "code",
          },
        });
      } catch (e) {}
    })();
  }, [router.query, login]);

  useEffect(() => {
    if (OAuthProps.error) {
      const error = OAuthProps.error.graphQLErrors[0];
      if (error && error.extensions.code) {
        router.push(`/signin?error=${error.extensions.code}`);
      }
    }

    if (OAuthProps.data) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("sync-type");

      localStorage.setItem("jwt", OAuthProps.data.oAuthLogin.oAuthRefresh);
      localStorage.setItem("sync-type", "google");

      localStorage.setItem(
        "algolia-search",
        OAuthProps.data.oAuthLogin.publicAlgoliaKey
      );

      const user = OAuthProps.data.oAuthLogin.user;
      saveConfig({
        fontSize: user.config.fontSize,
        reducedMotion: user.config.reducedMotion,
        theme: user.config.darkMode ? "dark" : "light",
      });
      setPfp(user.information.pfp || "/img/mesh-gradient.png");
      router.push("/app");
    }
  }, [OAuthProps.error, OAuthProps.data, router, saveConfig, setPfp]);

  return (
    <Main>
      <Container>
        <h2>Redirecting...</h2>
        <p>This will only take a second or two.</p>
      </Container>
    </Main>
  );
};

export default GoogleOauth;
