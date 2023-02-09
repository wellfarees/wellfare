import { useState, useRef, memo, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";

import {
  Showcase as ShowcaseComp,
  Card,
  Scroller,
  Button,
} from "../components";
import { Container } from "../styled/reusable";
import { Button as ButtonStyles } from "../styled/reusable";
import { GlowingBlue } from "../styled/reusable";
import { emailRegExp } from "../utils/emailRegExp";

import { useMutation } from "@apollo/client";
import { ADD_EMAIL_TO_NEWSLETTER } from "../graphql/mutations";

import { useAppSelector } from "../hooks/useAppSelector";
import AdaptiveAnimation from "../components/animated/AdaptiveAnimation";

const Showcase = memo(ShowcaseComp);

const Hero = styled.section`
  width: 100%;
  height: 100vh;
  background-image: url("img/blob-scene-haikei.svg");
  background-size: cover;
  background-repeat: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .hero-info {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 4.5rem;
      max-width: 550px;
      display: inline-block;
      font-weight: 900;
      line-height: 1.1;
      background-image: -webkit-linear-gradient(45deg, #117ee3, #00f0ff);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p.subtitle {
      max-width: 400px;
      display: inline-block;
      font-size: 1.6rem;
      line-height: 1.3;
      margin-top: 1em;
      color: #444;
    }

    ${ButtonStyles} {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2em;
    }
  }

  .scroller {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    height: 100vh;
  }

  @media only screen and (max-width: 425px) {
    .hero-info {
      align-items: flex-start;
      text-align: start;

      h1 {
        font-size: 3.5rem;
      }
    }

    .scroller {
      display: block;
      margin-top: 4em;
      margin-left: -67vw;
    }
  }

  @media only screen and (max-height: 425px) and (max-width: 812px) {
    height: auto !important;
    padding: 11em 0 !important;

    h1 {
      font-size: 2.5rem !important;
      width: 300px;
    }
  }

  @media only screen and (max-width: 320px) {
    h1 {
      font-size: 3rem !important;
    }
  }
`;

const MailSection = styled.section`
  background-color: #fbfbfb;
  padding: 5em 0;
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
  }

  p.subtitle {
    font-size: 1.6rem;
    line-height: 1.3;
    margin-top: 1.5em;
    max-width: 300px;
    display: inline-block;
  }

  .email-error {
    margin-top: 2em;
    font-size: 1.2rem;
    color: red;
  }

  .mail-input {
    background-color: #fff;
    display: inline-flex;
    padding: 0.7em 1.4em;
    margin-top: 3em;
    border-radius: 6px;
    box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.14);
    width: 400px;
    justify-content: space-between;
    max-width: 100%;

    input {
      background-color: none;
      border: none;
      outline: none;
      width: 100%;
      padding-right: 1.2em;

      &:disabled {
        cursor: not-allowed;
        background: none;
      }
    }

    .email-btn {
      color: #fafafa;
      font-size: 1.4rem;
      border-radius: 3px;
      margin-top: 0.1em;
      display: inline-flex;
      transition: 0.5s all;
      outline: none;
      border: none;
      margin-top: 0;
      justify-content: center;
      align-items: center;
      transition: 0.3s all;
      ${GlowingBlue}
      padding: 0.4em 2em;

      &:hover {
        cursor: pointer;
      }
    }

    .maillisted {
      box-shadow: 0px 0px 7px 1px rgba(58, 240, 91, 0.6) !important;
      background: linear-gradient(180deg, #0fe20a 0%, #00b528 100%);
    }
  }

  @media only screen and (max-width: 550px) {
    button {
      padding: 0.4em 1em !important;
    }

    .email-btn {
      padding: 0.4em 2.1em !important;
    }
  }
`;

const UIFeaturing = styled.section`
  min-height: 50vh;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10em 0;

  .slider {
    margin-top: 5em;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    max-width: 300px;
    display: inline-block;
    line-height: 1.4;
  }

  @media only screen and (max-width: 550px) {
    padding: 5em 0;
  }
`;

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const successfullyMailListed = useRef(false);
  const mailContainer = useRef<HTMLDivElement | null>(null);
  const { jwt } = useAppSelector((state) => state).user;
  const [addEmailToNewsletter, { error, loading }] = useMutation(
    ADD_EMAIL_TO_NEWSLETTER
  );

  // const [buttonState, setButtonState] = useState("Subscribe");
  const [emailProgress, setEmailProgress] = useState({
    state: false,
    status: "Subscribe",
  });

  useEffect(() => {
    if (error) {
      setEmailError(error.graphQLErrors[0].message);
    }
  }, [loading, error]);

  return (
    <>
      <Head>
        <title>Wellfare</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="wrapper">
        <Hero>
          <Container>
            <div className="hero-info">
              <AdaptiveAnimation>
                <h1>Summarize your mental state in a single place</h1>
              </AdaptiveAnimation>
              <AdaptiveAnimation>
                <p className="subtitle">
                  Feeling overwhelmed and drained? Take control of your mental
                  well-being and get back on track with <b>Wellfare</b>.
                </p>
              </AdaptiveAnimation>
              <AdaptiveAnimation>
                <Link passHref href={jwt ? "/app" : "/signup"}>
                  <Button>Get Started</Button>
                </Link>
              </AdaptiveAnimation>
            </div>
          </Container>
          <Scroller>
            <Card
              title="What makes you tik?"
              description="Find your affirmations to keep going."
            />
            <Card
              title="Let it go."
              description="Write down what makes you uneasy and feel relieved."
            />
            <Card
              title="Be mindfull."
              description="Practice gratitude, it goes a long way."
            />
            <Card
              title="Summarizing is cool."
              description="Track and visualize your emotional growth with emojis."
            />
            <Card
              title="Take control."
              description="Make a habit of journaling, even if it is just your feelings."
            />
          </Scroller>
        </Hero>
        <UIFeaturing>
          <Container>
            <AdaptiveAnimation>
              <h2>Enhance your experience with our sleek and clean UI.</h2>
            </AdaptiveAnimation>
            <Showcase />
          </Container>
        </UIFeaturing>
        <MailSection>
          <Container>
            <AdaptiveAnimation>
              <h2>Get the latest updates and news.</h2>
            </AdaptiveAnimation>
            <AdaptiveAnimation>
              <p className="subtitle">
                Stay in the loop and subscribe to our newsletter for the latest
                updates.
              </p>
            </AdaptiveAnimation>
            <AdaptiveAnimation>
              <div className="mail-input">
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <div ref={mailContainer}>
                  <Button
                    customClassName="email-btn"
                    withLoading={{
                      toBeLoading: emailProgress.state,
                    }}
                    blockOnce={true}
                    onClick={async () => {
                      if (successfullyMailListed.current) return;
                      setEmailError("");

                      if (!email.length) {
                        setEmailError("Please, enter your email address.");
                        return;
                      }

                      if (!emailRegExp.test(email)) {
                        setEmailError("Please, enter a valid email address.");
                        return;
                      }

                      setEmailProgress({ state: true, status: "Requesting" });
                      setEmailError("");
                      // start loading indicator and register an email

                      // registration completion -> SIMULATION
                      // TODO: To be replaced with an actual implementation

                      try {
                        await addEmailToNewsletter({ variables: { email } });

                        setTimeout(() => {
                          setEmailProgress({
                            state: false,
                            status: "Subscribed!",
                          });

                          if (emailRef.current) {
                            emailRef.current.disabled = true;
                          }

                          if (mailContainer.current) {
                            const btn =
                              mailContainer.current.querySelector(
                                ".email-btn"
                              )!;
                            btn.classList.add("maillisted");
                          }

                          successfullyMailListed.current = true;
                        }, 2000);
                      } catch (e) {
                        setEmailProgress({
                          state: false,
                          status: "Subscribe",
                        });
                      }
                    }}
                  >
                    {emailProgress.status}
                  </Button>
                </div>
              </div>
              <p className="email-error">{emailError}</p>
            </AdaptiveAnimation>
          </Container>
        </MailSection>
      </div>
    </>
  );
};

export default Home;
