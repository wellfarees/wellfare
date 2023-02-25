import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

import { AdaptiveAnimation, RecapCard, Button } from "../../components";
import { ShrankContainer } from "../../styled/reusable";

import { RecordsData } from "../../components/Records/RecordTypes";
import { mapRecordsToJsx } from "../../utils/mapRecordsToJsx";

import {
  differenceInWeeks,
  isSameWeek,
  startOfDay,
  differenceInCalendarDays,
  subDays,
  startOfWeek,
  endOfWeek,
  eachWeekOfInterval,
  isSunday,
} from "date-fns";

import { MasonryGrid } from "@egjs/react-grid";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useRecap } from "../../hooks/useRecap";
import Search from "../../components/Search/Search";

import { GET_FIRST_NAME, USER_FEED_QUERY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

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

    .search-container {
      position: absolute;
      bottom: -1.5em;
    }
  }

  main {
    margin-top: 5em;
    margin-bottom: 8em;

    .journal-cta {
      padding: 1.5em 0 2.5em 0;
    }

    div.affirmations-cta {
      color: ${(props: any) => props.theme.mainColor};

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
    padding: 0em 0;
    margin-top: -1.5em;
  }

  .records-container {
    .records {
      margin-top: 3em;

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
        margin-bottom: 1em;
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
    }
  }

  @media only screen and (max-width: 425px) {
    .journal-cta {
      line-height: 1.5;
      margin-bottom: 0.5em;
      max-width: 100% !important;
    }

    button {
      padding: 0.8em 0.5em !important;
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
  const { data, loading } = useQuery(USER_FEED_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const firstNameProps = useQuery(GET_FIRST_NAME);

  const recap = useRecap(data);

  const screenSize = useScreenSize();

  interface DateInterface {
    date: number | Date;
  }

  // FIXME: Create appropriate return type
  // TODO: Write tests for this

  // FIXME: Create appropriate return type
  // TODO: Write tests for this
  const splitIntoWeeks = (arr: DateInterface[]): any => {
    if (arr.length == 1) return [arr];

    const checkForWeek = (
      dates: typeof arr = arr,
      weeksArr: any = [],
      weekIndex: number = 0
    ): [][] => {
      if (dates.length == 0) {
        return weeksArr;
      }

      const sorted = [...dates].sort((a, b) => {
        // convert the dates to Date objects for comparison
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        // sort by ascending date
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });

      const dateLeft = sorted[0];
      const dateRight = sorted[1];
      let weeks = weeksArr;

      if (!dateRight) {
        if (!weeksArr[weekIndex]) {
          weeks.push([dateLeft]);
        } else {
          weeks[weekIndex].push(dateLeft);
        }
        return checkForWeek(sorted.slice(1), weeks, weekIndex + 1);
      }

      if (
        isSameWeek(startOfDay(dateLeft.date), startOfDay(dateRight.date), {
          weekStartsOn: 1,
        }) &&
        differenceInCalendarDays(dateLeft.date, subDays(dateRight.date, 1)) < 7
      ) {
        if (!weeksArr[weekIndex]) {
          weeks.push([dateLeft]);
        } else {
          weeks[weekIndex].push(dateLeft);
        }

        return checkForWeek(sorted.slice(1), weeks, weekIndex);
      } else {
        if (!weeksArr[weekIndex]) {
          weeks.push([dateLeft]);
        } else {
          weeks[weekIndex].push(dateLeft);
        }
        return checkForWeek(dates.slice(1), weeks, weekIndex + 1);
      }
    };

    return checkForWeek()
      .reverse()
      .map((arr) => arr.reverse());
  };

  function groupRecordsByWeek(records: DateInterface[]): DateInterface[][] {
    const weeks: DateInterface[][] = [];

    // First, we'll get all the weeks covered by the records
    const start = startOfWeek(records[records.length - 1].date);
    const end = endOfWeek(records[0].date);

    // if (isSameWeek(start, end)) {
    //   return [records];
    // }

    const weekIntervals = eachWeekOfInterval({ start, end } as Interval, {
      weekStartsOn: 0,
    }).reverse();

    weekIntervals.forEach((weekInterval, index) => {
      const weekRecords: DateInterface[] = [];

      records.forEach((record) => {
        // console.log(record);
        if (
          isSameWeek(
            isSunday(record.date) ? subDays(record.date, 1) : record.date,
            startOfWeek(weekInterval)
          )
        ) {
          console.log(record);
          weekRecords.push(record);
        }
      });
      if (weekRecords.length) weeks.push(weekRecords);
    });

    return weeks;
  }

  // console.log(data.getUser);

  return (
    <Wrapper>
      <header>
        <ShrankContainer>
          <AdaptiveAnimation>
            <h2>
              Here&apos;s your moodboard,{" "}
              <b>
                {firstNameProps.data &&
                  firstNameProps.data.getUser.information.firstName}
              </b>
            </h2>
          </AdaptiveAnimation>

          <Search />
        </ShrankContainer>
      </header>

      <main>
        <ShrankContainer>
          <div className="ctas">
            {data &&
              (data.getUser.lastSubmitted >= 24 ||
              data.getUser.lastSubmitted === null ? (
                <div className="journal-cta">
                  <Link href="/app/entry" passHref>
                    <Button>Add new record</Button>
                  </Link>
                </div>
              ) : null)}
            <br />
            <div className="affirmations-cta">
              <Link href="/app/affirmations" passHref>
                <span>
                  Read your affirmations
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>

          {!loading && recap ? (
            <div
              style={{
                marginBottom: "7em",
              }}
            >
              <AdaptiveAnimation>
                <RecapCard records={recap.records.length} id={recap.id} />
              </AdaptiveAnimation>
            </div>
          ) : null}

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
                        const weeksAgo = differenceInWeeks(
                          new Date(),
                          new Date(week[week.length - 1].date),
                          { roundingMethod: "floor" }
                        );
                        return (
                          <div
                            className={
                              isSameWeek(
                                Date.now(),
                                week[week.length - 1].date,
                                { weekStartsOn: 1 }
                              )
                                ? "current"
                                : undefined
                            }
                            key={index}
                          >
                            {weeksAgo == 0 ? (
                              <p className="time"></p>
                            ) : (
                              <p className="time">
                                {weeksAgo} week{weeksAgo > 1 && "s"} ago
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
                <h3>We could not find any records</h3>
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
