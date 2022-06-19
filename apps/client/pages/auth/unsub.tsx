import styled from "styled-components";
import { Container } from "../../styled/reusable";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { UNSCUBSCRIBE } from "../../graphql/mutations";
import { useEffect } from "react";

const Wrapper = styled.div`
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      font-size: 1.4rem;
      max-width: 400px;
      text-align: center;
      line-height: 1.5;
      margin-top: 0.5em;
    }
  }

  .error,
  .success {
    font-size: 3rem;
    line-height: 1.4;
    max-width: 240px;
    text-align: center;
    margin-top: 0.4em;
    font-weight: 900;
  }

  .success {
    color: green;
  }

  .error {
    color: red;
  }
`;

const Unsub: React.FC = () => {
  const router = useRouter();
  const [unsubscribe, { data, loading, called }] = useMutation(UNSCUBSCRIBE);

  useEffect(() => {
    (async () => {
      const { token } = router.query;
      if (token && !called) {
        try {
          await unsubscribe({
            variables: {
              encodedEmail: token,
            },
          });
        } catch (e) {}
      }
    })();
  }, [router.query, called, unsubscribe]);

  return (
    <Wrapper>
      <Container>
        {!loading && called ? (
          data ? (
            <div className="content">
              <h2 className="success">Success!</h2>
              <p>
                Email <b>{data.unsubscribe.email}</b> has been removed from the
                maillist.
              </p>
            </div>
          ) : (
            <div className="content">
              <h2 className="error">Error!</h2>
              <p>
                Something was wrong with the incoming request so we could not
                remove the email from our maillist.
              </p>
            </div>
          )
        ) : (
          <></>
        )}
      </Container>
    </Wrapper>
  );
};

export default Unsub;
