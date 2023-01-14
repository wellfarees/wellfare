import { NextPage } from "next";
import Input from "../../components/Input/LabeledInput";
import Button from "../../components/Button/Button";
import { useForm } from "../../hooks/useForm";
import { useHandleFormErrors } from "../../hooks/useHandleFormErrors";
import { Container } from "../../styled/reusable";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { mapRefsIntoValues } from "../../utils/mapRefsIntoValues";

import { useMutation } from "@apollo/client";
import { SEND_RESET_PASSWORD } from "../../graphql/mutations";

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

    .default-btn-styles {
      width: 100%;
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

const Reset: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const [sendResetEmail, { loading, data, error }] =
    useMutation(SEND_RESET_PASSWORD);
  const [result, setResult] = useState("");
  const [success, setSuccess] = useState("");
  const handleErrors = useHandleFormErrors();

  useEffect(() => {
    if (!loading) {
      if (data) {
        setSuccess("Further instructions have been sent to your email.");
      }
      if (error) {
        setResult(error.graphQLErrors[0].message);
      }
    }
  }, [loading, data, error]);

  return (
    <Wrapper>
      <Container>
        <div className="submission-block">
          <header>
            <h3>Wellfare shall help with your problem</h3>
            <p className="descr">
              Just enter your email and we will send you an email with further
              password reset instructions.
            </p>
          </header>
          <form
            onSubmit={async (e) => {
              setResult("");
              setSuccess("");
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
                  await sendResetEmail({
                    variables: { email: values.Email },
                  });
                  res.refs.forEach((input) => {
                    input.style.background = "#f6f6f6";
                  });
                } catch (e) {
                } finally {
                }
              }

              setResult(message);
            }}
          >
            <Input {...register("Email")} />
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
              Send reset email
            </Button>
          </form>
          {(result || success) && (
            <p className={success ? "success" : "error"}>{result || success}</p>
          )}
        </div>
      </Container>
    </Wrapper>
  );
};

export default Reset;
