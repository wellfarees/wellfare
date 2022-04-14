import { useRouter } from "next/router";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_GOOGLE_ACCESS_TOKEN, OAUTH_LOGIN } from "../../../graphql/queries";
import { useEffect } from "react";

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

  const [login, OAuthProps] = useLazyQuery<{
    oAuthLogin: {
      data: any;
    };
  }>(OAUTH_LOGIN);

  useEffect(() => {
    if (data) {
      localStorage.setItem("gsync", data.getAccessToken.token);
      login({
        variables: {
          service: "google",
          token: data.getAccessToken.token,
        },
      });
    }

    if (error) {
      console.log(error);
    }
  }, [loading, error, data]);

  return <>{data && data.getAccessToken.token}</>;
};

export default GoogleOauth;
