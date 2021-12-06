import { NextPage } from "next";
import styled from "styled-components";
import { Container } from "../../styled/reusable";
import Link from "next/link";
import { GlowingBLue } from "../../styled/reusable";
import { useState } from "react";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/LabeledInput";

import { useForm } from "../../hooks/useForm";
import { useHandleFormErrors } from "../../hooks/useHandleFormErrors";
import { mapRefsIntoValues } from "../../utils/mapRefsIntoValues";

import { useMutation } from "react-apollo";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fdfdfd;

  .failure {
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

    span {
      ${GlowingBLue}
      display: inline-block;
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
        color: red;
      }
    }
  }

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
        width: 100%;
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

const PasswordReset: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const handleErrors = useHandleFormErrors();
  const [result, setResult] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <Wrapper>
      <Container>
        {true ? (
          <div className="submission-block">
            <header>
              <h3>We got your back, let's reset the password</h3>
              <p className="descr">
                Here's your chance to regain access to your personal account.
                Catch it!
              </p>
            </header>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = handleSubmit();
                const { success, message, target } = handleErrors(res);
                if (!success) {
                  setSuccess("");
                  target.forEach((input) => {
                    input.style.background = "rgba(255, 179, 176, 0.2)";
                  });
                  setResult(message);
                } else {
                  const values = mapRefsIntoValues(res.refs);
                  if (target) {
                    if (
                      values["password"] !== values["password confirmation"]
                    ) {
                      setSuccess("");
                      res.refs[1].style.background = "rgba(255, 179, 176, 0.2)";
                      setResult("Passwords do not match.");
                    } else {
                      res.refs.forEach((input) => {
                        input.style.background = "#f6f6f6";
                      });
                      //   try {
                      //     await sendResetEmail({
                      //       variables: { email: values.Email },
                      //     });
                      //   } catch (e) {
                      //   } finally {
                      //   }
                      setResult("");
                      setSuccess(
                        "Your password has been successfully reset. You may now close this tab."
                      );
                    }
                  }
                }

                // setResult(message);
              }}
            >
              <Input {...register("password")} />
              <Input {...register("password confirmation")} />

              <Button
                withLoading={{
                  toBeLoading: false,
                  toModifyOnStateChange: {
                    endingToReplace: "d",
                    word: "Send",
                    keepEnding: true,
                  },
                }}
              >
                Reset now
              </Button>
            </form>
            {(result || success) && (
              <p className={success ? "success" : "error"}>
                {result || success}
              </p>
            )}
          </div>
        ) : (
          <div className="failure">
            <h1>
              This verification link is <b>invalid</b>
            </h1>
            <div className="descr">
              <p>
                The link you clicked on has either expired or been faked.
                Please, make sure you do not use links from unverified sources.
              </p>
            </div>
            <Link href="/">
              <span>Return home</span>
            </Link>
          </div>
        )}
      </Container>
    </Wrapper>
  );
};

export default PasswordReset;
