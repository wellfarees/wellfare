import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { Container, GlowingBLue, Error } from "../../styled/reusable";
import { WatermarkInput } from "../../components";
import { UserPfp } from "../../components/Pfp/Pfp";
import { useEffect, useRef, useState } from "react";
import { useTextareaValidator } from "../../hooks/useTextareaValidator";
import { animated, useSpring, config } from "react-spring";
import { TouchEvent } from "react";
import Button from "../../components/Button/Button";

import { ADD_RECORD } from "../../graphql/mutations";
import { GET_FIRST_NAME, GET_LAST_SUBMITTED } from "../../graphql/queries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

const Wrapper = styled.main`
  min-height: 100vh;
  /* width: 100vw; */
  height: auto;
  background-color: ${(props: any) => props.theme.backgroundColor};
  color: ${(props: any) => props.theme.mainColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${Error} {
    margin-bottom: -2em;
  }

  ${Container} {
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: flex-start;
    min-height: 80vh;
    margin: 8em 0;

    @media only screen and (min-width: 1024px) {
      justify-content: center;
    }
  }

  .upper {
    width: 100%;
  }

  .top-bar {
    margin-bottom: 2em;
    width: 100% !important;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p.logo {
      font-weight: 700;
    }
  }

  .greetings {
    font-weight: 500;
    margin-bottom: 1.5em;
    max-width: 100%;

    span {
      font-weight: 700;
    }
  }

  textarea {
    width: 400px;
    max-width: 100%;
  }

  .summarizedEmoji {
    font-size: 2rem !important;
  }

  .details {
    margin-top: 2.5em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;

    .summarize {
      cursor: pointer;
      color: ${(props) => props.theme.watermark};
      position: relative;
      display: inline-block;
      margin-top: 1em;
      width: 300px;

      &::before {
        content: "";
        background-color: ${(props) => props.theme.watermark};
        position: absolute;
        left: 0;
        bottom: -1em;
        width: 50px;
        height: 2px;
        display: inline-block;
        border-radius: 20px;
      }
    }

    .summarize.error {
      color: rgb(255, 0, 0, 0.4);

      &::before {
        background-color: rgb(255, 0, 0, 0.4);
      }
    }

    .summarize.active {
      span {
        margin-left: 0.8em;
      }
      color: ${(props) => props.theme.mainColor};

      &::before {
        display: none;
      }
    }
  }

  footer {
    display: flex;
    gap: 3em;
    margin-top: 2em;
    flex-direction: column;

    .btns {
      display: flex;
      gap: 3em;
      align-items: center;
      margin-top: 3em;
    }

    button {
      ${GlowingBLue}
    }

    a {
      font-size: 1.4rem;
      margin-top: -0.5em;
      text-decoration: underline;
    }

    @media only screen and (max-width: 515px) {
      width: 100%;

      .btns {
        flex-direction: column;
        width: 100%;
        gap: 4em;
        align-items: flex-start;

        button {
          width: 100%;
        }
      }
    }
  }
`;

// Emoji modal
const EmojiWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;

  .emoji {
    font-size: 2rem !important;
  }

  @media only screen and (max-width: 450px) {
    .emoji {
      font-size: 1.9rem !important;
    }
  }

  .overlay {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    opacity: 0;
    transition: 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.55);
    }
  }

  .modal {
    background-color: ${(props: any) => props.theme.maximum};
    padding: 4em;
    border-radius: 16px;
    position: relative;
    z-index: 4;
    display: flex;
    gap: 3em;
    flex-direction: column;
    display: none;

    .draggable {
      display: none;
      cursor: pointer;
    }

    .row {
      .emojis {
        margin-top: 2em;
        display: flex;
        gap: 2em;

        .emoji {
          font-size: 2.4rem;
          cursor: pointer;
          transition: 0.3s;

          &:hover {
            transform: translateY(-2px);
          }
        }
      }
    }

    span.close {
      position: absolute;
      top: 0.5em;
      right: 1em;
      color: ${(props: any) => props.theme.watermark};
      font-size: 2rem;
      padding: 0.5em;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        color: ${(props: any) => props.theme.shadedColor};
      }
    }
  }

  @media only screen and (max-width: 450px) {
    .draggable {
      display: inline-block !important;
      width: 80px;
      height: 3px;
      border-radius: 30px;
      background-color: ${(props: any) => props.theme.shadedColor};
      margin-bottom: 1em;
    }

    .modal {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      justify-content: center;
      align-items: center;
      padding: 6em 0 !important;
      padding-top: 3em !important;
    }

    .close {
      display: none;
    }
  }
