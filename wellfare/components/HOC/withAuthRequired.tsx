import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "react-apollo";
import { gql } from "graphql-tag";

const GET_USER_OBJECT = gql`
  query GetUser {
    getUser {
      id
    }
  }
`;

type Props = { [key: string]: any };

export const withAuthRequired = (ChildComponent: React.FC): React.FC<Props> => {
  const ComposedComponent: React.FC<Props> = (props) => {
    const [verified, setVerified] = useState<null | boolean>(true);
    const router = useRouter();
    const [validateJwt, { loading, error, data }] =
      useLazyQuery(GET_USER_OBJECT);

    useEffect(() => {
      validateJwt();
    }, []);

    useEffect(() => {
      if (data) {
        setVerified(true);
        return;
      }
    }, [loading, data]);

    return !verified ? <></> : <ChildComponent {...props} />;
  };

  return ComposedComponent;
};