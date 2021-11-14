import { NextPage, GetServerSideProps } from "next";
import { ShrankContainer } from "../../styled/reusable";
import styled from "styled-components";
import Link from "next/link";
import RecapCard from "../../components/Records/RecapCard";
import Record from "../../components/Records/Record";
import AdaptiveAnimation from "../../components/animated/AdaptiveAnimation";
import { RecordsData } from "../../components/Records/RecordTypes";
import { mapRecordsToJsx } from "../../utils/mapRecordsToJsx";
import { useQuery } from "react-apollo";
import { gql } from "graphql-tag";
import { useEffect } from "react";

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
    display: flex;
    flex-direction: column;
    gap: 2em;

    .records {
      margin-top: 3em;
      display: flex;
      gap: 4em;
    }

    .current,
    .last-week {
      display: flex;
      flex-direction: column;
      gap: 4em;
    }

    .last-week {
      p.time {
        font-weight: bold;
        margin-bottom: -1em;
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

const App: NextPage<{ records: RecordsData }> = ({ records }) => {
  const USER_INFORMATION_QUERY = gql`
    query GetUser($token: String!) {
      getUser(token: $token) {
        id
        information {
          firstName
        }
        records {
          date
          emoji
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(USER_INFORMATION_QUERY, {
    variables: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTYzNjU3NzMwM30.4bNSnf2oPC-tdTfdZDdJ5wGbKjhwvHN9i6i_u691CXQ",
    },
  });

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
            <input placeholder="Search a record" type="text" />
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

          <div className="records-container">
            <AdaptiveAnimation>
              <RecapCard records={7} />
            </AdaptiveAnimation>
            <div className="records">
              <div className="current">
                {mapRecordsToJsx(records).map((record, index) => (
                  <div key={index}>
                    <AdaptiveAnimation>{record}</AdaptiveAnimation>
                  </div>
                ))}
              </div>
              <div className="last-week">
                <p className="time">Last week</p>
                {mapRecordsToJsx(records).map((record, index) => (
                  <div key={index}>
                    <AdaptiveAnimation>{record}</AdaptiveAnimation>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ShrankContainer>
      </main>
    </Wrapper>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps<{ records: RecordsData }> =
  async () => {
    return {
      props: {
        records: [
          {
            date: Date.now(),
            unease:
              "Nothing, really, ive just been craving for tacos lately ://",
            gratefulness: "Being able to breathe fresh air, because air >>",
            emoji: "😍",
            feelings: "adventurous",
          },
          {
            date: Date.now(),
            unease:
              "Nothing, really, ive just been craving for tacos lately ://",
            gratefulness: "Being able to breathe fresh air, because air >>",
            emoji: "😍",
            feelings: "adventurous",
          },
          {
            date: Date.now(),
            unease:
              "Nothing, really, ive just been craving for tacos lately ://",
            gratefulness: "Being able to breathe fresh air, because air >>",
            emoji: "😍",
            feelings: "adventurous",
          },
        ],
      },
    };
  };
