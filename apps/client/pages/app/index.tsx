import { NextPage, GetServerSideProps } from "next";
import { ShrankContainer } from "../../styled/reusable";
import styled from "styled-components";
import Link from "next/link";
import RecapCard from "../../components/Records/RecapCard";
import AdaptiveAnimation from "../../components/animated/AdaptiveAnimation";
import { RecordsData } from "../../components/Records/RecordTypes";
import { mapRecordsToJsx } from "../../utils/mapRecordsToJsx";
import { differenceInWeeks, isSameWeek } from "date-fns";
import { MasonryGrid } from "@egjs/react-grid";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useState } from "react";
import { useAlgolia } from "../../hooks/useAlgolia";
import { SearchResponse } from "@algolia/client-search";

import { USER_FEED_QUERY } from "../../graphql/queries";
import { useQuery } from "react-apollo";

const Wrapper = styled.main`
  color: ${(props: any) => props.theme.mainColor};

  p {
    display: inline-block;
  }

  header {
    background-color: ${(props: any) => props.theme.banner};
    padding: 4em 0;
    margin-top: 1.1em;
    position: relative;

    h2 {
      font-weight: 400;
      max-width: 400px;
      line-height: 1.3;

      b {
        font-weight: 700;
      }
    }

    .search-input {
      display: flex;
      align-items: center;
      gap: 1em;
      padding: 0.8em 1.5em;
      padding-top: 0.9em;
      width: 500px;
      max-width: 80%;
      background-color: ${(props: any) => props.theme.input};
      border-radius: 7px;
      position: absolute;
      bottom: -1.5em;
      color: ${(props: any) => props.theme.shadedColor};

      input {
        border: none;
        background-color: transparent;
        outline: none;
        width: 100%;
        color: ${(props: any) => props.theme.shadedColor};
      }
    }
  }

  main {
    margin-top: 5em;
    margin-bottom: 8em;

    .journal-cta h4 {
      color: ${(props: any) => props.theme.watermark};
      transition: 0.3s;

      &:hover {
        filter: brightness(90%);
      }
    }

    div.affirmations-cta {
      color: ${(props: any) => props.theme.mainColor};
      margin-top: 1em;

      i {
        transition: 0.3s;
      }

      &:hover {
        i {
          transform: translateX(4px);
        }
      }
    }

    .journal-cta,
    .affirmations-cta {
      span {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 1em;
      }

      h4 {
        cursor: pointer;

        i {
          display: inline-block;
          margin-left: 0.5em;
        }
      }
    }
  }

  .recap {
    margin-top: 2.5em;
  }

  .ctas {
    padding: 2em 0;
    margin-top: -1.5em;
  }

  .records-container {
    margin-top: -4em;

    .records {
      margin-top: 4em;

      & > div {
        & > div > div {
          margin-top: 4em !important;

          &:first-of-type {
            margin-top: 2em !important;
          }
        }
      }

      p.time {
        font-weight: bold;
        margin-top: 0 !important;
      }
    }

    @media only screen and (max-width: 426px) {
      div {
        width: 100% !important;
      }
    }
  }

  @media only screen and (max-width: 930px) {
    main {
      margin-top: 3em;

      .records {
        flex-direction: column;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    header {
      background: none;
      margin-top: 0;
      padding: 0;

      .search-input {
        position: static;
        margin-top: 2em;
        width: 100%;
        max-width: 100%;
      }
    }
  }

  @media only screen and (max-width: 425px) {
    .journal-cta {
      h4 {
        line-height: 1.5;
        margin-bottom: 0.5em;
        max-width: 80%;
      }
    }

    main {
      margin-bottom: 5em;
    }
  }
`;

const NoRecordsFound = styled.div`
  margin-top: 3em;
  color: ${(props) => props.theme.shadedColor};
  width: 100%;
  padding: 3em;
  background: ${(props) => props.theme.banner};
  border-radius: 14px;

  h1 {
    text-transform: uppercase;
    font-weight: 900;

    i {
      margin-right: 0.4em;
    }
  }

  h3 {
    font-weight: 800;
    line-height: 1.2;
    margin-top: 0.3em;
  }

  p {
    margin-top: 0.5em;
    line-height: 1.5;
    max-width: 16em;
  }

  @media only screen and (max-width: 320px) {
    i {
      display: none;
    }
  }
`;

