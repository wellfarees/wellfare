import { NextPage, GetStaticProps } from "next";
import { ShrankContainer, GlowingBLue } from "../../../styled/reusable";
import styled from "styled-components";
import { formatDate } from "../../../utils/formatDate";
import { fontSizes } from "../../../config/userConfig";
import AdaptiveAnimation from "../../../components/animated/AdaptiveAnimation";
import Link from "next/link";

import { useQuery } from "react-apollo";
import { RECAP_LIST_QUERY } from "../../../graphql/queries";

// TODO: Create monthly separators

const Wrapper = styled.div`
  header {
    max-width: 400px;
    .subtitle {
      margin-top: 0.5em;
      line-height: 1.5;
    }
  }

  .recaps {
    margin-top: 4em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2em;
    margin-bottom: 6em;
  }

  .recap-card {
    padding: 3em;
    border-radius: 12px;
    background: ${(props) => props.theme.banner};
    display: inline-block;
    position: relative;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${(props) => props.theme.recapHover};
      box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.05);
    }

    .watermark {
      position: absolute;
      left: 0.3em;
      top: 50%;
      transform: translateY(-50%);
      font-size: ${fontSizes.base * 6}px;
      font-weight: 800;
      color: ${(props) => props.theme.minimum};
      z-index: 1;
      user-select: none;
    }

    .content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 2em;

      .emojis {
        display: flex;
        align-items: center;
        gap: 1em;
      }
    }
  }

  .noRecaps {
    margin-top: 50vh;
    transform: translateY(-100%);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      font-weight: 900;
      margin: 0.5em 0;
    }

    .info {
      max-width: 300px;
      line-height: 1.5em;
    }

    p.logo {
      color: ${(props) => props.theme.shadedColor};
    }

    button {
      ${GlowingBLue}
      margin-top: 2em;
    }
  }

  @media only screen and (max-width: 1200px) {
    .recaps {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media only screen and (max-width: 630px) {
    .recaps {
      grid-template-columns: 1fr;
      gap: 3em;
      margin-top: 3em;
    }
  }

  @media only screen and (max-width: 425px) {
    .noRecaps {
      transform: translateY(-120%) !important;
      button {
        display: none;
      }
    }
  }

  @media only screen and (max-height: 425px) and (max-width: 812px) {
    .noRecaps {
      transform: translateY(-120%) !important;
      button {
        display: none;
      }
    }
  }
`;

interface ArchiveProps {
  recaps: {
    period: [number, number];
    entries: number;
    emojis: string[];
  }[];
}

interface ReceivedRecap {
  getUser: {
    recaps: {
      id: number;
      startDate: number;
      endDate: number;
      records: {
        emoji: string;
      }[];
    }[];
  };
}

const Archive: NextPage<ArchiveProps> = ({ recaps }) => {
  const { loading, error, data } = useQuery<ReceivedRecap>(RECAP_LIST_QUERY);

  return (
    <Wrapper>
      <ShrankContainer>
        {!loading ? (
          data.getUser.recaps.length ? (
            <>
              <header>
                <AdaptiveAnimation>
                  <h2>Weekly recap archive</h2>
                </AdaptiveAnimation>
                <p className="subtitle">
                  Everything you have ever journaled is stored over here.
                </p>
              </header>
              <div className="recaps">
                {data.getUser.recaps.map((recap, index) => {
                  const { endDate, startDate, id, records } = recap;
                  const emojis = records.map((record) => record.emoji);

                  return (
                    <Link href={`/app/recaps/${id}`}>
                      <div className="recap-card" key={index}>
                        <h3 className="watermark">{records.length}</h3>
                        <div className="content">
                          <p className="period">
                            {formatDate(new Date(startDate))} -{" "}
                            {formatDate(new Date(endDate))}
                          </p>
                          <p className="amount">
                            <b>{records.length} records</b> this week
                          </p>
                          <div className="emojis-block">
                            <div className="emojis">
                              {emojis.map((emoji, index) => {
                                return <span key={index}>{emoji}</span>;
                              })}
                              {records.length - emojis.length > 0 ? (
                                <p className="total">
                                  and {records.length - emojis.length} more
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="noRecaps">
              <p className="logo">Wellfare™</p>
              <h2>NOTHING’S HERE</h2>
              <p className="info">
                Your weekly recaps will go here once you start journaling more
                often
              </p>
              <Link href="/app">
                <button className="return-btn">Return to feed</button>
              </Link>
            </div>
          )
        ) : null}
      </ShrankContainer>
    </Wrapper>
  );
};

export default Archive;

const getStaticProps: GetStaticProps<ArchiveProps> = async () => {
  return {
    props: {
      recaps: [
        {
          period: [Date.now(), Date.now() * 1.5],
          entries: 5,
          emojis: ["😍", "🤠", "😭"],
        },
        {
          period: [Date.now(), Date.now() * 1.5],
          entries: 5,
          emojis: ["😍", "🤠", "😭"],
        },
        {
          period: [Date.now(), Date.now() * 1.5],
          entries: 5,
          emojis: ["😍", "🤠", "😭"],
        },
        {
          period: [Date.now(), Date.now() * 1.5],
          entries: 5,
          emojis: ["😍", "🤠", "😭"],
        },
      ],
    },
    revalidate: 10,
  };
};

export { getStaticProps };
