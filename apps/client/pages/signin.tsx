import Link from "next/link";
import { useState, useEffect } from "react";
import { LabeledInput } from "../components";
import { Container } from "../styled/reusable";
import { GlowingBLue } from "../styled/reusable";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useForm } from "../hooks/useForm";
import { useHandleFormErrors } from "../hooks/useHandleFormErrors";
import { useRouter } from "next/router";
import Button from "../components/Button/Button";
import { useActions } from "../hooks/useActions";
import { GET_LAST_SUBMITTED } from "../graphql/queries";
import ApolloClient from "../graphql/client";
import AccountSuspended from "../components/AccountSuspended/AccountSuspended";
import OAuthMethods from "../components/OAuth/OAuthMethods";

import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../graphql/queries";

const Wrapper = styled.main`
  height: 100vh;
  width: 100%;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;

  .info {
    max-width: 100%;

    h1 {
      font-size: 5.5rem;
      font-weight: 800;
      line-height: 1.2;
      width: 350px;
      display: inline-block;
    }

    p {
      font-size: 1.6rem;
      margin-top: 1em;
      width: 380px;
      line-height: 1.5;
    }
  }

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 5em;

    @media only screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;

      .info {
        text-align: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
          font-size: 5rem;
          margin-right: 0 !important;
          width: 450px;
          margin-top: 1.2em;
        }

        p {
          width: 380px;
          margin-right: 0 !important;
        }
      }
    }

    @media only screen and (max-width: 560px) {
      h1 {
        font-size: 3.4rem !important;
        width: 250px !important;
      }

      .info p {
        width: 250px !important;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    height: auto !important;
    ${Container} {
      margin: 7em 0;
      justify-content: space-between;

      h1 {
        font-size: 4rem;
      }

      .info p {
        width: 300px;
        margin-top: 1em;
      }

      .signUp-card {
        margin-top: 4em;
      }
    }
  }

  .signUp-card {
    padding: 3.5em;
    display: flex;
    flex-direction: column;
    background-image: url("img/blob-scene-haikei.svg");
    background-size: 500%;
    background-repeat: none;
    box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.05);
    border-radius: 9px;
    padding-top: 1em;
    width: 300px;

    form {
      text-align: left;

      button {
        ${GlowingBLue}
        width: 100%;
        margin-top: 1.5em;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }

    .input-block,
    input {
      width: 100%;
    }

    .input-block {
      margin-top: 2em;
    }

    .form-cta {
      text-align: center;
      color: #1d1d1d;
      margin-top: 2em;
      margin-bottom: -0.5em;
      font-size: 1.2rem;

      a {
        font-weight: 600;
        text-decoration: underline;
      }
    }

    .forgot {
      margin-bottom: 0em;
    }
  }

  @media only screen and (max-width: 420px) {
    .signUp-card {
      width: 100%;
      background: none;
      padding: 0 !important;
      box-shadow: none;
      margin-top: 0em !important;

      button {
        margin-top: 2.5em !important;
      }
    }
  }

  @media only screen and (max-width: 820px) and (max-height: 420px) {
    .info {
      margin-top: 4em;
      p {
        margin-left: 1.5em;
      }
    }

    ${Container} {
      flex-direction: column !important;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .signUp-card {
      width: 100%;
      background: none;
      padding: 0 !important;
      box-shadow: none;
      margin-top: 0em !important;
      max-width: 300px;

      input {
        width: 100%;
      }

      input,
      button {
        padding-top: 1em !important;
        padding-bottom: 1em !important;
        margin-top: 0.7em;
      }

      button {
        margin-top: 2.5em !important;
      }
    }
  }
`;

const ErrorWrapper = styled.p`
  color: red;
  margin-top: 1.5em;
  font-size: 1.4rem;
  line-height: 1.5;
`;

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<null | string>(null);
  // const [buttonState, setButtonState] = useState("Sign in");
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();
  const handleErrors = useHandleFormErrors();
  const [login, queryProps] = useLazyQuery(LOGIN, {
    fetchPolicy: "network-only",
  });
  const { storeUser, initModal } = useActions();
  const [emailUsed, setEmailUsed] = useState<string>();

  useEffect(() => {
    let error_type =
      router.query["error"] ||
      router.asPath.match(new RegExp(`[&?]error=(.*)(&|$)`));

    if (error_type && Array.isArray(error_type)) {
      error_type = error_type[1];
    }

    switch (error_type) {
      case "EMAIL_IN_USE":
        setError(
          "Email used in the oauth method already occupied by another user."
        );
        break;
      case "INVALID_OAUTH":
        setError("Could not verify oauth identity, please try again.");
        break;
    }
  }, [router.asPath, router.query]);

  useEffect(() => {
    const { error, data } = queryProps;

    if (error) {
      const gqlError = error.graphQLErrors[0]?.message || error.message;
      if (gqlError === "Account suspended.") {
        initModal(true, <AccountSuspended email={emailUsed} />);
      }

      setError(gqlError);
      setSignedIn(false);

      // open modal if its a blocking error
      return;
    }

    if (data) {
      setError(null);
      const { jwt, user, publicAlgoliaKey } = data.login;
      storeUser("native", jwt, user);
      setSignedIn(false);
      localStorage.setItem("algolia-search", publicAlgoliaKey);
      (async () => {
        const {
          data: {
            getUser: { lastSubmitted },
          },
        }: {
          data: {
            getUser: { lastSubmitted: number | null };
          };
        } = await ApolloClient.query({
          query: GET_LAST_SUBMITTED,
          fetchPolicy: "network-only",
        });

        const endpoint = lastSubmitted > 24 ? "entry" : "";
        router.push(`/app/${endpoint}`);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    queryProps.data,
    queryProps.loading,
    initModal,
    storeUser,
    router,
    queryProps,
  ]);

  return (
    <Wrapper>
      <Container>
        <div className="info">
          <h1>Sign in &amp; check back on your mental state</h1>
          <p>
            Don&apos;t hold back - express your emotions and record them in your
            journaling system.
          </p>
        </div>
        <div className="signUp-card">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              // Contains an object with all user's credentials or errors occurred ( + input references )
              const credentials = handleSubmit();

              // if success is true there's no errors
              const { success, message, target } = handleErrors(credentials);

              credentials.refs.forEach((input) => {
                input.style.background = "#ffffff";
              });

              if (!success) {
                target.forEach((input) => {
                  input.style.background = "rgba(255, 179, 176, 0.2)";
                });
                setError(message);
              } else {
                setError(null);
                // activating the loading indicator animation
                setSignedIn(true);

                try {
                  const { email, password } = credentials.values!;
                  setEmailUsed(email);
                  login({ variables: { email, password } });
                } catch (err) {}
              }
            }}
            className="signUp-form"
          >
            <div className="main-inputs">
              <LabeledInput {...register("email")} />
              <LabeledInput {...register("password")} />
            </div>
            <Button
              withLoading={{
                toBeLoading: signedIn,
                toModifyOnStateChange: {
                  endingToReplace: "n",
                  word: "Sign",
                  keepEnding: true,
                },
              }}
            >
              Sign in
            </Button>
            {error && <ErrorWrapper>{error}</ErrorWrapper>}
          </form>
          <p className="form-cta forgot">
            <Link href="/auth/reset">Forgot your password?</Link>
          </p>
          <OAuthMethods />
          <p className="form-cta">
            New out here? <Link href="/signup">Sign up</Link>!
          </p>
        </div>
      </Container>
    </Wrapper>
  );
};

export default SignIn;