`;

const NotAllowed = styled.div`
  height: calc(80vh - 10em);
  display: flex;

  .info {
    margin-top: 10em;

    h2 {
      font-weight: 800;
      line-height: 1.5;
    }

    p {
      margin-top: 1.3em;
      color: ${(props) => props.theme.shadedColor};

      b {
        color: ${(props) => props.theme.mainColor};
      }
    }

    button {
      ${GlowingBLue}
      margin-top: 2.5em;
    }
  }
`;

const emojisList = [
  {
    name: "At piece",
    emojis: ["🥰", "😌", "🤪", "😊"],
  },
  {
    name: "Hard to move on",
    emojis: ["😰", "😟", "😭", "😞"],
  },
  {
    name: "Unstable",
    emojis: ["😈", "😡", "😖", "😨"],
  },
];

const Entry: NextPage = () => {
  // TODO: To be replaced with graphql fetched username
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  const [currentEmoji, setCurrentEmoji] = useState("");
  const [isMobile, setIssMobile] = useState(false);
  const modalRef = useRef<null | HTMLDivElement>(null);
  const lastDeltaY = useRef(0);
  const emojiSelector = useRef<HTMLParagraphElement | null>(null);
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [addRecord] = useMutation(ADD_RECORD);
  const userQueryProps = useQuery(GET_FIRST_NAME);
  const [getLastSubmitted, { data, loading }] = useLazyQuery(
    GET_LAST_SUBMITTED,
    {
      fetchPolicy: "network-only",
    }
  );

  const { register, handleTextareaSubmit, handleResults } =
    useTextareaValidator(
      Boolean(
        data &&
          (data.getUser.lastSubmitted === null ||
            data.getUser.lastSubmitted >= 24)
      )
    );

  // Variables for mobile popup window
  let touchStart = 0;
  let startTime = 0;
  let endTime = 0;

  useEffect(() => {
    getLastSubmitted();
  }, [getLastSubmitted]);

  const startDragging = (e: TouchEvent<HTMLDivElement>): void => {
    if (!modalRef || !modalRef.current) return;

    let deltaTop = window.innerHeight - e.touches[0].clientY;

    let touchEnd = window.innerHeight - deltaTop;
    endTime = performance.now();

    const deltaY = touchEnd - touchStart;

    lastDeltaY.current = deltaY;

    if (deltaY < 0) return;

    if (Math.round(deltaY) > 40 && Math.round(deltaY) < 50) {
      // deltaSpeed = v(final) - v(initial) = 0 = v(final)
      const deltaSpeed = deltaY / ((endTime - startTime) / 1000); // pixels per second (px/s)

      // if above 300 to 350 px/s then it's a pretty fast swipe
      if (deltaSpeed > 350) {
        closeModal();
        return;
      }
    }

    mobileModalApi.start({
      to: { y: String(deltaY) + "px" },
      immediate: true,
    });
  };

  const stopDragging = (e: TouchEvent<HTMLDivElement>): void => {
    if (modalRef && modalRef.current) {
      if (lastDeltaY.current + 20 >= modalRef.current.offsetHeight / 2) {
        closeModal();
        return;
      }

      if (lastDeltaY.current <= modalRef?.current.offsetHeight / 2) {
        mobileModalApi.start({
          to: { y: "0px" },
        });
      }
    }

    window.removeEventListener("touchmove", startDragging as any);
  };

  const initDrag = (e: TouchEvent<HTMLDivElement>): void => {
    let deltaTop = window.innerHeight - e.touches[0].clientY;
    touchStart = window.innerHeight - deltaTop;

    startTime = performance.now();
    window.addEventListener("touchmove", startDragging as any);
    window.addEventListener("touchend", stopDragging as any);
  };

  useEffect(() => {
    closeModal();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // Spring styles for modal
  const [modalWrapperStyles, modalWrapperApi] = useSpring(
    {
      from: { display: "none" },
    },
    []
  );

  const [overlayStyles, overlayApi] = useSpring(
    {
      from: { display: "none", opacity: 0 },
      config: config.wobbly,
    },
    []
  );

  const [modalStyles, modalApi] = useSpring(
    {
      from: { display: "none", opacity: 0, scale: 0.8 },
    },

    []
  );

  const [mobileModalStyles, mobileModalApi] = useSpring(
    {
      from: { display: "none", y: "600px" },
    },

    []
  );

  const openModal = (): void => {
    document.documentElement.style.overscrollBehaviorY = "contain";

    modalWrapperApi.start({
      // start the wrapper
      to: async (animate) => {
        await animate({
          to: { display: "flex" },
        });

        // start the overlay
        overlayApi.start({
          to: async (animate) => {
            await animate({
              to: { display: "block" },
            });

            await animate({
              to: { opacity: 1 },
            });
          },
        });

        // start the actual modal

        modalApi.start({
          to: async (animate) => {
            await animate({
              to: { display: "flex" },
            });
            await animate({
              to: { opacity: 1, scale: 1 },
            });
          },
        });

        mobileModalApi.start({
          to: async (animate) => {
            await animate({
              to: { display: "flex" },
            });

            await animate({
              to: { y: "0px" },
            });
          },
        });
      },
    });
  };

  const closeModal = (): void => {
    document.documentElement.style.overscrollBehaviorY = "auto";

    mobileModalApi.start({
      to: async (animate) => {
        await animate({
          to: { y: "600px" },
        });

        await animate({
          to: { display: "none" },
        });
      },
    });

    // hide the modal
    modalApi.start({
      to: async (animate) => {
        await animate({
          to: { opacity: 0, scale: 0.8 },
        });

        await animate({
          to: { display: "none" },
        });
      },
    });

    // hide the overlay
    overlayApi.start({
      to: async (animate) => {
        await animate({
          to: { opacity: 0 },
        });

        await animate({
          to: { display: "none" },
        });

        // hide the wrapper
        modalWrapperApi.start({
          to: async (animate) => {
            await animate({
              to: { display: "none" },
            });
          },
        });
      },
    });
  };

  const resizeFn = () => {
    setIssMobile(document.body.offsetWidth <= 450);
    console.log(document.body.offsetWidth);
  };

  useEffect(() => {
    setIssMobile(document.body.offsetWidth <= 450);

    window.addEventListener("resize", resizeFn);

    return () => {
      window.removeEventListener("resize", resizeFn);
    };
  }, []);

  return (
    <Wrapper>
      <Container>
        <div className="upper">
          <div className="top-bar">
            <p className="logo">Wellfaree</p>
            <UserPfp />
          </div>

          {!loading &&
          data &&
          data.getUser.lastSubmitted !== null &&
          data.getUser.lastSubmitted < 24 ? (
            <NotAllowed>
              <div className="info">
                <h2>You have already journaled today!</h2>
                <p>
                  You can add another entry in{" "}
                  <b>
                    {24 - data.getUser.lastSubmitted == 1
                      ? "less than 1 hour"
                      : `${24 - data.getUser.lastSubmitted} hours`}
                  </b>
                  .
                </p>
                <Link href="/app" passHref>
                  <div>
                    <Button>Moodboard</Button>
                  </div>
                </Link>
              </div>
            </NotAllowed>
          ) : null}

          <div>
            <h3
              className="greetings"
              style={{
                display:
                  data &&
                  data.getUser.lastSubmitted !== null &&
                  data.getUser.lastSubmitted < 24
                    ? "none"
                    : "inline-block",
              }}
            >
              Welcome back,{" "}
              <b className="name">
                {userQueryProps.data &&
                  userQueryProps.data.getUser.information.firstName}
              </b>
            </h3>
            <div className="questions">
              <form>
                <WatermarkInput
                  main={true}
                  placeholder="How are you feeling today?"
                  label="Overall feeling"
                  toFocus={true}
                  {...register()}
                />

                <div className="details">
                  <WatermarkInput
                    main={false}
                    placeholder="What’s been bothering you throughout the day?"
                    label="Bothers"
                    {...register()}
                  />
                  <WatermarkInput
                    main={false}
                    placeholder="What are you grateful for at this very moment?"
                    label="Gratefulness for"
                    {...register()}
                  />
                  {!loading &&
                  !(
                    data &&
                    data.getUser.lastSubmitted !== null &&
                    data.getUser.lastSubmitted < 24
                  ) ? (
                    <p
                      ref={emojiSelector}
                      className="summarize"
                      onClick={openModal}
                    >
                      {currentEmoji
                        ? `Report summarized with`
                        : `Summarize your day with an emoji`}
                      {currentEmoji && (
                        <span className="summarizedEmoji">{currentEmoji}</span>
                      )}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
        {!loading &&
        !(
          data &&
          data.getUser.lastSubmitted !== null &&
          data.getUser.lastSubmitted < 24
        ) ? (
          <>
            <footer>
              {error && <Error>{error}</Error>}
              <div className="btns">
                <Button
                  withLoading={{
                    toBeLoading: submitInProgress,
                    toModifyOnStateChange: {
                      word: "Save",
                      endingToReplace: "e",
                    },
                  }}
                  onClick={() => {
                    // custom check if an emoji has been selected
                    if (!currentEmoji) {
                      emojiSelector.current?.classList.add("error");
                    }

                    const raw_data = handleTextareaSubmit();
                    const res = handleResults(raw_data);
                    setError(res);

                    if (!res && !currentEmoji) {
                      setError("Please, summarize your day with one emoji");
                      return;
                    }

                    if (!res) {
                      setSubmitInProgress(true);
                      const values = raw_data.values!;
                      const keys = Object.keys(values);

                      addRecord({
                        variables: {
                          emoji: currentEmoji,
                          feelings: values[keys[0]],
                          unease: values[keys[1]],
                          gratefulness: values[keys[2]],
                        },
                      });
                      setTimeout(async () => {
                        await router.replace("/app");
                        setSubmitInProgress(false);
                      }, 1000);
                    }
                  }}
                >
                  Save the record
                </Button>
                <Link href="/app">Skip, I’ll do this later.</Link>
              </div>
            </footer>
            <EmojiWrapper as={animated.div} style={modalWrapperStyles}>
              <animated.div
                onClick={closeModal}
                className="overlay"
                style={overlayStyles}
              ></animated.div>
              <animated.div
                style={isMobile ? mobileModalStyles : modalStyles}
                className="modal"
                // ref={modalRef}
                onTouchStart={initDrag}
              >
                <div className="draggable" onTouchStart={initDrag}></div>
                {emojisList.map((emoji, index) => {
                  return (
                    <div className="row" key={index}>
                      <p className="name">{emoji.name}</p>
                      <div className="emojis">
                        {emoji.emojis.map((symbol) => (
                          <span
                            key={symbol}
                            onClick={() => {
                              setCurrentEmoji(symbol);
                              emojiSelector.current?.classList.add("active");
                              closeModal();
                            }}
                            className="emoji"
                          >
                            {symbol}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
              </animated.div>
            </EmojiWrapper>
          </>
        ) : null}
      </Container>
    </Wrapper>
  );
};

export default Entry;
