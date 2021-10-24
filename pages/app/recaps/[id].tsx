import { ShrankContainer } from "../../../styled/reusable";
import Record from "../../../components/Records/Record";
import AdaptiveAnimation from "../../../components/animated/AdaptiveAnimation";
import { formatDate } from "../../../utils/formatDate";
import styled from "styled-components";
import Scroller from "../../../components/Scroller/Scroller";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import GoBack from "../../../components/Routing/GoBack";
import React from "react";
import { mapRecordsToJsx } from "../../../utils/mapRecordsToJsx";
import { RecordsData } from "../../../components/Records/RecordTypes";

const Wrapper = styled.div`
  margin-bottom: 6em;
  height: auto !important;

  header {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .subtitle {
    line-height: 1.4;
  }

  .details {
    display: flex;
    gap: 4em;
    margin: 4em 0;

    h3 {
      margin-bottom: 0.3em;
      line-height: 1.3;
    }

    p,
    ul {
      max-width: 300px;
    }

    p.feelings-descr {
      line-height: 1.5em;
    }

    ul {
      padding-left: 2em;
      li {
        list-style-type: disc;
        line-height: 1.5;
        margin-top: 0.5em;
      }
    }
  }

  .records-container {
    p.label {
      margin-bottom: 2em;
    }

    .records {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 4em;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      flex-direction: column;
    }

    .records {
      grid-template-columns: 1fr !important;
    }
  }
`;

interface RecapProps {
  recap: {
    records: RecordsData;
    description: string;
    period: [number, number];
  };
}

const Recap: NextPage<RecapProps> = ({
  recap: { description, period, records },
}) => {
  const size = useScreenSize();
  const router = useRouter();
  const { id } = router.query;

  const recordsAsJsx = mapRecordsToJsx(records);

  return (
    <Wrapper>
      <ShrankContainer>
        <header>
          <GoBack />
          <span className="interval">
            {formatDate(new Date(period[0]))} -{" "}
            {formatDate(new Date(period[1]))}
          </span>
          <h2>Weekly recap</h2>
          <p className="subtitle">
            Time to take a look on what you’ve been going through this week.
          </p>
        </header>

        <div className="details">
          <div className="feelings">
            <h3>Feelings</h3>
            <p
              className="feelings-descr"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>

          <div className="gratefulness">
            <h3>Things you’ve been grateful for</h3>
            <ul>
              {records.map((recordData, index) => {
                return <li key={index}>{recordData.gratefulness}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="records-container">
          <p className="label">
            <b>Your records</b>
          </p>

          <div className="records">
            {size ? (
              size < 768 ? (
                <Scroller>{recordsAsJsx}</Scroller>
              ) : (
                <>
                  {recordsAsJsx.map((record, index) => {
                    return (
                      <div key={index}>
                        <AdaptiveAnimation>{record}</AdaptiveAnimation>
                      </div>
                    );
                  })}
                </>
              )
            ) : null}
          </div>
        </div>
      </ShrankContainer>
    </Wrapper>
  );
};

export default Recap;

export const getServerSideProps: GetServerSideProps<RecapProps> = async () => {
  return {
    props: {
      recap: {
        description: `Very diverse, your emotions range from being very unstable to
              feeling happy. You’re going through period of <b>mania</b>.`,
        gratefulness: [
          `breathing fresh air`,
          `having a lot of free time`,
          `Dropping outta college while its not too late lmao`,
        ],
        period: [Date.now(), Date.now()],
        records: [
          {
            date: Date.now(),
            unease:
              "Nothing, really, ive just been craving for tacos lately ://",
            gratefulness: "Being able to breathe fresh air, because air",
            emoji: "😡",
            feelings: "adventurous",
          },
          {
            date: Date.now(),
            unease:
              "Nothing, really, ive just been craving for tacos lately ://",
            gratefulness: "having a lot of free time",
            emoji: "😍",
            feelings: "adventurous",
          },
          {
            date: Date.now(),
            unease:
              "Nothing, really, ive just been craving for tacos lately ://",
            gratefulness: "Dropping outta college while its not too late lmao",
            emoji: "😈",
            feelings: "adventurous",
          },
        ],
      },
    },
  };
};
