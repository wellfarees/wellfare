import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "../../styled/reusable";
import styled from "styled-components";
import Link from "next/link";
import { GlowingBLue } from "../../styled/reusable";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/LabeledInput";
import { useForm } from "../../hooks/useForm";
import { useHandleFormErrors } from "../../hooks/useHandleFormErrors";
import { mapRefsIntoValues } from "../../utils/mapRefsIntoValues";

import { useMutation } from "@apollo/client";
import { RESTORE_EMAIL } from "../../graphql/mutations";

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

  .submission-block {
    max-width: auto;
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    justify-content: center;

    form {
      margin-top: 1.5em;
      display: flex;
      flex-direction: column;
      gap: 2.5em;

      input {
        background: #f6f6f6;
      }

      button {
        margin-left: 0.1em;
      }
    }

    header {
      text-align: center;
      max-width: 300px;

      h3 {
        font-size: 2.4rem;
        font-weight: 800;
        line-height: 1.5;
      }

      .descr {
        font-size: 1.3rem;
        margin-top: 1em;
        line-height: 1.5;
        display: inline-block;
      }
    }

    .error,
    .success {
      font-size: 1.4rem;
      line-height: 1.4;
      max-width: 240px;
      text-align: center;
      margin-top: 0.4em;
    }

    .success {
      color: green;
    }

    .error {
      color: red;
    }
  }

  @media only screen and (max-width: 816px) and (max-height: 560px) {
    .submission-block {
      margin: 9em 0;
    }
  }

  @media only screen and (max-width: 560px) {
    button {
      margin-top: 1em;
    }
  }
`;

const Restore: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const [restoreEmail, { loading, error }] = useMutation(RESTORE_EMAIL);
  const [result, setResult] = useState("");
  const [success, setSuccess] = useState("");
  const handleErrors = useHandleFormErrors();
  const emailToRestore = router.query.email;

  useEffect(() => {
    if (error) {
      setResult(error.graphQLErrors[0].message);
    }
  }, [error]);

  return (
    <Wrapper>
      <Container>
        <div className="submission-block">
          <header>
            <h3>Let's get back to it.</h3>
            <p className="descr">
              Enter the email that was last associated with your account and
              either reconfirm it or connect another email.
            </p>
          </header>
          <form
            onSubmit={async (e) => {
              setSuccess("");
              setResult("");
              e.preventDefault();
              const res = handleSubmit();
              const { success, message, target } = handleErrors(res);
              if (!success) {
                target.forEach((input) => {
                  input.style.background = "rgba(255, 179, 176, 0.2)";
                });
              } else {
                const values = mapRefsIntoValues(res.refs);

                try {
                  await restoreEmail({
                    variables: {
                      email: values.Email,
                      newEmail: values.email,
                    },
                  });

                  res.refs.forEach((input) => {
                    input.style.background = "#f6f6f6";
                  });

                  setResult("");
                  setSuccess(
                    `You've been sent a confirmation details to the address <b>${values.Email}</b>. Confirm the email before trying to sign in again.`
                  );
                } catch (e) {}
              }

              if (message) setResult(message);
            }}
          >
            <Input
              {...register("Email")}
              defaultValue={emailToRestore as string}
            />
            <Input {...register("New email")} type="email" />
            <Button
              withLoading={{
                toBeLoading: loading,
                toModifyOnStateChange: {
                  endingToReplace: "d",
                  word: "Send",
                  keepEnding: true,
                },
              }}
            >
              Restore account
            </Button>
          </form>
          {(result || success) && (
            <p
              className={success ? "success" : "error"}
              dangerouslySetInnerHTML={{ __html: result || success }}
            ></p>
          )}
        </div>
      </Container>
    </Wrapper>
  );
};

export default Restore;
