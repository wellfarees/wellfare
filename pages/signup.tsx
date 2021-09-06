import Link from "next/Link";
import { useState } from "react";
import { Input } from "../components";
import { Container } from "../styled/reusable";
import { GlowingBLue } from "../styled/reusable";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useForm } from "../hooks/useForm";
import { useHandleFormErrors } from "../hooks/useHandleFormErrors";
import { animated, useSpring, config } from "react-spring";

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
      button {
        ${GlowingBLue}
        width: 100%;
        margin-top: 1.5em;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        .loading-indicator {
          width: 15px;
          height: 15px;
          border-radius: 100%;
          display: inline-block;
          border: 3px solid #fff;
          border-bottom: 3px solid #0bf5f56a;
          margin-right: 0.7em;
        }
      }
    }

    .input-block,
    input {
      width: 100%;
    }

    .input-block {
      margin-top: 2em;
    }

    .divider {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5em;

      span {
        color: #a6a6a6;
        font-size: 1.2rem;
      }

      &:before,
      &:after {
        content: "";
        display: inline-block;
        height: 2px;
        width: 40%;
        background-color: #f0f0f0;
        position: absolute;
        top: 50%;
        bottom: 50%;
      }

      &:before {
        left: 0;
      }

      &:after {
        right: 0;
      }
    }

    .oAuth-methods {
      .method {
        padding: 0.9em;
        background-color: #fff;
        border: 1px solid #ececec;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.4rem;
        border-radius: 6px;
        font-weight: 500;
        margin-top: 1.5em;
        transition: 0.3s;

        &:hover {
          background-color: #fafafa;
        }

        i {
          margin-right: 0.7em;
        }
      }
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
  }

  @media only screen and (max-width: 420px) {
    .signUp-card {
      width: 100%;
      background: none;
      padding: 0 !important;
      box-shadow: none;
      margin-top: 0em !important;

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

      .divider {
        margin-top: 2.5em;
      }

      .method {
        padding-top: 1.2em !important;
        padding-bottom: 1.2em !important;
        margin-top: 1.7em !important;
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

      .divider {
        margin-top: 2.5em;
      }

      .method {
        padding-top: 1.2em !important;
        padding-bottom: 1.2em !important;
        margin-top: 1.7em !important;
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

const signUp = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [buttonState, setButtonState] = useState("Sign up");

  const [indicatorStyles, indicatorApi] = useSpring(() => {
    return {
      from: {
        display: "none",
        opacity: 0,
        rotateZ: 0,
      },
    };
  });

  return (
    <Wrapper>
      <Container>
        <div className="info">
          <h1>Sign up now &amp; start journaling</h1>
          <p>
            Wanna do it quick? We got you covered - choose whatever auth method
            you like!
          </p>
        </div>
        <div className="signUp-card">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              // Contains an object with all user's credentials or errors occurred ( + input references )
              const credentials = handleSubmit();

              // if success is true there's no errors
              const { success, message, target } =
                useHandleFormErrors(credentials);

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
                indicatorApi.start({
                  to: async (animate) => {
                    await animate({
                      to: { display: "inline-block" },
                    });
                    await animate({
                      to: { opacity: 1 },
                    });
                    await animate({
                      to: { rotateZ: 360 },
                      loop: true,
                      delay: 0,
                      config: config.molasses,
                    });
                  },
                });

                setButtonState("Registering");

                try {
                  // TODO: Authorize user (send an http request or something)

                  setError(null);
                  // redirect after successful registration
                } catch (err) {
                  // Handling server-side errors
                  indicatorApi.start({
                    to: async (animate) => {
                      await animate({
                        to: { opacity: 0 },
                      });
                      await animate({
                        to: { display: "none" },
                      });
                      await animate({
                        to: { rotateZ: 0 },
                        loop: false,
                        delay: 0,
                      });
                    },
                  });

                  setError("Couldn't reach our database, pease, try again!");
                  setButtonState("Sign Up");
                }
              }
            }}
            className="signUp-form"
          >
            <div className="main-inputs">
              <Input {...register("name")} />
              <Input {...register("email")} />
              <Input {...register("password")} />
            </div>
            <button>
              <animated.span
                style={indicatorStyles}
                className="loading-indicator"
              ></animated.span>
              {buttonState}
            </button>
            {error && <ErrorWrapper>{error}</ErrorWrapper>}
          </form>
          <div className="divider">
            <span>or</span>
          </div>
          <div className="oAuth-methods">
            <div className="method">
              <i className="fab fa-apple"></i>
              AppleId
            </div>
            <div className="method">
              <i className="fab fa-google"></i>
              Google
            </div>
          </div>
          <p className="form-cta">
            Already been here?{" "}
            <Link href="/signin">
              <a href="#"> Sign in</a>
            </Link>
            !
          </p>
        </div>
      </Container>
    </Wrapper>
  );
};

export default signUp;