const App: NextPage<{ records: RecordsData }> = ({ records }) => {
  const { data, loading, error } = useQuery(USER_FEED_QUERY);
  const screenSize = useScreenSize();
  const searchClient = useAlgolia();
  const [hits, setHits] = useState<SearchResponse<unknown>>();

  interface DateInterface {
    date: number | Date;
  }

  // FIXME: Create appropriate return type
  const splitIntoWeeks = (arr: DateInterface[]): any => {
    if (arr.length === 1) return [arr];

    let weeks: DateInterface[][] = [];
    let start = 0;
    for (let i = 0; i < arr.length; i++) {
      const currentDate = arr[i].date;

      if (i >= arr.length - 1) {
        // Checking the last date in the array
        const previousWeek = weeks[weeks.length - 1];
        const previousWeeksLastDate =
          previousWeek[previousWeek.length - 1].date;
        const appendNewWeek = Boolean(
          differenceInWeeks(currentDate, previousWeeksLastDate)
        );
        if (appendNewWeek) {
          weeks.push([arr[i]]);
        } else {
          weeks[weeks.length - 1] = [...weeks[weeks.length - 1], arr[i]];
        }
        break;
      }

      const nextDate = arr[i + 1].date;
      const difference = differenceInWeeks(currentDate, nextDate);

      if (difference) {
        weeks.push(arr.slice(start, i + 1));
        start = i;
      }
    }
    return weeks.length ? weeks : [arr];
  };

  return (
    <Wrapper>
      <header>
        <ShrankContainer>
          <h2>
            Here&apos;s your moodboard,{" "}
            <b>{data && data.getUser.information.firstName}</b>
          </h2>

          <div className="search-input">
            <i className="fas fa-search"></i>
            <input
              onChange={async (e) => {
                if (!searchClient) return;
                const index = searchClient.initIndex("records");
                const hits = await index.search(e.target.value);
                setHits(hits);
              }}
              placeholder="Search a record"
              type="text"
            />
          </div>
        </ShrankContainer>
      </header>

      <main>
        <ShrankContainer>
          <div className="ctas">
            <div className="journal-cta">
              <Link href="/app/entry">
                <h4>
                  Ready to journal another day?
                  <i className="fas fa-pencil-alt"></i>
                </h4>
              </Link>
            </div>
            <br />
            <div className="affirmations-cta">
              <Link href="/app/affirmations">
                <span>
                  Read your affirmations
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div
            style={{
              marginBottom: "7em",
            }}
          >
            <AdaptiveAnimation>
              <RecapCard records={7} />
            </AdaptiveAnimation>
          </div>

          {!loading && data ? (
            data.getUser.records.length ? (
              <div className="records-container">
                <div className="records">
                  <MasonryGrid
                    column={(screenSize as number) > 1200 ? 2 : 1}
                    align="start"
                    gap={40}
                    columnSize={(screenSize as number) > 425 ? 320 : undefined}
                  >
                    {splitIntoWeeks(data.getUser.records).map(
                      (week: RecordsData, index: number) => {
                        return (
                          <div
                            className={
                              isSameWeek(Date.now(), week[0].date)
                                ? "current"
                                : undefined
                            }
                            key={index}
                          >
                            {isSameWeek(Date.now(), week[0].date) ? null : (
                              <p className="time">
                                {differenceInWeeks(Date.now(), week[0].date)}{" "}
                                weeks ago
                              </p>
                            )}

                            {mapRecordsToJsx(week).map((record, index) => (
                              <div key={index}>
                                <AdaptiveAnimation>{record}</AdaptiveAnimation>
                              </div>
                            ))}
                          </div>
                        );
                      }
                    )}
                  </MasonryGrid>
                </div>
              </div>
            ) : (
              <NoRecordsFound>
                <h1>
                  <i className="far fa-frown-open"></i>Hmm...
                </h1>
                <h3>We couldn't find any records</h3>
                <p>Try logging on and journaling more often</p>
              </NoRecordsFound>
            )
          ) : null}
        </ShrankContainer>
      </main>
    </Wrapper>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps<{
  records: RecordsData;
}> = async () => {
  return {
    props: {
      records: [
        {
          date: Date.now(),
          unease: "Nothing, really, ive just been craving for tacos lately ://",
          gratefulness: "Being able to breathe fresh air, because air >>",
          emoji: "😍",
          feelings: "adventurous",
        },
        {
          date: Date.now(),
          unease: "Nothing, really, ive just been craving for tacos lately ://",
          gratefulness: "Being able to breathe fresh air, because air >>",
          emoji: "😍",
          feelings: "adventurous",
        },
        {
          date: Date.now(),
          unease: "Nothing, really, ive just been craving for tacos lately ://",
          gratefulness: "Being able to breathe fresh air, because air >>",
          emoji: "😍",
          feelings: "adventurous",
        },
      ],
    },
  };
};
