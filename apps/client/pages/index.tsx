import { useState, useRef, memo, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { Container } from "../styled/reusable";
import { Button } from "../styled/reusable";
import { Showcase as ShowcaseComp, Card } from "../components";
import Fade from "react-reveal/Fade";
import { emailRegExp } from "../utils/emailRegExp";
import Scroller from "../components/Scroller/Scroller";
import LoadingButton from "../components/Button/Button";
import { useTypedSelector } from "../hooks/useTypedSelector";

import { ADD_EMAIL_TO_NEWSLETTER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

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

    ${Button} {
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
      padding: 0.4em 2em;
      font-size: 1.4rem;
      background: #117ee3;
      box-shadow: 0px 0px 7px 1px rgba(48, 89, 232, 0.65);
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

      &:hover {
        cursor: pointer;
        background: #2b95f8;
      }
    }

    .maillisted {
      box-shadow: 0px 0px 7px 1px rgba(58, 240, 91, 0.6) !important;
      background-color: #23db45 !important;
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
  const { jwt } = useTypedSelector((state) => state).user;
  const [addEmailToNewsletter, { data, error, loading }] = useMutation(
    ADD_EMAIL_TO_NEWSLETTER
  );

  // const [buttonState, setButtonState] = useState("Subscribe");
  const [emailProgress, setEmailProgress] = useState({
    state: false,
    status: "Subscribe",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    // if (data && !data.addToEmail.success) {
    //   setEmailError(
    //     "We couldn't add you to our mailing list. Please, try once again later,"
    //   );
    // }
    if (error) {
      setEmailError(error.graphQLErrors[0].message);
    }
  }, [loading]);

  return (
    <>
      <Head>
        <title>Wellfaree</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="wrapper">
        <Hero>
          <Container>
            <div className="hero-info">
              <Fade bottom>
                <h1>Summarize your mental state in a single place</h1>
              </Fade>
              <Fade bottom>
                <p className="subtitle">
                  Ever felt lost and emotionally burnt out? Cut it! Organize
                  yourself and your mental state using <b>Wellfare</b>.
                </p>
              </Fade>
              <Fade bottom>
                <Link href={jwt ? "/app" : "/signup"}>
                  <Button>Get Started</Button>
                </Link>
              </Fade>
            </div>
          </Container>
          <Scroller>
            <Card
              title="Journal your feelings"
              description="How you feelings? is eveything ok? Well. it’s time to journal that"
            />
            <Card
              title="Journal your feelings"
              description="How you feelings? is eveything ok? Well. it’s time to journal that"
            />
            <Card
              title="Journal your feelings"
              description="How you feelings? is eveything ok? Well. it’s time to journal that"
            />
            <Card
              title="Journal your feelings"
              description="How you feelings? is eveything ok? Well. it’s time to journal that"
            />
            <Card
              title="Journal your feelings"
              description="How you feelings? is eveything ok? Well. it’s time to journal that"
            />
            <Card
              title="Journal your feelings"
              description="How you feelings? is eveything ok? Well. it’s time to journal that"
            />
            <Card
              title="Journal your feelings"
              description="How you feelings? is eveything ok? Well. it’s time to journal that"
            />
          </Scroller>
        </Hero>
        <UIFeaturing>
          <Container>
            <Fade bottom>
              <h2>Clean UI for the best experience ever.</h2>
            </Fade>
            <Showcase />
          </Container>
        </UIFeaturing>
        <MailSection>
          <Container>
            <Fade bottom>
              <h2>Dont miss out on the latest news!</h2>
            </Fade>
            <Fade bottom>
              <p className="subtitle">
                Subscribe to our newsletter to stay up to date to the latest
                updates
              </p>
            </Fade>
            <Fade bottom>
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
                  <LoadingButton
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
                  </LoadingButton>
                </div>
              </div>
              <p className="email-error">{emailError}</p>
            </Fade>
          </Container>
        </MailSection>
      </div>
    </>
  );
};

export default Home;
