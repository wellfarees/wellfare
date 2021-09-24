import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/Link";
import styled from "styled-components";
import { Container, GlowingBLue, Error } from "../../styled/reusable";
import { WatermarkInput, Pfp } from "../../components";
import { useEffect, useRef, useState } from "react";
import { useTextareaValidator } from "../../hooks/useTextareaValidator";
import { animated, useSpring, config } from "react-spring";

const Wrapper = styled.main`
  min-height: 100vh;
  width: 100vw;
  height: auto;
  background-color: ${(props: any) => props.theme.backgroundColor};
  color: ${(props: any) => props.theme.mainColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${Container} {
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: flex-start;
    min-height: 80vh;
    margin: 8em 0;

    justify-content: space-between;
  }

  .upper {
    width: 100%;
  }

  .top-bar {
    margin-bottom: 4em;
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
    }

    button {
      ${GlowingBLue}
    }

    a {
      font-size: 1.4rem;
      margin-top: -0.5em;
      text-decoration: underline;
    }

    @media only screen and (max-width: 425px) {
      width: 100%;

      .btns {
        flex-direction: column;
        width: 100%;
        gap: 4em;

        button {
          width: 100%;
        }
      }
    }
  }
`;

const EmojiWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;

  .overlay {
    width: 100vw;
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
    background-color: ${(props: any) => props.theme.backgroundColor};
    padding: 4em;
    border-radius: 16px;
    position: relative;
    z-index: 4;
    display: flex;
    gap: 3em;
    flex-direction: column;
    display: none;
    opacity: 0;

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
`;

const emojisList = [
  {
    name: "Like usual",
    emojis: ["😍", "😎", "😣", "🤑"],
  },
  {
    name: "Quirky",
    emojis: ["😈", "🤖", "😇", "😡"],
  },
  {
    name: "Crazy",
    emojis: ["😭", "😙", "🤕", "🤠"],
  },
];

const Entry: NextPage = () => {
  // TODO: To be replaced with graphql fetched username
  const [username, setUsername] = useState("Roland");
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const { register, handleTextareaSubmit, handleResults } =
    useTextareaValidator();
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

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

  const openModal = (): void => {
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
      },
    });
  };

  const closeModal = (): void => {
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

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Wrapper>
      <Container>
        <div className="upper">
          <div className="top-bar">
            <p className="logo">Wellfaree</p>
            <Pfp url="/img/sample_pfp.jpg"></Pfp>
          </div>
          <h3 className="greetings">
            Welcome back, <span className="name">{username}</span>
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
                <p className="summarize" onClick={openModal}>
                  Summarize your day with an emoji
                </p>
              </div>
            </form>
          </div>
        </div>
        <footer>
          {error && <Error>{error}</Error>}
          <div className="btns">
            <button
              onClick={() => {
                const raw_data = handleTextareaSubmit();
                const res = handleResults(raw_data);
                setError(res);

                if (!res) {
                  router.push("/app");
                }
              }}
            >
              Save the record
            </button>
            <Link href="/app">Skip, I’ll do this later.</Link>
          </div>
        </footer>
        <EmojiWrapper as={animated.div} style={modalWrapperStyles}>
          <animated.div
            onClick={closeModal}
            className="overlay"
            style={overlayStyles}
          ></animated.div>
          <animated.div style={modalStyles} className="modal">
            {emojisList.map((emoji) => {
              return (
                <div className="row">
                  <p className="name">{emoji.name}</p>
                  <div className="emojis">
                    {emoji.emojis.map((symbol) => (
                      <span className="emoji">{symbol}</span>
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
      </Container>
    </Wrapper>
  );
};

export default Entry;
