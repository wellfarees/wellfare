import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container } from "../../styled/reusable";
import styled from "styled-components";
import Link from "next/link";
import { GlowingBLue } from "../../styled/reusable";

import { useMutation } from "@apollo/client";
import { VERIFY_USER } from "../../graphql/mutations";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fdfdfd;

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .failure,
  .success {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 340px;
    gap: 2em;

    .descr p > span {
      text-decoration: underline;
      color: #4329e1;
    }

    p {
      font-size: 1.4rem;
      line-height: 1.7;
    }

    .descr {
      margin-bottom: 1.2em;
    }

    h1 {
      font-weight: 900;
      font-size: 3.5rem;
      line-height: 1.2;

      b {
        font-weight: 900;
      }
    }
  }

  .failure {
    h1 {
      b {
        color: #f23232;
      }
    }

    span {
      ${GlowingBLue}
      display: inline-block;
    }
  }

  .success {
    h1 {
      b {
        color: #1df85a;
      }
    }
  }
`;

const Verify: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [verifyUser, { loading, data, error }] = useMutation(VERIFY_USER);

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await verifyUser({ variables: { token } });
        } catch (e) {}
      }
    })();
  }, [token]);

  return (
    <Wrapper>
      <Container>
        <div>
          {!loading && data ? (
            <div className="success">
              <h1>
                You have been <b>successful</b> verified
              </h1>
              <div className="descr">
                <p>
                  Great things coming, <b>{data.verifyUser.firstName}</b>! Your
                  identity for the <b>{data.verifyUser.email}</b> email has been
                  proved.
                </p>
                <p>
                  You may now close this tab and head back over to{" "}
                  <Link href="/">
                    <span>Wellfare</span>
                  </Link>
                  .
                </p>
              </div>
            </div>
          ) : !loading && error ? (
            <div className="failure">
              <h1>
                This verification link is <b>invalid</b>
              </h1>
              <div className="descr">
                <p>
                  The link you clicked on has either expired or been faked.
                  Please, make sure you do not use links from unverified
                  sources.
                </p>
              </div>
              <Link href="/">
                <span>Return home</span>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </Wrapper>
  );
};

export default Verify;
