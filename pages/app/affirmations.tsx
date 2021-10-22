import { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import { formatDate } from "../../utils/formatDate";
import { ShrankContainer } from "../../styled/reusable";
import AdaptiveAnimation from "../../components/animated/AdaptiveAnimation";
import { WatermarkInput } from "../../components";
import { useTextareaValidator } from "../../hooks/useTextareaValidator";
import { GlowingBLue } from "../../styled/reusable";
import { useState, useRef, MutableRefObject } from "react";
import { useLoadingIndicator } from "../../hooks/useLoadingIndicator";

const InfoWrapper = styled.div`
  .subtitle {
    margin-top: 0.5em;
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

  button.makeChanges {
    background: ${(props) => props.theme.secondaryButton};
    padding: 0.7em 4em;
    border-radius: 5px;
    outline: none;
    border: none;
    cursor: pointer;
    margin-top: 3em;
    transition: 0.3s;
    color: ${(props) => props.theme.mainColor};

    &:hover {
      background: ${(props) => props.theme.lighterHover};
    }

    @media only screen and (max-width: 425px) {
      width: 100%;
    }
  }

  .save-btn {
    ${GlowingBLue}
  }
`;
const NoInfoWrapper = styled.div`
  header {
    max-width: 500px;

    h2 {
      font-weight: 500;
      line-height: 1.5;
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
  }

  .affirmations {
    margin-top: 6em;

    .active-textarea {
      margin-top: 1.8em;
    }

    .save-btn {
      ${GlowingBLue}
      margin-top: 4em;
      width: auto;
      display: flex;
      align-items: center;
      gap: 0.5em;
      transition: 0.3s;
    }

    .edit-btn {
      background: ${(props) => props.theme.secondaryButton};
      padding: 0.7em 4em;
      border-radius: 5px;
      outline: none;
      border: none;
      cursor: pointer;
      margin-top: 4em;
      transition: 0.3s;
      color: ${(props) => props.theme.mainColor};

      &:hover {
        background: ${(props) => props.theme.lighterHover};
      }

      @media only screen and (max-width: 425px) {
        width: 100%;
        padding: 1em 4em;
      }
    }
  }
`;

const Affirmations: NextPage<{
  affirmations: string;
  lastUpdated: number;
  name: string;
}> = ({ affirmations, name, lastUpdated }) => {
  const [isLocked, setIsLocked] = useState(true);
  const { handleTextareaSubmit, register } = useTextareaValidator();
  const { Spinner, startSpinner, stopSpinner } = useLoadingIndicator();
  const noInfoBtn = useRef<HTMLButtonElement | null>(null);
  const infoBtn = useRef<HTMLButtonElement | null>(null);

  const submitAffirmations = (
    btn: MutableRefObject<HTMLButtonElement | null>,
    hasInitialValue: boolean
  ) => {
    if (!hasInitialValue) {
      if (!isLocked) {
        setIsLocked(!isLocked);
        return;
      }
    } else {
      if (isLocked) {
        setIsLocked(!isLocked);
        return;
      }
    }

    if (btn.current) {
      btn.current.style.pointerEvents = "none";
      btn.current.style.cursor = "not-allowed";
    }

    const res = handleTextareaSubmit().refs[0]?.current.value;
    console.log(res);

    startSpinner();

    // Send new affirmations to the server! (res constant contains the affirmations themselves)
    setTimeout(() => {
      stopSpinner();
      setIsLocked(!isLocked);
      if (btn.current) {
        btn.current.style.pointerEvents = "auto";
        btn.current.style.cursor = "pointer";
      }
    }, 2000);
  };

  return (
    <ShrankContainer>
      {affirmations ? (
        <InfoWrapper>
          <AdaptiveAnimation>
            <h2>Your affirmations</h2>
            <p className="subtitle">
              Read them <b>carefully &amp; consciously</b>.
            </p>
          </AdaptiveAnimation>

          <div className="affirmations">
            <WatermarkInput
              main={false}
              placeholder="I have an expensive car. I live a happy..."
              label="My affirmations"
              toFocus={true}
              {...register()}
              isLocked={isLocked}
              defaultValue={affirmations}
            ></WatermarkInput>
          </div>
          <p className="author">
            Affirmations by <b>{name}</b>
          </p>
          <p className="lastUpdated">{formatDate(new Date(lastUpdated))}</p>
          <button
            className={`makeChanges ${!isLocked ? "save-btn" : ""}`}
            ref={infoBtn}
            onClick={() => {
              submitAffirmations(infoBtn, true);
            }}
          >
            {Spinner}
            {!isLocked ? "Save" : "Make"} changes
          </button>
        </InfoWrapper>
      ) : (
        <NoInfoWrapper>
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
                Here’s <a href="#">an article</a> about affirmations and how to
                write them.
              </p>
            </div>
          </header>

          <div className="affirmations">
            <h3>Your affirmations</h3>
            <WatermarkInput
              main={false}
              placeholder="I have an expensive car. I live a happy..."
              label="My affirmations"
              toFocus={true}
              isLocked={!isLocked}
              {...register()}
            ></WatermarkInput>
            <button
              ref={noInfoBtn}
              onClick={() => {
                submitAffirmations(noInfoBtn, false);
              }}
              className={isLocked ? "save-btn" : "edit-btn"}
            >
              {Spinner}
              {isLocked ? "Save" : "Make"} changes
            </button>
          </div>
        </NoInfoWrapper>
      )}
    </ShrankContainer>
  );
};

export default Affirmations;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      //   affirmations: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      //   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

      //   Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      affirmations: null,
      lastUpdated: Date.now(),
      name: "Rolands",
    },
    revalidate: 5,
  };
};
