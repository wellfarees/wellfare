import { useRouter } from "next/router";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_GOOGLE_ACCESS_TOKEN, OAUTH_LOGIN } from "../../../graphql/queries";
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
  const { data, loading, error } = useQuery<{
    getAccessToken: {
      token: string;
    };
  }>(GET_GOOGLE_ACCESS_TOKEN, {
    variables: {
      code: router.query.code,
      service: "google",
    },
  });

  const { setPfp, saveConfig, saveToken } = useActions();

  const [login, OAuthProps] = useLazyQuery<{
    oAuthLogin: {
      publicAlgoliaKey;
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
    };
  }>(OAUTH_LOGIN);

  useEffect(() => {
    if (data) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("sync-type");

      localStorage.setItem("jwt", data.getAccessToken.token);
      localStorage.setItem("sync-type", "google");

      login({
        variables: {
          service: "google",
          token: data.getAccessToken.token,
        },
      });
    }

    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }, [loading, error, data]);

  useEffect(() => {
    if (OAuthProps.data) {
      localStorage.setItem(
        "algolia-search",
        OAuthProps.data.oAuthLogin.publicAlgoliaKey
      );

      console.log(OAuthProps.data);

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
