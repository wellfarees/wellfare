import { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import { formatDate } from "../../utils/formatDate";
import { ShrankContainer } from "../../styled/reusable";
import AdaptiveAnimation from "../../components/animated/AdaptiveAnimation";
import { WatermarkInput } from "../../components";
import { useTextareaValidator } from "../../hooks/useTextareaValidator";
import { GlowingBLue } from "../../styled/reusable";
import { useState, useRef } from "react";
import Button from "../../components/Button/Button";
import { EDIT_AFFIRMATIONS } from "../../graphql/mutations";
import { AFFIRMATIONS_QUERY } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";

const Wrapper = styled.div`
  .subtitle {
    margin-top: 0.5em;
  }

  .subinfo {
    max-width: 380px;
    margin-top: 0.5em;

    p {
      margin-top: 1em;
      line-height: 1.5;
    }

    a {
      text-decoration: underline;
      color: #117ee3;
    }
  }

  .affirmations {
    margin: 2.5em 0;
    line-height: 1.7;
    max-width: 80%;
  }

  .lastUpdated {
    margin-top: 0.8em;
    color: ${(props) => props.theme.shadedColor};
  }

  .save-btn {
    ${GlowingBLue}
  }

  .button-container {
    margin-top: 4em;
  }
`;

const ChangeButton = styled.button`
  background: ${(props) => props.theme.secondaryButton};
  padding: 0.7em 4em;
  border-radius: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  color: ${(props) => props.theme.mainColor};

  &:hover {
    background: ${(props) => props.theme.lighterHover};
  }

  @media only screen and (max-width: 425px) {
    width: 100%;
  }
`;

const Affirmations: NextPage = () => {
  const [isLocked, setIsLocked] = useState(true);
  const { handleTextareaSubmit, register } = useTextareaValidator();
  const infoBtn = useRef<HTMLButtonElement | null>(null);
  const [state, setState] = useState(false);
  const [buttonsSwitched, switchButtons] = useState(false);
  const [setAffirmations] = useMutation(EDIT_AFFIRMATIONS);
  const { loading, data } = useQuery(AFFIRMATIONS_QUERY);

  const registerInput = register();

  useEffect(() => {
    if (!loading && data && !data.getUser.affirmations) switchButtons(true);
  }, [loading, data]);

  const submitAffirmations = () => {
    const changeButtonState = () => {
      if (infoBtn.current) {
        infoBtn.current.style.pointerEvents = "none";
        infoBtn.current.style.cursor = "not-allowed";
      }

      const res = handleTextareaSubmit().refs[0]?.current.value;
      if (!res) return;
      setState(!state);

      setAffirmations({ variables: { affirmations: res } });
      setTimeout(() => {
        setIsLocked(!isLocked);
        if (infoBtn.current) {
          infoBtn.current.style.pointerEvents = "auto";
          infoBtn.current.style.cursor = "pointer";
          setIsLocked(!isLocked);
        }

        switchButtons(!buttonsSwitched);
        setState(false);
      }, 2000);
    };

    if (loading || !data) return;

    if (!data.getUser.affirmations) {
      if (!isLocked) {
        setIsLocked(!isLocked);
      } else {
        changeButtonState();
      }
    } else {
      if (!isLocked) {
        changeButtonState();
      } else {
        setIsLocked(!isLocked);
      }
    }
  };

  if (loading && !data) return <Wrapper></Wrapper>;

  return (
    <ShrankContainer>
      <Wrapper>
        {data.getUser.affirmations ? (
          <header>
            <AdaptiveAnimation>
              <h2>Your affirmations</h2>
              <p className="subtitle">
                Read them <b>carefully &amp; consciously</b>.
              </p>
            </AdaptiveAnimation>
          </header>
        ) : (
          <header>
            <AdaptiveAnimation>
              <h2>
                Hmm... Seems <b>a little too calm</b> over here
              </h2>
            </AdaptiveAnimation>
            <div className="subinfo">
              <p>
                First time for everything. Write down your affirmations to start
                reading them and reassuring yourself.
              </p>
              <p>
                {/* TODO: Create an article post or smth */}
                Here’s{" "}
                <a href="https://www.everydayhealth.com/emotional-health/what-are-affirmations/">
                  an article
                </a>{" "}
                about affirmations and how to write them.
              </p>
            </div>
          </header>
        )}
        <div className="affirmations">
          <WatermarkInput
            main={false}
            placeholder="I have an expensive car. I live a happy..."
            label="My affirmations"
            toFocus={true}
            isLocked={data && data.getUser.affirmations ? isLocked : !isLocked}
            defaultValue={data && data.getUser.affirmations}
            {...(data && registerInput)}
          ></WatermarkInput>
        </div>
        <p className="author">
          Affirmations by <b>{data.getUser.information.firstName}</b>
        </p>
        <p className="lastUpdated">
          {data.getUser.affirmations
            ? formatDate(new Date())
            : formatDate(new Date())}
        </p>
        <div className="button-container">
          {buttonsSwitched ? (
            <Button
              onClick={() => {
                submitAffirmations();
              }}
              withLoading={{
                toBeLoading: state,
                toModifyOnStateChange: {
                  endingToReplace: "e",
                  word: "Save",
                },
              }}
            >
              Save changes
            </Button>
          ) : (
            <ChangeButton
              onClick={() => {
                switchButtons(!buttonsSwitched);
                setIsLocked(!isLocked);
              }}
            >
              Make changes
            </ChangeButton>
          )}
        </div>
      </Wrapper>
    </ShrankContainer>
  );
};

export default Affirmations;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      affirmations: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      // affirmations: null,
      lastUpdated: Date.now(),
      name: "Rolands",
    },
    revalidate: 5,
  };
};
