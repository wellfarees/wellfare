import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
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
    const [verified, setVerified] = useState<null | boolean>(false);
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_USER_OBJECT);

    useEffect(() => {
      const jwt = localStorage.getItem("jwt");

      if (loading) return;

      if (data) {
        setVerified(true);
      }

      if (error || !jwt) {
        console.log(JSON.stringify(error, null, 2));
        router.push("/signin");
      }
    }, [loading, data, error, router]);

    return loading || !verified ? (
      <>Loading...</>
    ) : (
      <ChildComponent {...props} />
    );
  };

  return ComposedComponent;
};
